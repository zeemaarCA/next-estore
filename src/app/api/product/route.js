import Product from "@utils/models/product.model";
import { connect } from "@utils/mongodb/mongoose";

export const GET = async (request) => {
    try {
        await connect()

      const products = await Product.find({});

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });

    } catch (error) {
        return new Response("Failed to fetch all products", { status: 500 })
    }
}
