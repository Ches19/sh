import React, { useState } from 'react'
import styles from './Categories.module.css'

const Categories = props => {
  const [categories] = useState([
    {
      key: 'all',
      name: 'Всё',
    },
    {
      key: 'keds',
      name: 'Кеды',
    },
    {
      key: 'kross',
      name: 'Кроссовки',
    },
    {
      key: 'bots',
      name: 'Ботинки',
    },
  ])

  return (
    <div className={styles.categories}>
      {categories.map(el => (
        <div
          key={el.key}
          className={props.selectedCategory === el.key ? 'active' : ''}
          onClick={() => props.chooseCategory(el.key)}
        >
          {el.name}
        </div>
      ))}
    </div>
  )
}

export default Categories
