import handleError from '@/lib/handlers/error'
import dbConnect from '@/lib/mongoose'
import { APIErrorResponse } from '@/types'

export async function GET() {
  try {
    await dbConnect()

    // const users = await User.find()
    return { success: true }
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse
  }
} 