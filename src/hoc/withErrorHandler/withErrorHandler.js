import React, { Component, useEffect, useState } from 'react'

import Modal from '../../components/ui/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {

    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(request => {
      setError(null)

      return request;
    });

    const resInterceptor = axios.interceptors.response.use(res => res,
      error => {
        setError(null);
      });


    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor])

    const errorConfirmedHander = () => {
      setError(null)
    }

    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={errorConfirmedHander}>{error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
}

export default withErrorHandler;