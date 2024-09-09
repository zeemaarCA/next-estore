"use client";

import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addItem } from "@redux/cart/cartSlice";
import { useAuth } from "@clerk/nextjs";

/* eslint-disable react/prop-types */
export default function AddToCartButton({
	product,
	isLoading,
	isAdded,
	className,
	quantity,
}) {
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const [loading, setLoading] = useState(isLoading || false);
	const [added, setAdded] = useState(isAdded || false);
	const dispatch = useDispatch();

	const handleAddToCart = async () => {
		if (!userId) {
			toast.error("Please log in to add items to the cart.");
			return;
		}

		const newProduct = {
			userId: userId,
			id: product._id,
			title: product.name,
			price: product.price,
			image: product.productImage,
			slug: product.slug,
			category: product.category,
			quantity: quantity || 1,
		};

		try {
			setLoading(true);

			const res = await fetch("/api/cart/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			const data = await res.json();
			console.log("data", data);
			console.log(newProduct);

			if (res.ok) {
				if (newProduct) {
					dispatch(addItem(newProduct));
				} else {
					console.error("Error adding to dispatch:", data);
				}

				// toast.success(data.message || `${product.name} added to cart!`);
				toast.success(`${product.name} added to cart!`);
				setAdded(true);
			} else {
				toast.error("Failed to add item to cart.");
			}
		} catch (error) {
			console.error("Error adding to cart:", error);
			toast.error("An unexpected error occurred. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			className={className}
			onClick={handleAddToCart}
			disabled={loading || added}
		>
			{loading ? (
				<>
					<span className="loading loading-spinner"></span>
					Loading...
				</>
			) : added ? (
				<>
					<IoBagCheck className="mr-2 h-5 w-5"/> Added
				</>
			) : (
				<>
					<MdOutlineShoppingCart className="mr-2 h-5 w-5" />
					Add to cart
				</>
			)}
		</button>
	);
}
