'use server'

import {ViewQuestionParams} from '@/lib/shared.types'
import {connectToDatabase} from '@/lib/mongoose'
import Question from '@/lib/models/question.model'
import Interaction from '@/lib/models/interaction.model'

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase()

    const {questionId, userId} = params

    // Update view count for the question
    await Question.findByIdAndUpdate(questionId, {$inc: {views: 1}})

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