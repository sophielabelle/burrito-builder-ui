import React, { useState, useEffect } from 'react';
import { postOrders } from '../../apiCalls';

export const OrderForm = ({setOrders}) => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  console.log('selected Ingred', ingredients);

  const displayIngreds = ingredients.reduce((acc, i) => {
    acc += ` ${i},`
    return acc
  }, '')

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      name: name,
      ingredients: ingredients
    }
    console.log('newOrder',newOrder)
    postOrders(newOrder)
      .then(data => setOrders(data))
    clearInputs();
  }
  
  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  const addIngreds = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, e.target.name])
  }
  
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={e => addIngreds(e)}>
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      { ingredientButtons }

      <p>Order: { displayIngreds || 'Nothing selected' }</p>

      <button onClick={(e) => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}
