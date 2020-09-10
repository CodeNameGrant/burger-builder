import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authReqStart = () => {
  return {
    type: actionTypes.AUTH_REQ_START
  }
}

export const authSignupComplete = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_COMPLETE
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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (secondsToExpiration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, secondsToExpiration * 1000)
  }
}

export const signup = (email, password) => {
  return (dispatch) => {
    dispatch(authReqStart());
    const authData = {
      email, password,
      returnSecureToken: true
    }

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCK7se5GlidPUODSDTZGUXbarf8_lWUdAE', authData)
      .then(response => {
        dispatch(authSignupComplete());
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authReqStart());
    const authData = {
      email, password,
      returnSecureToken: true
    }

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCK7se5GlidPUODSDTZGUXbarf8_lWUdAE', authData)
      .then(response => {
        const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expDate', expDate)
        localStorage.setItem('userId', response.data.localId)

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());

    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate > new Date()) {
        dispatch(authSuccess(token, localStorage.getItem('userId')))
        dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));

      } else {
        dispatch(logout());
      }
    }


  }
}