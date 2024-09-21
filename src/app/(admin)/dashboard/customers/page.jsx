"use client";
import { useEffect, useState } from "react";
import { getAllCustomers } from "@utils/actions/customers";
import { useSelector } from "react-redux";
import Breadcrumbs from "@components/admin/Breadcrumbs";
import Title from "@components/admin/Title";
import Image from "next/image";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.currentUser?.clerkId);


  useEffect(() => {
    setLoading(true);
    const fetchCustomers = async () => {
      const customers = await getAllCustomers(userId);
      setCustomers(customers);
      setLoading(false);
    };

    fetchCustomers();
  }, [userId]);

  return (
    <>
      <Breadcrumbs
        base="Dashboard"
        parent="Customers"
        parentLink="/dashboard/customers"
        child="All Customers"
      />
      <div className="flex">
        <Title title="Customers" />
      </div>
      <div className="payment-table bg-white dark:bg-gray-700 relative rounded-md">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-invert">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700">
                {customers.map((customer, index) => (
                  <tr key={customer._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <th>{index + 1}</th>
                    <td className="invert-gray-text">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <Image
                              src={customer.avatar}
                              alt={customer.firstName}
                              width={48}
                              height={48}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{customer.firstName} {customer.lastName}</div>
                          <div className="text-sm opacity-80">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.phone || "N/A"}</td>
                    <td>{customer.city || "N/A"}</td>
                    <td>{customer.country || "N/A"}</td>
                    <td>{customer.address || "N/A"}</td>
                    <td>
                      <span className="badge badge-success">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">You have no customers yet!</p>
        )}
      </div>
    </>
  )
}
