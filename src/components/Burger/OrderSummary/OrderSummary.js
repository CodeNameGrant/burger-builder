import React from 'react'

import Aux from '../../../hoc/Auxiliary'
import Button from '../../ui/Button/Button'

export default function OrderSummary( props ) {

  const ingredientSummary = Object.keys(props.ingredients)
    .map( ( igKey ) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    )});

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delicious Burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button type="Danger"
        clicked={props.purchaseCancelled}>Cancel</Button>

      <Button type="Success"
        clicked={props.purchaseContinue}>Continue</Button>
    </Aux>
  )
}
