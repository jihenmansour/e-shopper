
import OrdersTable from '@/components/oders/orders-table';
import { getOrders } from '@/lib/actions/order.actions'
import React from 'react'
import { SearchParamProps } from '../../../../types';

const page = async({ searchParams: { page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const orders = await getOrders(currentPage)
  return (
    <div>
        <OrdersTable orders={orders}/>
    </div>
  )
}

export default page