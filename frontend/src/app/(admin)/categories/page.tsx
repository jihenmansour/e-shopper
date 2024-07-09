
import CategoriesTable from '@/components/categories/categories-table';
import { getCategories } from '@/lib/actions/category.actions'
import React from 'react'
import { SearchParamProps } from '../../../../types';

const page = async ({ searchParams: { page } }: SearchParamProps) => {

  const currentPage = Number(page as string) || 1;
  const getAllCategories = await getCategories(currentPage)
  return (
    <div>
      <CategoriesTable categories={getAllCategories}/>
    </div>
  )
}

export default page