import React from 'react'
import { getQuestionById } from '@/lib/actions/question.action'
import Link from 'next/link'
import Image from 'next/image'
import Metric from '@/components/shared/Metric'
import { formatBigNumber, getTimeStamp } from '@/lib/utils'
import ParseHTML from '@/components/shared/ParseHTML'
import Tag from '@/components/shared/Tag'
import Answer from '@/components/forms/Answer'
import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.action'
import AllAnswers from '@/components/shared/AllAnswers'
import Votes from '@/components/shared/Votes'
import { RouteParams } from '@/types'

const Page = async ({
  params
}: RouteParams) => {
  const { id } = await params
  const result = await getQuestionById({ questionId: id })

  const session = await auth()

  let mongoUser

  if (session) {
    mongoUser = await getUserById({
      _id: session?.user?.id as string
    })
  }

  const { question } = result

  return (
    <>
      <div
        className="flex-start w-full flex-col"
      >
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={`/profile/${question.author.clerkId}`} className="flex items-center justify-start gap-1">
            <Image src={question.author.picture} alt="Author avatar" width={22} height={22} className="rounded-full" />

            <p className="paragraph-semibold text-dark300_light700">{question.author.name}</p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser._id)}
              upVotes={question.upVotes.length}
              hasUpVoted={question.upVotes.includes(mongoUser._id)}
              downVotes={question.downVotes.length}
              hasDownVoted={question.downVotes.includes(mongoUser._id)}
              hasSaved={mongoUser.saved.includes(question._id)}
            />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="Clock"
          value={` asked ${getTimeStamp(question.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="Message"
          value={formatBigNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="Eye"
          value={formatBigNumber(question.views)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((t: any) => (
          <Tag
            key={t._id}
            _id={t._id}
            text={t.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={mongoUser._id}
        totalAnswers={question.answers.length}
      />

      <Answer
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  )
}

export default Page