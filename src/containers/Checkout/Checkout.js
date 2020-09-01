import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  
  state = {
    ingredients: null,

    totalPrice: 0
  }

  componentWillMount() {
    console.log("[Checkout.js]", this.props)
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    queryParams.forEach((value, key) => {
      if (key === 'price') {
        price = value;

      } else {
        ingredients[key] = +value;
      }
    });

    this.setState({ ingredients: ingredients, totalPrice: price });
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

        <Route path={this.props.match.path + '/contact-data'} 
          render={(props) => (
            <ContactData 
              ingredients={this.state.ingredients}
              price={this.state.totalPrice} 
              {...props} />
          )} />
      </div>
    )
  }
}

export default Checkout;