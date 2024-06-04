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
import {productSchema } from '@/lib/utils'
import CustomInput from '../CustomInput'
import { Input } from '../ui/input'
import { addProduct } from '@/lib/actions/product.actions'
import { Textarea } from '../ui/textarea'





const ProductsForm = ({ type }: { type: string }) => {

  const router = useRouter()


  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema)
  })


  const fileRef = form.register("image");
  const descriptionRef = form.register("description");
  const onSubmit = async (data: z.infer<typeof productSchema>) => {

    try {
      console.log(data)
      const newProduct = await addProduct(data)
      router.push('/products')
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <section >
      <header className='flex flex-col gap-2 mb-4'>
        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1 '>
          Add product
        </h1>
        <p className="text-sm text-muted-foreground">Create a new product</p>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
      </header>

      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >

            <>
              <div className="grid-cols-3 mt-3 gap-8 md:grid">
                <CustomInput control={form.control} name='name' label="Name" placeholder='Enter product name' />
                <CustomInput control={form.control} name='price' label="Price" placeholder='Enter product price' />
                <CustomInput control={form.control} name='quantity' label="Quantity" placeholder='Enter product quantity' />
                </div>
                <div className="grid-cols-3 mt-3 gap-8 md:grid">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => {
                    return (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input type="file" placeholder="shadcn" {...fileRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                 </div>
                 <div className="grid-cols-3 mt-3 gap-8 md:grid">
                <FormField
                  control={form.control}
                  name="description"
                  render={(field) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="shadcn" {...descriptionRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
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

export default ProductsForm