'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
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
import { SignUpValidation } from "@/lib/validation"
import Loading from "@/components/Loading"
import { createUserAccount } from '@/lib/appwrite/api'
import { useState } from 'react'

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    setIsLoading(true)
    await createUserAccount(values)
    setIsLoading(false)
    router.push('/sign-in')
  }
  return (
    <div className="flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="sm:w-420 flex justify-center items-center flex-col py-10">
          <Form {...form}>
            <div className=" flex-center flex-col">
              <img src="/assets/vercel.svg" alt="logo" />
              <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
              <p className="text-light-3 small-medium md:base-regular">To use Faitch enter your details</p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                isLoading ? <Loading text="Loading..." /> : "Sign up"
              }</Button>
            </form>
            <p className="small-regular text-light-2 text-center mt-2">
              Already have an account? <Link href="/sign-in" className="text-primary-500 small-semibold ml-1">Log in</Link>
            </p>
          </Form>
        </div>
      </div>
      <div className="relative hidden xl:block h-screen w-1/2">
        <Image src="/assets/sign-in-bg.jpg" fill alt="" className="object-cover bg-no-repeat" />
      </div>
    </div>
  );
}
