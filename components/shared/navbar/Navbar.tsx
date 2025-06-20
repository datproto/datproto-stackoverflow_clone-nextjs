import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Theme from '@/components/shared/navbar/Theme'
import MobileNav from '@/components/shared/navbar/MobileNav'
import GlobalSearch from '@/components/shared/search/GlobalSearch'

const Navbar = () => {
  return (
    <nav
      className="flex-between background-light900_dark200 light-border fixed z-50 w-full gap-5 border-b p-6 shadow-light-300 dark:shadow-none sm:px-12 sm:pl-8">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" height={23} width={23} alt="StackOverflow" />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-500 max-sm:hidden">Stack <span
          className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar