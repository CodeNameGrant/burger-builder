import React from 'react'

import Aux from '../../hoc/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css'

export default function Layout( props ) {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />

      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}



