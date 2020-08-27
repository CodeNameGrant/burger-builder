
import React from 'react'

import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'


const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Meat', type: 'meat'},
  { label: 'Cheese', type: 'cheese'},
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

      <button className={classes.OrderButton} disabled={!props.perchasable}>Order Now</button>
    </div>
  )
}
