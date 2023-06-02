import React, { useState } from 'react'
import styles from './Item.module.css'

const Item = props => {
  const [selectedSize, setSelectedSize] = useState(null)

  return (
    <div className={styles.item}>
      <img src={props.item.img} alt='' onClick={() => props.onShowItem(props.item)} />
      <h2>{props.item.title}</h2>
      <p>{props.item.desc}</p>
      <b>{props.item.price} руб</b>
      <div className={styles['actions-wrapper']}>
        <div
          className={`${styles['add-to-cart']} ${
            !selectedSize ? styles['add-to-cart-disabled'] : ''
          }`}
          onClick={() => {
            if (selectedSize) {
              props.onAdd(props.item, selectedSize)
              setSelectedSize(null)
            }
          }}
        >
          +
        </div>
        <div className={styles.sizes}>
          {props.item.size.map(sizeValue => (
            <div
              key={Math.floor(Math.random() * 10000)}
              onClick={() => setSelectedSize(sizeValue)}
              className={`${styles.size} ${
                sizeValue === selectedSize ? styles['size-selected'] : ''
              }`}
            >
              {sizeValue}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Item
