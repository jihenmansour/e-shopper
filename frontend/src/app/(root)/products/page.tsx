import ProductsTable from '@/components/products/ProductsTable'
import { getAllproducts } from '@/lib/actions/product.actions'
import React, { Suspense } from 'react'

const page = async () => {
    const products = await getAllproducts()
  return (
    <div>
      <Suspense fallback={<p>Fetching data...</p>}>
        <ProductsTable products={products}/>
      </Suspense>
    </div>
  )
}

export default page

