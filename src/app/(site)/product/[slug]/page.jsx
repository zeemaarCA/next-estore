import ProductQtyWrapper from "@components/ProductQtyWrapper";
import SectionTitle from "@components/SectionTitle";
import { fetchSiteProducts } from "@utils/actions/product";
import SingleProduct from "@components/SingleProduct";
import { fetchProduct } from "@utils/actions/product";
import { getReviews } from "@utils/actions/reviews"
import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewsSection from "@components/reviews/ReviewsSection";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import ReactImageGallery from "react-image-gallery";
// import Rater from "react-rater";
// import "react-rater/lib/react-rater.css";

const stripHtmlTags = (html) => {
	if (!html) return "";
	return html.replace(/<[^>]*>/g, "");
};

// Function to generate metadata dynamically
export async function generateMetadata({ params }) {
	const { slug } = params;

	// Fetch user data to set metadata
	const products = await fetchProduct(slug);
	const productName = products?.name || "Product Name";
	const desc = stripHtmlTags(products?.description || "Product description");

	return {
		title: productName,
		description: desc,
	};
}

export default async function ProductPage({ params }) {
	const { slug } = params;
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const product = await fetchProduct(slug);
		const { reviews, averageRating, totalReviews } = await getReviews(product._id);

		if (!product) {
			notFound();
		}
		const { plainProducts } = await fetchSiteProducts("", 1, product.category, "", "newest", 4, product._id);

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
				<section className="container flex-grow max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10 items-center">
					{/* image gallery */}
					<div className="container">
						<Image
							src={product.productImage}
							alt={product.name}
							width={500}
							height={500}
							className="rounded-lg shadow-md"
						/>
					</div>

					<div className="mx-auto px-5 lg:px-5">
						<h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.name}</h2>
						<div className="reviews mt-2 badge-theme max-w-max">
							{totalReviews > 0 ? (
								 <span className="flex items-center gap-1">
								 {averageRating.toFixed(1)}/5 ({totalReviews} {totalReviews > 1 ? "reviews" : "review"})
								 {renderStars(averageRating)}
							 </span>
							) : (
								<span>No reviews yet</span>
							)}
						</div>
						<p className="mt-2 font-bold">
							Availability:{" "}
							<span>
								{product.isAvailable === "true" ? (
									<span className="text-primary">In Stock</span>
								) : (
									<span className="text-red-500">Out of stock</span>
								)}{" "}
							</span>
						</p>
						<p className="font-bold">
							Brand: <span className="font-normal">Decora</span>
						</p>
						<p className="font-bold">
							Category: <span className="font-normal">{product.category}</span>
						</p>
						<p className="font-bold">
							Product ID: <span className="font-normal">{product._id}</span>
						</p>
						<p className="mt-4 text-4xl font-bold text-primary drop-shadow-sm">
							${product.price}
							{/* <span className="text-xs text-slate-400 line-through">
							$300
						</span> */}
						</p>
						<div
							className="pt-5 text-sm leading-5"
							dangerouslySetInnerHTML={{
								__html: product && product.description,
							}}
						></div>
						<div className="mt-6">
							<p className="pb-2 text-xs text-slate-600 dark:text-slate-300">Quantity</p>
							<ProductQtyWrapper product={product} />
						</div>
					</div>
				</section>

				{/* review section */}
				<ReviewsSection reviews={reviews} />
				{/* review section */}
				{/* related products */}
				{
					plainProducts.length > 0 &&
					<div className="container mb-10">
						<SectionTitle title="Related Products" />
						<div className="grid grid-cols-12 gap-4">
							{plainProducts.map((product) => (
								<div key={product._id} className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg border border-slate-100 dark:border-slate-500 bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-3`}>
									<SingleProduct product={product} />
								</div>
							))}
						</div>
					</div>
				}

				{/* related products */}

			</>
		);
	} catch (error) {
		console.error("Error fetching product:", error);
		notFound();
	}
}


