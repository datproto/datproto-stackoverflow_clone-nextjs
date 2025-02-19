import User from '@/database/user.model'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { UserSchema } from '@/lib/validation'
import { APIErrorResponse } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()

    const users = await User.find()

    return NextResponse.json({ success: true, data: users }, { status: 200 })
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse
  }
}

export async function POST(request: Request) {
  try {
    // STEP 1: Connect to the database
    await dbConnect()

    // STEP 2: Parse the request body and submitted validate data
    const body = await request.json()
    const validatedDate = UserSchema.safeParse(body)
    if (!validatedDate.success) {
      throw new ValidationError(validatedDate.error.flatten().fieldErrors)
    }

    // STEP 3: Check if the user already exists
    const { email, username } = validatedDate.data
    const exisingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (exisingUser) {
      throw new Error("User already exists. Please make sure your email and username is unique.")
    }

    // STEP 4: Create the user
    const newUser = await User.create(validatedDate.data)

    return NextResponse.json({ success: true, data: newUser }, { status: 201 })
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse
  }
}