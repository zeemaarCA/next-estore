"use client";
import { useEffect, useState } from "react";
import { getOrders } from "@utils/actions/orders";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import { formatPrice } from "@lib/formatters";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

export default function UserOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.currentUser?.clerkId);


  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const orders = await getOrders(userId);
      console.log(orders);
      setOrders(orders);
      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  return (
    <>
      <div className="order-table">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <section className="pb-12 relative" key={index}>
              <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="mt-7 border border-theme-slate rounded-md">
                  <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11 bg-slate-100 dark:bg-slate-700 py-6 md:py-3 border-b border-theme-slate rounded-tl-md rounded-tr-md">
                    <div className="data">
                      <p className="font-medium text-base md:text-lg leading-none md:leading-8 invert-black-text">Order : #{order.orderId}</p>
                    </div>
                    <div className="flex items-center gap-3 max-md:mt-5">
                      <p className="font-medium text-base md:text-lg leading-none md:leading-8 invert-black-text">Order Date: {moment(order.createdAt).format("lll")}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    {order.products.map((product, productIndex) => (
                      <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 py-5 border-b last:border-b-0 border-theme-slate" key={productIndex}>
                        <div className="grid grid-cols-4 w-full">
                          <div className="col-span-4 sm:col-span-1">
                            <Image src={product.productImage} alt={product.title} height={200} width={200} className="max-sm:mx-auto object-cover rounded-md" />
                          </div>
                          <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                            <Link href={`/product/${product.slug}`}>
                              <h6 className="font-semibold text-center md:text-left text-lg leading-6 invert-black-text mb-3">
                                {product.title}
                              </h6>
                            </Link>
                            <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                              {order.orderStatus === "Delivered" && (
                                <span className="font-normal text-lg leading-8 invert-slate-text whitespace-nowrap">
                                  {product.reviewCompleted ? (
                                    <span className="invert-slate-text"><Link href={`/orders/review/edit-review?reviewId=${product.reviewId}&orderId=${order._id}&productId=${product.productId}`} className="!text-primary underline underline-offset-4">Edit Review</Link></span>
                                  ) : (
                                    <span className="underline underline-offset-4 !text-primary">
                                      <Link className="!text-primary" href={`/orders/review?orderId=${order._id}&productId=${product.productId}`}>
                                        Write a review
                                      </Link>
                                    </span>
                                  )}
                                </span>
                              )}
                              <span className="font-normal text-lg leading-8 invert-slate-text whitespace-nowrap">Qty: {product.quantity}</span>
                              <p className="font-semibold text-xl leading-8 invert-black-text whitespace-nowrap">Price ${product.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                          <div className="flex flex-col justify-center items-start max-sm:items-center">
                            <p className="font-normal text-lg invert-slate-text leading-8 mb-2 text-left whitespace-nowrap">Status</p>
                            <p className={`font-semibold text-lg leading-8 text-left whitespace-nowrap ${order.orderStatus === "Processing"
                              ? "text-orange-500"
                              : order.orderStatus === "Shipped"
                                ? "text-accent"
                                : order.orderStatus === "Delivered"
                                  ? "text-green-500"
                                  : order.orderStatus === "Cancelled"
                                    ? "text-error"
                                    : order.orderStatus === "Pending"
                                      ? "text-neutral"
                                      : "dark"
                              }`}>
                              {order.orderStatus || "Processing"}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center items-start max-sm:items-center">
                            <p className="font-normal text-lg invert-slate-text leading-8 mb-2 text-left whitespace-nowrap">Promo Discount</p>
                            <p className="font-semibold text-lg leading-8 invert-black-text text-left whitespace-nowrap">{order.discount}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Footer */}
                  <div className="px-3 md:px-11 py-4 flex items-center justify-between max-sm:flex-col-reverse border-t border-theme-slate">
                    <div className="flex max-sm:flex-col-reverse items-center">
                      <p className={`font-normal text-lg leading-8 ${order.paymentStatus === "succeeded" ? "text-emerald-600" : "text-red-500"}`}>
                        {order.paymentStatus === "succeeded" ? (<div className="flex items-center gap-2"><FaCheck /> Payment Is Successful</div>) : "Payment Is Pending"}
                      </p>
                    </div>
                    <p className="font-medium text-xl leading-8 invert-black-text max-sm:py-4">
                      <span className="invert-slate-text">Total Price: </span> &nbsp;{formatPrice(order.amount)}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="text-center">You have no orders yet!</p>
        )}
      </div>
    </>

  )
}
