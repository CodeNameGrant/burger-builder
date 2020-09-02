import React, { Component } from 'react'

import axios from '../../../axios-orders';

import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';
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
        ingredients: this.props.ingredients,
        price: this.props.price,

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
        <Input name='name' placeholder="Your Name" />
        <Input name='email' placeholder="Your Email Address" />
        <Input name='street' placeholder="Street Name" />
        <Input name='postalCode' placeholder="Postal Code" />

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