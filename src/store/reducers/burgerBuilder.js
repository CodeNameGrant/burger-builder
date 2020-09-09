import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
  avo: 0.8
};

const initialState = {
  ingredients: null,
  building: false,

  basePrice: 4,
  totalPrice: 4,  // Same as base price initially

  error: false
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: calculateTotalPrice(state.basePrice, action.ingredients),
    building: burgerHasIngredients(action.ingredients),
    error: false
  })
}


const addIngredient = (state, action) => {
  const updatedIngredients = addRemoveIngredient(state.ingredients, action.ingredientName, true);

  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: calculateTotalPrice(state.basePrice, updatedIngredients),
    building: burgerHasIngredients(updatedIngredients)
  });
}

const removeIngredient = (state, action) => {
  const updatedIngredients = addRemoveIngredient(state.ingredients, action.ingredientName, false);

  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: calculateTotalPrice(state.basePrice, updatedIngredients),
    building: burgerHasIngredients(updatedIngredients)
  });
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    error: true
  });
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
    case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
    case (actionTypes.SET_INGREDIENTS): return setIngredients(state, action);
    case (actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
}

const addRemoveIngredient = (ingredients, ingredientName, addIngredient) => {
  const updatedIngredients = { ...ingredients };

  if (addIngredient) {
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

const burgerHasIngredients = (ingredients) => {
  const ingredientCount = Object.keys(ingredients)
    .reduce((count, igKey) => {
      return count + ingredients[igKey]
    }, 0)

  return ingredientCount !== 0;
}

export default reducer;