import React from 'react'

import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import Tag from '@/components/shared/Tag'
import Image from 'next/image'


interface ICustomCard {
  information: {
    title: string
    description?: string
    position?: 'verti' | 'hori'
  }
  tags?: {
    _id: number,
    name: string,
    value: string
  }[]
  createdAt: string
  upVotes: number
  views: number
  answers: number
  actions?: {
    icon: string
    route: string
  }[]
  cardFooterClass?: string
  children?: React.ReactNode
}

const CustomCard = ({information, cardFooterClass, children}: ICustomCard) => {

  return (
    <Card className="background-light900_dark300 light-border-2">
      <CardHeader>
        <div className={`flex ${information.position ? 'flex-row gap-3' : 'flex-col gap-4'}`}>
          <div className="flex items-start gap-3">
            <CardTitle className="text-dark200_light900 h3-semibold">{information.title}</CardTitle>
            <div className="flex gap-3">
              <div className="relative h-[14px] w-[14px]">
                <Image src="/assets/icons/edit.svg" alt="edit-icon" fill priority/>
              </div>
              <div className="relative h-[14px] w-[14px]">
                <Image src="/assets/icons/trash.svg" alt="edit-icon" fill priority/>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Tag text="development"
                 customClass="background-light800_dark400 grow-0 rounded-lg uppercase subtle-medium py-0 px-6"/>
            <Tag text="react.js"
                 customClass="background-light800_dark400 grow-0 rounded-lg uppercase subtle-medium py-0 px-6"/>
            <Tag text="invalid fields"
                 customClass="background-light800_dark400 grow-0 rounded-lg uppercase subtle-medium py-0 px-6"/>
            <Tag text="salesforce"
                 customClass="background-light800_dark400 grow-0 rounded-lg uppercase subtle-medium py-0 px-6"/>
          </div>
        </div>
        {information.description && (
          <CardDescription className="text-dark500_light700">{information.description}</CardDescription>
        )}
      </CardHeader>
      {children && (
        <CardFooter className={`flex-between flex ${cardFooterClass}`}>
          {children}
        </CardFooter>
      )}
    </Card>
  )
}

export default CustomCard