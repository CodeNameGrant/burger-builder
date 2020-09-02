import React from 'react'

import classes from './Input.module.css';

export default function Input( props ) {
  console.log(props)
  let inputElement = null;

  switch ( props.elementType ) {
    
    case 'textarea':
      inputElement = <textarea 
        className={classes.InputElement}
        {...props.elementConfig} />
      break;

    case 'select':
      inputElement = <select className={classes.InputElement}>
        {
          props.elementConfig.options.map(opt => {
            return <option value={opt.value}>{opt.text}</option>;
          })
        }
      </select>

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
