import React, { Component } from 'react'

import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {
  
  state = {
    controls: {
      email: {
        type: 'input',
        attributes: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          requried: true,
          isEmail: true
        },
        isValid: false,
        touched: false
      },

      password: {
        type: 'input',
        attributes: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          requried: true,
          minLength: 6
        },
        isValid: false,
        touched: false
      },
    }
  }

  checkValidity = (value, rules) => {
    value = value.trim();

    if (rules.requried && value === '') {
      return false;
    }

    if (rules.exactLength && value.length !== rules.exactLength) {
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return false;
    }

    if (rules.isEmail) {
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailPattern.test(value)) {
        return false;
      }
    }

    return true;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({ controls: updatedControls });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <form>
        {
          Object.keys(this.state.controls)
            .map(controlKey => {
              const formElement = this.state.controls[controlKey];
              return <Input
                key={controlKey}
                elementType={formElement.type}
                attributes={formElement.attributes}
                value={formElement.value}
                shouldValidate={formElement.validation}
                isValid={formElement.isValid}
                touched={formElement.touched} 
                inputChanged={(event) => this.inputChangedHandler(event, controlKey)}
                />
            })
        }
        <Button type="Success">Submit</Button>
        </form>
      </div>
    )
  }
}

export default Auth;