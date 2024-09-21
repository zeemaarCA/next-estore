"use client";

import { useSelector } from "react-redux";
import cartSlice from "@redux/cart/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutDetails() {
	const cartItems = useSelector((state) => state.cart.items);
	const totalQuantity = useSelector((state) => state.cart.items.length);

	const router = useRouter();


	const calculateTotalPrice = () => {
		const totalPrice = cartItems.reduce(
			(total, item) => total + item.price * (item.quantity || 1),
			0
		);
		return totalPrice.toFixed(2);
	};
	return (
		<>
			<div className="h-80 overflow-y-auto">
				{cartItems.length > 0 ? (
					cartItems.map((item) => (
						<div
							className="grid grid-cols-7 w-full py-3 border-b border-theme-gray"
							key={item.id}
						>
							<div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
								<Image
									src={item.image}
									alt={item.title}
									width={150}
									height={150}
									className="w-full rounded-md object-cover"
								/>
							</div>
							<div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
								<div className="flex flex-col min-[500px]:flex-row min-[500px]:items-end justify-between gap-3">
									<div>
										<h5 className="text-base leading-5 mb-1 line-clamp-2 invert-gray-text">
											{item.title}
										</h5>
										<p className="font-normal text-sm leading-1 invert-gray-text">
											Quantity :{" "}
											<span className="font-semibold">{item.quantity}</span>
										</p>
									</div>
									<h5 className="font-medium text-base leading-5 whitespace-nowrap sm:text-right">
										${item.price} x {item.quantity}
									</h5>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="flex items-center justify-center sm:justify-end w-full my-6">
						<div className="w-full">
							<h1>No product found in cart</h1>
						</div>
					</div>
				)}
			</div>

			<div className="flex items-center justify-center sm:justify-end w-full my-6">
				<div className=" w-full">
					<div className="flex items-center justify-between mb-3">
						<p className="font-normal text-base leading-8 invert-gray-text">
							Subtotal
						</p>
						<p className="font-semibold text-base leading-8">
							${calculateTotalPrice()}
						</p>
					</div>
					<div className="flex items-center justify-between mb-3">
						<p className="font-normal text-base leading-8 invert-gray-text">
							Shipping Charge
						</p>
						<p className="font-semibold text-base leading-8">$5.00</p>
					</div>
					<div className="flex items-center justify-between mb-3">
						<p className="font-normal text-base leading-8 invert-gray-text">
							Taxes
						</p>
						<p className="font-semibold text-base leading-8">$0</p>
					</div>
					<div className="flex items-center justify-between mb-3">
						<p className="font-normal text-base leading-8 invert-gray-text">
							Discount
						</p>
						<p className="font-semibold text-base leading-8">10%</p>
					</div>
					<div className="flex items-center justify-between py-6 border-t border-theme-gray">
						<p className="font-semibold text-2xl invert-gray-text leading-9">
							Total
						</p>
						<p className="font-bold text-2xl leading-9">
							${calculateTotalPrice()}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
