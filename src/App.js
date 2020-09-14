import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {

  // Simulate ComponentDidMount() by passing an empty array to useEffect()
  const { onTryAutoLogin } = props;
  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  let routes = (
    /* Default Routes */
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={asyncAuth} />
      <Redirect to='/' />
    </Switch>
  );
  if (props.authenticated) {
    routes = (
      /* Authenticated Routes */
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/logout" component={Logout} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
