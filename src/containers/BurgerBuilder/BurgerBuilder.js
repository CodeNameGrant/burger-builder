import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
};

class BurgerBuilder extends Component {
  // constructor( props ) {
  //   super(props);

  //   this.
  // }

  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },

    totalPrice: 4,
    
    perchasable: false
    
  };
  
  addIngredientHandler = ( type ) => {
    // Update Ingredient count
    const currentCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentCount+1;

    // Update total price
    const currentPrice = this.state.totalPrice;
    const updatedPrice = currentPrice + INGREDIENT_PRICES[type];

    // Update State
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    this.updatePerchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    // Update Ingredient count
    const currentCount = this.state.ingredients[type];
    if (currentCount <= 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentCount-1;

    // Update total price
    const currentPrice = this.state.totalPrice;
    const updatedPrice = currentPrice - INGREDIENT_PRICES[type];

    // Update State
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    this.updatePerchaseState(updatedIngredients);
  }

  updatePerchaseState = (currentIngredients) => {
    currentIngredients = { ...this.state.ingredients };
    const ingredientsSum = Object.keys(currentIngredients)
      .map((igKey) => {
        return currentIngredients[igKey]
      })
      .reduce( ( sum, val ) => {
        return sum + val;
      }, 0 );

      this.setState({ perchasable: ingredientsSum > 0});
  }

  // Alternate using setState(function()
  /* updatePerchaseState = () => {
    this.setState((prevState, props) => {

      const currentIngredients = { ...prevState.ingredients };
      const ingredientsSum = Object.keys(currentIngredients)
        .map((igKey) => {
          return currentIngredients[igKey]
        })
        .reduce( ( sum, val ) => {
          return sum + val;
        }, 0 );

      return { perchasable: ingredientsSum > 0};
    })
  } */
  
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
        <Aux>
          <Modal>
            <OrderSummary ingredients={this.state.ingredients} />
          </Modal>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls 
            price={this.state.totalPrice}
            perchasable={this.state.perchasable}
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler} 
            disabled={disableInfo} />
        </Aux>
    );
  }
}

export default BurgerBuilder;