import React from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

import styles from './Order.module.css'

const Order = ({ item, onDelete, onAddOneItem, onRemoveOneItem }) => {
  return (
    <div className={styles.item}>
      <img src={item.img} alt='' />
      <h2>
        {item.title} <span className={styles.size}>{item.selectedSize}</span>
      </h2>
      <div className={styles['flex-wrapper']}>
        <p>{`${item.price * item.amount} руб`}</p>
        <div className={styles['inner-wrapper']}>
          <span className={styles.amount}>{item.amount}</span>
          <FaTrash className={styles.delic} onClick={() => onDelete(item.id, item.selectedSize)} />

          <div className={styles['edit-amount-wrapper']}>
            <FaPlus
              className={styles.plus}
              onClick={() => {
                onAddOneItem(item.id, item.selectedSize)
              }}
            />
            <FaMinus
              className={styles.minus}
              onClick={() => {
                onRemoveOneItem(item.id, item.selectedSize)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
