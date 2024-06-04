'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/actions/user.actions'
import { formSchema } from '@/lib/utils'
import CustomInput from '../CustomInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'





const UsersForm = ({ type }: { type: string }) => {

  const router = useRouter()


  const authformSchema = formSchema('sign in')

  const form = useForm<z.infer<typeof authformSchema>>({
    resolver: zodResolver(authformSchema)
  })


  const onSubmit = async (data: z.infer<typeof authformSchema>) => {


    try {

      const newUser = await signUp(data)
      router.push('/users')

    } catch (error) {

    } finally {

    }
  }


  return (
    <section >
      <header className='flex flex-col gap-2 mb-4'>
        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1 '>
          Add user
        </h1>
        <p className="text-sm text-muted-foreground">Create a new user</p>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
      </header>

      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >

            <>
              <div className="grid-cols-3 mt-3 gap-8 md:grid">
                <CustomInput control={form.control} name='fullname' label="Full name" placeholder='Enter your full name' />
                <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />
                <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />
              </div>

              <div className="grid-cols-3 mt-5 gap-8 md:grid">
                <CustomInput control={form.control} name={`address.${0}.address`} label="Address" placeholder='Enter your full address' />
                <CustomInput control={form.control} name={`address.${0}.state`} label="State" placeholder='Enter your state' />
                <CustomInput control={form.control} name={`address.${0}.city`} label="City" placeholder='Enter your city' />
              </div>

              <div className="grid-cols-3 mt-5 gap-8 md:grid">
                <CustomInput control={form.control} name={`address.${0}.zip`} label="Zip" placeholder='Enter your zip' />
                <CustomInput control={form.control} name={`address.${0}.country`} label="Country" placeholder='Enter your country' />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Choose a role"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="administrator">administrator</SelectItem>
                          <SelectItem value="responsible">responsible</SelectItem>
                          <SelectItem value="client">client</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid-cols-3 mt-5 gap-8 md:grid">
                <CustomInput control={form.control} name='phone' label="Phone" placeholder='Enter your phone' />
              </div>

            </>

            <div className="space-x-4">
              <Button
                className="ml-auto mt-4"
                type="submit"

              >
                create
              </Button>
            </div>
          </form>
        </Form>
      </>

    </section>
  )
}

export default UsersForm