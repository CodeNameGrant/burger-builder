import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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

  const {onBuilderInit} = props;
  useEffect(() => {
    onBuilderInit()
  }, [onBuilderInit])

  const updatePerchaseState = () => {
    const ingredientsSum = Object.keys(props.ingredients)
      .map((igKey) => {
        return props.ingredients[igKey]
      })
      .reduce((sum, val) => {
        return sum + val;
      }, 0);

    return ingredientsSum > 0;
  }

  const purchaseHandler = () => {
    if (props.authenticated) {
      setPurchasing(true);

    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelledHandler = () => {
          setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onOrderInit();
    props.history.push('/checkout');
  }

    const disableInfo = {
      ...props.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (props.ingredients) {
      orderSummary = <OrderSummary
        ingredients={props.ingredients}
        price={props.totalPrice}
        purchaseCancelled={purchaseCancelledHandler}
        purchaseContinue={purchaseContinueHandler} />;

      burger = (
        <Aux>
          <Burger ingredients={props.ingredients} />
          <BurgerControls
            authenticated={props.authenticated}
            price={props.totalPrice}
            perchasable={updatePerchaseState()}
            addIngredient={props.onIngredientAdded}
            removeIngredient={props.onIngredientRemoved}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    authenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBuilderInit: () => dispatch(actions.fetchIngredients()),
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onOrderInit: () => dispatch(actions.orderInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));