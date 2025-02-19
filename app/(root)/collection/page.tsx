import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import FilterDropdown from '@/components/shared/filter/FilterDropdown'
import { QuestionFilters } from '@/constants/filter'
import React from 'react'
import NoResult from '@/components/shared/NoResult'
import QuestionCard from '@/components/cards/QuestionCard'
import { getSavedQuestions } from '@/lib/actions/question.action'
import { auth } from '@/auth'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) return null

  const result = await getSavedQuestions({
    clerkId: userId
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="flex justify-between gap-5">
        <LocalSearchbar
          route="/"
          placeholder="Search for questions..."
          iconPosition="left"
          imgSrc="/icons/search.svg"
        />

        <FilterDropdown
          filters={QuestionFilters}
          customSelectClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Looping through questions */}
        {result.questions.length > 0 ? result.questions.map((q: any) => (
          <QuestionCard
            key={JSON.stringify(q._id)}
            _id={JSON.stringify(q._id)}
            title={q.title}
            tags={q.tags}
            author={q.author}
            upVotes={q.upVotes}
            views={q.views}
            answers={q.answers}
            createdAt={q.createdAt}
          />
        )) : (
          <NoResult
            title="There's no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  )
}