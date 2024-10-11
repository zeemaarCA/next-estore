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
      .sort({ createdAt: -1 }) // Sort by latest products first
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductsByCategory = async (q = "", page = 1, category, limit = 12) => {
  const regex = new RegExp(q, "i");
  const filterQuery = { name: { $regex: regex } };

  if (category) {
    filterQuery.category = { $regex: new RegExp(category, "i") };
  }

  try {
    await connect();
    const count = await Product.find(filterQuery).countDocuments();
    const siteProducts = await Product.find(filterQuery)
      .limit(limit)
      .skip(limit * (page - 1))
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


import { ObjectId } from "mongodb";

export const fetchSiteProducts = async (
  q = "",
  page = 1,
  category = "",
  price = "",
  sort = "newest",
  limit = 12,
  excludeProductId = null
) => {
  const regex = new RegExp(q, "i");
  const filterQuery = { name: { $regex: regex } };

  if (category) {
    filterQuery.category = { $regex: new RegExp(category, "i") };
  }

  // Exclude the current product from related products
  if (excludeProductId) {
    filterQuery._id = { $ne: new ObjectId(excludeProductId) };
  }

  if (price) {
    const [minPrice, maxPrice] = price.split("-");
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

  const sortOption = sort === "newest" ? { createdAt: -1 } : { createdAt: 1 };

  try {
    await connect();

    const siteProducts = await Product.aggregate([
      { $match: filterQuery },
      { $sort: sortOption },
      { $skip: limit * (page - 1) },
      { $limit: limit },

      // Lookup reviews with correct productId
      {
        $lookup: {
          from: "reviews",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$productId", { $toString: "$$productId" }] } // Match by string
              }
            }
          ],
          as: "reviews"
        }
      },

      // Add average rating calculation
      {
        $addFields: {
          averageRating: {
            $avg: "$reviews.rating"
          },
          totalReviews: { $size: "$reviews" }
        }
      }
    ]);

    const count = await Product.find(filterQuery).countDocuments();
    const plainProducts = siteProducts.map((product) => ({
      ...product,
      _id: product._id.toString(),
      createdAt: new Date(product.createdAt).toISOString(),
      updatedAt: new Date(product.updatedAt).toISOString(),
      reviews: product.reviews.map((review) => ({
        ...review,
        _id: review._id.toString(),
        productId: review.productId.toString(),
        createdAt: new Date(review.createdAt).toISOString(),
        updatedAt: new Date(review.updatedAt).toISOString(),
      }))
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
    throw new Error(err, "Failed to delete product and its image!");
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