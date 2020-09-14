import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import Spinner from '../../components/ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

// Export Class to be used in test case
const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)

  const dispatch = useDispatch();
  const onBuilderInit = useCallback(() => dispatch(actions.fetchIngredients()), []);
  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onOrderInit = () => dispatch(actions.orderInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  const ingredients = useSelector(state => state.burgerBuilder.ingredients)
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
  const error = useSelector(state => state.burgerBuilder.error)
  const authenticated = useSelector(state => state.auth.token !== null)

  useEffect(() => {
    onBuilderInit()
  }, [onBuilderInit])

  const updatePerchaseState = () => {
    const ingredientsSum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, val) => {
        return sum + val;
      }, 0);

    return ingredientsSum > 0;
  }

  const purchaseHandler = () => {
    if (authenticated) {
      setPurchasing(true);

    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelledHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onOrderInit();
    props.history.push('/checkout');
  }

  const disableInfo = {
    ...ingredients
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

  if (ingredients) {
    orderSummary = <OrderSummary
      ingredients={ingredients}
      price={totalPrice}
      purchaseCancelled={purchaseCancelledHandler}
      purchaseContinue={purchaseContinueHandler} />;

    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BurgerControls
          authenticated={authenticated}
          price={totalPrice}
          perchasable={updatePerchaseState()}
          addIngredient={onIngredientAdded}
          removeIngredient={onIngredientRemoved}
          disabled={disableInfo}
          ordered={purchaseHandler} />
      </Aux>
    )
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelledHandler}>
        {orderSummary}
      </Modal>

      {burger}
    </Aux>
  );
}

export default withErrorHandler(BurgerBuilder, axios);