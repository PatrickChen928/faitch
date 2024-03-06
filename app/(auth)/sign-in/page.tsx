'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation } from "@/lib/validation"
import Loading from "@/components/shared/Loading"

export default function SignIn() {
  const isLoading = true
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="sm:w-420 flex justify-center items-center flex-col py-10">
          <Form {...form}>
            <div className=" flex-center flex-col">
              <img src="/assets/vercel.svg" alt="logo" />
              <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Welcome to Faitch!</h2>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="shad-button_primary">{
                isLoading ? <Loading text="Loading..." /> : "Sign In"
              }</Button>
            </form>
          </Form>
        </div>
      </div>
      <img src="/assets/sign-in-bg.jpg" alt="" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
    </div>
  );
}
