import React, { useEffect, useState } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

export const App = () => {
  const [orders, setOrders] = useState([])

  const getAllOrders = () => {
    getOrders()
      .then(data => {
        console.log('data', data)
      })
      .catch(err => console.error('Error fetching:', err));
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      <Orders orders={orders}/>
    </main>
  );
}
