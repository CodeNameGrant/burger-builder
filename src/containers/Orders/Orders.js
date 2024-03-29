import React, { useEffect } from 'react'

import axios from '../../axios-orders';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/ui/Spinner/Spinner';

const Orders = props => {

  const {token, userId, onFetchOrders} = props;
  useEffect(() => {
    onFetchOrders(token, userId)
  }, [token, userId, onFetchOrders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price} />
    ));

    if (orders.length === 0) {
      orders = <p>You have not placed any orders</p>
    }
  }
  return (
    <div>
      {orders}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));