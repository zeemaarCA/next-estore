"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const page = searchParams.get("page") || 1;

	const params = new URLSearchParams(searchParams);
	const ITEM_PER_PAGE = 10;

	const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
	const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

	const handleChangePage = (type) => {
		type === "prev"
			? params.set("page", parseInt(page) - 1)
			: params.set("page", parseInt(page) + 1);
		replace(`${pathname}?${params}`);
	};

	return (
		<>
			<div className="join grid grid-cols-2 max-w-72 mx-auto !mt-10">
				<button
					className="join-item btn btn-outline btn-sm disabled:cursor-not-allowed"
					disabled={!hasPrev}
					onClick={() => handleChangePage("prev")}
				>
					Previous page
				</button>
				<button
					className="join-item btn btn-outline btn-sm disabled:cursor-not-allowed"
					disabled={!hasNext}
					onClick={() => handleChangePage("next")}
				>
					Next
				</button>
			</div>
		</>
	);
};

export default Pagination;
