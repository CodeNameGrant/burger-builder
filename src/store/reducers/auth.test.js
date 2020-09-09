import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store he token on login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, { type: actionTypes.AUTH_SUCCESS, token: "some-token", userId: 'some-userId'}))
    .toEqual({
      token: "some-token",
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
});