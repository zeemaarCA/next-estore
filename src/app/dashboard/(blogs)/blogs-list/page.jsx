import Breadcrumbs from "@components/admin/Breadcrumbs";
import Pagination from "@components/admin/Pagination";
import Title from "@components/admin/Title";
import { fetchBlogs, deleteBlog } from "@utils/actions/blogs";
import Search from "@components/admin/Search";
import Image from "next/image";
import Button from "@components/admin/Button";
import Link from "next/link";

export default async function Blogs({ searchParams }) {
	const q = searchParams?.q || "";
	const page = searchParams?.page ? parseInt(searchParams.page) : 1;
	const { count, blogs } = await fetchBlogs(q, page);


	return (
		<div>
			<Breadcrumbs base="Dashboard" parent="Blogs" parentLink="" child="" />
			<div className="flex justify-between items-center">
				<Title title="Blogs List" />
				<Link className="btn-theme" href={"/dashboard/add-blog"}>
					Add new blog
				</Link>
			</div>
			<Search placeholder="Search for a blog..." count={count} />
			<div className="overflow-x-auto rounded-lg">
				<table className="table border border-gray-200 dark:border-gray-700">
					{/* head */}
					<thead className="bg-invert">
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th>
							<th>Title</th>
							<th>Category</th>
							<th>isActive</th>
							<th>Created at</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-base-100">
						{blogs.length > 0 ? (
							blogs.map((blog) => (
								<tr key={blog.id} className="hover">
									<th>
										<label>
											<input type="checkbox" className="checkbox" />
										</label>
									</th>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle h-12 w-12">
													<Image
														src={blog.blogImage}
														alt="Avatar Tailwind CSS Component"
														width={48}
														height={48}
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">{blog.title}</div>
												{/* <div className="text-sm opacity-50">{blog.category}</div> */}
											</div>
										</div>
									</td>
									<td>{blog.category}</td>
									<td>{blog.isActive === "true" ? "Yes" : "No"}</td>
									<td className="whitespace-nowrap">
										{blog.createdAt?.toString().slice(4, 16)}
									</td>
									<td className="flex relative top-[9px] gap-1 flex-nowrap">
										<Link
											href={`/dashboard/update-blog/${blog.id}`}
											className="btn btn-secondary btn-sm"
										>
											Edit
										</Link>
										<form className="inline" action={deleteBlog}>
											<input type="hidden" name="id" value={blog.id} />
											<Button className="btn btn-error btn-sm">Delete</Button>
										</form>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" className="text-center py-4">
									No Blogs found
								</td>
							</tr>
						)}
					</tbody>

					{/* <tfoot>
						<tr>
							<th></th>
							<th>Title</th>
							<th>Category</th>
							<th>Price</th>
							<th>isAvailable</th>
							<th>Created at</th>
						</tr>
					</tfoot> */}
				</table>
			</div>
			{count > 10 && <Pagination count={count} />}
		</div>
	);
}
