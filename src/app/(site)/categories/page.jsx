import SectionTitle from "@components/SectionTitle";
import Link from "next/link";

export const metadata = {
  title: 'Categories',
  description: 'Select wide range of categories to shop from.',
}

export default async function Categories() {
	const response = await fetch("https://fakestoreapi.com/products/categories");
	const categories = await response.json();
	return (
		<div className="container">
			<SectionTitle
				title="Categories"
				link="/categories"
				linkText="Show more"
			/>
			<div className="grid grid-cols-12 gap-4">
				{categories.map((category) => (
					<Link href={`/categories/${category}`} key={category} className="col-span-3 h-40 bg-invert flex items-center justify-center">
						<div>
							<h3 className="capitalize">{category}</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
