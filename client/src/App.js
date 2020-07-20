import React, { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Products from './components/Products'
import Checkout from './components/Checkout'
import { products } from './data/products'


const App = () => {
  const [selectedProduct, setSelectedProduct] = useState({})
  const [productList, setProductList] = useState([])

  useEffect(() => {
    setProductList(products)
  }, [])

  const handleProductSelect = (prod) => {
    setSelectedProduct(prod)
  }
  return (
    <BrowserRouter >
      <Switch>
        <AppRouter
          exact
          path="/"
          component={Products}
          products={productList}
          selectProduct={(prod) => handleProductSelect(prod)}
        />

        {/* Checkout component not currently in use. 
            Added this to setting custome field elements with react-stripe-elements */}
        <AppRouter
          exact
          path="/checkout"
          component={Checkout}
          selectedProduct={selectedProduct}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App

const AppRouter = ({ component: Component, exact, path, ...rest }) => (
  <Route
    render={() => (
      <Component
        {...rest}
      />)}
  />)