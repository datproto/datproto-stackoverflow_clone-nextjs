import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import NavContent from './NavContent'
import { auth } from '@/auth'

const MobileNav = async () => {
  const session = await auth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/icons/hamburger.svg" alt="menu" width={36} height={36}
          className="invert-colors sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <Link href="/" className="flex items-center sm:px-12">
          <Image src="/images/site-logo.svg" height={23} width={23} alt="StackOverflow"
            className="flex items-center gap-1" />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk dark:text-light-500">Stack <span
            className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <NavContent
              userId={session?.user?._id || ''}
            />
          </SheetClose>

          <div className="flex flex-col gap-3">
            (!session) ? (
            <>
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className="small-medium light-border-2 text-dark400_light900 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </>
            ) : (
            <SheetClose asChild>
              <Button
                className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                Sign Out
              </Button>
            </SheetClose>
            )
          </div>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default MobileNav