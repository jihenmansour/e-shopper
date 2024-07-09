import OrderDetail from '@/components/oders/order-detail'
import { getOrder } from '@/lib/actions/order.actions'
import React from 'react'

const page = async({ params }: { params: { orderId: string } }) => {
    const { orderId } = params;
    const order = await getOrder(orderId)
  return (
    <div>
        <h3 >
          Order detail
        </h3>
        <OrderDetail order={order}/>
    </div>
  )
}

export default page