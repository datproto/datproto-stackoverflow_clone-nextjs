import { NextResponse } from 'next/server';
import User from "@/database/user.model"
import handleError from "@/lib/handlers/error"
import { NotFoundError, ValidationError } from "@/lib/http-errors"
import { UserSchema } from "@/lib/validation"
import { APIErrorResponse } from "@/types"

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    // STEP 1: Validation submitted data
    const validatedEmail = UserSchema.partial().safeParse(email)
    if (!validatedEmail.success) {
      throw new ValidationError(validatedEmail.error.flatten().fieldErrors)
    }

    // STEP 2: Check if user exists
    const user = await User.findOne({ email: validatedEmail.data.email })
    if (!user) {
      throw new NotFoundError('User not found')
    }

    // STEP 3: Return user
    return NextResponse.json({
      success: true,
      data: user
    }, {
      status: 200
    })
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse
  }
}