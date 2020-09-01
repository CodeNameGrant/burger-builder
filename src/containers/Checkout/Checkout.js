import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

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
  
  checkoutContiueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContiue={this.checkoutContiueHandler} />      

        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    )
  }
}

export default Checkout;