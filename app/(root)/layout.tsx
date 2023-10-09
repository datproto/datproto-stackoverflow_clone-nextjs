import React from 'react'
import Navbar from '@/components/shared/navbar/Navbar'
import {LeftSidebar, RightSideBar} from '@/components/shared/sidebar/Sidebar'

const Layout = ({children}: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar/>

      <div className="flex">
        <LeftSidebar/>

        <section className="flex flex-1 flex-col gap-10 px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 lg:gap-10">
          {children}
        </section>

        <RightSideBar/>
      </div>
    </main>
  )
}

export default Layout