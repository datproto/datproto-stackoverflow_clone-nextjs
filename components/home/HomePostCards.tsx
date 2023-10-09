import React from 'react'
import CustomCard from '@/components/shared/CustomCard'
import Image from 'next/image'

const HomePostCards = () => {
  return (
    <div id="post-cards">
      <CustomCard
        information={{
          title: 'The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this'
        }}
      >
        <div className="flex items-center gap-1">
          <div className="relative h-5 w-5">
            <Image src="https://i.pravatar.cc/300" alt="avatar" fill priority
                   className="rounded-full object-cover"/>
          </div>

          <p className="body-medium text-dark400_light800 leading-none">Dat Proto</p>

          <p className="small-regular text-dark400_light800 leading-none">• asked 2 min ago</p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-0.5">
            <Image src="/assets/icons/like.svg" alt="like-icon" width={14} height={14}/>
            <p className="small-regular text-dark400_light800 leading-none">
              <span className="small-medium leading-none">1.2k</span> Votes
            </p>
          </div>
          <div className="flex items-center gap-0.5">
            <Image src="/assets/icons/message.svg" alt="like-icon" width={14} height={14}/>
            <p className="small-regular text-dark400_light800 leading-none">
              <span className="small-medium leading-none">900</span> Answers
            </p>
          </div>
          <div className="flex items-center gap-0.5">
            <Image src="/assets/icons/eye.svg" alt="like-icon" width={14} height={14}/>
            <p className="small-regular text-dark400_light800 leading-none">
              <span className="small-medium leading-none">5.2k</span> Views
            </p>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

export default HomePostCards