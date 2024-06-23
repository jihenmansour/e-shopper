import ProductsForm from '@/components/products/ProductsForm'
import { getAllcategories } from '@/lib/actions/category.actions'
import React from 'react'

const page = async() => {
  const categories = await getAllcategories()
  return (
    <ProductsForm categories={categories}/>
  )
}

export default page