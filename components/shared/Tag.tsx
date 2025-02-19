import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface ITags {
  _id: string
  text: string
  totalQuestions?: number
  showCount?: boolean
  customClass?: string
}

const Tag = ({ _id, text, showCount, totalQuestions, customClass }: ITags) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase shadow-sm">
        {text}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">
          {totalQuestions}
        </p>
      )}
    </Link>
  )
}

export default Tag