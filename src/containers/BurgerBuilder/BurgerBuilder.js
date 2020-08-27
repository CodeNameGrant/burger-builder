import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

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
    }  
  };
  
  
  render() {
    return (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls />
        </Aux>
    );
  }
}

export default BurgerBuilder;