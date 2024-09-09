import Image from "next/image";
export default function CartItem({
	cartItems,
	handleDeleteItem,
	handleUpdateQuantity,
}) {
	// console.log("CartItems received:", cartItems);
	return (
		<>
			{cartItems.map((item) => (
				<div
					key={item.id}
					className="flex flex-col md:flex-row items-center hover:bg-gray-100 dark:hover:bg-base-100 -mx-8 px-6 py-5"
				>
					<div className="flex w-full md:w-2/5">
						<div className="w-20">
							<Image
								className="h-24 w-16 max-w-max"
								src={item.image}
								alt={item.title}
								width={80}
								height={80}
							/>
						</div>
						<div className="flex flex-col justify-between ml-4 flex-grow">
							<span className="font-bold text-sm">{item.title}</span>
							<span className="badge-theme-sm max-w-max">{item.category}</span>
							<button
								className="font-semibold border-b hover:border-b border-b-red-500 text-error text-xs flex justify-start max-w-max"
								onClick={() => handleDeleteItem(item.id)}
							>
								Remove
							</button>
						</div>
					</div>
					<div className="flex md:contents flex-row-reverse w-full mt-7 justify-between items-center">
						<div className="flex justify-center w-1/5">
							<button
								onClick={() =>
									handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
								}
							>
								<svg
									className="fill-current text-gray-600 w-3"
									viewBox="0 0 448 512"
								>
									<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
								</svg>
							</button>
							<input
								className="mx-2 border text-center w-8"
								type="text"
								value={item.quantity.$numberInt || item.quantity}
							/>
							<button
								onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
							>
								<svg
									className="fill-current text-gray-600 w-3"
									viewBox="0 0 448 512"
								>
									<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
								</svg>
							</button>
						</div>
						<span className="text-center invert-gray-text w-1/5 font-semibold text-sm">
							${item.price.$numberDouble || item.price}
						</span>
						<span className="text-center w-1/5 font-semibold text-sm">
							$
							{`${(
								(item.price.$numberDouble || item.price) *
								(item.quantity.$numberInt || item.quantity)
							).toFixed(2)}`}
						</span>
					</div>
				</div>
			))}
		</>
	);
}
