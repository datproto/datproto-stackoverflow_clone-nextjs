'use server'

import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from '@/lib/shared.types'
import dbConnect from '@/lib/mongoose'
import User from '@/database/user.model'
import Tag, { ITag } from '@/database/tag.model'
import { FilterQuery } from 'mongoose'
import Question from '@/database/question.model'

export async function getTopInInteractedTagsParams(params: GetTopInteractedTagsParams) {
  try {
    await dbConnect()

    const { userId } = params

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found! `')

    // Find interaction for the user and group by tags

    return [
      { _id: '1', name: 'tag1' },
      { _id: '2', name: 'tag2' }
    ]
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await dbConnect()

    const tags = await Tag.find({})
      .sort({ createdAt: -1 })

    return { tags }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    dbConnect()

    const { tagId, searchQuery } = params

    const tagFilter: FilterQuery<ITag> = { _id: tagId }
    const tag = await Tag.findOne(tagFilter).populate(
      {
        path: 'questions',
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: 1 } }
          : {},
        options: {
          sort: { createdAt: -1 }
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

    if (!tag) {
      throw new Error('Tag not found')
    }

    const questions = tag.questions

    return { tagTitle: tag.name, questions }
  } catch (e) {
    console.log(e)
    throw e
  }
}