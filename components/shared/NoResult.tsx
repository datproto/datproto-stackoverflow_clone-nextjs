import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@/components/ui/button'

interface INoResult {
  title: string
  description: string
  link: string
  linkTitle: string
}

const NoResult = ({
                    title,
                    description,
                    link,
                    linkTitle
                  }: INoResult) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image src="/assets/images/light-illustration.png" alt="no result illustration"
             className="block object-contain dark:hidden" width={270} height={200}/>
      <Image src="/assets/images/dark-illustration.png" alt="no result illustration"
             className="hidden object-contain dark:flex" width={270} height={200}/>

      <h2 className="h2-bold text-dark200_light800 mt-8">{title}</h2>

      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">{description}</p>

      <Link href={link}>
        <Button
          className="paragraph-medium dark: mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 dark:text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  )
}

export default NoResult