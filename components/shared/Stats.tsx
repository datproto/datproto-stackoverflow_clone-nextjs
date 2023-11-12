import React from 'react'
import StatisticCard from '@/components/cards/StatisticCard'

interface IUserStats {
  totalQuestions: number
  totalAnswers: number
}

const UserStats = ({totalAnswers, totalQuestions}: IUserStats) => {
  return (
    <div className='mt-10'>
      <h3 className='h3-semibold text-dark200_light900'>Stats</h3>

      <div className='mt-5 grid w-full grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4'>

        <StatisticCard stats={[
          {
            index: totalQuestions,
            label: 'questions'
          },
          {
            index: totalAnswers,
            label: 'answers'
          }
        ]} />

        <StatisticCard
          icon={{name: 'gold-medal', width: 40, height: 54}}
          stats={[
            {
              index: 15,
              label: 'gold badges'
            }
          ]}
        />

        <StatisticCard
          icon={{name: 'silver-medal', width: 39, height: 51}}
          stats={[
            {
              index: 23,
              label: 'silver badges'
            }
          ]}
        />

        <StatisticCard
          icon={{name: 'bronze-medal', width: 39, height: 51}}
          stats={[
            {
              index: 38,
              label: 'bronze badges'
            }
          ]}
        />
      </div>
    </div>
  )
}

export default UserStats