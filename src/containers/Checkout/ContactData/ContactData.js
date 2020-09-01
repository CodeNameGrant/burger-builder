import React, { Component } from 'react'

import axios from '../../../axios-orders';

import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },

    loading: false
  }

  orderHandler = (event) => {
      event.preventDefault();
      console.log("[ContactData.js] orderHandler()", this.props);

      this.setState({ loading: true });

      const order = {
        ingredients: this.state.ingredients,
        price: this.state.price,

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
        <input type='text' name='name' placeholder="Your Name" />
        <input type='text' name='email' placeholder="Your Email Address" />
        <input type='text' name='street' placeholder="Street Name" />
        <input type='text' name='postalCode' placeholder="Postal Code" />

        <Button type="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    );

    if ( this.state.loading ) {
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