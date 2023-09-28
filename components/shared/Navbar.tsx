import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {SignedIn, UserButton} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav
      className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center sm:px-12">
        <Image src="/assets/images/site-logo.svg" height={23} width={23} alt="DevFlow"
               className="flex items-center gap-1"/>
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-500 max-sm:hidden">Dev <span
          className="text-primary-500">Overflow</span>
        </p>
      </Link>

      Global Search

      <div className="flex-between gap-5">
        Theme

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#ff7000'
              }
            }}
          />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar