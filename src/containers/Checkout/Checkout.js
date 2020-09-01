import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1, 
      salad: 1
    }
  }

  componentDidMount() {
    console.log("[Checkout.js]", this.props)
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {}
    queryParams.forEach((value, key) => {
      ingredients[key] = +value;
    });

    this.setState({ ingredients: ingredients });
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>      
      </div>
    )
  }
}

export default Checkout;