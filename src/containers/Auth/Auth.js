import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/ui/Spinner/Spinner';

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
    },

    isSignup: true
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

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup }
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup);
  }


  render() {

    let form = Object.keys(this.state.controls)
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
      });

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = (
        <p>{this.props.error.message}</p>
      )
    }

    // Redirect on Login
    if (this.props.authenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className={classes.Auth}>
        {errorMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="Success">Submit</Button>
        </form>

        <Button
          type="Danger"
          clicked={this.switchAuthModeHandler}>
          Switch To {this.state.isSignup ? 'Login' : 'Signup'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);