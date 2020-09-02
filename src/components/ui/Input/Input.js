import React from 'react'

import classes from './Input.module.css';

export default function Input( props ) {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.shouldValidate && !props.isValid) {
    inputClasses.push(classes.Invalid);
  }

  switch ( props.elementType ) {
    
    case ( 'textarea' ):
      inputElement = <textarea 
        className={inputClasses.join(' ')}
        onChange={props.inputChanged}
        value={props.value}
        {...props.attributes} 
        />
      break;

    case ( 'select' ):
      inputElement = <select 
        className={inputClasses.join(' ')}
        onChange={props.inputChanged}>
        {
          props.options.map(opt => {
            return <option key={opt.value} value={opt.value}>{opt.text}</option>;
          })
        }
      </select>

      break;
    
    case ( 'input' ):
      inputElement = <input 
        className={inputClasses.join(' ')}
        onChange={props.inputChanged}
        value={props.value}
        {...props.attributes} />
      
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
