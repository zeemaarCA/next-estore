export const metadata = {
	title: "Cart",
	description: "Find your cart items and proceed to checkout.",
};

import { auth } from "@clerk/nextjs/server";
import CartPage from "@components/cart/CartPage";
import { fetchCart } from "@utils/actions/data";
import { redirect } from "next/navigation";

export default async function Cart() {
	const { userId } = auth();
	if (!userId) {
		redirect("/");
	}
	try {
		const cartfromserver = await fetchCart(userId);
		if (!cartfromserver) {
			console.log("Cart not found for user:", userId);
		}

		return (
			<>
				{cartfromserver === null ? (
					<div className="container mx-auto px-4 mt-10">
						<div className="flex justify-center">
							<h1 className="font-semibold text-2xl">Your cart is empty</h1>
						</div>
					</div>
				) : (
					<CartPage cartfromserver={cartfromserver} />
				)}
			</>
		);
	} catch (err) {
		console.error("Error fetching cart:", err);
		throw new Error("Failed to fetch cart");
	}
}
