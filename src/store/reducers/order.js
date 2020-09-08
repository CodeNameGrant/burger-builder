import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  const updatedState = { ...state };

  switch (action.type) {
    case (actionTypes.ORDER_INIT):
      updatedState.purchased = false;

      break;

    case (actionTypes.ORDER_PLACED):
      updatedState.loading = true;

      break;

    case (actionTypes.ORDER_SUCCESSFUL):
      updatedState.loading = false;
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      updatedState.orders = state.orders.concat(newOrder)
      updatedState.purchased = true;

      break;

    case (actionTypes.ORDER_FAILED):
      updatedState.loading = false;

      break;

    case (actionTypes.FETCH_ORDERS_START):
      updatedState.loading = true;

      break;

    case (actionTypes.FETCH_ORDERS_SUCCESS):
      updatedState.loading = false;
      updatedState.orders = action.orders;

      break;

    case (actionTypes.FETCH_ORDERS_FAILED):
      updatedState.loading = false;

      break;

    default:
      break;
  }

  return updatedState;

}

export default reducer;