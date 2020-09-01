import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import Spinner from '../../components/ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,

    basePrice: 4,
    totalPrice: 4,
    
    perchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://react-my-burger-2d399.firebaseio.com/ingredients.json')
      .then(response => {
        //const ingredients
        this.setState({ ingredients: response.data });
        
        this.updatePrice();
      })
      .catch(error => {
        this.setState({ error: true });
      })
  }
  
  addIngredientHandler = ( type ) => {
    // Update Ingredient count
    const currentCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentCount+1;

    // Update State
    this.setState({ ingredients: updatedIngredients });

    this.updatePrice();
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

    // Update State
    this.setState({ ingredients: updatedIngredients });

    this.updatePrice();
  }

  updatePrice = () => {
    this.setState((prevState, props) => {

      const ingredientsPrice = Object.keys(prevState.ingredients)
        .reduce((price, igKey) => {
          return price + (INGREDIENT_PRICES[igKey] * prevState.ingredients[igKey]);
        }, 0);

      return {
        totalPrice: prevState.basePrice + ingredientsPrice
      }

    });

    this.updatePerchaseState();
  }

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
    this.setState({ loading: true,  });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),

      customer: {
        name: "Grant Walker",
        address: {
          street: 'My Street name',
          zipCode: '1234',
          country: 'South Africa'
        },
        email: 'gr@nt.com'
      },

      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelledHandler}
        purchaseContinue={this.purchaseContinueHandler} />;

      burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
              <BurgerControls 
                price={this.state.totalPrice}
                perchasable={this.state.perchasable}
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler} 
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

export default withErrorHandler(BurgerBuilder, axios);