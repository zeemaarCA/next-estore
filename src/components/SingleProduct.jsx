"use client"

import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "@components/cart/AddToCartBtn";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function SingleProduct({ product }) {
	const averageRating = product.averageRating;
	const renderStars = (averageRating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= Math.floor(averageRating)) {
				// Full star for ratings like 1, 2, 3, etc.
				stars.push(<FaStar key={i} className="text-yellow-500" />);
			} else if (i === Math.ceil(averageRating) && averageRating % 1 !== 0) {
				// Half star for ratings like 3.5, 4.5, etc.
				stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
			} else {
				// Empty star
				stars.push(<FaRegStar key={i} className="text-gray-400" />);
			}
		}
		return stars;
	};
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

					<span class="absolute bottom-0 right-0 m-2 rounded-full px-2 text-center text-sm font-medium">
						<span className="mt-2 max-w-max badge-theme-sm !font-semibold !bg-primary dark:!text-slate-700 !text-white">
							{product.category}
						</span>
					</span>
				</Link>
				<div className="mt-4 px-5 pb-5">
					<span className="badge-theme-sm">
						{product.totalReviews > 0 ? (
							<span className="!flex items-center gap-1">
								{averageRating.toFixed(1)}/5 ({product.totalReviews} {product.totalReviews > 1 ? "reviews" : "review"})
								{renderStars(product.averageRating)}
							</span>
						) : (
								<span className="!flex items-center gap-1">(0 review)
									<FaRegStar className="text-gray-400" />
									<FaRegStar className="text-gray-400" />
									<FaRegStar className="text-gray-400" />
									<FaRegStar className="text-gray-400" />
									<FaRegStar className="text-gray-400" />
								</span>
						)}
					</span>

					<Link href={`/product/${product.slug}`}>
						<h5 className="text-lg tracking-tight line-clamp-2 dark:text-slate-100">
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
