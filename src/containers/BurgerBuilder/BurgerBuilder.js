import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import Spinner from '../../components/ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    perchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  // componentDidMount() {
  //   console.log("[BurgerBuilder.js]", this.props)
  //   axios.get('https://react-my-burger-2d399.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       //const ingredients
  //       this.setState({ ingredients: response.data });
        
  //       this.updatePrice();
  //     })
  //     .catch(error => {
  //       this.setState({ error: true });
  //     })
  // }

  updatePerchaseState = () => {
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
  }
  
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelledHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const urlParams = new URLSearchParams();
    urlParams.append("price", this.props.totalPrice);
    
    Object.keys(this.state.ingredients).forEach(igKey => {
      urlParams.append(igKey, this.state.ingredients[igKey]);
    })

    this.props.history.push({
      pathname: '/checkout',
      search: urlParams.toString()
    })

  }

  render() {
    const disableInfo = {
      ...this.props.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (this.props.ingredients) {
      orderSummary = <OrderSummary 
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelledHandler}
        purchaseContinue={this.purchaseContinueHandler} />;

      burger = (
          <Aux>
            <Burger ingredients={this.props.ingredients} />
              <BurgerControls 
                price={this.props.totalPrice}
                perchasable={this.state.perchasable}
                addIngredient={this.props.onIngredientAdded} 
                removeIngredient={this.props.onIngredientRemoved} 
                disabled={disableInfo} 
                ordered={this.purchaseHandler}/>
          </Aux>
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
        <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
            {orderSummary}
          </Modal>

          {burger}
        </Aux>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );