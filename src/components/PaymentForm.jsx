"use client"

import { formatCurrency } from "@lib/formatters"
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { useState } from "react"
import Button from "./Button"
import SectionTitle from "./SectionTitle"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
)

export function PaymentForm({ cartItems, clientSecret }) {
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="w-full mx-auto space-y-8 bg-invert p-6 shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="uppercase text-xl md:text-2xl lg:text-3xl font-bold">Confirm Payment</h1>
        <div className="text-xl font-bold">
          Total: {formatCurrency(totalAmount)}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-2">
        <div className="flex flex-col gap-4 flex-1">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 items-center">
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <div className="text-base">
                  {formatCurrency(item.price)}
                </div>
                <h3 className="text-sm font-bold">{item.title}</h3>
                <div className="invert-gray-text">
                  Quantity: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 w-full md:w-auto">

          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <Form totalAmount={totalAmount} />
          </Elements>
        </div>
      </div>
    </div>
  )
}

function Form({ totalAmount }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [email, setEmail] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) return

    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/process-payment/success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message)
        } else {
          setErrorMessage("An unknown error occurred")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="text-error">{errorMessage}</div>
      )}
      <PaymentElement />
      <div className="my-4">
      <LinkAuthenticationElement
        onChange={e => setEmail(e.value.email)}
        />
        </div>
      <Button
        className="w-full mt-4"
        disabled={stripe == null || elements == null || isLoading}
      >
        {isLoading
          ? "Purchasing..."
          : `Purchase - ${formatCurrency(totalAmount)}`}
      </Button>
    </form>
  )
}