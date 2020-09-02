import React from 'react'

import classes from './Input.module.css';

export default function Input( props ) {

  let inputElement = null;

  switch ( props.inputType ) {
    case 'input':
      inputElement = <input className={classes.InputElement} {...props} />
      break;

    case 'textarea':
      inputElement = <textarea className={classes.InputElement} />
      break;
    
    default:
      inputElement = <input className={classes.InputElement} {...props} />
      break
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}
