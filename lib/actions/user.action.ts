'use server'

import { connectToDatabase } from '@/lib/mongoose'
import User from '@/lib/models/user.model'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams
} from '@/lib/shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/lib/models/question.model'
import Answer from '@/lib/models/answer.model'

export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('User not found')
    }

    return user
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

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, {
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

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user.value) {
      throw new Error('User not found')
    }

    // const userQuestionIds = await Question.find({author: user.value._id})
    //   .distinct('_id')

    await Question.deleteMany({ author: user.value._id })

    const deletedUser = await User.findByIdAndDelete(user.value._id)

    return deletedUser
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase()

    // const {page = 1, pageSize = 20, filter, searchQuery} = params

    const users = await User.find({})
      .sort({ createdAt: -1 })


    return { users }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase()

    const user = await getUserById({ userId: params.userId })

    const totalQuestions = await Question.countDocuments({ authors: user._id })
    const totalAnswers = await Answer.countDocuments({ authors: user._id })

    return {
      user,
      totalQuestions,
      totalAnswers
    }

  } catch (e) {
    console.log(e)
    throw e
  }
}