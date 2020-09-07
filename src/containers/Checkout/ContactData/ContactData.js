import React, { Component } from 'react'
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {

  state = {
    orderForm: {
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
          type: 'text',
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
    },

    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log("[ContactData.js] orderHandler()", this.props);

    this.setState({ loading: true });

    const formData = {};
    Object.keys(this.state.orderForm)
      .forEach(formKey => formData[formKey] = this.state.orderForm[formKey].value);

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,

      OrderData: formData
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });

        this.props.history.push('/');

      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  checkValidity = (value, rules) => {
    if (rules.requried && value.trim() === '') {
      return false;
    }

    if (rules.exactLength && value.trim().length !== rules.exactLength) {
      return false;
    }

    return true;
  }

  inputChangedHandler = (event, formKey) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[formKey] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

    updatedOrderForm[formKey] = updatedFormElement;

    let formIsValid = true;
    for (let formKey in updatedOrderForm) {
      //console.log(formKey, updatedOrderForm[formKey] )
      formIsValid = updatedOrderForm[formKey].isValid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  render() {

    let form = (
      <form onSubmit={this.orderHandler}>
        {
          Object.keys(this.state.orderForm)
            .map(formKey => {
              const formElement = this.state.orderForm[formKey];
              return <Input
                key={formKey}
                elementType={formElement.type}
                attributes={formElement.attributes}
                value={formElement.value}
                shouldValidate={formElement.validation}
                isValid={formElement.isValid}
                touched={formElement.touched}
                inputChanged={(event) => this.inputChangedHandler(event, formKey)}
                options={formElement.options} />
            })
        }
        <Button type="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data...</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect( mapStateToProps )(ContactData);