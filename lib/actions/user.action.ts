'use server'

import {connectToDatabase} from '@/lib/mongoose'
import UserModel from '@/lib/models/user.model'

export async function getUserById(params: any) {
  try {
    await connectToDatabase()

    const {userId} = params

    return await UserModel.findOne({clerkId: userId})
  } catch (e) {
    console.log(e)
    throw e
  }
}