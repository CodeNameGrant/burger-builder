import React from 'react'

import classes from './Order.module.css';

const Order = ( props ) => {
  
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return <span key={igKey} style={{
      textTrasform: 'capitalise',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }}>{igKey} ({props.ingredients[igKey]})</span>
  })
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {transformedIngredients}</p>
      <p>Price: <strong>R {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default Order;