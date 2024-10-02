"use client";

import {
	removeItem,
	setCartItems,
	setLoading,
	updateItemQuantity,
	selectTotalQuantity,
} from "@redux/cart/cartSlice";
import { setPromo } from "@redux/promo/promoSlice";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoBagCheck } from "react-icons/io5";
import { MdOutlineCelebration } from "react-icons/md";
import EmptyCart from "@components/icons/EmptyCart";

export default function CartPage({ cartfromserver }) {
	const { userId } = useAuth();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items) || [];
	const reduxDiscount = useSelector((state) => state.promo.discount);
	const reduxPromoStatus = useSelector((state) => state.promo.isPromoApplied);
	const totalQuantity = useSelector(selectTotalQuantity);
	const [promotionCode, setPromotionCode] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (cartfromserver) {
			dispatch(setCartItems(cartfromserver.items));
			dispatch(setPromo({
        isPromoApplied: cartfromserver.isPromoApplied,
        discount: cartfromserver.discount,
      }));
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

	// promotion code Logic

	const applyPromotionCode = async () => {
		if (promotionCode === "") {
			toast.error("Please enter a promotion code");
			return;
		}

		try {
			setLoading(true);
			const res = await fetch(`/api/cart/promo`, {
				method: "POST",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ promotionCode }),
			});

			if (!res.ok) {
				const data = await res.json();
				toast.error(data.message);
				setLoading(false);
				dispatch(setPromo({
        isPromoApplied: false,
        discount: 0,
      }));
				return;
			}

			const data = await res.json();

			// set discount from database into state

			// Update Redux with the updated cart items after applying the promo code
			dispatch(setCartItems(data.cart.items));
			dispatch(setPromo({
        isPromoApplied: true,
        discount: data.discount,
      }));

			toast.success(data.message);
			setLoading(false);
		} catch (err) {
			console.error("Error applying promotion code:", err);
			toast.error("Error applying promotion code");
			dispatch(setPromo({
        isPromoApplied: false,
        discount: 0,
      }));
			setLoading(false);
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

	const priceBeforePromo = () => {
		const totalPrice = cartItems.reduce(
			(total, item) => total + (item.price / 0.9) * (item.quantity || 1),
			0
		);

		return totalPrice.toFixed(2); // Return the total price rounded to 2 decimal places
	};
	return (
		<>
			{cartItems.length > 0 ? (
				<div className="container mt-10">
					<div className="flex flex-col md:flex-row flex-wrap shadow-md my-10">
						<div className="w-full md:w-3/4 bg-invert px-10 py-10">
							<div className="flex justify-between border-b border-theme-slate pb-8">
								<h1 className="font-semibold text-2xl">Shopping Cart</h1>
								<h2 className="font-semibold text-2xl">
									{totalQuantity} Items
								</h2>
							</div>
							<div className="mt-10 mb-5 hidden md:flex">
								<h3 className="font-semibold invert-slate-text text-xs uppercase w-2/5">
									Product Details
								</h3>
								<h3 className="font-semibold invert-slate-text text-xs uppercase w-1/5 text-center">
									Quantity
								</h3>
								<h3 className="font-semibold invert-slate-text text-xs uppercase w-1/5 text-center">
									Price
								</h3>
								<h3 className="font-semibold invert-slate-text text-xs uppercase w-1/5 text-center">
									Total
								</h3>
							</div>
							{reduxPromoStatus && (
								<span className="badge-theme-sm !bg-blue-100 !text-blue-800 max-w-max !flex items-center">
									<MdOutlineCelebration className="mr-1" />
									Promo Code Applied - {reduxDiscount}% off
								</span>
							)}

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
							<h1 className="font-semibold text-2xl border-b border-theme-slate pb-8">
								Order Summary
							</h1>
							<div className="flex justify-between mt-10 mb-5">
								<span className="font-semibold text-sm uppercase">
									Items {totalQuantity}
								</span>
								{reduxPromoStatus ? (
									<span className="font-semibold text-sm">
										${priceBeforePromo()}
									</span>
								) : (
									<span className="font-semibold text-sm">
										${calculateTotalPrice()}
									</span>
								)}
							</div>
							<div className="pt-10 pb-5">
								<label
									htmlFor="promo"
									className="font-semibold inline-block mb-3 text-sm uppercase"
								>
									Promo Code
								</label>
								<input
									type="text"
									placeholder={reduxPromoStatus ? "Promo code applied" : "Code"}
									disabled={reduxPromoStatus}
									className="input input-bordered w-full"
									onChange={(e) => setPromotionCode(e.target.value)}
								/>
							</div>
							{loading ? (
								<button className="btn-theme w-full" disabled><span className="loading loading-spinner"></span></button>
							) : (
								<button
									className="btn-theme w-full"
									disabled={reduxPromoStatus}
									onClick={applyPromotionCode}>
									{reduxPromoStatus ? "Applied" : "Apply"}
								</button>
							)}
							<div className="border-t mt-8">
								<div className="flex font-semibold justify-between pt-6 pb-1 text-sm uppercase">
									<span>Discount</span>
									<span>{reduxDiscount}%</span>
								</div>
								<div className="flex font-semibold justify-between py-2 text-sm uppercase mb-4">
									<span>Total cost</span>
									<span>${calculateTotalPrice()}</span>
								</div>
								<Link href={"/checkout"} className="btn-theme w-full"><IoBagCheck className="w-5 h-5 mr-1" /> Checkout</Link>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="container min-h-40 mt-10 mb-10">
					<div className="flex justify-center items-center flex-col space-y-6 bg-invert py-20 max-w-lg mx-auto rounded-lg shadow-md">
						<div className="empty-cart-icon">
							<EmptyCart />
						</div>
						<h1 className="font-semibold text-2xl capitalize">Your cart is empty</h1>
						<p className="invert-slate-text">Add some items to your cart and start shopping</p>
						<Link href="/shop" className="btn-theme-outline">
							<IoArrowBackOutline className="w-5 h-5 mr-1" />
							Shop Now
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
