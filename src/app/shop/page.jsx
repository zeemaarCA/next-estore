import Pagination from "@components/Pagination";
import Search from "@components/Search";
import Filters from "@components/Filters";
import SingleProduct from "@components/SingleProduct";
import TopFilter from "@components/TopFilter";
import { fetchSiteProducts } from "@utils/actions/data";
export const metadata = {
	title: "Shop",
	description:
		"Decora Shop is a place where you can find all the products you need for your home.",
};
export default async function Shop({ searchParams }) {
	console.log(searchParams);
	const q = searchParams?.q || "";
	const page = searchParams?.page ? parseInt(searchParams.page) : 1;
	const { count, plainProducts } = await fetchSiteProducts(q, page);
	return (
		<>
			<section className="py-24 relative">
				<div className="w-full container mx-auto px-4">

					<Search placeholder="Search for a product..." count={count} />
					<div className="grid grid-cols-12 gap-6">
						<Filters />
						<div className="col-span-12 md:col-span-9">
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
							<Pagination count={count} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
