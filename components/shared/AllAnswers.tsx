import React from 'react'
import {AnswerFilters} from '@/constants/filter'
import FilterDropdown from '@/components/shared/filter/FilterDropdown'
import {getAnswers} from '@/lib/actions/answer.action'
import Link from 'next/link'
import Image from 'next/image'
import {getTimeStamp} from '@/lib/utils'
import ParseHTML from '@/components/shared/ParseHTML'
import Votes from '@/components/shared/Votes'

interface IAllAnswers {
  questionId: string
  userId: string
  totalAnswers: number
  page?: number
  filter?: number
}

const AllAnswers = async ({questionId, userId, totalAnswers, page, filter}: IAllAnswers) => {
  const result = await getAnswers({questionId})

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <FilterDropdown
          filters={AnswerFilters}
        />
      </div>

      <div>
        {result.answers.map(a => (
          <article key={a._id} className="light-border border-b py-10">
            <div className="mb-8 flex items-center justify-between">
              <div
                className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link href={`/profile/${a.author.clerkId}`} className="flex flex-1 items-start gap-1 sm:items-center">
                  <Image src={a.author.picture} alt="profile" className="rounded-full object-cover max-sm:mt-0.5"
                         width={18} height={18}/>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">{a.author.name}</p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      {' '} answered {' '} at {getTimeStamp(a.createdAt)}
                    </p>
                  </div>
                </Link>
              </div>

              <div className="flex justify-end">
                <Votes
                  type="answer"
                  itemId={JSON.stringify(a._id)}
                  userId={JSON.stringify(userId)}
                  upVotes={a.upVotes.length}
                  hasUpVoted={a.upVotes.includes(userId)}
                  downVotes={a.downVotes.length}
                  hasDownVoted={a.downVotes.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML data={a.content}/>
          </article>
        ))}
      </div>
    </div>
  )
}

export default AllAnswers