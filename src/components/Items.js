import React from 'react'
import Item from './Item/Item'

import itemStyles from './Item/Item.module.css'

const Items = props => {
  return (
    <main className={itemStyles.main}>
      {props.items.map(el => (
        <Item onShowItem={props.onShowItem} key={el.id} item={el} onAdd={props.onAdd} />
      ))}
    </main>
  )
}

export default Items
