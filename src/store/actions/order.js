import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const placeOrderStart = () => {
  return {
    type: actionTypes.ORDER_PLACED
  }
}

export const orderSuccessful = (id, orderData) => {
  return {
    type: actionTypes.ORDER_SUCCESSFUL,
    orderId: id,
    orderData
  }
}

export const orderFailed = (error) => {
  return {
    type: actionTypes.ORDER_FAILED,
    error
  }
}

export const placeOrder = (orderData, token) => {
  return (dispatch) => {
    dispatch(placeOrderStart());

    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        // console.log(response.data);
        dispatch(orderSuccessful(response.data.name, orderData));

      })
      .catch(error => {
        dispatch(orderFailed(error));

      });
  }
}

export const orderInit = () => {
  return {
    type: actionTypes.ORDER_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersfailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json?auth=' + token)
      .then(response => {
        
        const fetchedOrders = Object.keys(response.data)
          .map(orderKey => {
            return {
              id: orderKey,
              ...response.data[orderKey]
            }
          });

        dispatch(fetchOrdersSuccess(fetchedOrders))

      })
      .catch(error => {
        dispatch(fetchOrdersfailed(error))
      })
  }
}