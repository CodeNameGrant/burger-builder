import React from 'react'

import classes from './DrawerToggle.module.css';

export default function DrawerToggle( props ) {
  return (
    <div 
      className={classes.DrawerToggle}
      onClick={props.onClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
