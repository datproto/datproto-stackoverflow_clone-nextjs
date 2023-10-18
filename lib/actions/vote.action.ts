'use server'

import {connectToDatabase} from '@/lib/mongoose'
import {AnswerVoteParams, QuestionVoteParams} from '@/lib/shared.types'
import Question from '@/lib/models/question.model'
import {revalidatePath} from 'next/cache'
import Answer from '@/lib/models/answer.model'

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase()

    const {questionId, userId, hasUpVoted, hasDownVoted, path} = params

    let updateQuery = {}

    if (hasUpVoted) {
      updateQuery = {$pull: {upVotes: userId}}
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: {downVotes: userId},
        $push: {upVotes: userId}
      }
    } else {
      updateQuery = {$addToSet: {upVotes: userId}}
    }

    const question = await Question.findByIdAndUpdate(
      questionId,
      updateQuery,
      {new: true}
    )

    if (!question) {
      throw new Error('Cannot find the question')
    }

    // Increment Author's reputation

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase()

    const {questionId, userId, hasUpVoted, hasDownVoted, path} = params

    let updateQuery = {}

    if (hasDownVoted) {
      updateQuery = {$pull: {downVotes: userId}}
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: {upVotes: userId},
        $push: {downVotes: userId}
      }
    } else {
      updateQuery = {$addToSet: {downVotes: userId}}
    }

    const question = await Question.findByIdAndUpdate(
      questionId,
      updateQuery,
      {new: true}
    )

    if (!question) {
      throw new Error('Cannot find the question')
    }

    // Increment Author's reputation

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase()

    const {answerId, userId, hasUpVoted, hasDownVoted, path} = params

    let updateQuery = {}

    if (hasUpVoted) {
      updateQuery = {$pull: {upVotes: userId}}
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: {downVotes: userId},
        $push: {upVotes: userId}
      }
    } else {
      updateQuery = {$addToSet: {upVotes: userId}}
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      {new: true}
    )

    if (!answer) {
      throw new Error('Cannot find the answer')
    }

    // Increment Author's reputation

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase()

    const {answerId, userId, hasUpVoted, hasDownVoted, path} = params

    let updateQuery = {}

    if (hasDownVoted) {
      updateQuery = {$pull: {downVotes: userId}}
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: {upVotes: userId},
        $push: {downVotes: userId}
      }
    } else {
      updateQuery = {$addToSet: {downVotes: userId}}
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      {new: true}
    )

    if (!answer) {
      throw new Error('Cannot find the answer')
    }

    // Increment Author's reputation

    revalidatePath(path)
  } catch (e) {
    console.log(e)
    throw e
  }
}