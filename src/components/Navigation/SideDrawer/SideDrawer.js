import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../ui/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

import classes from './SideDrawer.module.css';

export default function SideDrawer( props ) {
  
  const attachedClasses = [ classes.SideDrawer, classes.Close ];
  if (props.open) {
    attachedClasses.splice(1, 1, classes.Open)
  }
  
  return (
    <Aux>
      <Backdrop show={props.open} click={props.closed}/>

      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}
