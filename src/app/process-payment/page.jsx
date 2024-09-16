import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation"
import { PaymentForm } from "@components/PaymentForm"
import { fetchProductsInCart } from "@utils/actions/orders"

export const metadata = {
  title: "Payment",
  description:
    "Complete your purchase by entering your payment details.",
};

export default async function Payment() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();

  const cartItems = await fetchProductsInCart(user.id)

  if (!cartItems || cartItems.length === 0) return notFound()

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 my-10">
      <PaymentForm
        cartItems={cartItems}
        totalAmount={totalAmount}
        userId={user.id}
      />
    </div>
  )
}