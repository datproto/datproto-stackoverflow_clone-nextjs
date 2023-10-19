import React from 'react'
import Link from 'next/link'

interface ITagCard {
  tag: {
    _id: string
    createdDate: string
    followers: {
      name: string
    }[]
    name: string
    questions: {
      _id: string
    }[]
  }
}

const TagCard = ({tag}: ITagCard) => {
  return (
    <Link href={`/tags/${tag._id}`} key={tag._id} className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article
        key={tag._id}
        className="background-light900_dark200 light-border flex w-full flex-col items-start justify-center gap-4 rounded-2xl border px-8 py-10">
        <div
          className="background-light800_dark400 w-fit rounded-md px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">
            {tag.name}
          </p>
        </div>

        <div className="small-regular text-dark500_light700">
          {/* Description */}
        </div>

        <p className="small-medium text-dark400_light500 flex items-center gap-2">
                  <span
                    className="body-semibold primary-text-gradient text-xs">{tag.questions.length}+</span> Question{tag.questions.length > 1 ? 's' : ''}
        </p>
      </article>
    </Link>
  )
}

export default TagCard