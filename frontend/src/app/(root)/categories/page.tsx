import CategoriesTable from '@/components/categories/CategoriesTable'
import { getAllcategories } from '@/lib/actions/category.actions'
import React from 'react'

const page = async ({ searchParams: { page } }: SearchParamProps) => {

  const currentPage = Number(page as string) || 1;
  const getAllCategories = await getAllcategories(currentPage)
  return (
    <div>
      <CategoriesTable categories={getAllCategories}/>
    </div>
  )
}

export default page