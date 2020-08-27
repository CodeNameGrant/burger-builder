import React from 'react'

import Logo from '../../Logo/Logo';

import classes from './Toolbar.module.css';

export default function Toolbar() {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>
        ...Links
      </nav>
    </header>
  )
}
