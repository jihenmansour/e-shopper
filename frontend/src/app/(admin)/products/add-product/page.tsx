
import ProductsForm from '@/components/products/products-form'
import { getAllcategories } from '@/lib/actions/category.actions'
import React from 'react'

const page = async() => {
  const categories = await getAllcategories()
  return (
    <div>
        <h3 >
          Add product
        </h3>
    <ProductsForm categories={categories}/>
    </div>
  )
}

export default page