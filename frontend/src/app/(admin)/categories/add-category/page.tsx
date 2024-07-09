
import CategoriesForm from '@/components/categories/categories-form'
import { getAllproducts } from '@/lib/actions/product.actions'
import React from 'react'

const page = async () => {
  const products = await getAllproducts()
  return (
    <div>
        <h3>
          Add category
        </h3>
        <CategoriesForm products={products}/>
    </div>
  )
}

export default page