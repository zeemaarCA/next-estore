export default function Loading() {
	return (
		<div className="container">
			<section class="container flex-grow max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10 items-center animate-pulse">
				<div class="w-full h-64 skeleton"></div>

				<div class="px-5 lg:px-5">
					<div class="h-8 skeleton w-full mt-3"></div>
					<div class="h-8 skeleton w-3/4 mt-3"></div>
					<div class="h-7 skeleton max-w-40 mt-5"></div>
					<div class="h-7 skeleton w-36 mt-3"></div>
					<div class="h-7 skeleton w-36 mt-3"></div>
					<div class="h-7 skeleton w-2/4 mt-3"></div>
					<div class="h-16 skeleton w-1/3 mt-4"></div>
					<div class="h-4 skeleton mt-5"></div>
					<div class="h-4 skeleton w-3/4 mt-5"></div>
					<div class="flex mt-6">
						<div class="h-8 skeleton mr-2 w-8"></div>
						<div class="h-8 skeleton w-16"></div>
						<div class="h-8 skeleton ml-2 w-8"></div>
					</div>
					<div class="mt-7 flex flex-row items-center gap-6">
						<div class="h-10 w-1/4 skeleton"></div>
						<div class="h-10 w-1/4 skeleton"></div>
					</div>
				</div>
			</section>
		</div>
	);
}
