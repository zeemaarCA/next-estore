"use client";
import useState from "react";
import SelectComponent from "./Select";
import Input from "./Input";

export default function Modal({ isModalOpen, setIsModalOpen, categories, setCategories, handleSubmit, isSubmitting, setIsSubmitting, isLoading, setIsLoading }) {
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const isAvailableOptions = [
		{ label: "Yes", value: "yes" },
		{ label: "No", value: "no" },
	];
	return (
		<div>
			<section className="relative py-8 sm:p-8">
				<div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-14 relative">
					<div className="w-full relative flex justify-center">
						<div
							id="modalBox-3"
							className={`pd-overlay w-full h-full fixed top-0 left-0 z-[100000] overflow-x-hidden overflow-y-auto ${isModalOpen ? "block" : "hidden"
								}`}
						>
							<div className="opacity-1 ease-out sm:max-w-sm sm:w-full m-5 relative top-1/2 -translate-y-1/2 sm:mx-auto modal-open:opacity-100 transition-all modal-open:duration-500">
								<div className="bg-white p-6">
									<div className="flex flex-col gap-5">
										<h4 className="text-lg font-bold leading-8 text-gray-900 text-center">
											Add a Category
										</h4>
										<form onSubmit={handleSubmit} className="flex flex-col gap-4">
											<div className="relative">
												<Input
													labelText="Category Name"
													type="text"
													value={categories.categoryName}
													id="default-search"
													className="block w-full  pl-4 pr-3.5 py-2.5 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
													placeholder="Your Category name"
													onChange={(e) => setCategories({ ...categories, categoryName: e.target.value })}
													required
												/>
											</div>
											<div className="relative">
												<SelectComponent
													selectLabel="Is Active"
													options={isAvailableOptions}
													onChange={(value) =>
														setCategories({ ...categories, isActive: value })
													}
													value={categories.isActive}
													placeholder="Select an option"
												/>
											</div>
											<div className="flex items-center justify-end gap-4">
												<button
													className="py-2.5 px-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:border-gray-100 close-modal-button"
													data-pd-overlay="#modalBox-3"
													data-modal-target="modalBox-3"
													onClick={closeModal}
													type="button"
												>
													Cancel
												</button>
												<button
													className="btn-theme w-full"
													data-pd-overlay="#modalBox-3"
													data-modal-target="modalBox-3"
													type="submit"
												>
													{isLoading ? (
														<span className="loading loading-spinner text-white"></span>
													) : (
														"Save"
													)}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<div
							id="backdrop"
							className={`fixed top-0 left-0 w-full h-full bg-black/50 z-[50] ${isModalOpen ? "block" : "hidden"
								}`}
						></div>
					</div>
				</div>
			</section>
		</div>
	);
}
