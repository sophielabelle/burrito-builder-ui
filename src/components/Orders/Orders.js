import React from 'react';
import { OrderCard } from '../orderCard/orderCard';
import './Orders.css';

export const Orders = ({orders}) => {
  const orderEls = orders.map(order => <OrderCard key={order.name} order={order}/>);

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}