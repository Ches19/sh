import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import Order from '../Order/Order'
import styles from './Header.module.css'

function Header(props) {
  const [cartOpen, setCartOpen] = useState(false)

  const totalSum = props.orders.reduce(
    (total, item) => total + Number(item.amount) * Number(item.price),
    0
  )

  return (
    <header className={styles.header}>
      <div className={styles.panel}>
        <span className={styles.logo}>Сherevichki </span>
        <div className={styles.menu}>
          {props.orders.length > 0 && <div className={styles.counter}>{props.orders.length}</div>}
          <FaShoppingCart
            onClick={() => setCartOpen(!cartOpen)}
            className={`${styles['shop-cart']} ${cartOpen && styles['active']}`}
          />
          <ul className={styles.nav}>
            <li>Про нас</li>
            <li>Контакты</li>
            <li>Кабинеты</li>
          </ul>
        </div>
        {cartOpen && (
          <div className={styles.sc}>
            {props.orders.length > 0 ? (
              <div>
                {props.orders.map(el => (
                  <Order
                    onAddOneItem={props.onAddOneItem}
                    onRemoveOneItem={props.onRemoveOneItem}
                    onDelete={props.onDelete}
                    key={Math.floor(Math.random() * 10000)}
                    item={el}
                  />
                ))}
                <p className={styles.summa}>Сумма: {totalSum} руб</p>
                <span className={styles.oform}>Оформить заказ</span>
              </div>
            ) : (
              <div className={styles.empty}>
                <h2>Товаров нет...</h2>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.presentation}></div>
    </header>
  )
}

export default Header
