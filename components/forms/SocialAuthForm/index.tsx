'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constants/routes"
import Image from "next/image"
import { toast } from "sonner"

const SocialAuthForm = () => {
  const buttonClass = "background-light900_dark400 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5"

  const handleSignIn = async (provider: 'github' | 'google') => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false
      })
    } catch (error) {
      console.error(error)
      toast.error('Error', {
        description: 'An error occurred while signing in. Please try again.',
      })
    }
  }

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn('github')}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>
          Login with Github
        </span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn('google')}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>
          Login with Google
        </span>
      </Button>
    </div>
  )
}

export default SocialAuthForm
