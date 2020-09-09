import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const orderInit = (state, action) => {
  return updateObject(state, {
    purchased: false
  });
}

const orderPlaced = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const orderSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };

  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
}

const orderFailed = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const fetchOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
}

const fetchOrderFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case (actionTypes.ORDER_INIT): return orderInit(state, action);
    case (actionTypes.ORDER_PLACED): return orderPlaced(state, action);
    case (actionTypes.ORDER_SUCCESS): return orderSuccess(state, action);
    case (actionTypes.ORDER_FAILED): return orderFailed(state, action);
    case (actionTypes.FETCH_ORDERS_START): return fetchOrderStart(state, action);
    case (actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrderSuccess(state, action);
    case (actionTypes.FETCH_ORDERS_FAILED): return fetchOrderFail(state, action);

    default:
      return state;
  }

}

export default reducer;