
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
      {controls.map((control) => {
        return <BuildControl key={control.label} label={control.label} />
      })}
    </div>
  )
}
