export default function Loading() {
	return (
		<div className="container">
			<section class="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10 items-center animate-pulse">
				<div class="w-full h-64 skeleton"></div>

				<div class="mx-auto px-5 lg:px-5">
					<div class="h-8 skeleton max-w-md mt-3"></div>
					<div class="h-12 skeleton w-full mt-5"></div>
					<div class="h-8 skeleton w-1/2 mt-3"></div>
					<div class="h-8 skeleton w-1/2 mt-3"></div>
					<div class="h-8 skeleton w-1/2 mt-3"></div>
					<div class="h-12 skeleton w-1/3 mt-4"></div>
					<div class="h-20 skeleton mt-5"></div>
					<div class="flex mt-6">
						<div class="h-8 skeleton mr-2 w-8"></div>
						<div class="h-8 skeleton flex-grow"></div>
						<div class="h-8 skeleton ml-2 w-8"></div>
					</div>
					<div class="mt-7 flex flex-row items-center gap-6">
						<div class="h-10 w-1/2 skeleton"></div>
						<div class="h-10 w-1/2 skeleton"></div>
					</div>
				</div>
			</section>
		</div>
	);
}
