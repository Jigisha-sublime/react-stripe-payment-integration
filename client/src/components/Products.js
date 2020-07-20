import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

import '../assets/Products.scss'

const Products = ({ products }) => {
  let history = useHistory();

  const handleToken = async (token, product) => {
    const response = await axios.post(
      "http://localhost:8080/checkout",
      { token, product }
    );
    const { status } = response.data;
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return products.map(prod => (
    <div className="product" key={prod.id}>
      <section>
        <h2>{prod.name}</h2>
        <p>{prod.desc}</p>
        <h3>{'$' + prod.price}</h3>

        <StripeCheckout
          stripeKey={process.env.STRIPE_SECRET_KEY}
          token={handleToken}
          amount={prod.price * 100}
          name={prod.name}
          billingAddress
          shippingAddress
        />
      </section>
      <img src={prod.img} alt={prod.name} />
    </div>
  ))
}

export default Products
