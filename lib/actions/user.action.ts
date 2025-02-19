'use server'

import dbConnect from '@/lib/mongoose'
import User from '@/database/user.model'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams
} from '@/lib/shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import Answer from '@/database/answer.model'

export async function getUserById(params: GetUserByIdParams) {
  try {
    await dbConnect()

    const { _id } = params

    const user = await User.findOne({ _id })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getUserByEmail(email: string) {
  try {
    await dbConnect()

    const user = await User.findOne({ email })

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
    await dbConnect()

    const newUser = await User.create(userData)

    return newUser
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await dbConnect()

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
    await dbConnect()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user.value) {
      throw new Error('User not found')
    }

    // const userQuestionIds = await Question.find({author: user.value._id})
    //   .distinct('id')

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
    await dbConnect()

    // const {page = 1, pageSize = 20, filter, searchQuery} = params

    const users = await User.find({})
      .sort({ createdAt: -1 })


    return { users }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getUserInfo({ _id }: GetUserByIdParams) {
  try {
    await dbConnect()

    const user = await getUserById({ _id })

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