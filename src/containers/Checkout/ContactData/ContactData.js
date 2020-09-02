import React, { Component } from 'react'

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
          placeholder: 'Full Name...',
          value: 'Grant'
        },
      },

      email: {
        type: 'input',
        attributes: {
          type: 'text',
          placeholder: 'Email Address...',
          value: 'gr@nt.com'
        },
      },

      street: {
        type: 'input',
        attributes: {
          type: 'text',
          placeholder: 'Streed Address...',
          value: '123 ABC Ave'
        },
      },

      zipCode: {
        type: 'input',
        attributes: {
          type: 'text',
          placeholder: 'Zip Code...',
          value: '1234'
        },
      },

      country: {
        type: 'input',
        attributes: {
          type: 'text',
          placeholder: 'Country...',
          value: 'South Africa'
        },
      },

      deliveryMethod: {
        type: 'select',
        options: [
          { value: 'fastest', text: 'Fastest' },
          { value: 'cheepest', text: 'Cheapest' }
        ]
      }
    },

    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log("[ContactData.js] orderHandler()", this.props);

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,



      deliveryMethod: 'fastest'
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

  render() {

    let form = (
      <form>
        {
          Object.keys(this.state.orderForm)
            .map(formKey => {
              const formElement = this.state.orderForm[formKey];
              console.log("formElement", formElement)
              return <Input 
                key={formKey}
                elementType={formElement.type}
                attributes={formElement.attributes}
                options={formElement.options}/>
            })
        }
        <Button type="Success" clicked={this.orderHandler}>Order</Button>
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

export default ContactData;