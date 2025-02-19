'use server'

import { CreateAnswerParams, GetAnswersParams, GetUserStatsParams } from '@/lib/shared.types'
import dbConnect from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import Answer from '@/database/answer.model'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'

export async function createAnswer(params: CreateAnswerParams) {
  try {
    // Connect to DB
    await dbConnect()

    const { content, author, question, path } = params

    // STEP 1: Create the answer
    const answer = await Answer.create({
      question, content, author
    })

    // STEP 2: Find the question and update it with answer id
    await Question.findByIdAndUpdate(
      question,
      { $push: { answers: answer._id } }
    )

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await dbConnect()

    const { questionId } = params

    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort({ createdAt: -1 })

    return { answers }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getAnswersByUser(params: GetUserStatsParams) {
  try {
    await dbConnect()

    const { page = 1, pageSize = 10, userId } = params

    const totalAnswers = await Answer.countDocuments({ author: userId })

    const answers = await Answer.find(
      { author: userId }
    )
      .sort({ upVotes: -1 })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture')

    return { totalAnswers, answers }
  } catch (e) {
    console.log(e)
    throw e
  }
}