import SectionTitle from "@components/SectionTitle";
import SingleProduct from "@components/SingleProduct";
import { notFound } from "next/navigation";
import { fetchProductsByCategory } from "@utils/actions/product";
import Pagination from "@components/Pagination";
import PriceFilter from "@components/PriceFilter";
import Search from "@components/Search";


export async function generateMetadata({ params }) {
	const { category } = params;

	// Capitalize the first letter of category
	const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

	return {
		title: capitalizedCategory,
		description: `Find the ${category} category related products. Shop our latest collection of products.`,
	};
}

export default async function CategoryPage({ params, searchParams }) {
	const { category } = params;
	const q = searchParams?.q || "";
	const page = searchParams?.page ? parseInt(searchParams.page) : 1;

	try {
		// await new Promise((resolve) => setTimeout(resolve, 2000));
		const { count, plainProducts } = await fetchProductsByCategory(q, page, category, 12);

		if (plainProducts.length === 0) {
			notFound();
		}
		return (
			<>
				<section className="py-24 relative">
					<div className="w-full container">
						<SectionTitle title={category} />
						<div className="flex flex-col gap-3 md:flex-row justify-end items-center bg-primary/15 rounded-md p-4 mb-6 shadow-sm">
							<Search placeholder="Search for a product..." count={count} />
						</div>
						<div className="grid grid-cols-12 gap-6">
							{/* <Filters /> */}
							<div className="col-span-12 md:col-span-12 flex justify-between items-center">
								{count === 0 && (
									<h5 className="text-red-600">No Products found</h5>
								)}
								<h5>&nbsp;</h5>

								<h5 className="text-slate-600 dark:text-slate-400">Showing <span className="text-primary font-bold text-lg">{count}</span> Products</h5>
							</div>
							<div className="col-span-12 md:col-span-12">
								<div className="grid grid-cols-12 gap-4">
									{plainProducts.map((product) => (
										<div
											key={product._id}
											className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg border border-slate-100 dark:border-slate-500 bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3`}
										>
											<SingleProduct product={product} />
										</div>
									))}
								</div>
								{count > 12 && <Pagination count={count} />}

							</div>
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