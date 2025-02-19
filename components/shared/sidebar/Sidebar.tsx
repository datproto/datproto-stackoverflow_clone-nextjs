'use client'

import React from 'react'
import { popularTags, questions, sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Tag from '@/components/shared/Tag'

const LeftSidebar = () => {
  const pathname = usePathname()
  const { userId } = useAuth()

  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map(item => {

          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route
          if (item.route === '/profile') {
            if (userId) {
              item.route = `${item.route}/${userId}`
            } else {
              return null
            }
          }

          return (
            <Link href={item.route} key={item.label}
              className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}>
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{item.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <Link href="/sign-in" className="flex items-center">
          <Button
            className="small-medium text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/icons/account.svg"
              alt="sign-in"
              width={20}
              height={20}
              className="invert-colors"
            />
            <p className="base-medium max-lg:hidden">Log in</p>
          </Button>
        </Link>

        <Link href="/sign-up" className="flex items-center">
          <Button
            className="small-medium light-border-2 text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/icons/sign-up.svg"
              alt="sign-up"
              width={20}
              height={20}
              className="invert-colors"
            />
            <p className="base-medium max-lg:hidden">Sign Up</p>
          </Button>
        </Link>
      </div>
    </section>
  )
}

const RightSideBar = () => {
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-16 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">

      <div id="right-sidebard_hot" className="flex flex-col gap-6">
        <h3 className="h3-bold text-dark200_light900 capitalize">hot network</h3>
        <div id="right-sidebard_hot-list" className="flex flex-col gap-4">
          {questions.length > 0 ? questions.map(ques => ques.views >= 100 && (
            <Link href="/" key={`top-${ques._id}`} id={`right-sidebar_tags-list-${ques._id}`}
              className="flex-between text-dark500_light700 flex items-start gap-3">
              <div className="body-medium">{ques.title}</div>

              <Image src="/icons/chevron-right.svg" width={20} height={20} alt="right-icon"
                className="invert-colors self-start" />
            </Link>
          )) : (<></>)}
        </div>
      </div>

      <div id="right-sidebar_tags" className="flex flex-col gap-6">
        <h3 className="h3-bold text-dark200_light900 capitalize">popular tags</h3>
        <div id="right-sidebar_tags-list" className="flex flex-col gap-4">
          {popularTags.map(tag => (
            <Tag key={tag._id} _id={tag._id} text={tag.name} showCount totalQuestions={tag.totalQuestions} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { LeftSidebar, RightSideBar }