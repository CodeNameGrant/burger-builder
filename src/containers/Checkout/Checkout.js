import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  checkoutContiueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let summary = <Redirect to='/' />;
    const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
    if (this.props.ingredients) {
      summary = (
        <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContiue={this.checkoutContiueHandler} />

        <Route path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);