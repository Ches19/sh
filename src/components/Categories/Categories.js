import React, { useState, useEffect } from 'react'
import styles from './Categories.module.css'

const Categories = props => {
  const [, setCurrentCategories] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://646f370109ff19b12086caf8.mockapi.io/sh/category')
      .then(res => {
        return res.json()
      })

      .then(data => {
        const categoriesData = data.map(category => ({ ...category }))

        setCategories(categoriesData)
        setCurrentCategories(categoriesData)
      })
  }, [])

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
