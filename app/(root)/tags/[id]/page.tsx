import React from 'react'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import FilterDropdown from '@/components/shared/filter/FilterDropdown'
import { QuestionFilters } from '@/constants/filter'
import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'
import { getQuestionsByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q
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
            key={q._id}
            _id={q._id}
            title={q.title}
            tags={q.tags}
            author={q.author}
            upVotes={q.upVotes}
            views={q.views}
            answers={q.answers}
            createdAt={q.createdAt}
          />
        )
        ) : (
          <NoResult
            title="There's no tag question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  )
}

export default Page