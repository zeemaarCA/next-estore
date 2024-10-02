"use client";
import { useEffect, useState } from "react";
import { getOrders } from "@utils/actions/orders";
import { useSelector } from "react-redux";
import moment from "moment";

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

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "0";

    // Convert amount to number if it's a string
    const numericAmount =
      typeof amount === "string" ? parseInt(amount, 10) : amount;

    // Convert amount from cents to dollars (if needed) and format
    const formattedAmount = (numericAmount / 100).toFixed(2);

    // Format the amount with commas as thousand separators
    return new Intl.NumberFormat().format(formattedAmount);
  };

  return (
    <>
      <div className="order-table">
        {loading ? (
          <div className="flex justify-center items-center">
            loading...
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
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <th>{index + 1}</th>
                    <td>
                      <span className="bg-slate-300 rounded-full p-1 dark:bg-slate-700"><strong>OrderId</strong>: {order.orderId}</span>
                      <div className="invert-slate-text divide-y divide-slate-500 dark:divide-slate-700">
                        {order.products.map((product, productIndex) => (
                          <div key={productIndex} className="py-2 flex">
                            <span className="line-clamp-1">(x{product.quantity}) {product.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>{order.paymentStatus === "succeeded" ? "Paid" : "Failed"}</td>
                    <td className="invert-slate-text">${formatAmount(order.amount)}</td>
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
