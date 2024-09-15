"use client";

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "@redux/cart/cartSlice";
import {
	updateStart,
	updateSuccess,
	updateFailure,
} from "@redux/user/userSlice";
import { useAuth } from '@clerk/nextjs'
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Button from "@components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setCheckoutFormFilled } from "@redux/checkout/checkoutSlice";

export default function CheckoutForm() {
	const { userId } = useAuth()
	const dispatch = useDispatch();
	const router = useRouter();
	const currentUser = useSelector((state) => state.user.currentUser);


	const [formData, setFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	useEffect(() => {
		if (currentUser) {
			// If customerData exists in Redux, update the formData state
			setFormData({
				fullName: currentUser.fullName || "",
				phone: currentUser.phone || "",
				city: currentUser.city || "",
				country: currentUser.country || "",
				address: currentUser.address || "",
			});
		} else {
			// If no customerData in Redux, use default values
			setFormData({
				fullName: "",
				phone: "",
				city: "",
				country: "",
				address: "",
			});
		}
	}, [currentUser?.emailAddress]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setIsProcessingPayment(true);

		try {
			const response = await fetch(`/api/checkout/update/${userId}`, {
				method: "PATCH",
				body: JSON.stringify({
					fullName: formData.fullName,
					phone: formData.phone,
					city: formData.city,
					country: formData.country,
					address: formData.address,
					isCompleted: true,
				}),
				headers: {
					"Content-Type": "application/json", // Add this to ensure it's correctly interpreted
				},
			});

			const data = await response.json();

			if (response.ok) {
				toast.success("Successfully updated your details");
				dispatch(updateSuccess(data.user));
				dispatch(setCheckoutFormFilled(true));
				setIsSubmitting(false);
				router.push("/process-payment");
			} else {
				dispatch(updateFailure(data.message));
				// Show the error message from the backend if available
				toast.error(data.message || "Error updating your details");
				setIsProcessingPayment(false);
			}
		} catch (error) {
			console.log(error);
			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{isProcessingPayment ? (
				<div className="flex flex-col items-center justify-center h-full">
					<h5>Processing...</h5>
					<span className="loading loading-infinity loading-lg"></span>
				</div>
			) : (
				<div className="bg-invert p-6 shadow-md rounded-lg">
					<h2 className="text-base font-semibold mb-4">
						{currentUser.isCompleted === true
							? "Pleae verify your details"
							: "Please fill the form to checkout"}
					</h2>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<Input
								labelText="Full Name"
								type="text"
								className=""
								value={formData.fullName}
								onChange={(e) =>
									setFormData({ ...formData, fullName: e.target.value })
								}
								placeholder="Enter your full name"
							/>
						</div>
						<div>
							<Input
								labelText="Phone"
								type="tel"
								className=""
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
								placeholder="Enter your phone number"
							/>
						</div>
						<div className="flex justify-between items-center gap-2">
							<div className="w-full">
								<Input
									labelText="City"
									type="text"
									className=""
									value={formData.city}
									onChange={(e) =>
										setFormData({ ...formData, city: e.target.value })
									}
									placeholder="Enter your city"
								/>
							</div>
							<div className="w-full">
								<Input
									labelText="Country"
									type="text"
									className=""
									value={formData.country}
									onChange={(e) =>
										setFormData({ ...formData, country: e.target.value })
									}
									placeholder="Enter your country"
								/>
							</div>
						</div>
						<div>
							<Textarea
								labelText="Address"
								className="invert-gray-text"
								placeholder="Enter your address"
								rows="3"
								value={formData.address}
								onChange={(e) =>
									setFormData({ ...formData, address: e.target.value })
								}
							/>
						</div>
						<Button type="submit" className="w-full">
							{isSubmitting ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Proceed to payment"
							)}
						</Button>
					</form>
				</div>
			)}
		</>
	);
}
