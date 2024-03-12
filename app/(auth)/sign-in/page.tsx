'use client'

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
import { SignInValidation } from "@/lib/validation"
import Loading from "@/components/Loading"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { account } from "@/lib/appwrite"
import Logo from "@/components/Logo"
import { useUser } from "@/components/UserContext"

export default function SignIn() {
  const { login } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    setIsLoading(true)
    await login(values.email, values.password);
    router.push("/")
    setIsLoading(false)
  }
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center">
        <div className="sm:w-420 flex justify-center items-center flex-col py-10">
          <Form {...form}>
            <div className=" flex-center flex-col">
              <Logo />
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
              <Button type="submit" variant="primary">{
                isLoading ? <Loading text="Loading..." /> : "Log In"
              }</Button>
            </form>
            <p className="small-regular text-light-2 text-center mt-2">
              Don't have an account? <Link href="/sign-up" className="text-primary-500 small-semibold ml-1">Sign up</Link>
            </p>
          </Form>
        </div>
      </div>
      <div className="relative hidden xl:block h-screen w-1/2">
        <Image src="/assets/imgs/sign-in-bg.jpg" fill alt="" className="object-cover bg-no-repeat" />
      </div>
    </div>
  );
}
