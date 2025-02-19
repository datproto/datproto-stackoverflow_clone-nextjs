import React from 'react'
import Link from 'next/link'
import Metric from '@/components/shared/Metric'
import { formatBigNumber, getTimeStamp } from '@/lib/utils'

interface IQuestionCard {
  _id: string
  clerkId?: string | null
  author: {
    _id: string,
    name: string
    picture: string
  }
  question: {
    _id: string
    title: string
  }
  upVotes: Array<Object>
  createdAt: Date
}

const AnswerCard = ({
  _id,
  clerkId,
  author,
  question,
  upVotes,
  createdAt
}: IQuestionCard) => {

  return (
    <div className="card-wrapper shadow-light100_dark100 light-border rounded-[10px] border p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span
            className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">{getTimeStamp(createdAt)}</span>
          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="User"
          value={author.name}
          title={`- ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/icons/like.svg"
          alt="Upvotes"
          value={formatBigNumber(upVotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  )
}

export default AnswerCard