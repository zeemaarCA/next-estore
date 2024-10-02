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
						Sorry, we can&apos;st find that page. You&apos;sll find lots to explore on the
						home page.
					</p>
					<Link
						href="#"
						className="btn-theme-outline !inline"
					>
						Back to Homepage
					</Link>
				</div>
			</div>
		</section>
	);
}
