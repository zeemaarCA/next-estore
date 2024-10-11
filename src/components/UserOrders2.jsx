"use client";
import { useEffect, useState } from "react";
import { getOrders } from "@utils/actions/orders";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import {formatPrice} from "@lib/formatters";

export default function UserOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.currentUser?.clerkId);


  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const orders = await getOrders(userId);
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
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Payment Stauts</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <th>{index + 1}</th>
                    <td>
                      <span className="bg-slate-200 rounded-full p-1 dark:bg-slate-700"><strong>OrderId</strong>: {order.orderId}</span>
                      <div className="invert-slate-text divide-y divide-slate-500 dark:divide-slate-700">
                        {order.products.map((product, productIndex) => (
                          <div key={productIndex} className="py-2 flex flex-col">
                            <span className="line-clamp-1">(x{product.quantity}) {product.title}
                            </span>
                            {order.orderStatus === "Delivered" && (
                              product.reviewCompleted ? (
                                <span className="text-gray-500">Review completed - <Link href={`/orders/review/edit-review?reviewId=${product.reviewId}&orderId=${order._id}&productId=${product.productId}`} className="!text-primary">Edit Review</Link></span>
                              ) : (
                                <span className="underline underline-offset-4 !text-primary">
                                  <Link className="!text-primary" href={`/orders/review?orderId=${order._id}&productId=${product.productId}`}>
                                    Write a review
                                  </Link>
                                </span>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>{order.paymentStatus === "succeeded" ? "Paid" : "Failed"}</td>
                    <td className="invert-slate-text">{formatPrice(order.amount)}</td>
                    <td>
                      <span
                        className={`badge gap-2 ${order.orderStatus === "Processing"
                          ? "badge-warning"
                          : order.orderStatus === "Shipped"
                            ? "badge-accent"
                            : order.orderStatus === "Delivered"
                              ? "badge-success"
                              : order.orderStatus === "Cancelled"
                                ? "badge-error"
                                : order.orderStatus === "Pending"
                                  ? "badge-neutral"
                                  : "dark"
                          }`}
                      >
                        {order.orderStatus || "Processing"}
                      </span>
                    </td>
                    <td className="invert-slate-text">{moment(order.createdAt).format('LLL')}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">You have no orders yet!</p>
        )}
      </div>
    </>
  )
}
