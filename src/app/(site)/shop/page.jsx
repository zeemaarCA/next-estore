import Pagination from "@components/Pagination";
import Search from "@components/Search";
import PriceFilter from "@components/PriceFilter";
import SingleProduct from "@components/SingleProduct";
import { fetchSiteProducts } from "@utils/actions/product";

export const metadata = {
	title: "Shop",
	description:
		"Decora Shop is a place where you can find all the products you need for your home.",
};

export default async function Shop({ searchParams }) {
	const q = searchParams?.q || "";
	const page = searchParams?.page ? parseInt(searchParams.page) : 1;
	const category = searchParams?.category || "";
	const price = searchParams?.price || "";
	const sort = searchParams?.sort || "newest";

	const { count, plainProducts } = await fetchSiteProducts(q, page, category, price, sort);

	return (
		<>
			<section className="py-24 relative">
				<div className="w-full container mx-auto px-4">
					<div className="flex flex-col gap-3 md:flex-row justify-between items-center bg-primary/15 rounded-md p-4 mb-6 shadow-sm">
						<PriceFilter />
						<Search placeholder="Search for a product..." count={count} />
					</div>
					<div className="grid grid-cols-12 gap-6">
						{/* <Filters /> */}
						<div className="col-span-12 md:col-span-12 flex justify-between items-center">
							{count === 0 && (
									<h5 className="text-red-600">No Products found</h5>
								)}
								<h5>&nbsp;</h5>

							<h5 className="text-gray-600 dark:text-gray-400">Showing <span className="text-primary font-bold text-lg">{count}</span> Products</h5>
						</div>
						<div className="col-span-12 md:col-span-12">
							<div className="grid grid-cols-12 gap-4">
								{plainProducts.map((product) => (
									<div
										key={product._id}
										className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-gray-500 bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3`}
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
}
