import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false,

}

const reducer = (state = initialState, action) => {
  const updatedState = { ...state };

  switch (action.type) {
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

      break;

    case (actionTypes.ORDER_FAILED):
      updatedState.loading = false;

      break;

    default:
      break;
  }

  return updatedState;

}

export default reducer;