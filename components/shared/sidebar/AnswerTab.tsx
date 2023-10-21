import React from 'react'
import {SearchParamsProps} from '@/types'
import {getAnswersByUser} from '@/lib/actions/answer.action'
import AnswerCard from '@/components/cards/AnswerCard'

interface IAnswerTab extends SearchParamsProps{
  userId: string
  clerkId?: string | null
  searchProps?: string
}

const AnswerTab = async ({searchProps, userId, clerkId}: IAnswerTab) => {
  const result = await getAnswersByUser({
    userId,
    page: 1
  })

  return (
    <>
      {result.answers.map(a => (
        <AnswerCard
          key={a._id}
          _id={a._id}
          clerkId={clerkId}
          author={a.author}
          question={a.question}
          upVotes={a.upVotes}
          createdAt={a.createdAt}
        />
      ))
      }
    </>
  )
}

export default AnswerTab