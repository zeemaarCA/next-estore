// app/page.jsx or app/home/page.jsx (depending on your routing structure)
import About from "@components/About";
import Blogs from "@components/Blogs";
import Categories from "@components/Categories";
import Hero from "@components/Hero";
import Products from "@components/Products";
import { fetchSiteProducts } from "@utils/actions/data";

export default async function Home() {
  // Fetch products data
  const {plainProducts} = await fetchSiteProducts();

  return (
    <>
      <Hero />
      <Categories />
      <Products products={plainProducts} />
      <About />
      <Blogs />
    </>
  );
}
