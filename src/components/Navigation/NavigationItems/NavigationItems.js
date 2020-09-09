import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {console.log("authenticated", props.authenticated)}
      {props.authenticated ?
        <NavigationItem link="/logout">Logout</NavigationItem> :
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      }
    </ul>
  )
}

export default navigationItems;