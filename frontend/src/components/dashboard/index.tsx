"use client"

import { formatStats } from '@/lib/utils';
import DoughnutChartCard from '../widgets/doughnut-chart-card';
import LineChartCard from '../widgets/line-chart-card';

import TopProductsTable from '../products/top-products-table';
import { DashboardProps } from '../../../types';

const Dashboard = ({ stats, categories, data, products }: DashboardProps) => {
    const cardsData = formatStats(stats);
  return (
    <div className="flex flex-col gap-8">
    <div className="grid grid-flow-row lg:grid-cols-3 gap-4 w-full">
      {cardsData.map((item, index) => {
        return <LineChartCard 
        key={index} 
        stats={item.stats} 
        type={item.type} 
        total={item.total}/>;
      })}
    </div>
    <div className='flex flex-col xl:flex-row gap-4'>
      <DoughnutChartCard categories={categories} data={data}/>
      <div className='col-span-2'>
        <TopProductsTable products={products} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard