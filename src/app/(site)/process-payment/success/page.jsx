export const metadata = {
  title: "Payment Success",
  description: "Thank you for your payment.",
}

import { ConfettiSideCannons } from "@components/ConfettiSideCannons"
import Image from "next/image"
import Link from "next/link"
import { IoBagCheck } from "react-icons/io5";
import { notFound, redirect } from "next/navigation"
import Stripe from "stripe"
import { createOrder, getRecentOrders } from "@/utils/actions/orders"
import { createPayment } from "@/utils/actions/payments"
import { sendOrderEmail } from "@/lib/OrderEmail"
import ShopSteps from "@components/ShopSteps";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function PaymentSuccess({ searchParams }) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )

  const userId = paymentIntent.metadata.userId


  const isSuccess = paymentIntent.status === "succeeded"

  if (isSuccess) {
    try {
      await createPayment(userId, paymentIntent);
      await createOrder(userId, paymentIntent);

      // Fetch order details after order creation
      const orderDetails = await getRecentOrders(userId);

      if (orderDetails.length > 0) {
        await sendOrderEmail(orderDetails[0]); // Send the email with the first order in the array
      } else {
        console.error("No orders found for user.");
      }
    } catch (error) {
      console.error("Failed to create order or payment, or send email:", error);
    }
  }

   // Fetch the order details again for rendering on the page
   const orderDetails = await getRecentOrders(userId);

   if (orderDetails.length === 0) {
     return notFound();
   }


  const totalProductPrice = orderDetails.reduce((total, order) => {
    return total + order.products.reduce((productTotal, product) => {
      return productTotal + parseFloat(product.price);
    }, 0);
  }, 0);

  // Format the total price
  const formattedTotalPrice = totalProductPrice.toFixed(2);

  if (orderDetails.length === 0) {
    return notFound()
  }


  return (
    <>
      <ConfettiSideCannons />
      <section className="pb-24 relative">
      <ShopSteps currentStep={4} />
        <div className="w-full md:max-w-4xl px-4 md:px-5 py-6 md:py-12 lg-6 mx-auto bg-invert rounded-md shadow-md mt-6">
          {orderDetails.map((order) => (
            <div key={order._id}>
              <div className="flex flex-col items-center justify-center gap-4">
                <IoBagCheck className="text-5xl text-primary" />
                <h2 className="font-bold text-3xl sm:text-4xl leading-10 invert-slate-text mb-6 text-center">
                  Your Order Confirmed
                </h2>
              </div>
              <h6 className="font-medium text-xl leading-8 invert-slate-text mb-3">Hello, {order.userDetails.firstName}</h6>

              <p className="font-normal text-lg leading-8 invert-lslate-text mb-11">Your order has been completed and be
                delivery in only two days.</p>
              <span className="invert-slate-text text-sm mb-2 inline-block">Order ID: {order.orderId}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 py-6 border-y border-slate-100">
                <div className="box group">
                  <p className="invert-lslate-text">Order Date</p>
                  <h6 className="text-md font-semibold">{order.paymentDetails.createdAt?.toString().slice(4, 16)}</h6>
                </div>
                <div className="box group">
                  <p className="invert-lslate-text">Payment Method</p>
                  <h6 className="text-md font-semibold">{order.paymentDetails.paymentMethod}</h6>
                </div>
                <div className="box group">
                  <p className="invert-lslate-text">Address</p>
                  <h6 className="text-md font-semibold">
                    {order.userDetails.address}
                  </h6>
                </div>
              </div>
              {order.products.map((product) => (
                <div key={product.productId} className="grid grid-cols-7 w-full py-6 border-b border-slate-100">
                  <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                    <Image src={product.productImage} alt={product.title} className="w-full rounded-xl object-cover"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                    <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                      <div className>
                        <h5 className="font-semibold">{product.title}
                        </h5>
                        <p className="font-normal text-md invert-slate-text">Quantity : <span className="font-semibold">{product.quantity}</span></p>
                      </div>
                      <h5 className="invert-slate-text text-lg sm:text-right mt-3">
                        ${product.price}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center sm:justify-end w-full my-6">
                <div className=" w-full">
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-normal text-xl leading-8 invert-lslate-text">Subtotal</p>
                    <p className="font-semibold text-xl leading-8 invert-slate-text">${formattedTotalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-normal text-xl leading-8 invert-lslate-text">Shipping Charge</p>
                    <p className="font-semibold text-xl leading-8 invert-slate-text">$0.00</p>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-normal text-xl leading-8 invert-lslate-text">Taxes</p>
                    <p className="font-semibold text-xl leading-8 invert-slate-text">$0.00</p>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-normal text-xl leading-8 invert-lslate-text">Discount</p>
                    <p className="font-semibold text-xl leading-8 invert-slate-text">{order.discount}%</p>
                  </div>
                  <div className="flex items-center justify-between py-6 border-y border-slate-100">
                    <p className="font-manrope font-semibold text-2xl leading-9 invert-slate-text">Total</p>
                    <p className="font-manrope font-bold text-2xl leading-9 text-primary">${order.paymentDetails.amount / 100}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="data ">
            <p className="font-normal text-lg leading-8 invert-lslate-text mb-11">We&apos;ll be sending a shipping
              confirmation email when the items shipped successfully.</p>
            <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">Thank you for shopping
              with us!</h6>
            <p className="font-medium text-xl leading-8 text-primary">Team Decore</p>
          </div>
          <div className="action-btn mt-8 flex justify-center">
            <Link href={"/orders"} className="btn-theme">Go to Orders Page</Link>
          </div>
        </div>
      </section>


    </>
  )
}
