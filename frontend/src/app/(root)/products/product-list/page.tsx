import ProductsTable from '@/components/products/ProductsTable'
import { getAllproducts } from '@/lib/actions/product.actions'
import React from 'react'

const page = async () => {
    const products = await getAllproducts()
  return (
    <div>
        <ProductsTable products={products}/>
    </div>
  )
}

export default page