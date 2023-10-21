import React from 'react'
import {SearchParamsProps} from '@/types'
import {getQuestionsByUser} from '@/lib/actions/question.action'
import QuestionCard from '@/components/cards/QuestionCard'

interface IQuestionTab extends SearchParamsProps{
  userId: string
  clerkId?: string | null
  searchProps?: string
}

const QuestionTab = async ({searchProps, userId, clerkId}: IQuestionTab) => {
  const result = await getQuestionsByUser({
    userId,
    page: 1
  })

  return (
    <>
      {result.questions.map(q => (
        <QuestionCard
          key={q._id}
          _id={q._id}
          clerkId={clerkId}
          title={q.title}
          tags={q.tags}
          author={q.author}
          upVotes={q.upVotes}
          views={q.views}
          answers={q.answers}
          createdAt={q.createdAt}
        />
      ))
      }
    </>
  )
}

export default QuestionTab