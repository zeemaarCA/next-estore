"use client";

import {
	removeItem,
	setCartItems,
	setLoading,
	updateItemQuantity,
	selectTotalQuantity,
} from "@redux/cart/cartSlice";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import CartItem from "./CartItem";
import { useEffect } from "react";

export default function CartPage({ cartfromserver }) {
	const { userId } = useAuth();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items) || [];
	const totalQuantity = useSelector(selectTotalQuantity);
	// console.log("cartItemsinRedux", cartItems);
	useEffect(() => {
		if (cartfromserver) {
			dispatch(setCartItems(cartfromserver.items));
		}
	}, [dispatch, cartfromserver]);
	const handleUpdateQuantity = async (itemId, newQuantity) => {
		try {
			// Send the PATCH request to update the cart
			const res = await fetch(`/api/cart/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemId, newQuantity }),
			});

			if (!res.ok) throw new Error("Failed to update cart");

			const updatedCart = await res.json();
			// Update Redux cart data
			dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
			dispatch(setCartItems(updatedCart.cart.items));
		} catch (err) {
			console.error("Error updating cart:", err);
		}
	};

	const handleDeleteItem = async (itemId) => {
		try {
			// Send the DELETE request to remove the item from the cart
			const res = await fetch(`/api/cart/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemId }),
			});

			if (res.ok) {
				toast.success("Item removed from cart");
			}

			if (!res.ok) {
				toast.error("Failed to remove item from cart");
			}

			// Remove the item from Redux cart data
			dispatch(removeItem(itemId));
		} catch (err) {
			console.error("Error deleting item:", err);
		}
	};

	// calculate total price
	const calculateTotalPrice = () => {
		const totalPrice = cartItems.reduce(
			(total, item) => total + item.price * (item.quantity || 1),
			0
		);

		return totalPrice.toFixed(2); // Return the total price rounded to 2 decimal places
	};

	return (
		<>
			{cartItems.length > 0 ? (
				<div className="container mx-auto mt-10">
					<div className="flex flex-col md:flex-row flex-wrap shadow-md my-10">
						<div className="w-full md:w-3/4 bg-invert px-10 py-10">
							<div className="flex justify-between border-b pb-8">
								<h1 className="font-semibold text-2xl">Shopping Cart</h1>
								<h2 className="font-semibold text-2xl">
									{totalQuantity} Items
								</h2>
							</div>
							<div className="mt-10 mb-5 hidden md:flex">
								<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
									Product Details
								</h3>
								<h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
									Quantity
								</h3>
								<h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
									Price
								</h3>
								<h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
									Total
								</h3>
							</div>
							<CartItem
								cartItems={cartItems}
								handleDeleteItem={handleDeleteItem}
								handleUpdateQuantity={handleUpdateQuantity}
							/>
							<Link
								href="/shop"
								className="flex font-semibold text-sm mt-10"
							>
								<svg
									className="fill-current mr-2 w-4"
									viewBox="0 0 448 512"
								>
									<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
								</svg>
								Continue Shopping
							</Link>
						</div>
						<div id="summary" className="w-full md:w-1/4 px-8 py-10">
							<h1 className="font-semibold text-2xl border-b pb-8">
								Order Summary
							</h1>
							<div className="flex justify-between mt-10 mb-5">
								<span className="font-semibold text-sm uppercase">
									Items {totalQuantity}
								</span>
								<span className="font-semibold text-sm">
									${calculateTotalPrice()}
								</span>
							</div>
							<div>
								<label className="font-medium inline-block mb-3 text-sm uppercase">
									Shipping
								</label>
								<select className="select select-bordered w-full max-w-xs">
									<option disabled selected>
										Who shot first?
									</option>
									<option>Han Solo</option>
									<option>Greedo</option>
								</select>
							</div>
							<div className="py-10">
								<label
									htmlFor="promo"
									className="font-semibold inline-block mb-3 text-sm uppercase"
								>
									Promo Code
								</label>
								<input
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<button className="btn-theme">Apply</button>
							<div className="border-t mt-8">
								<div className="flex font-semibold justify-between py-6 text-sm uppercase">
									<span>Total cost</span>
									<span>${calculateTotalPrice()}</span>
								</div>
								<button className="btn-theme w-full">Checkout</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="container mx-auto mt-10">
					<div className="flex justify-center">
						<h1 className="font-semibold text-2xl">Your cart is empty</h1>
					</div>
				</div>
			)}
		</>
	);
}
