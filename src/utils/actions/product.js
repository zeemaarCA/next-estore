"use server";

import { connect } from "../mongodb/mongoose.js";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { bucket } from '../firebaseAdmin.js';
// import { redirect } from "next/navigation";

// export const addProduct = async (formData) => {
//   try {
//     // Convert formData to an object if it's a FormData instance
//     if (formData instanceof FormData) {
//       formData = Object.fromEntries(formData.entries());
//     }

//     const { name, price, category, isAvailable, productImage, description } = formData;

//     if (!name || !description || !price || !category || !isAvailable || !productImage) {
//       throw new Error("Missing required fields");
//     }

//     await connect();

//     const newProduct = new Product({
//       name,
//       price: parseFloat(price),
//       category,
//       isAvailable,
//       productImage,
//       description,
//     });

//     await newProduct.save();
//   } catch (err) {
//     console.error("Error details:", err);
//     throw new Error("Failed to create product!");
//   }

//   revalidatePath("/dashboard/products-list");
//   redirect("/dashboard/products-list");
// };


export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    // Connect to database
    await connect();

    // Find the product by ID to get the image URL
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found!");
    }

    // Extract the image file name from the product image URL (assuming it's a direct Firebase Storage URL)
    const imageUrl = product.productImage; // Assuming this is the field in your model

    if (!imageUrl.includes("placeholder")) {
      // when imageUrl contains "placeholder"
      const fileName = imageUrl.split('/').pop().split('?')[0]; // Extract file name before the query string
      await bucket.file(fileName).delete();
    }

    // Delete the image from Firebase Storage

    // Now delete the product from the database
    await Product.findByIdAndDelete(id);

  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product and its image!");
  }

  // Revalidate the path for product list after deletion
  revalidatePath("/dashboard/products-list");
};


export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    // Connect to database
    await connect();

    // Find the product by ID to get the image URL
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Product not found!");
    }

    // Now delete the product from the database
    await Category.findByIdAndDelete(id);
    return { success: true };

  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete category");
  }

  // Revalidate the path for product list after deletion
  revalidatePath("/dashboard/categories");
};