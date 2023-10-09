import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (createdAt: Date) => {
  const now = new Date()
  const createdAtTimestamp = createdAt.getTime() // Get the timestamp of createdAt

  const timeDifference = now.getTime() - createdAtTimestamp

  const minute = 60 * 1000 // 1 minute in milliseconds
  const hour = 60 * minute // 1 hour in milliseconds
  const day = 24 * hour // 1 day in milliseconds
  const week = 7 * day // 1 week in milliseconds

  if (timeDifference < minute) {
    const secondsAgo = Math.floor(timeDifference / 1000)
    return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute)
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour)
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day)
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`
  } else {
    const weeksAgo = Math.floor(timeDifference / week)
    return `${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`
  }
}

export const formatBigNumber = (num: number): string => {
  if (num >= 1000000) {
    const millionValue = (num / 1000000).toFixed(1)
    return millionValue + 'M'
  } else if (num >= 1000) {
    const thousandValue = (num / 1000).toFixed(1)
    return thousandValue + 'K'
  } else {
    return num.toString()
  }
}


