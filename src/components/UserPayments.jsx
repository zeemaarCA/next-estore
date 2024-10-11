"use client";
import { useEffect, useState } from "react";
import { getPayments } from "@utils/actions/payments";
import { useSelector } from "react-redux";
import moment from "moment";
import { formatPrice } from "@lib/formatters";

export default function UserPayments() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.currentUser?.clerkId);


  useEffect(() => {
    setLoading(true);
    const fetchPayments = async () => {
      const payments = await getPayments(userId);
      setPayments(payments);
      setLoading(false);
    };

    fetchPayments();
  }, [userId]);



  return (
    <>
      <div className="payment-table">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
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
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td className="invert-slate-text">{payment.sessionId}</td>
                    <td className="invert-slate-text">{payment.email}</td>
                    <td className="invert-slate-text">{formatPrice(payment.amount)}</td>
                    <td className="invert-slate-text">{payment.paymentMethod}</td>
                    <td className="invert-slate-text">{payment.status}</td>
                    <td className="invert-slate-text">{moment(payment.createdAt).format('LLL')}</td>
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
