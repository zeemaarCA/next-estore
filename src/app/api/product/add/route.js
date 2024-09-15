import Product from "@utils/models/product.model";
import { connect } from "@utils/mongodb/mongoose";

export const POST = async (request) => {
    const { name, price, category, isAvailable, productImage, description } = await request.json();

    const slug = name.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-]/g, '');


    try {
        await connect();
        const newProduct = new Product({
            name,
            price,
            category,
            slug,
            isAvailable,
            productImage,
            description,
        });

        await newProduct.save();

        return new Response(JSON.stringify(newProduct), { status: 201, })
    } catch (error) {
        return new Response("Failed to create a new product", { status: 500 });
    }
}
