import SectionTitle from "./SectionTitle";
import SingleProduct from "./SingleProduct";

export default function Products({ products }) {
	if (products.length === 0) {
		return <p>No products available</p>;
	}

	// console.log("products", products);

	return (
		<>

			<div className="container mx-auto my-8 px-8 md:px-0">
				<SectionTitle
					title="Latest Products"
					link="/shop"
					linkText="Show more"
				/>
				<div className="grid grid-cols-12 gap-4">
					{products.map((product) => (
						<div key={product._id} className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-gray-500 bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-3`}>
							<SingleProduct product={product} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
