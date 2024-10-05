"use client";
import { useEffect, useState } from "react";
import { getAllPayments } from "@utils/actions/payments";
import { useSelector } from "react-redux";
import Breadcrumbs from "@components/admin/Breadcrumbs";
import Title from "@components/admin/Title";
import { formatPrice } from "@lib/formatters";
import moment from "moment";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.currentUser?.clerkId);


  useEffect(() => {
    setLoading(true);
    const fetchPayments = async () => {
      const payments = await getAllPayments(userId);
      setPayments(payments);
      setLoading(false);
    };

    fetchPayments();
  }, [userId]);

  return (
    <>
      <Breadcrumbs
        base="Dashboard"
        parent="Payments"
        parentLink="/dashboard/payments"
        child="All Payments"
      />
      <div className="flex">
        <Title title="User Payments" />
      </div>
      <div className="payment-table bg-whitedark:bg-slate-700 relative rounded-md">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-invert">
                <tr>
                  <th>#</th>
                  <th>Session Id</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-700">
                {payments.map((payment, index) => (
                  <tr key={payment._id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <th>{index + 1}</th>
                    <td className="invert-slate-text">{payment.sessionId}</td>
                    <td className="invert-slate-text">{payment.email}</td>
                    <td className="invert-slate-text">{formatPrice(payment.amount)}</td>
                    <td className="invert-slate-text">{payment.paymentMethod}</td>
                    <td className="invert-slate-text">{payment.status}</td>
                    <td className="invert-slate-text">{moment(payment.createdAt).format("ll")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">You have no payments yet!</p>
        )}
      </div>
    </>
  )
}
