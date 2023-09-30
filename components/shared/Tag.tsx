import React from 'react'
import {Button} from '@/components/ui/button'

interface ITags {
  text: string
  customClass?: string

}

const Tag = ({text, customClass}: ITags) => {
  return (
    <Button
      className={`bg-light-800 text-light-500 dark:bg-dark-300 ${customClass}`}
      onClick={() => {
      }}
    >{text}
    </Button>
  )
}

export default Tag