import React from 'react'
import DoughnutChartCard from '../DoughnutChartCard '
import TopProductsTable from './TopProductsTable'

const CategoriesChart = ({categories, data, products}: CategoriesChartProps) => {
  return (
    <div className='grid grid-flow-row lg:grid-cols-3 gap-4'>
      <DoughnutChartCard categories={categories} data={data}/>
      <div className='col-span-2'>
        <TopProductsTable products={products!}/>
        </div>
      </div>
  )
}

export default CategoriesChart