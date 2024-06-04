
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addressSchema =  z
.object({
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional()
})

export const formSchema = (type: string)=> z
.object({
  fullname: type === 'login' ? z.string().optional() : z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.array(addressSchema).optional(),
  role: type === 'login' ? z.enum(['administrator', 'responsible', 'client']).optional() : z.enum(['administrator', 'responsible', 'client']),
  phone: z.string().optional()
})


export const productSchema = z
.object({
  name: z.string(),
  price: z.string().optional(),
  quantity: z.string().optional(),
  description: z.string().optional(),
  image:   z.any()
  .refine((file) => file?.length !== 0, "File is required")
  .transform((value) => value instanceof File ? value : value?.item(0)! || {})
  .refine(file => file instanceof File, {
    message: "Image is required"
  })
})


