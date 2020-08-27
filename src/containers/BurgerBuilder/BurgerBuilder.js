import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
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

    totalPrice: 4
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
  }
  
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls 
            price={this.state.totalPrice}
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler} 
            disabled={disableInfo} />
        </Aux>
    );
  }
}

export default BurgerBuilder;