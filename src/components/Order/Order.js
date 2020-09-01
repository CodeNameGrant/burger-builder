import React from 'react'

import classes from './Order.module.css';

function Order( props ) {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Meat (1)</p>
      <p>Price: <strong>R 5.45</strong></p>
    </div>
  )
}

export default Order;