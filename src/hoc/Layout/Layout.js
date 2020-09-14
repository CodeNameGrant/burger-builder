import React, { useState } from 'react'
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css'

const Layout = props => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }

    return (
      <Aux>
        <Toolbar
          authenticated={props.authenticated}
          toggleSideDrawer={sideDrawerToggleHandler} />
        <SideDrawer
          authenticated={props.authenticated}
          open={showSideDrawer}
          closed={sideDrawerClosedHandler} />

        <main className={classes.Content}>
          {props.children}
        </main>
      </Aux>
    )
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);

