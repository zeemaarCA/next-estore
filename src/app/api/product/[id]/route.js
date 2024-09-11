import Product from "@utils/models/product.model";
import { connect } from "@utils/mongodb/mongoose";
import { bucket } from "@utils/firebaseAdmin";

export const GET = async (request, { params }) => {
    try {
        await connect()

        const product = await Product.findById(params.id);
        if (!product) return new Response("Product Not Found", { status: 404 });

        return new Response(JSON.stringify(product), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { name, price, category, isAvailable, productImage, description } = await request.json();

    try {
        await connect();

        if (!params.id) {
            // return new Response("Product ID not provided", { status: 400 });
            return new Response(
                JSON.stringify({ error: "Product ID not provided" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Find the existing product by ID
        const existingProduct = await Product.findById(params.id);

        if (!existingProduct) {
            // return new Response("Product not found", { status: 404 });
            return new Response(
                JSON.stringify({ error: "Product not found" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Extract the old image file name from the product image URL (if it exists)
        const oldImageUrl = existingProduct.productImage;
        const oldFileName = oldImageUrl ? oldImageUrl.split('/').pop().split('?')[0] : null;


        // Update the product with new data
        existingProduct.name = name;
        existingProduct.price = price;
        existingProduct.category = category;
        existingProduct.isAvailable = isAvailable;
        existingProduct.productImage = productImage;
        existingProduct.description = description;

        // Handle the old image deletion
        if (oldFileName) {
            try {
                await bucket.file(oldFileName).delete();
            } catch (error) {
                console.error("Error deleting old image:", error);
            }
        }
        // Handle saving the new image if necessary (should be handled in the client-side code)
        if (productImage && productImage !== oldImageUrl) {
            // Extract the new image file name from the new productImage URL
            const newFileName = productImage.split('/').pop().split('?')[0];
            try {
                // Check if the new image file exists in Firebase Storage
                const file = bucket.file(newFileName);
                const [exists] = await file.exists();
                if (!exists) {
                    // Handle file not found (optional)
                    console.error("New image file does not exist in Firebase Storage.");
                }
            } catch (error) {
                console.error("Error checking new image file:", error);
            }
        }

        await existingProduct.save();

        return new Response(
            JSON.stringify({ message: "Successfully updated the product" }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        return new Response(
            JSON.stringify({ error: "Error updating product" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};


export const DELETE = async (request, { params }) => {
    try {
        await connect(); // Ensure this line successfully connects to your database

        // Find the product by ID and remove it
        const deletedProduct = await Product.findByIdAndDelete(params.id);

        if (!deletedProduct) {
            return new Response("Product not found", { status: 404 });
        }

        return new Response("Product deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error); // Log the error for debugging
        return new Response("Error deleting product", { status: 500 });
    }
};
