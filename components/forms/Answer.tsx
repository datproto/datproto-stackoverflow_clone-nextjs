'use client'

import React, { useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AnswerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/navigation'

interface IAnswer {
  question: string
  questionId: string
  authorId: string
}

const Answer = ({ question, questionId, authorId }: IAnswer) => {
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setTheme } = useTheme()

  const editorRef = useRef(null)

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: ''
    }
  })

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true)

    try {
      await createAnswer({
        content: values.content,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname
      })

      form.reset()

      if (editorRef.current) {
        const editor = editorRef.current as any

        editor.setContent('')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={() => {
          }}
        >
          <Image src="/icons/stars.svg" alt="Stars Icon" width={12} height={12} className="object-contain" />
          Generate an AI answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                </FormControl>
                <FormMessage
                  className="text-red-500"
                />
              </FormItem>
            )}
          />

          <div
            className="flex justify-end"
          >
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting ...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer