'use server'

import {CreateAnswerParams, GetAnswersParams} from '@/lib/shared.types'
import {connectToDatabase} from '@/lib/mongoose'
import {revalidatePath} from 'next/cache'
import Answer from '@/lib/models/answer.model'
import Question from '@/lib/models/question.model'

export async function createAnswer(params: CreateAnswerParams) {
  try {
    // Connect to DB
    await connectToDatabase()

    const {content, author, question, path} = params

    // STEP 1: Create the answer
    const answer = await Answer.create({
      question, content, author
    })

    // STEP 2: Find the question and update it with answer id
    await Question.findByIdAndUpdate(
      question,
      {$push: {answers: answer._id}}
    )

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase()

    const {questionId} = params

    const answers = await Answer.find({question: questionId})
      .populate('author', '_id clerkId name picture')
      .sort({createdAt: -1})

    return {answers}
  } catch (e) {
    console.log(e)
    throw e
  }
}