"use client";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { userData, totalSalesAmount, userOrders, gettotalProducts, getUserOrderCounts } from "@utils/actions/dashboardData";
import { useEffect, useState } from "react";
import { formatPrice } from "@lib/formatters";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [lastMonthOrders, setLastMonthOrders] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastMonthProducts, setLastMonthProducts] = useState(0);
  const [userOrdersCounts, setUserOrdersCounts] = useState([]);


  const data1 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(253, 244, 255, 1)",
        borderColor: "rgba(232, 121, 249, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [1, 3, 2, 5, 4, 5, 7],
      },
    ],
  };

  const data2 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(236, 254, 255, 1)",
        borderColor: "rgba(34, 211, 238, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [1, 5, 4, 5, 3, 6, 3],
      },
    ],
  };

  const data3 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(255, 251, 235, 1)",
        borderColor: "rgba(251, 191, 36, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [2, 5, 4, 6, 3, 5, 7],
      },
    ],
  };

  const data4 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(236, 253, 245, 1)",
        borderColor: "rgba(52, 211, 153, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [1, 5, 2, 5, 3, 7, 6],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
        display: false,
        ticks: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },

        display: false,
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };


  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      const userDataForDashboard = await userData();
      setUsers(userDataForDashboard.users);
      setTotalUsers(userDataForDashboard.totalUsers);
      setLastMonthUsers(userDataForDashboard.lastMonthUsers);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchUserOrders = async () => {
      const fetchedOrders = await userOrders();
      setOrders(fetchedOrders.orders);
      setTotalOrders(fetchedOrders.totalOrders);
      setLastMonthOrders(fetchedOrders.lastMonthOrders);
      setLoading(false);
    };

    fetchUserOrders();
  }, []);


  useEffect(() => {
    setLoading(true);
    const fetchTotalProducts = async () => {
      const fetchedTotalProducts = await gettotalProducts();
      setProducts(fetchedTotalProducts.products);
      setTotalProducts(fetchedTotalProducts.totalProducts);
      setLastMonthProducts(fetchedTotalProducts.lastMonthProducts);
      setLoading(false);
    };

    fetchTotalProducts();
  },
    []);

  useEffect(() => {
    const fetchUserOrderCounts = async () => {
      try {
        setLoading(true); // Set loading to true before data fetching starts
        const fetchedUserOrderCounts = await getUserOrderCounts();
        setUserOrdersCounts(fetchedUserOrderCounts); // Set data
      } catch (error) {
        console.error("Error fetching user order counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrderCounts();
  }, []);


  useEffect(() => {
    setLoading(true);
    const fetchTotalSales = async () => {
      const totalSale = await totalSalesAmount();
      setTotalSales(totalSale);
      setLoading(false);
    };

    fetchTotalSales();
  },
    []);

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-700 pb-5 relative rounded-md">
        <div className="container px-5 mx-auto my-10 py-6">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative p-5 pb-16 overflow-hidden bg-invert rounded-md shadow-sm">
              <div className="text-base invert-lgray-text">Total Sales</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold invert-black-text">
                  {loading ? <span className="loading loading-spinner"></span> : formatPrice(totalSales)}
                </div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>1.8%</span>
                </span>
              </div>

              <div class="absolute bottom-0 inset-x-0  z-0">
                <Line height={80} data={data1} options={chartOptions} />
              </div>
            </div>
            <div className="relative p-5 pb-16 overflow-hidden bg-invert rounded-md shadow-sm">
              <div className="text-base invert-lgray-text">Orders</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold invert-black-text">
                  {loading ? <span className="loading loading-spinner"></span> : totalOrders}
                </div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded-full">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>2.5%</span>
                </span>
              </div>

              <div class="absolute bottom-0 inset-x-0 z-0">
                <Line height={80} data={data2} options={chartOptions} />
              </div>
            </div>
            <div className="relative p-5 pb-16 overflow-hidden bg-invert rounded-md shadow-sm">
              <div className="text-base invert-lgray-text">Customers</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold invert-black-text">
                  {loading ? <span className="loading loading-spinner"></span> :
                    totalUsers}
                </div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{lastMonthUsers}%</span>
                </span>
              </div>
              <div class="absolute bottom-0 inset-x-0 z-0">
                <Line height={80} data={data3} options={chartOptions} />
              </div>
            </div>
            <div className="relative p-5 pb-16 overflow-hidden bg-invert rounded-md shadow-sm">
              <div className="text-base invert-lgray-text">Total Products</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold invert-black-text">{loading ? <span className="loading loading-spinner"></span> : totalProducts}</div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>2.2%</span>
                </span>
              </div>
              <div class="absolute bottom-0 inset-x-0 z-0">
                <Line height={80} data={data4} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="container px-5 mx-auto my-10">
          <div className="customer-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="overflow-x-auto bg-invert rounded-md shadow-sm pb-4 min-h-32">
              <h3 className="p-4 text-lg font-bold">Customers</h3>
              {userOrdersCounts.length < 0 ? (
                <p className="text-center">No customers found</p>
              ) : (
                loading ? (
                  <div className="flex justify-center items-center min-h-24">
                    <span className="loading loading-spinner loading-sm"></span>
                  </div>
                ) : (
                  <table className="table">
                    {/* head */}
                    <thead className="bg-invert">
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Orders</th>
                      </tr>
                    </thead>
                    <tbody className="bg-invert">
                      {userOrdersCounts.map((usercount, index) => (
                        <tr key={usercount._id}>
                          <td>{index + 1}</td>
                          <td>{usercount.firstName}</td>
                          <td>{usercount.email}</td>
                          <td>{usercount.userOrders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>

            <div className="overflow-x-auto bg-invert rounded-md shadow-sm pb-4 min-h-32">
              <h3 className="p-4 text-lg font-bold">Orders</h3>
              {orders.length < 0 ? (
                <p className="text-center">No order found</p>
              ) : (
                loading ? (
                  <div className="flex justify-center items-center min-h-24">
                    <span className="loading loading-spinner loading-sm"></span>
                  </div>
                ) : (
                  <table className="table">
                    {/* head */}
                    <thead className="bg-invert">
                      <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-invert">
                      {orders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order.email}</td>
                          <td>{formatPrice(order.amount)}</td>
                          <td>
                            <span
                              className={`gap-2 ${order.orderStatus === "Processing"
                                ? "pill-warning"
                                : order.orderStatus === "Shipped"
                                  ? "pill-secondary"
                                  : order.orderStatus === "Delivered"
                                    ? "pill-success"
                                    : order.orderStatus === "Cancelled"
                                      ? "pill-danger"
                                      : order.orderStatus === "Pending"
                                        ? "pill-gray"
                                        : "dark"
                                }`}
                            >
                              {order.orderStatus || "Processing"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>


          </div>
        </div>
      </div>
    </>
  );
}