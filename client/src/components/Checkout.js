import React, { useEffect } from 'react'
import stripe from 'stripe'
import { useHistory } from "react-router-dom";

import { StripeProvider, Elements } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

const Checkout = ({ selectedProduct }) => {
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <StripeProvider apiKey={process.env.STRIPE_SECRET_KEY}>
      <Elements>
        <CheckoutForm selectedProduct={selectedProduct} history={history} stripe={stripe} />
      </Elements>
    </StripeProvider>

  )
}

export default Checkout
