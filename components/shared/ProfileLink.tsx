import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface IProfileLink {
  imgUrl: string
  href?: string
  title: string
}

const ProfileLink = ({imgUrl, title, href}: IProfileLink) => {
  return (
    <div className='flex-center gap-1'>
      <Image src={imgUrl} alt='Icon' width={20} height={20} />

      {href ? (
        <Link href={href} target='_blank' className='paragraph-medium text-accent-blue'>
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">
          {title}
        </p>
      )}
    </div>
  )
}

export default ProfileLink