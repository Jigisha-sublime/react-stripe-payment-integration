import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements'
import '../assets/CheckoutForm.scss'


const CheckoutForm = ({ selectedProduct, history, stripe }) => {

  if (!Object.keys(selectedProduct).length) history.push('/')

  const [receiptUrl, setReceiptUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const { token } = await stripe.createToken()
    const order = await axios.post('http://localhost:7000/api/stripe/charge', {
      amount: selectedProduct.price.toString().replace('.', ''),
      source: token.id,
      receipt_email: 'customer@example.com'
    })
    setReceiptUrl(order.data.charge.receipt_url)
  }

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
    <div className="checkout-form">
      <p>Amount: ${selectedProduct.price}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
        <CardNumberElement />
        </label>
        <label>
          Expiration date
        <CardExpiryElement />
        </label>
        <label>
          CVC
        <CardCVCElement />
        </label>
        <button type="submit" className="order-button">
          Pay
      </button>
      </form>
    </div>
  )
}

export default injectStripe(CheckoutForm)
