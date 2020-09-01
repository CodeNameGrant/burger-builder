import React from 'react'

import NavigationItem from './NavgationItem/NavigationItem'

import classes from './NavigationItems.module.css';

export default function NavigationItems() {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  )
}
