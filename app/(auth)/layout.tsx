import { auth } from '@/auth'
import SocialAuthForm from '@/components/forms/SocialAuthForm'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-auth-light dark:bg-auth-dark bg-cover bg-center bg-no-repeat px-4 py-10">
      <section className='light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8 text-dark300_light900'>
        <div className="flex items-center justify-center gap-2">
          <div className="space-y-2.5">
            <h1 className='h2-bold text-dark100_light900'>Join StackOverflow</h1>
            <p className="paragraph-regular text-dark500_light400">
              To get your questions answered, participate in the community and help others.
            </p>
          </div>
          <Image
            src="/images/site-logo.svg"
            alt="StackOverflow Logo"
            width={50}
            height={50}
          />
        </div>
        {children}

        <SocialAuthForm />
      </section>
    </main>
  )
}

export default Layout