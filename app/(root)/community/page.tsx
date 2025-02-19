import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { UserFilters } from '@/constants/filter'
import FilterDropdown from '@/components/shared/filter/FilterDropdown'
import { getAllUsers } from '@/lib/actions/user.action'
import UserCard from '@/components/cards/UserCard'
import NoResult from '@/components/shared/NoResult'

const Page = async () => {
  const result = await getAllUsers({})

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Community</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900!">
            Ask a question
          </Button>
        </Link>
      </div>

      <div className="flex justify-between gap-5">
        <LocalSearchbar
          route="/community"
          placeholder="Search for amazing minds"
          iconPosition="left"
          imgSrc="/icons/search.svg"
          customClass="flex-1"
        />

        <FilterDropdown
          filters={UserFilters}
          customContainerClasses="flex"
          customSelectClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map(u => (
            <UserCard key={u._id} user={u} />
          ))
        ) : (
          <NoResult title="No Users Found" description="It looks like there are no users found." link="/sign-up"
            linkTitle="Join to be the first!" />
        )}
      </section>

    </>
  )
}

export default Page