import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/ui/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

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

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        isValid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });

    this.setState({ controls: updatedControls });
  }

  onAuthHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value);
  }

  onSignupHandler = (event) => {
    event.preventDefault();
    this.props.onSignup(
      this.state.controls.email.value,
      this.state.controls.password.value);
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
      return <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {errorMsg}
        <form>
          {form}
        </form>
        {this.props.signupComplete ? <p>Your account has been created, please login to authenticate</p> : null}
        <Button type="Success" clicked={(event) => this.onAuthHandler(event)}>Login</Button>
        <Button type="Danger" clicked={(event) => this.onSignupHandler(event)}>Signup</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
    signupComplete: state.auth.signupComplete
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onSignup: (email, password) => dispatch(actions.signup(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);