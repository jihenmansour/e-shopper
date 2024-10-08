
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { LineChartCardProps, OverviewSectionProps } from "../../types";


export const apiURL = process.env.NEXT_PUBLIC_APP_API_URL;

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
  password: type==='edit user'? z.string().min(6).optional(): z.string().min(6),
  address: z.array(addressSchema).optional(),
  role: type === 'login' ? z.enum(['administrator', 'responsible', 'client']).optional() : z.enum(['administrator', 'responsible', 'client']),
  phone: z.string().optional(),
  image:  z.any().optional()
})


export const ProductSchema = z
.object({
  name: z.string(),
  price: z.coerce.number({message: 'required, enter number please'}),
  quantity: z.coerce.number({message: 'required, enter number please'}),
  description: z.string().optional(),
  // files: z.array(z.any())  .min(1, {message: 'at least one image is required'})
  // .max(4, {message: 'no more than 4 images are required'}).default([]),
  images:   z.object({
    files: z.array(z.any()),
    updatedImages: z.array(z.string())
  })
  .superRefine((val, ctx)=> {
    const length = val.files.length + val.updatedImages.length;
    if(length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "at least one image is required"
      })
  }

  if(length > 4) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
    message: "no more than 4 images are required"
  })
  }
}),
  categories: z.array(z.any()).optional()
})

export const CategorySchema = z
.object({
  name: z.string(),
  description: z.string().optional(),
  images: z.object({
    files: z.array(z.any()),
    updatedImages: z.array(z.string())
  })
  .refine((val)=> val.files.length + val.updatedImages.length <= 1 &&
   val.files.length + val.updatedImages.length >= 1, {
    message: "one image is required"
  }),
  products: z.array(z.any()).optional()
})

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const parseStringifyError = (value: any) => JSON.parse(JSON.stringify({error: value}));

export const formatStats = (stats: OverviewSectionProps) => {
  const monthlyStats: LineChartCardProps[] = [];
  const currentMonth = new Date().getMonth() + 1; 

  const currentMonthExists = stats.data.some(item => item.month === currentMonth);
if(!currentMonthExists){
  stats.data.push({
    totalIncome: 0,
    totalSales: 0,
    month: currentMonth,
    totalClients: 0
  })
}
  stats
   monthlyStats.push({
     type: 'Total incomes',
     stats: stats.data.map((item) => ({
      month: item.month,
      total: item.totalIncome
    })),
     total: stats.totalIncome
   }, {
    type: 'Total sales',
    stats: stats.data.map((item) => ({
     month: item.month,
     total: item.totalSales
   })),
    total: stats.totalSales
  }, {
    type: 'Total customers',
    stats: stats.data.map((item) => ({
     month: item.month,
     total: item.totalClients
   })),
    total: stats.totalClients
  });

  return monthlyStats;
}

export const formatMonth = (number: number) => {
  const monthName = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(number.toString()));

  return monthName;
}

export const createQueryString = 
(name: string, value: string, searchParams: any) => {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, value)

  return params.toString()
}