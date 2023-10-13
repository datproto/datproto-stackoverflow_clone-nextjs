'use server'

import {connectToDatabase} from '@/lib/mongoose'
import User from '@/lib/models/user.model'
import {CreateUserParams, DeleteUserParams, UpdateUserParams} from '@/lib/shared.types'
import {revalidatePath} from 'next/cache'
import Question from '@/lib/models/question.model'

export async function getUserById(params: any) {
  try {
    await connectToDatabase()

    const {userId} = params

    return await User.findOne({clerkId: userId})
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase()

    const {clerkId, updateData, path} = params

    await User.findOneAndUpdate({clerkId}, updateData, {
      new: true
    })

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase()

    const {clerkId} = params

    const user = await User.findOneAndDelete({clerkId})

    if (!user) {
      throw new Error('User no found')
    }

    // const userQuestionIds = await Question.find({author: user._id})
    //   .distinct('_id')

    await Question.deleteMany({author: user._id})

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (e) {
    console.log(e)
    throw e
  }
}