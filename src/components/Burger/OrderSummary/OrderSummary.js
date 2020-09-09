import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../ui/Button/Button'

class OrderSummary extends Component {
  // Doesnt have to be class, can be a functional component
  componentDidUpdate() {
    console.log("[OrderSummary] componentDidUpdate")
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        )
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A Delicious Burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: R {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button type="Danger"
          clicked={this.props.purchaseCancelled}>Cancel</Button>

        <Button type="Success"
          clicked={this.props.purchaseContinue}>Continue</Button>
      </Aux>
    )
  }
}

export default OrderSummary;