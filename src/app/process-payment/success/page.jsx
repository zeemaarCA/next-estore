import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { createOrder } from "@/utils/actions/orders"
import { createPayment } from "@/utils/actions/payments"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function PaymentSuccess({ searchParams }) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )

  const userId = paymentIntent.metadata.userId

  const isSuccess = paymentIntent.status === "succeeded"

  if (isSuccess) {
    try {
      await createPayment(userId, paymentIntent)
      await createOrder(userId, paymentIntent)
    } catch (error) {
      console.error("Failed to create order or payment:", error)
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <button className="mt-4">
          hello
        </button>
      </div>
    </div>
  )
}
