"use server";

import { connect } from "../mongodb/mongoose.js";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { bucket } from '../firebaseAdmin.js';

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    await connect();
    const count = await Product.find({ name: { $regex: regex } }).countDocuments();
    const products = await Product.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products");
  }
};

export const fetchSiteProducts = async (q = "", page = 1, category = "", price = "", sort = "newest") => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 12;
  const filterQuery = { name: { $regex: regex } };

  // If a category filter is applied
  if (category) {
    filterQuery.category = { $regex: new RegExp(category, "i") }; // Case-insensitive match
  }

  // If a price filter is applied
  if (price) {
    const [minPrice, maxPrice] = price.split("-");

    // Handle different price ranges by converting the price to a number
    if (minPrice && maxPrice) {
      filterQuery.$expr = {
        $and: [
          { $gte: [{ $toDouble: "$price" }, parseFloat(minPrice)] },
          { $lte: [{ $toDouble: "$price" }, parseFloat(maxPrice)] }
        ]
      };
    } else if (minPrice && price.includes("+")) {
      filterQuery.$expr = { $gte: [{ $toDouble: "$price" }, parseFloat(minPrice)] };
    }
  }

  // Sort logic
  const sortOption = sort === "newest" ? { createdAt: -1 } : { createdAt: 1 };

  try {
    await connect();
    const count = await Product.find(filterQuery).countDocuments();
    const siteProducts = await Product.find(filterQuery)
      .sort(sortOption)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

    const plainProducts = siteProducts.map((product) => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return { plainProducts, count };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products");
  }
};



export const fetchProduct = async (slug) => {
  try {
    await connect();
    const product = await Product.findOne({ slug: slug }).lean(); // Use lean() to convert Mongoose object to plain JS

    if (!product) {
      return null; // Return null instead of throwing an error
    }
    return {
      ...product,
      _id: product._id.toString(), // Convert _id (ObjectId) to string
      createdAt: product.createdAt.toISOString(), // Convert Date to string
      updatedAt: product.updatedAt.toISOString(), // Convert Date to string
    }
  } catch (err) {
    console.error("Error fetching product:", err);
    throw new Error("Failed to fetch product");
  }
};

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