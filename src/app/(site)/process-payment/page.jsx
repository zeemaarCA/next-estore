import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation"
import Stripe from "stripe"
import { PaymentForm } from "@components/PaymentForm"
import { fetchProductsInCart } from "@utils/actions/orders"
import ShopSteps from "@components/ShopSteps";

export const metadata = {
  title: "Payment",
  description:
    "Complete your purchase by entering your payment details.",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function Payment() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();

  const cartItems = await fetchProductsInCart(user.id)

  if (!cartItems || cartItems.length === 0) return notFound()

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100), // Convert to cents
    currency: "USD",
    metadata: { userId: user.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent")
  }

  return (
    <div className="container mb-10">
      <div className="mb-10">
        <ShopSteps currentStep={3} />
      </div>
      <PaymentForm
        cartItems={cartItems}
        clientSecret={paymentIntent.client_secret}
      />
    </div>
  )
}