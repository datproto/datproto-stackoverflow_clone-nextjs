'use server'

import {connectToDatabase} from '@/lib/mongoose'

export async function createQuestion(params: any) {
  try {
    // Connect to DB
    await connectToDatabase()
  } catch (e) {

  }
}