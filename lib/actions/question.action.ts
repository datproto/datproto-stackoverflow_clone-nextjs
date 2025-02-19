'use server'

import { FilterQuery } from 'mongoose'
import dbConnect from '@/lib/mongoose'
import mongoose from 'mongoose'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams, GetUserStatsParams,
  ToggleSaveQuestionParams
} from '@/lib/shared.types'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import action from '../handlers/action'
import { AskQuestionSchema, PaginatedSearchParamsSchema } from '../validation'
import handleError from '../handlers/error'
import TagQuestion from '@/database/tag-question.model';

export async function createQuestion(params: CreateQuestionParams): Promise<ActionResponse<Question>> {
  const validationResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true
  })

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse
  }

  const { title, content, tags } = validationResult.params!
  const userId = validationResult.session?.user?.id

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const [question] = await Question.create(
      [
        {
          title,
          content,
          author: userId,
        }
      ],
      {
        session
      }
    )

    if (!question) {
      throw new Error('Failed to create question')
    }

    const tagIds: mongoose.Types.ObjectId[] = []

    const tagQuestionDocuments = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        {
          $setOnInsert: {
            name: tag
          },
          $inc: {
            questions: 1
          }
        },
        {
          upsert: true,
          new: true,
          session
        }
      )

      tagIds.push(existingTag._id)
      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: question._id
      })
    }

    await TagQuestion.insertMany(tagQuestionDocuments, { session })

    await Question.findByIdAndUpdate(
      question._id,
      {
        $push: { tags: { $each: tagIds } }
      },
      {
        session
      }
    )

    return {
      success: true,
      data: JSON.parse(JSON.stringify(question))
    }
  } catch (e) {
    session.abortTransaction()

    return handleError(e) as ErrorResponse
  } finally {
    session.endSession()
  }
}

export async function getQuestions(params: PaginatedSearchParams): Promise<ActionResponse<{ questions: Question[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema
  })

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse
  }

  const { page = 1, pageSize = 10, query, filter } = params
  const skip = (Number(page) - 1) * pageSize
  const limit = Number(pageSize)

  const filterQuery: FilterQuery<typeof Question> = {}

  if (filter === 'recommended') {
    return {
      success: true,
      data: {
        questions: [],
        isNext: false
      }
    }
  }

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      { content: { $regex: new RegExp(query, "i") } }
    ]
  }

  let sortCriteria = {}

  switch (filter) {
    case 'newest':
      sortCriteria = { createdAt: -1 }
      break
    case 'unanswered':
      filterQuery.answers = 0
      sortCriteria = { createdAt: -1 }
      break
    case 'popular':
      sortCriteria = { upvotes: -1 }
      break
    default:
      sortCriteria = { createdAt: -1 }
      break
  }

  try {
    const totalQuestions = await Question.countDocuments(filterQuery)

    const questions = await Question.find(filterQuery)
      .populate('tags', 'name')
      .populate('author', 'name image')
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)

    const isNext = totalQuestions > skip + questions.length

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext
      }
    }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await dbConnect()

    const { questionId } = params

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: 'id name' })
      .populate({ path: 'author', model: User, select: 'id clerkId name picture' })

    return { question }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    const { questionId, userId, path } = params

    const isQuestionSaved = await User.find({
      $expr: {
        $in: [questionId, '$saved']
      }
    })

    let updateQuery
    if (isQuestionSaved.length > 0) {
      updateQuery = { $pull: { saved: questionId } }
    } else {
      updateQuery = { $push: { saved: questionId } }
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
    await dbConnect()

    const { searchQuery, _id } = params

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {}
    const user = await User.findOne({
      _id
    })

    if (!user) {
      throw new Error('User not found')
    }

    const savedQuestion = user.saved

    return { questions: savedQuestion }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getQuestionsByUser(params: GetUserStatsParams) {
  try {
    await dbConnect()

    const { userId } = params

    const totalQuestions = await Question.countDocuments({ author: userId })

    const questions = await Question.find(
      { author: userId }
    )
      .sort({ views: -1, upVotes: -1 })
      .populate({ path: 'tags', model: Tag })
      .populate('author', 'id clerkId name picture')

    return { totalQuestions, questions }
  } catch (e) {
    console.log(e)
    throw e
  }
}