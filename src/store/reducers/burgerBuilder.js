import * as actionTypes from '../actions/actionsTypes';

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
  avo: 0.8
};

const initialState = {
  ingredients: null,

  basePrice: 4,
  totalPrice: 4,

  error: false
}

const reducer = (state = initialState, action) => {
  const updatedState = { ...state };

  switch (action.type) {

    case (actionTypes.ADD_INGREDIENT):
      updatedState.ingredients = addRemoveIngredient(state.ingredients, action.ingredientName, true);
      updatedState.totalPrice = calculateTotalPrice(state.basePrice, updatedState.ingredients);

      break;

    case (actionTypes.REMOVE_INGREDIENT):
      updatedState.ingredients = addRemoveIngredient(state.ingredients, action.ingredientName, false);
      updatedState.totalPrice = calculateTotalPrice(state.basePrice, updatedState.ingredients);

      break;
    case (actionTypes.SET_INGREDIENTS):
      updatedState.ingredients = action.ingredients;
      updatedState.totalPrice = calculateTotalPrice(state.basePrice, updatedState.ingredients);
      updatedState.error = false;
      
      break;

    case (actionTypes.FETCH_INGREDIENTS_FAILED):
      updatedState.error = true;

      break;

    default:
      break;
  }

  return updatedState;
}

const addRemoveIngredient = (ingredients, ingredientName, add) => {
  const updatedIngredients = { ...ingredients };

  if (add) {
    updatedIngredients[ingredientName] = ingredients[ingredientName] + 1;
  } else {
    updatedIngredients[ingredientName] = ingredients[ingredientName] - 1;
  }

  return updatedIngredients;
}

const calculateTotalPrice = (basePrice, ingredients) => {
  const ingredientsPrice = Object.keys(ingredients)
    .reduce((price, igKey) => {
      return price + (INGREDIENT_PRICES[igKey] * ingredients[igKey]);
    }, 0);

  return basePrice + ingredientsPrice;
}

export default reducer;