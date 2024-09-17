"use client";
import { useEffect, useState } from "react";
import { getPayments } from "@utils/actions/payments";
import { useSelector } from "react-redux";

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
      <div className="payment-table">
        {loading ? (
          <div className="flex justify-center items-center">
            loading...
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
                    <td className="invert-gray-text">{payment.sessionId}</td>
                    <td className="invert-gray-text">{payment.email}</td>
                    <td className="invert-gray-text">${formatAmount(payment.amount)}</td>
                    <td className="invert-gray-text">{payment.paymentMethod}</td>
                    <td className="invert-gray-text">{payment.status}</td>
                    <td className="invert-gray-text">{new Date(payment.createdAt).toLocaleDateString()}</td>
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
