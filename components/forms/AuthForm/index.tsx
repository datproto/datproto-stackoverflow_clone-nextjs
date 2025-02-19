"use client"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  Path,
} from "react-hook-form"
import { Form, FormLabel } from "@/components/ui/form"
import { ZodType } from "zod"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { AUTH_FIELD_NAMES, AUTH_FIELD_PLACEHOLDER, AUTH_FIELD_TYPES } from "@/constants"
import Link from "next/link"
import ROUTES from "@/constants/routes"
import { ActionResponse } from "@/types"

interface IAuthForm<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP"
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<ActionResponse>
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: IAuthForm<T>) => {
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;
    if (result.success) {
      toast.success("Success", {
        description: "You have successfully signed in",
      })

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, {
        description: typeof result.error === 'string' ? result.error : result.error?.message ?? "An error occurred",
      });
    }
  };

  return (
    <Form
      {...form}
    >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel className="paragraph-regular text-dark400_light700">
                    {AUTH_FIELD_NAMES[field.name as keyof typeof AUTH_FIELD_NAMES].charAt(0).toUpperCase() + field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        AUTH_FIELD_TYPES[field.name as keyof typeof AUTH_FIELD_TYPES]
                      }
                      placeholder={AUTH_FIELD_PLACEHOLDER[field.name as keyof typeof AUTH_FIELD_PLACEHOLDER]}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        ))}

        <Button
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          size='lg'
          disabled={form.formState.isSubmitting}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>

        {
          type === "SIGN_IN"
            ? <p>Do not have account yet?{" "} <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">Sign Up</Link></p>
            : <p>Already have an account?{" "} <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">Sign In</Link></p>
        }
      </form>
    </Form>
  )
}

export default AuthForm