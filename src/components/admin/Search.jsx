"use client";

import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder, count }) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const handleSearch = useDebouncedCallback((e) => {
		const params = new URLSearchParams(searchParams);

		params.set("page", 1);

		if (e.target.value) {
			e.target.value.length > 2 && params.set("q", e.target.value);
		} else {
			params.delete("q");
		}
		replace(`${pathname}?${params}`);
	}, 300);

	return (
		<div className="flex flex-col gap-y-3 md:flex-row justify-between items-center border-b border-theme pb-4">
			<div>
				<label className="input input-bordered flex items-center gap-2">
					<input
						type="text"
						className="grow"
						placeholder="Search for products"
						onChange={handleSearch}
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="h-4 w-4 opacity-70"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</label>
			</div>
			<div>
				<h5 className="text-gray-600 dark:text-gray-400">Showing <span className="text-cgreen-500 dark:text-supernova-400 font-bold text-lg">{count}</span> Products</h5>
			</div>
		</div>
	);
};

export default Search;
