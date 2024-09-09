import Category from "@utils/models/category.model";
import { connect } from "@utils/mongodb/mongoose";

export const GET = async (request) => {
	try {
		await connect()

		const categories = await Category.find({});

		return new Response(JSON.stringify(categories), {
			status: 200,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
				'Pragma': 'no-cache',
				'Expires': '0'
			}
		});

	} catch (error) {
		return new Response("Failed to fetch all categories", { status: 500 })
	}
}
