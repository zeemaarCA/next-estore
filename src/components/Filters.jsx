export default function Filters() {
	return (
		<>
			<div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
				<div className="box rounded-xl border border-slate-100 dark:border-slate-500 bg-invert p-6 w-full md:max-w-sm">
					<h6 className="font-medium text-base leading-7 text-black mb-5">
						Your Workspace
					</h6>
					<div className="flex items-center mb-5 gap-1">
						<div className="relative w-full">
							<select
								id="FROM"
								className="h-12 border border-cgreen-500 dark:border-supernova-400 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-invert"
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
									stroke="#ccc"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<p className="px-1 font-normal text-sm leading-6">to</p>
						<div className="relative w-full">
							<select
								id="FROM"
								className="h-12 border border-cgreen-500 dark:border-supernova-400 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-invert"
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
									stroke="#ccc"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
					<label
						htmlFor="countries"
						className="block mb-2 text-sm font-medium w-full"
					>
						Zip Code
					</label>
					<div className="relative w-full mb-8">
						<select
							id="FROM"
							className="h-12 border border-cgreen-500 dark:border-supernova-400 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-invert"
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
								stroke="#ccc"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<button className="btn-theme-outline w-full">
						<svg
							width={17}
							height={16}
							viewBox="0 0 17 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
								stroke="#ccc"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Search
					</button>
				</div>
				<div className="mt-7 box rounded-xl border border-slate-100 dark:border-slate-500 bg-invert p-6 w-full md:max-w-sm">
					<div className="flex items-center justify-between w-full pb-3 border-b border-slate-200 mb-7">
						<p className="font-medium text-base leading-7">Filters</p>
						<p className="font-medium text-xs cursor-pointer">RESET</p>
					</div>

					<p className="font-medium text-sm leading-6 mb-3">Discount</p>
					<div className="box flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								className="checkbox dark:checkbox-warning checkbox-success border border-slate-300 border-solid"
							/>
							<label
								htmlFor="checkbox-default-1"
								className="text-xs font-normal leading-4 cursor-pointer"
							>
								20% or more
							</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								className="checkbox dark:checkbox-warning checkbox-success border border-slate-300 border-solid"
							/>
							<label
								htmlFor="checkbox-default-2"
								className="text-xs font-normal leading-4 cursor-pointer"
							>
								30% or more
							</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								className="checkbox dark:checkbox-warning checkbox-success border border-slate-300 border-solid"
							/>
							<label
								htmlFor="checkbox-default-3"
								className="text-xs font-normal leading-4 cursor-pointer"
							>
								50% or more
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
