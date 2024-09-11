import Breadcrumbs from "@components/admin/Breadcrumbs";
import Pagination from "@components/admin/Pagination";
import Title from "@components/admin/Title";
import { fetchProducts } from "@utils/actions/data";
import { deleteProduct } from "@utils/actions/product";
import Search from "@components/admin/Search";
import Image from "next/image";
import Button from "@components/admin/Button";
import Link from "next/link";

export default async function Products({ searchParams }) {
	const q = searchParams?.q || "";
	const page = searchParams?.page ? parseInt(searchParams.page) : 1;
	const { count, products } = await fetchProducts(q, page);

	return (
		<div>
			<Breadcrumbs base="Dashboard" parent="Products" parentLink="" child="" />
			<div className="flex justify-between items-center">
				<Title title="Products List" />
				<Link className="btn-theme" href={"/dashboard/add-product"}>Add new product</Link>
			</div>
			<Search placeholder="Search for a product..." count={count} />
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
							<th>Price</th>
							<th>isAvailable</th>
							<th>Created at</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-base-100">
						{products.map((product) => (
							<tr key={product.id} className="hover">
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
													src={product.productImage}
													alt="Avatar Tailwind CSS Component"
													width={48}
													height={48}
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">{product.name}</div>
											{/* <div className="text-sm opacity-50">{product.category}</div> */}
										</div>
									</div>
								</td>
								<td>{product.category}</td>
								<td>${product.price}</td>
								<td>{product.isAvailable === "true" ? "Yes" : "No"}</td>
								<td className="whitespace-nowrap">{product.createdAt?.toString().slice(4, 16)}</td>
								<td className="flex relative top-[9px] gap-1 flex-nowrap">
									<Link
										href={`/dashboard/update-product/${product.id}`}
										className="btn btn-secondary btn-sm"
									>
										Edit
									</Link>
									<form className="inline" action={deleteProduct}>
										<input type="hidden" name="id" value={product.id} />
										<Button className="btn btn-error btn-sm">Delete</Button>
									</form>
								</td>
							</tr>
						))}
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
			<Pagination count={count} />
		</div>
	);
}
