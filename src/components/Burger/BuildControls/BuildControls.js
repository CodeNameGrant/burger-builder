
import React from 'react'

import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'


const controls = [
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
  { label: 'Salad', type: 'salad'},
];

export default function BuildControls( props ) {
  return (
    <div className={classes.BuildControls}>

      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

      {controls.map((control) => (
        <BuildControl 
          key={control.label} 
          label={control.label} 
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)} 
          disabled={props.disabled[control.type]} />
      ))}

      <button 
        className={classes.OrderButton} 
        disabled={!props.perchasable}
        onClick={props.ordered}>Order Now</button>
    </div>
  )
}
