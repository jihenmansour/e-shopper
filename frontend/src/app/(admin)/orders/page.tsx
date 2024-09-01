
import OrdersTable from '@/components/oders/orders-table';
import { getOrders } from '@/lib/actions/order.actions'
import React from 'react'
import { SearchParamProps } from '../../../../types';

const page = async({ searchParams: { page, search  } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const searchFilter = search as string;
    const orders = await getOrders(currentPage, searchFilter)
  return (
    <div>
        <h3 >
          Orders list
        </h3>
        <OrdersTable orders={orders}/>
    </div>
  )
}

export default page