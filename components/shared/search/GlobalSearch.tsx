'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

const GlobalSearch = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image src="/icons/search.svg" alt="search" width={24} height={24} className="cursor-pointer" />

        <Input
          type="text"
          placeholder="Search globally"
          value={inputValue}
          onChange={handleChange}
          className="paragraph-regular no-focus placeholder text-dark400_light900 background-light800_darkgradient border-none shadow-none outline-hidden"
        />
      </div>

    </div>
  )
}

export default GlobalSearch