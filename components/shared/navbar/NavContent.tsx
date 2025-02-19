'use client'

import React, { Fragment } from 'react'

import { SheetClose } from '@/components/ui/sheet'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavContent = (
  { userId, isMobileNav }: { userId?: string, isMobileNav?: boolean }
) => {
  const pathname = usePathname()

  return (
    <section className="flex h-full flex-col gap-3 md:gap-6 pt-16">
      {sidebarLinks.map(item => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        if (!userId && item.route === '/profile') {
          return null
        }

        const NavItem = (
          <Link href={item.route === '/profile' ? `/profile/${userId}` : item.route}
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

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {NavItem}
          </SheetClose>
        ) : (
          <Fragment key={item.route}>
            {NavItem}
          </Fragment>
        )
      })}
    </section>
  )
}

export default NavContent