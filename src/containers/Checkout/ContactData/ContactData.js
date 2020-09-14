import React, { useState } from 'react'
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {

  const [orderForm, setOrderForm] = useState({
    name: {
      type: 'input',
      attributes: {
        type: 'text',
        placeholder: 'Full Name...'
      },
      value: '',
      validation: {
        requried: true
      },
      isValid: false,
      touched: false
    },

    email: {
      type: 'input',
      attributes: {
        type: 'text',
        placeholder: 'Email Address...'
      },
      value: '',
      validation: {
        isEmail: true,
        requried: true
      },
      isValid: false,
      touched: false
    },

    street: {
      type: 'input',
      attributes: {
        type: 'text',
        placeholder: 'Street Address...'
      },
      value: '',
      validation: {
        requried: true
      },
      isValid: false,
      touched: false
    },

    zipCode: {
      type: 'input',
      attributes: {
        type: 'number',
        placeholder: 'Zip Code...'
      },
      value: '',
      validation: {
        requried: true,
        exactLength: 4
      },
      isValid: false,
      touched: false
    },

    country: {
      type: 'input',
      attributes: {
        type: 'text',
        placeholder: 'Country...'
      },
      value: '',
      validation: {
        requried: true
      },
      isValid: false,
      touched: false
    },

    deliveryMethod: {
      type: 'select',
      options: [
        { value: 'fastest', text: 'Fastest' },
        { value: 'cheepest', text: 'Cheapest' }
      ],
      validation: {},
      isValid: true,
      value: 'fastest'
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    Object.keys(orderForm)
      .forEach(formKey => formData[formKey] = orderForm[formKey].value);

    const orderData = {
      ingredients: props.ingredients,
      price: props.totalPrice,

      orderData: formData,
      userId: props.userId
    };

    props.onPlaceOrder(orderData, props.token);
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      touched: true,
      isValid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let formKey in updatedOrderForm) {
      formIsValid = updatedOrderForm[formKey].isValid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid)
  }


  let form = (
    <form onSubmit={orderHandler}>
      {
        Object.keys(orderForm)
          .map(formKey => {
            const formElement = orderForm[formKey];
            return <Input
              key={formKey}
              elementType={formElement.type}
              attributes={formElement.attributes}
              value={formElement.value}
              shouldValidate={formElement.validation}
              isValid={formElement.isValid}
              touched={formElement.touched}
              inputChanged={(event) => inputChangedHandler(event, formKey)}
              options={formElement.options} />
          })
      }
      <Button type="Success" disabled={!formIsValid}>Order</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data...</h4>
      {form}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlaceOrder: (orderData, token) => dispatch(actions.placeOrder(orderData, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));