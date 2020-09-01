import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../ui/Button/Button'

import classes from './CheckoutSummary.module.css';

export default function CheckoutSummary( props ) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes GREAT!!!</h1>
      
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button
        type="Danger"
        onClick>Cancel</Button>
      <Button
        type="Success"
        onClick>Continue</Button>
    </div>
  )
}
