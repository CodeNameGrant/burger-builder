import React from 'react'

import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

export default function Model( props ) {
  return (
    <Aux>
      <Backdrop show={props.show} click={props.modalClosed}/>
      <div className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}>
        {props.children}
      </div>
    </Aux>
  )
}
