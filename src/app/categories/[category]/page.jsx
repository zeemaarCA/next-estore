import SingleProduct from "@components/SingleProduct";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
	const { category } = params;

	const response = await fetch(
		`https://fakestoreapi.com/products/category/${category}`
	);
	const products = await response.json();

	// Example validation (replace with your logic)
	// const validCategories = ['satim-kachmina', 'cushions', 'lamps'];
	// if (!validCategories.includes(category)) {
	//   return notFound();
	// }

	return (
		<>
			<section className="py-24 relative">
				<div className="w-full container mx-auto px-4">
					<div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full">
						<h1 className="text-3xl font-bold capitalize">{category}</h1>
					</div>
					<svg
						className="my-7 w-full"
						xmlns="http://www.w3.org/2000/svg"
						width={1216}
						height={2}
						viewBox="0 0 1216 2"
						fill="none"
					>
						<path d="M0 1H1216" stroke="#E5E7EB" />
					</svg>
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
							<div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
								<h6 className="font-medium text-base leading-7 text-black mb-5">
									Your Workspace
								</h6>
								<div className="flex items-center mb-5 gap-1">
									<div className="relative w-full">
										<select
											id="FROM"
											className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
										>
											<option selected>Min</option>
											<option value="option 1">option 1</option>
											<option value="option 2">option 2</option>
											<option value="option 3">option 3</option>
											<option value="option 4">option 4</option>
										</select>
										<svg
											className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
											width={16}
											height={16}
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
												stroke="#111827"
												strokeWidth="1.6"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="px-1 font-normal text-sm leading-6 text-gray-600">
										to
									</p>
									<div className="relative w-full">
										<select
											id="FROM"
											className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
										>
											<option selected>Max</option>
											<option value="option 1">option 1</option>
											<option value="option 2">option 2</option>
											<option value="option 3">option 3</option>
											<option value="option 4">option 4</option>
										</select>
										<svg
											className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
											width={16}
											height={16}
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
												stroke="#111827"
												strokeWidth="1.6"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</div>
								<label
									htmlFor="countries"
									className="block mb-2 text-sm font-medium text-gray-600 w-full"
								>
									Zip Code
								</label>
								<div className="relative w-full mb-8">
									<select
										id="FROM"
										className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
									>
										<option selected>Write code</option>
										<option value="option 1">option 1</option>
										<option value="option 2">option 2</option>
										<option value="option 3">option 3</option>
										<option value="option 4">option 4</option>
									</select>
									<svg
										className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
											stroke="#111827"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<button className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-200  ">
									<svg
										width={17}
										height={16}
										viewBox="0 0 17 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
											stroke="white"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									Search
								</button>
							</div>
							<div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
								<div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
									<p className="font-medium text-base leading-7 text-black ">
										Filter Plans
									</p>
									<p className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600">
										RESET
									</p>
								</div>
								<div className="w-full mb-7">
									<div
										className="accordion-group grid grid-cols-1 gap-5 sm:gap-9"
										data-accordion="default-accordion"
									>
										<div className="accordion " id="category-heading-one">
											<button
												className="accordion-toggle group accordion-active:text-indigo-600 inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 active:text-indigo-600"
												aria-controls="category-collapse-one"
											>
												<h5 className="font-medium text-sm text-gray-900">
													Availability
												</h5>
												<svg
													className="text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:rotate-180"
													width={22}
													height={22}
													viewBox="0 0 22 22"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
														stroke="currentColor"
														strokeWidth="1.6"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
											<div
												id="category-collapse-one"
												className="accordion-content w-full px-0 overflow-hidden pr-4 max-h-0 "
												aria-labelledby="category-heading-one"
											>
												<div className="box flex flex-col gap-2 mt-5">
													<div className="flex items-center mb-2">
														<input
															id="checkbox-option-1"
															type="checkbox"
															defaultValue
															className="checkbox-white w-5 h-5 appearance-none border border-gray-500  rounded mr-1 hover:border-indigo-100 hover:bg-indigo-600 checked:bg-no-repeat checked:bg-center checked:border-indigo-100 checked:bg-indigo-600 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
														/>
														<label
															htmlFor="checkbox-option-1"
															className="ml-1 font-normal text-xs cursor-pointer  text-gray-600"
														>
															option-1
														</label>
													</div>
													<div className="flex items-center mb-2">
														<input
															id="checkbox-option-2"
															type="checkbox"
															defaultValue
															className="checkbox-white w-5 h-5 appearance-none border border-gray-500  rounded mr-1 hover:border-indigo-100 hover:bg-indigo-600 checked:bg-no-repeat checked:bg-center checked:border-indigo-600 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
														/>
														<label
															htmlFor="checkbox-option-2"
															className="ml-1 font-normal text-xs cursor-pointer  text-gray-600"
														>
															option-2
														</label>
													</div>
													<div className="flex items-center mb-2">
														<input
															id="checkbox-option-3"
															type="checkbox"
															defaultValue
															className="checkbox-white w-5 h-5 appearance-none border border-gray-500  rounded mr-1 hover:border-indigo-600 hover:bg-indigo-600 checked:bg-no-repeat checked:bg-center checked:border-indigo-600 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
														/>
														<label
															htmlFor="checkbox-option-3"
															className="ml-1 font-normal text-xs cursor-pointer  text-gray-600"
														>
															option-3
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<label
									htmlFor="Offer"
									className="font-medium text-sm leading-6 text-gray-600 mb-1"
								>
									Offer
								</label>
								<div className="relative w-full mb-7">
									<select
										id="Offer"
										className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
									>
										<option selected>5% off upi discount</option>
										<option value="option 1">option 1</option>
										<option value="option 2">option 2</option>
										<option value="option 3">option 3</option>
										<option value="option 4">option 4</option>
									</select>
									<svg
										className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
											stroke="#111827"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<p className="font-medium text-sm leading-6 text-black mb-3">
									Discount
								</p>
								<div className="box flex flex-col gap-2">
									<div className="flex items-center">
										<input
											id="checkbox-default-1"
											type="checkbox"
											defaultValue
											className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
										/>
										<label
											htmlFor="checkbox-default-1"
											className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
										>
											20% or more
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="checkbox-default-2"
											type="checkbox"
											defaultValue
											className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
										/>
										<label
											htmlFor="checkbox-default-2"
											className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
										>
											30% or more
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="checkbox-default-3"
											type="checkbox"
											defaultValue
											className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
										/>
										<label
											htmlFor="checkbox-default-3"
											className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
										>
											50% or more
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-12 md:col-span-9">
							<div className="grid grid-cols-12 gap-4">
								{products.map((product) => (
									<div
										key={product.id}
										className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-4`}
									>
										<SingleProduct product={product} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
