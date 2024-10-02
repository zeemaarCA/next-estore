import Image from "next/image";
import Link from "next/link";
import moment from "moment";
export default function SingleBlog({ blog }) {
	return (
		<>
			<div className="group w-full rounded-2xl">
				<div className="flex items-center">
					<Image
						src={blog.blogImage}
						alt={blog.title}
						className="w-full h-64"
						width={400}
						height={500}
					/>
				</div>
				<div className="p-4 lg:p-6 transition-all duration-300 group-hover:bg-slate-50 dark:group-hover:bg-base-200">
					<span className="invert-slate-text font-medium text-sm badge-theme-sm mb-3 inline-block">
						{moment(blog.createdAt).format("ll")}
					</span>
					<Link href={`/blog/${blog.slug}`}>
						<h4 className="text-xl text-primary font-medium leading-8 mb-5">
							{blog.title}
						</h4>
					</Link>
					<div
						className="invert-slate-text leading-6 mb-10"
						dangerouslySetInnerHTML={{
							__html: blog.content
								// Remove all heading tags from the content
								.replace(/<h[1-6].*?>.*?<\/h[1-6]>/gi, '')
								// Slice the first 100 characters from remaining content
								.match(/<p.*?>.*?<\/p>/gi)?.join('').slice(0, 100) + '...' || 'No content available'
						}}
					/>


					<Link
						href= {`/blog/${blog.slug}`}
						className="cursor-pointer text-lg text-primary font-semibold border-b border-primary"
					>
						Read more..
					</Link>
				</div>
			</div>
		</>
	);
}
