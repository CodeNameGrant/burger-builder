import React from 'react'

import classes from './Button.module.css';

export default function Button( props ) {
  return (
  <button
    className={[ classes.Button, classes[props.type] ].join(' ')}
    onClick={props.clicked}>{props.children}</button>
  )
}
