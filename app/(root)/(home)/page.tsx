import Link from 'next/link'
import {Button} from '@/components/ui/button'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import Tag from '@/components/shared/Tag'
import {filters} from '@/constants'

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 lg:flex-col">
        <LocalSearchbar
          route="/"
          placeholder="Search for questions..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
        />

        <div className="flex gap-3 max-lg:hidden">
          {filters.map(filter => (
            <Tag key={`filter-${filter._id}}`} text={filter.name}
                 customClass="px-6 py-3 capitalize body-medium hover:!bg-primary-100 dark:hover:!bg-dark-300"/>
          ))}
        </div>
      </div>
    </>
  )
}