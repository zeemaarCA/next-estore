import Link from "next/link";

export default function Notfound() {
	return (
		<section className="bg-white dark:bg-slate-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
						404
					</h1>
					<p className="mb-4 text-3xl tracking-tight font-bold text-slate-900 md:text-4xl dark:text-white">
						Something&apos;s missing.
					</p>
					<p className="mb-4 text-lg font-light text-slate-500 dark:text-slate-400">
						The Product you are looking for is not available.
					</p>
					<Link
						href="/shop"
						className="btn-theme-outline !inline"
					>
						Back to Shop
					</Link>
				</div>
			</div>
		</section>
	);
}
