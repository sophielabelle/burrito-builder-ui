export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
}

export const postOrders = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: "POST",
    body: JSON.stringify({
      name: newOrder.name,
      ingredients: newOrder.ingredients
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error(res)
    }
  })
}