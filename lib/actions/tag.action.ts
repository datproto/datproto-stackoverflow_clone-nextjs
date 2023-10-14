'use server'

import {GetTopInteractedTagsParams} from '@/lib/shared.types'
import {connectToDatabase} from '@/lib/mongoose'
import User from '@/lib/models/user.model'

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