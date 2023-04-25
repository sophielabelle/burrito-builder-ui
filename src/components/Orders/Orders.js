import React, { useEffect } from 'react';
import { OrderCard } from '../orderCard/orderCard';
import './Orders.css';

export const Orders = ({orders}) => {
  const display = orders.length ? orders.map(order => <OrderCard key={order.name+order.id} order={order}/>) : <p>No orders yet!</p>

  useEffect(() => {
    
  }, [])

  return (
    <section>
      { display }
    </section>
  )
}