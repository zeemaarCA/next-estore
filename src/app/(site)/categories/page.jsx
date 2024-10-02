import Link from "next/link";
import { notFound } from "next/navigation";
import Category from "@components/Category";


export const metadata = {
	title: 'Categories',
	description: 'Select wide range of categories to shop from.',
}


export default async function Categories() {

	return (
		<div className="container pb-12">

			<Category />

		</div>
	);
}