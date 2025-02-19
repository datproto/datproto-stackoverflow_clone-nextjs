import React from 'react'
import Question from '@/components/forms/Question'
import { redirect } from 'next/navigation'
import { getUserByEmail, getUserById } from '@/lib/actions/user.action'
import { auth } from '@/auth'

const Page = async () => {
  const session = await auth()

  if (!session) redirect('/sign-in')

  const mongoUser = await getUserByEmail(
    session?.user?.email || ''
  )

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  )
}

export default Page