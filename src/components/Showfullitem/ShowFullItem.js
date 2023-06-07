import React, { useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import styles from './ShowFullItem.module.css'

const ShowFullItem = ({ item, onShowItem, onAdd }) => {
  const [selectedSize, setSelectedSize] = useState(null)
  const modalRef = useRef()

  useOnClickOutside(modalRef, () => onShowItem(item))

  return (
    <div className={styles['full-item']}>
      <div ref={modalRef}>
        <div className={styles.fi}>
          <img src={item.img} alt='' />
        </div>
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
        <b>{item.price} руб</b>
        <pre className={styles.v2}>{item.opis}</pre>
        <div className={styles['actions-wrapper']}>
          <div
            className={`${styles['add-to-cart']} ${
              !selectedSize ? styles['add-to-cart-disabled'] : ''
            }`}
            onClick={() => {
              if (selectedSize) {
                onAdd(item, selectedSize)
                setSelectedSize(null)
              }
            }}
          >
            +
          </div>
          <div className={styles.sizes}>
            {item.size.map(sizeValue => (
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
    </div>
  )
}

export default ShowFullItem
