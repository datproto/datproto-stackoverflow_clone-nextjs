import React from 'react'
import Image from 'next/image'

interface IStatisticCard {
  stats: {
    index: number
    label: string
  }[]
  icon?: {
    name: string
    width: number
    height: number
    alt?: string
  }
}

const StatisticCard = ({stats, icon}: IStatisticCard) => {
  return (
    <div className='light-border background-light900_dark300 flex items-center justify-center gap-3.5 rounded-md border px-6 py-5'>
      {icon && (
        <Image
          src={`/assets/icons/${icon.name}.svg`}
          alt={icon.alt || 'icon'}
          className='object-cover'
          width={icon.width}
          height={icon.height}
        />
      )}
      <div className={`flex flex-1 ${stats.length > 1 ? 'justify-center' : 'justify-start'} gap-10`}>
        {stats.map(stat => (
          <div key={stat.label} className='flex flex-col items-start'>
            <div className='text-dark200_light900 paragraph-semibold'>{stat.index}</div>
            <div className='text-dark400_light700 body-regular capitalize'>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticCard