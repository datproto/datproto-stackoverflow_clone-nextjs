'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface ILocalSearchbar {
  iconPosition: string
  imgSrc: string
  placeholder: string
  customClass?: string
}

const LocalSearchbar = ({ iconPosition, imgSrc, placeholder, customClass }: ILocalSearchbar) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  return (
    <div
      className="light-border-2 background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl border px-4">
      {iconPosition === 'left' && (
        <Image src={imgSrc} alt="search" width={24} height={24} className="cursor-pointer" />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={`paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-hidden ${customClass}`}
      />
    </div>
  )
}

export default LocalSearchbar