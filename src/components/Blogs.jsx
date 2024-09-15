import SectionTitle from "./SectionTitle";
import SingleBlog from "./SingleBlog";

export default function Blogs({ blogs }) {

	if (blogs.length === 0) {
		return <p>No blogs found</p>;
	}

	return (
		<>
			<div className="pb-12">
				<SectionTitle
					title="Latest Blogs"
					linkText="Show more"
					link="/blogs"
				/>
				<div className="grid grid-cols-12 gap-4">
					{blogs.map((blog) => (
						<div key={blog._id} className={`group my-2 flex w-full flex-col overflow-hidden rounded-lg bg-white dark:bg-neutral shadow-md col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-4`}>
							<SingleBlog blog={blog} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
