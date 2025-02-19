import React from 'react'
import { URLProps } from '@/types'
import { getUserInfo } from '@/lib/actions/user.action'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getJoinedDate } from '@/lib/utils'
import ProfileLink from '@/components/shared/ProfileLink'
import UserStats from '@/components/shared/Stats'
import QuestionTab from '@/components/shared/QuestionTab'
import AnswerTab from '@/components/shared/AnswerTab'

const Page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ userId: params.id })

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt='Profile Picture'
            width={140}
            height={140}
            className='rounded-full object-cover'
          />

          <div className="mt-3">
            <h2 className='h2-bold text-dark100_light900'>{userInfo.user.name}</h2>
            <p className='paragraph-regular text-dark200_light800'>@{userInfo.user.username}</p>

            <div className="mt-5 flex flex-wrap justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl='/icons/link.svg'
                  href={userInfo.user.portfolioWebsite}
                  title='Portfolio'
                />
              )}
              {userInfo.user.location && (
                <ProfileLink
                  imgUrl='/icons/location.svg'
                  title={userInfo.user.location}
                />
              )}
              <ProfileLink
                imgUrl='/icons/calendar.svg'
                title={getJoinedDate(userInfo.user.createdAt)}
              />

              {userInfo.user.bio && (
                <p className='paragraph-regular text-dark400_light800 mt-8'>
                  {userInfo.user.bio}
                </p>
              )}
            </div>
          </div>

        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
        </div>
      </div>

      <UserStats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger value="top-posts" className='tab'>Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className='tab'>Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className='flex flex-col gap-6'>
            <QuestionTab userId={userInfo.user._id} searchParams={searchParams} />
          </TabsContent>
          <TabsContent value="answers" className='flex flex-col gap-6'>
            <AnswerTab userId={userInfo.user._id} searchParams={searchParams} />
          </TabsContent>
        </Tabs>

      </div>
    </>
  )
}

export default Page