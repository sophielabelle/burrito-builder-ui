import React, { useEffect, useState } from 'react';
import './App.css';
import { getOrders, postOrders } from '../../apiCalls';
import { Orders } from '../../components/Orders/Orders';
import { OrderForm } from '../../components/OrderForm/OrderForm';

export const App = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders()
      .then(data => {
        console.log('data', data.orders);
        setOrders(data.orders);
      })
      .catch(err => console.error('Error fetching:', err));
  }

  useEffect(() => {
    getAllOrders();
  }, [])

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm setOrders={setOrders}/>
      </header>

      <Orders orders={orders}/>
    </main>
  );
}
