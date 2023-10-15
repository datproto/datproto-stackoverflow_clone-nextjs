import React from 'react'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import {TagFilters} from '@/constants/filter'
import FilterDropdown from '@/components/shared/filter/FilterDropdown'
import {getAllTags} from '@/lib/actions/tag.action'
import TagCard from '@/components/cards/TagCard'
import NoResult from '@/components/shared/NoResult'

const Page = async () => {
  const result = await getAllTags({})

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>

      <div className="flex justify-between gap-5">
        <LocalSearchbar
          route="/tags"
          placeholder="Search by tag name..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          customClass="flex-1"
        />

        <FilterDropdown
          filters={TagFilters}
          customContainerClasses="flex"
          customSelectClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map(t => (
            <TagCard key={t._id} tag={t}/>
          ))
        ) : (
          <NoResult title="No Tags Found" description="It looks like there are no tags found." link="/ask-question"
                    linkTitle="Ask a question"/>
        )}
      </section>

    </>
  )
}

export default Page