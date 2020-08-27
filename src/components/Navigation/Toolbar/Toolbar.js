import React from 'react'

import classes from './Toolbar.module.css';

export default function Toolbar() {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <div>LOGO</div>
      <nav>
        ...Links
      </nav>
    </header>
  )
}
