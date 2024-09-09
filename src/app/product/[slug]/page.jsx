import ProductQtyWrapper from "@components/ProductQtyWrapper";
import { fetchProduct } from "@utils/actions/data";
import Image from "next/image";
import { notFound } from "next/navigation";
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
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const product = await fetchProduct(slug);

		if (!product) {
			notFound();
		}

		const plusMinuceButton =
			"flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

		return (
			<>
				<section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10 items-center">
					{/* image gallery */}
					<div className="container mx-auto px-4">
						<Image
							src={product.productImage}
							alt={product.name}
							width={500}
							height={500}
						/>
					</div>

					<div className="mx-auto px-5 lg:px-5">
						<h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.name}</h2>
						<p className="mt-5 font-bold">
							Availability:{" "}
							<span className="text-green-600">
								{product.isAvailable === "true" ? (
									<span className="text-cgreen-500">In Stock</span>
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
							Product ID: <span className="font-normal">{product.id}</span>
						</p>
						<p className="mt-4 text-4xl font-bold text-violet-900">
							${product.price}
							{/* <span className="text-xs text-gray-400 line-through">
							$300
						</span> */}
						</p>
						<div
							className="pt-5 text-sm leading-5 text-gray-500"
							dangerouslySetInnerHTML={{
								__html: product && product.description,
							}}
						></div>
						<div className="mt-6">
							<p className="pb-2 text-xs text-gray-500">Quantity</p>
							<ProductQtyWrapper product={product} />
						</div>
					</div>
				</section>
			</>
		);
	} catch (error) {
		console.error("Error fetching product:", error);
		notFound();
	}
}
