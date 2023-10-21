'use server'

import {FilterQuery} from 'mongoose'
import {connectToDatabase} from '@/lib/mongoose'
import Question from '@/lib/models/question.model'
import Tag from '@/lib/models/tag.model'
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams,
  ToggleSaveQuestionParams
} from '@/lib/shared.types'
import User from '@/lib/models/user.model'
import {revalidatePath} from 'next/cache'
import Answer from '@/lib/models/answer.model'

export async function createQuestion(params: CreateQuestionParams) {
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

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase()

    const questions = await Question.find({})
      .populate({path: 'tags', model: Tag})
      .populate({path: 'author', model: User})

    return {questions}
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase()

    const {questionId} = params

    const question = await Question.findById(questionId)
      .populate({path: 'tags', model: Tag, select: '_id name'})
      .populate({path: 'author', model: User, select: '_id clerkId name picture'})

    return {question}
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    const {questionId, userId, path} = params

    const isQuestionSaved = await User.find({
      $expr: {
        $in: [questionId, '$saved']
      }
    })

    let updateQuery
    if (isQuestionSaved.length > 0) {
      updateQuery = {$pull: {saved: questionId}}
    } else {
      updateQuery = {$push: {saved: questionId}}
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      updateQuery
    )

    if (!updateUser) {
      throw new Error('Cannot find the user')
    }

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase()

    const {clerkId, searchQuery} = params

    const query: FilterQuery<typeof Question> = searchQuery
      ? {title: {$regex: new RegExp(searchQuery, 'i')}}
      : {}
    const user = await User.findOne({
      clerkId
    }).populate(
      {
        path: 'saved',
        match: query,
        options: {
          sort: {createdAt: -1}
        },
        populate: [
          {
            path: 'tags',
            model: Tag,
            select: '_id name'
          },
          {
            path: 'author',
            model: User,
            select: '_id clerkId name picture'
          }
        ]
      }
    )

    if (!user) {
      throw new Error('User not found')
    }

    const savedQuestion = user.saved

    return {questions: savedQuestion}
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getQuestionsByUser(params: GetUserStatsParams) {
  try {
    await connectToDatabase()

    const {page = 1, pageSize = 10, userId} = params

    const totalQuestions = await Question.countDocuments({author: userId})

    const questions = await Question.find(
      {author: userId}
    )
      .sort({views: -1, upVotes: -1})
      .populate({path: 'tags', model: Tag})
      .populate('author', '_id clerkId name picture')

    return {totalQuestions, questions}
  } catch (e) {
    console.log(e)
    throw e
  }
}