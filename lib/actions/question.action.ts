'use server'

import {connectToDatabase} from '@/lib/mongoose'
import Question from '@/lib/models/question.model'
import Tag from '@/lib/models/tag.model'

export async function createQuestion(params: any) {
  try {
    // Connect to DB
    await connectToDatabase()

    const {title, content, tags, author, path} = params

    // STEP 1: Create the question
    const question = await Question.create({
      title, content, author
    })

    const tagDocuments = []

    // STEP 2: Create the tags or get them
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {name: {$regex: new RegExp(`^${tag}$`, 'i')}},
        {$setOnInsert: {name: tag}, $push: {questions: question._id}},
        {upsert: true, new: true}
      )

      tagDocuments.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {tags: {$each: tagDocuments}}
    })

    // STEP 3: Create an interaction record for the user's ask_question action

    // STEP 4: Increment author's reputation
  } catch (e) {

  }
}