'use server'

import { ViewQuestionParams } from '@/lib/shared.types'
import dbConnect from '@/lib/mongoose'
import Question from '@/database/question.model'
import Interaction from '@/database/interaction.model'

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await dbConnect()

    const { questionId, userId } = params

    // Update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } })

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId
      })

      if (existingInteraction) return console.log('User has already viewed.')

      await Interaction.create({
        user: userId,
        action: 'view',
        question: questionId
      })
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}