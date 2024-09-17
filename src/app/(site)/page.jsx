// app/page.jsx or app/home/page.jsx (depending on your routing structure)
import About from "@components/About";
import Blogs from "@components/Blogs";
import Categories from "@components/Categories";
import Hero from "@components/Hero";
import Products from "@components/Products";
import { fetchSiteProducts } from "@utils/actions/product";
import { fetchSiteBlogs } from "@utils/actions/blogs";

export default async function Home() {
	// Fetch products data
	const { plainProducts } = await fetchSiteProducts();
	const { blogs } = await fetchSiteBlogs();

	return (
		<>
			<div className="container mx-auto px-4">
				<Hero />
				<Categories />
				<Products products={plainProducts} />
				<About />
				<Blogs blogs={ blogs } />
			</div>
		</>
	);
}
