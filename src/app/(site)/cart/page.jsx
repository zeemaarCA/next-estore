export const metadata = {
	title: "Cart",
	description: "Find your cart items and proceed to checkout.",
};

import { auth } from "@clerk/nextjs/server";
import CartPage from "@components/cart/CartPage";
import { fetchCart } from "@utils/actions/cart";
import { redirect } from "next/navigation";
import EmptyCart from "@components/icons/EmptyCart";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export const dynamic = "force-dynamic";

export default async function Cart() {
	const { userId } = auth();
	if (!userId) {
		redirect("/");
	}
	try {
		const cartfromserver = await fetchCart(userId, { cache: "no-store" });
		if (!cartfromserver) {
			console.log("Cart not found for user:", userId);
		}

		return (
			<>
				{cartfromserver === null ? (
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
