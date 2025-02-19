'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { formatBigNumber } from '@/lib/utils'
import { downVoteAnswer, downvoteQuestion, upVoteAnswer, upvoteQuestion } from '@/lib/actions/vote.action'
import { usePathname, useRouter } from 'next/navigation'
import { toggleSaveQuestion } from '@/lib/actions/question.action'
import { viewQuestion } from '@/lib/actions/interaction.action'

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
  const router = useRouter()

  const handleVote = async (action: string) => {
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

  const handleSave = async () => {
    // Implement logic to toggle the save state on the server
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path
    })
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined
    })

    router.refresh()
  }, [itemId, userId, path, router])

  return (
    <div className="flex gap-4">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image src={hasUpVoted ? '/icons/upvoted.svg' : '/icons/upvote.svg'} alt="upvote" width={18}
            height={18} className="cursor-pointer"
            onClick={() => handleVote('upVote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-xs p-1">
            <p className="subtle-medium text-dark400_light900">{formatBigNumber(upVotes)}</p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image src={hasDownVoted ? '/icons/downvoted.svg' : '/icons/downvote.svg'} alt="downvote"
            width={18}
            height={18} className="cursor-pointer"
            onClick={() => handleVote('downVote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-xs p-1">
            <p className="subtle-medium text-dark400_light900">{formatBigNumber(downVotes)}</p>
          </div>
        </div>
      </div>

      {type === 'question' && (
        <Image src={hasSaved ? '/icons/star-filled.svg' : '/icons/star-red.svg'} alt="save"
          width={18}
          height={18} className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )}
    </div>
  )
}

export default Votes
