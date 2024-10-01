import Pagination from "@components/Pagination";
import Search from "@components/Search";
import Filters from "@components/Filters";
import SingleBlog from "@components/SingleBlog";
import { fetchSiteBlogs } from "@utils/actions/blogs";

export const metadata = {
	title: 'Blogs',
	description: 'Explore our blogs for the latest news and updates.',
}

export default async function Blogs({ searchParams }) {
	console.log(searchParams);
	const q = searchParams?.q || "";
	const page = searchParams?.page ? parseInt(searchParams.page) : 1;
	const { count, blogs } = await fetchSiteBlogs(q, page);

	return (
		<section className="py-24 relative">
			<div className="w-full container">
				<div className="flex justify-end">
					<Search placeholder="Search for a blog..." count={count} />
				</div>
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-12">
						<div className="grid grid-cols-12 gap-4">
							{blogs.map((blog) => (
								<div
									key={blog._id}
									className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-gray-500 bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4`}
								>
									<SingleBlog blog={blog} />
								</div>
							))}
						</div>
						{count > 9 && <Pagination count={count} />}
					</div>
				</div>
			</div>
		</section>
	)
}
