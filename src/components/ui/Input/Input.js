import React from 'react'

import classes from './Input.module.css';

export default function Input( props ) {

  let inputElement = null;

  switch ( props.elementType ) {
    
    case 'textarea':
      inputElement = <textarea 
        className={classes.InputElement}
        {...props.elementConfig} />
      break;

    case 'select':
      const options = props.config.options.map(opt => {
        return <option value={opt.value}>{opt.text}</option>;
      });
      inputElement = <select className={classes.InputElement}>{options}</select>

      break;
    
    case 'input':
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
      
      // eslint-disable-next-line
    default:
      break
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}
