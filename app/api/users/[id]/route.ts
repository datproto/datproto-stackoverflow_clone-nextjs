import User from "@/database/user.model"
import handleError from "@/lib/handlers/error"
import { NotFoundError, ValidationError } from "@/lib/http-errors"
import dbConnect from "@/lib/mongoose"
import { UserSchema } from "@/lib/validation"
import { APIErrorResponse } from "@/types"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: {
  params: Promise<{ _id: string }>
}) {
  const { id } = await params

  if (!id) throw new NotFoundError('User not found')

  try {
    // STEP 1: Connect to database
    await dbConnect()

    // STEP 2: Find user by ID
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User not found')

    // STEP 3: Return user
    return NextResponse.json({
      success: true,
      data: user
    }, {
      status: 200
    })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function DELETE(_: Request, { params }: {
  params: Promise<{ _id: string }>
}) {
  const { id } = await params

  if (!id) throw new NotFoundError('User not found')

  try {
    // STEP 1: Connect to database
    await dbConnect()

    // STEP 2: Find and delete user by ID
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) throw new NotFoundError('User not found')

    // STEP 3: Return success response
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    }, {
      status: 200
    })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function PUT(request: Request, { params }: {
  params: Promise<{ _id: string }>
}) {
  const { id } = await params

  if (!id) throw new NotFoundError('User not found')

  try {
    // STEP 1: Parse request body
    const body = await request.json()
    const validatedData = UserSchema.partial().safeParse(body)
    if (!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors)

    // STEP 2: Connect to database
    await dbConnect()

    // STEP 3: Find and update user by ID
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!updatedUser) throw new NotFoundError('User not found')

    // STEP 4: Return updated user
    return NextResponse.json({
      success: true,
      data: updatedUser
    }, {
      status: 200
    })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}