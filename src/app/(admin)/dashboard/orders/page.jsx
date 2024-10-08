"use client";

import Breadcrumbs from "@components/admin/Breadcrumbs";
import Title from "@components/admin/Title";
import { useEffect, useState } from "react";
import { getAllOrders } from "@utils/actions/orders";
import Button from "@components/admin/Button";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { formatPrice } from "@lib/formatters";
import moment from "moment";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [orderIdToDelete, setOrderIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const orders = await getAllOrders();
      setOrders(orders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleDropdownToggle = (orderId) => {
    // If the clicked dropdown is already active, close it; otherwise, open it
    setActiveDropdown(activeDropdown === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId, orderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus } : order
      )
    );
    setActiveDropdown(null);
    try {
      const res = await fetch(`/api/orders/updatestatus/${orderId}`, {
        method: "PATCH",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus,
        }),
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id
              ? { ...order, orderStatus: updatedOrder.orderStatus }
              : order
          )
        );
        toast.success("Order status updated successfully");
        setActiveDropdown(null);
        setLoading(false);
      } else {
        // If the update fails, revert the optimistic update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: order.orderStatus } : order
          )
        );
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.log(error.message);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: order.orderStatus } : order
        )
      );
      toast.error("Error updating order status");
    }
  };

  const handleDeleteOrder = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/order/deleteorder/${orderIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      if (res.ok) {
        setUserOrders((prev) =>
          prev.filter((order) => order._id !== orderIdToDelete)
        );
        toast.success("Order deleted successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <Breadcrumbs
        base="Dashboard"
        parent="Orders"
        parentLink="/dashboard/orders"
        child="All Orders"
      />
      <div className="flex">
        <Title title="User Orders" />
      </div>


      <div className="order-table bg-white dark:bg-slate-700 relative rounded-md">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-invert">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Payment Stauts</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <th>{index + 1}</th>
                    <td>
                      <span className="bg-slate-300 rounded-full py-1 dark:bg-slate-700 mr-1 px-2"><strong>OrderId</strong>: {order.orderId}</span>
                      <span className="bg-slate-300 rounded-full py-1 px-2 dark:bg-slate-700">{order.email}</span>
                      <div className="invert-slate-text divide-y divide-slate-400 dark:divide-slate-500">
                        {order.products.map((product, productIndex) => (
                          <div key={productIndex} className="py-2 flex">
                            <span className="line-clamp-1">(x{product.quantity}) {product.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>{order.paymentStatus === "succeeded" ? "Paid" : "Failed"}</td>
                    <td className="invert-slate-text">{formatPrice(order.amount)}</td>
                    <td>
                      {activeDropdown === order._id ? (
                        <div className="max-w-md">
                          <select
                            id="orderStatus"
                            required
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <option>--Select--</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </div>
                      ) : (
                        <span
                          className={`badge badge-neutral gap-2 ${order.orderStatus === "Processing"
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
                      )}
                    </td>
                    <td className="invert-slate-text">{moment(order.createdAt).format("ll")}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button
                          className={`btn btn-secondary btn-sm`}
                          onClick={() => handleDropdownToggle(order._id)}
                        >
                          <MdOutlineEdit />
                        </Button>
                        <Button
                          className={`btn btn-error btn-sm text-white`}
                          onClick={() => {
                            setShowModal(true);
                            setOrderIdToDelete(order._id);
                          }}
                        >
                          <MdDelete />
                        </Button>
                      </div>

                    </td>
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
