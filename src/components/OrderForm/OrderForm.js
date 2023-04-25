import React, { useState, useEffect } from 'react';
import { postOrders } from '../../apiCalls';

export const OrderForm = ({addNew}) => {
  const [name, setName] = useState('')
  const [feildError, setFeildError] = useState('')
  const [ingredients, setIngredients] = useState([])
  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];

  const displayIngreds = ingredients.reduce((acc, i) => {
    acc += ` ${i},`
    return acc
  }, '')

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.length && ingredients.length) {
      const newOrder = {
        name: name,
        ingredients: ingredients
      }
      addNew(newOrder)
      clearInputs();
    } else if(!name.length && ingredients.length) {
      setFeildError('Please add your name!')
    } else if(name.length && !ingredients.length) {
      setFeildError('Please select ingredients for your burrito!')
    } else {
      setFeildError('Please add your name and select ingredients')
    }
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
       {feildError && <p className='error-msg'>{feildError}</p>}
       
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      { ingredientButtons }

      <p>Order: { displayIngreds || 'Nothing selected' }</p>
      <button className="submit-btn" onClick={(e) => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}
