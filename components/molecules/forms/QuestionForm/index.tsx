'use client'

import React, { useRef, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { createQuestion } from '@/lib/actions/question.action'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import ROUTES from '@/constants/routes'
import { AskQuestionSchema } from '@/lib/validation'
import { ReloadIcon } from '@radix-ui/react-icons'
import TagCard from '@/components/cards/TagCard'

const type: string = 'create'

interface Params {
  question?: Question;
}

const Editor = dynamic(() => import('@/components/molecules/Editor'), {
  // Make sure we turn SSR off
  ssr: false
})

const QuestionForm = ({ question }: Params) => {
  const editorRef = useRef(null)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // 1. Define your form.
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Success", {
          description: "Question created successfully",
        });

        // if (result.data) router.push(ROUTES.QUESTION(result.data._id));
        if (result.data) {
          toast.success("Succcess", {
            description: `Successfully create question ${result.data._id}`
          })
        }
      } else {
        if ('status' in result) {
          toast.error(`Error ${result.status}`, {
            description: result.error?.message || "Something went wrong",
          });
        } else {
          toast.error("Error", {
            description: "Something went wrong",
          });
        }
      }
    });
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  // @ts-ignore
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">Question Title <span
                className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another person.
              </FormDescription>
              <FormMessage
                className="text-red-500"
              />
            </FormItem>
          )}
        />
        {/* 2. Content field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">Detailed explanation of your problem <span
                className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Editor value={field.value} editorRef={editorRef} fieldChange={field.onChange} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
              </FormDescription>
              <FormMessage
                className="text-red-500"
              />
            </FormItem>
          )}
        />
        {/* 2. Tags field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Tags <span
                className="text-primary-500">*</span></FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage
                className="text-red-500"
              />
            </FormItem>
          )}
        />
        <Button type="submit" className="primary-gradient w-fit text-light-900!" disabled={isPending}>
          {isPending ? <><ReloadIcon className='mr-2 size-4 animate-spin' /><span>Submitting</span></> : 'Ask a Question'}
        </Button>
      </form>
    </Form>
  )
}

export default QuestionForm