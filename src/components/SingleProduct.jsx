"use client"

import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "@components/cart/AddToCartBtn";
export default function SingleProduct({ product }) {
	return (
		<>
			<div className="">
				<Link
					className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-xl"
					href={`/product/${product.slug}`}
				>
					<Image
						className="object-fit"
						src={product.productImage}
						alt="product image"
						width={400}
						height={500}
						loading="lazy"
					/>

					{/* <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
				</Link>
				<div className="mt-4 px-5 pb-5">
					<span className="badge-theme-sm">
						{product.category}
					</span>
					<Link href={`/product/${product.slug}`}>
						<h5 className="text-lg tracking-tight line-clamp-2">
							{product.name}
						</h5>
					</Link>
					<div className="mt-2 mb-5 flex items-center justify-between">
						<p>
							<span className="text-2xl font-bold">${product.price}</span>
							{/* <span className="text-sm line-through">${product.price + 25}</span> */}
						</p>
					</div>
					<AddToCartBtn product={product} className="btn-theme w-full" />
				</div>
			</div>
		</>
	);
}
