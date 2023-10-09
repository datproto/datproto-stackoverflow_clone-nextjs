'use client'

import React from 'react'
import {sidebarLinks} from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {SignedIn, SignedOut} from '@clerk/nextjs'
import {Button} from '@/components/ui/button'

const LeftSidebar = () => {
  const pathname = usePathname()
  return (
    <section
      className="background-light900_dark200 light-border fixed top-0 z-40 flex h-screen min-w-[266px] flex-col justify-between border-r px-6 pb-8 pt-40 max-sm:hidden">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map(item => {

          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route
          return (
            <Link key={item.label} href={item.route}
                  className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}>
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</p>
            </Link>
          )
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in" className="flex items-center">
            <Button
              className="small-medium text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="sign-in"
                width={20}
                height={20}
                className="invert-colors"
              />
              <p className="base-medium">Log in</p>
            </Button>
          </Link>

          <Link href="/sign-up" className="flex items-center">
            <Button
              className="small-medium light-border-2 text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign-up"
                width={20}
                height={20}
                className="invert-colors"
              />
              <p className="base-medium">Sign Up</p>
            </Button>
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col gap-3">
          <Link href="/sign-out">
            <Button
              className="small-medium text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-out.svg"
                alt="sign-in"
                width={20}
                height={20}
                className="invert-colors"
              />
              <p className="base-medium">Logout</p>
            </Button>
          </Link>
        </div>
      </SignedIn>
    </section>
  )
}

const RightSideBar = () => {
  return (
    <section
      className="background-light900_dark200 light-border fixed right-0 top-0 z-40 flex h-screen w-[266px] flex-col justify-between border-r px-6 pb-8 pt-40 max-lg:hidden">
      Right Side Bar
    </section>
  )
}

export {LeftSidebar, RightSideBar}