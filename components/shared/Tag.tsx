import React from 'react'
import {Button} from '@/components/ui/button'

interface ITags {
  text: string
  customClass?: string
}

const Tag = ({text, customClass}: ITags) => {
  return (
    <Button
      className={`tab rounded-md ${customClass}`}>{text}
    </Button>
  )
}

export default Tag