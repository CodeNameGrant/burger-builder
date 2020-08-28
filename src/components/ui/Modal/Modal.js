import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {

  /* Modal will render any children it has, like OrderSummary. If Modal isnt rendered, 
   * Order Summary wont be either.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate() {
    console.log("[Modal] componentDidUpdate");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} click={this.props.modalClosed}/>
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;