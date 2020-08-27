import React from 'react'

import Aux from '../../hoc/Auxiliary'

import classes from './Layout.module.css'

export default function Layout( props ) {
  return (
    <Aux>
      <div>
        Toolbar, SideDraw, BackDrop
      </div>

      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}


