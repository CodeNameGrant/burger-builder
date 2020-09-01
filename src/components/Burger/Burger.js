import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import classes from './Burger.module.css'

export default function Burger( props ) {
  console.log("[Burger.js]", props)

  // 2-dimentionsal array
  let transformedIngredients = Object.keys(props.ingredients)  // Extract keys from ingredients object, which are the types
    .map((igType) => {
      return [...Array(props.ingredients[igType])] // return array with a length the same as the ingredient type
        .map((_, idx) => {  // Map each array item to a BurgerIngredient for that type
          // key = 'meat1, meat2, etc'
          return <BurgerIngredient key={igType + idx} type={igType} />
        });
    })
    .reduce((initialArr, el) => {
      return initialArr.concat(el);
    }, [])

    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}
