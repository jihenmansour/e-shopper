
import CategoriesTable from '@/components/categories/categories-table';
import { getCategories } from '@/lib/actions/category.actions'
import React from 'react'
import { SearchParamProps } from '../../../../types';

const page = async ({ searchParams: { page, search  } }: SearchParamProps) => {

  const currentPage = Number(page as string) || 1;
  const searchFilter = search as string;
  const getAllCategories = await getCategories(currentPage, searchFilter)
  return (
    <div>
      <CategoriesTable categories={getAllCategories}/>
    </div>
  )
}

export default page