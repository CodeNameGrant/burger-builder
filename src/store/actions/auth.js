import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email, password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCK7se5GlidPUODSDTZGUXbarf8_lWUdAE';
    if (isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCK7se5GlidPUODSDTZGUXbarf8_lWUdAE'
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}