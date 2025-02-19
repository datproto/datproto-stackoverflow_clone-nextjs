import React from 'react'
import QuestionForm from '@/components/molecules/forms/QuestionForm'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

const Page = async () => {
  const session = await auth()

  if (!session) redirect('/sign-in')

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </div>
  )
}

export default Page