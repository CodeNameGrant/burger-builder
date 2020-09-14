import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

const Checkout = props => {

  const checkoutContiueHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  let summary = <Redirect to='/' />;
  const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
  if (props.ingredients) {
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContiue={checkoutContiueHandler} />

        <Route path={props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
  return summary;
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);