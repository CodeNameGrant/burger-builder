import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/ui/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {

  const [controls, setControls] = useState({
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
  });

  const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        isValid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    });

    setControls(updatedControls);
  }

  const onAuthHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value);
  }

  const onSignupHandler = (event) => {
    event.preventDefault();
    props.onSignup(
      controls.email.value,
      controls.password.value);
  }

  let form = Object.keys(controls)
    .map(controlKey => {
      const formElement = controls[controlKey];
      return <Input
        key={controlKey}
        elementType={formElement.type}
        attributes={formElement.attributes}
        value={formElement.value}
        shouldValidate={formElement.validation}
        isValid={formElement.isValid}
        touched={formElement.touched}
        inputChanged={(event) => inputChangedHandler(event, controlKey)}
      />
    });

  if (props.loading) {
    form = <Spinner />
  }

  let errorMsg = null;
  if (props.error) {
    errorMsg = (
      <p>{props.error.message}</p>
    )
  }

  // Redirect on Login
  if (props.authenticated) {
    return <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {errorMsg}
      <form>
        {form}
      </form>
      {props.signupComplete ? <p>Your account has been created, please login to authenticate</p> : null}
      <Button type="Success" clicked={(event) => onAuthHandler(event)}>Login</Button>
      <Button type="Danger" clicked={(event) => onSignupHandler(event)}>Signup</Button>
    </div>
  )
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