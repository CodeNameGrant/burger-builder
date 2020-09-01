import React, { Component } from 'react'

import Button from '../../../components/ui/Button/Button';

import classes from './ContactData.module.css';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data...</h4>
        <form>
          <input type='text' name='name' placeholder="Your Name" />
          <input type='text' name='email' placeholder="Your Email Address" />
          <input type='text' name='street' placeholder="Street Name" />
          <input type='text' name='postalCode' placeholder="Postal Code" />

          <Button type="Success">Order</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;