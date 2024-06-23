import CategoriesForm from '@/components/categories/CategoriesForm'
import { getAllproducts } from '@/lib/actions/product.actions'
import React from 'react'

const page = async () => {
  const products = await getAllproducts()
  return (
    <div>
        <CategoriesForm products={products}/>
    </div>
  )
}

export default page