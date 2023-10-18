'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import {formatBigNumber} from '@/lib/utils'
import {downVoteAnswer, downvoteQuestion, upVoteAnswer, upvoteQuestion} from '@/lib/actions/vote.action'
import {usePathname} from 'next/navigation'

interface VoteProps {
  type: 'question' | 'answer';
  itemId: string;
  userId: string;
  upVotes: number;
  downVotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes: React.FC<VoteProps> = ({
                                      type,
                                      itemId,
                                      userId,
                                      upVotes,
                                      downVotes,
                                      hasUpVoted,
                                      hasDownVoted,
                                      hasSaved
                                    }) => {
  const path = usePathname()
  const [isUpVoted, setIsUpVoted] = useState(hasUpVoted)
  const [isDownVoted, setIsDownVoted] = useState(hasDownVoted)

  const handleVote = async (action: string) => {
    if (isDownVoted) {
      setIsDownVoted(false)
      // Implement logic to update the downvote on the server
    }

    setIsUpVoted(!isUpVoted)
    // Implement logic to update the upvote on the server
    if (action === 'upVote') {
      if (type === 'question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path
        })
      } else if (type === 'answer') {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path
        })
      }

      // TODO: Show a toast
    }

    if (action === 'downVote') {
      if (type === 'question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path
        })
      } else if (type === 'answer') {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path
        })
      }

      // TODO: Show a toast
    }
  }

  const handleSave = () => {
    // Implement logic to toggle the save state on the server
  }

  return (
    <div className="flex gap-4">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image src={hasUpVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'} alt="upvote" width={18}
                 height={18} className="cursor-pointer"
                 onClick={() => handleVote('upVote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{formatBigNumber(upVotes)}</p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image src={hasDownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'} alt="downvote"
                 width={18}
                 height={18} className="cursor-pointer"
                 onClick={() => handleVote('downVote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{formatBigNumber(downVotes)}</p>
          </div>
        </div>
      </div>

      {type === 'question' && (
        <Image src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'} alt="downvote"
               width={18}
               height={18} className="cursor-pointer"
               onClick={handleSave}
        />
      )}
    </div>
  )
}

export default Votes
