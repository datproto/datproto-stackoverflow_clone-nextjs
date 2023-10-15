'use server'

import {GetAllTagsParams, GetTopInteractedTagsParams} from '@/lib/shared.types'
import {connectToDatabase} from '@/lib/mongoose'
import User from '@/lib/models/user.model'
import Tag from '@/lib/models/tag.model'

export async function getTopInInteractedTagsParams(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase()

    const {userId} = params

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found! `')

    // Find interaction for the user and group by tags

    return [
      {_id: '1', name: 'tag1'},
      {_id: '2', name: 'tag2'}
    ]
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase()

    const tags = await Tag.find({})
      .sort({createdAt: -1})

    return {tags}
  } catch (e) {
    console.log(e)
    throw e
  }
}