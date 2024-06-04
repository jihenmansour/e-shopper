

import ProductSection from '@/components/dashboard/ProductSection'
import { getAllproducts } from '@/lib/actions/product.actions'
import React from 'react'

const Dashboard = async() => {
  const products = await getAllproducts()
  return (
    <div >
      <ProductSection products={products}/>
    </div>
  )
}

export default Dashboard