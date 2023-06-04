import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items'
import Categories from './components/Categories/Categories'
import ShowFullItem from './components/Showfullitem/ShowFullItem'

const App = () => {
  const [orders, setOrders] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://646f370109ff19b12086caf8.mockapi.io/sh/item')
      .then(res => {
        return res.json()
      })

      .then(data => {
        const itemsData = data.map(item => ({ ...item, amount: 0 }))

        setItems(itemsData)
        setCurrentItems(itemsData)
      })
  }, [])

  const [showFullItem, setShowFullItem] = useState(false)
  const [fullItem, setFullItem] = useState({})

  const addToOrder = (item, selectedSize) => {
    const isAlreadyInOrder = orders.find(
      order => order.id === item.id && order.selectedSize === selectedSize
    )

    if (isAlreadyInOrder) {
      const newOrders = orders
      const currentItemIndex = orders.findIndex(
        innerItem => innerItem.id === item.id && innerItem.selectedSize === selectedSize
      )

      if (currentItemIndex === -1) {
        return
      }

      newOrders[currentItemIndex].amount++
      newOrders[currentItemIndex].selectedSize = selectedSize

      setOrders([...newOrders])

      return
    }

    setOrders([...orders, { ...item, amount: 1, selectedSize }])
  }

  const deleteOrder = (id, size) => {
    setOrders(
      orders.filter(el => {
        if (el.id === id && el.selectedSize === size) {
          return false
        }

        return true
      })
    )
  }

  const chooseCategory = category => {
    if (category === 'all') {
      setCurrentItems(items)
      return
    }
    setCurrentItems(items.filter(el => el.category === category))
  }

  const onShowItem = item => {
    setFullItem(item)
    setShowFullItem(!showFullItem)
  }

  const addOneItemToOrder = (itemId, size) => {
    const newOrders = [...orders]
    const currentItemIndex = orders.findIndex(
      innerItem => innerItem.id === itemId && innerItem.selectedSize === size
    )

    if (currentItemIndex === -1) {
      return
    }

    newOrders[currentItemIndex].amount++

    setOrders(newOrders)
  }

  const removeOneItemFromOrder = (itemId, size) => {
    const newOrders = [...orders]
    const currentItemIndex = orders.findIndex(
      innerItem => innerItem.id === itemId && innerItem.selectedSize === size
    )

    if (currentItemIndex === -1) {
      return
    }

    if (newOrders[currentItemIndex].amount > 1) {
      newOrders[currentItemIndex].amount--
      setOrders(newOrders)

      return
    }

    deleteOrder(itemId, size)
  }

  // выбираем все товары по умолчанию
  useEffect(() => {
    setCurrentItems(prevItems => items)
  }, [items])

  return (
    <div className='wrapper'>
      <Header
        onAddOneItem={addOneItemToOrder}
        onRemoveOneItem={removeOneItemFromOrder}
        orders={orders}
        onDelete={deleteOrder}
      />
      <Categories chooseCategory={chooseCategory} />
      <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder} />
      {showFullItem && <ShowFullItem onAdd={addToOrder} onShowItem={onShowItem} item={fullItem} />}
      <Footer />
    </div>
  )
}

export default App
