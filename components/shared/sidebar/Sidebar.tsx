import React from 'react'
import { popularTags, questions } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Tag from '@/components/shared/Tag'
import NavContent from '../navbar/NavContent'
import { LogOut } from 'lucide-react'
import { auth, signOut } from '@/auth'
import ROUTES from '@/constants/routes'

const LeftSidebar = async () => {
  const session = await auth()
  const userId = session?.user?.id;

  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col gap-6">
        <NavContent
          userId={userId}
        />
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        {!session ? (
          <>
            <Button
              className="small-medium text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none"
              asChild
            >
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  src="/icons/account.svg"
                  alt="sign-in"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
                <p className="base-medium max-lg:hidden">Log in</p>
              </Link>
            </Button>

            <Button
              className="small-medium light-border-2 text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none"
              asChild
            >
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  src="/icons/sign-up.svg"
                  alt="sign-up"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
                <p className="base-medium max-lg:hidden">Sign Up</p>
              </Link>
            </Button>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signOut()
            }}
          >
            <Button
              type='submit'
              className="small-medium light-border-2 text-dark400_light900 flex min-h-[41px] w-full justify-start gap-4 rounded-lg px-4 py-3 shadow-none"
            >
              <LogOut />
              <p className="base-medium max-lg:hidden">Sign Out</p>
            </Button>
          </form>
        )}
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
            <Link href="/" key={`top-${ques.id}`} id={`right-sidebar_tags-list-${ques.id}`}
              className="flex-between text-dark500_light700 flex items-start gap-3">
              <div className="body-medium">{ques.title}</div>

              <Image src="/icons/chevron-right.svg" width={20} height={20} alt="right-icon"
                className="invert-colors self-start" />
            </Link>
          )) : (<></>)}
        </div>
      </div >

      <div id="right-sidebar_tags" className="flex flex - col gap - 6" >
        < h3 className="h3-bold text-dark200_light900 capitalize" > popular tags</h3 >
        <div id="right-sidebar_tags-list" className="flex flex - col gap - 4" >
          {
            popularTags.map(tag => (
              <Tag key={tag.id} _id={tag.id} text={tag.name} showCount totalQuestions={tag.totalQuestions} />
            ))
          }
        </div >
      </div >
    </section >
  )
}

export { LeftSidebar, RightSideBar }