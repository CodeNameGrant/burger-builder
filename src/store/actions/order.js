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

export const placeOrder = (orderData) => {
  return (dispatch) => {
    dispatch(placeOrderStart());
    
    axios.post('/orders.json', orderData)
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