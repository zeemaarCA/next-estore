"use server"

import Post from "../models/post.model.js";
import { connect } from "../mongodb/mongoose.js";
import { bucket } from '../firebaseAdmin.js';
import { revalidatePath } from "next/cache";

export const fetchBlogs = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    await connect();
    const count = await Post.find({ title: { $regex: regex } }).countDocuments();
    const blogs = await Post.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, blogs };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch blogs");
  }
};


export const fetchSiteBlogs = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    await connect();
    const count = await Post.find({ title: { $regex: regex } }).countDocuments();
    const blogs = await Post.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, blogs };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch blogs");
  }
};



export const fetchBlog = async (slug) => {
  try {
    await connect();
    const blog = await Post.findOne({ slug: slug })

    if (!blog) {
      return null; // Return null instead of throwing an error
    }
    return blog;
  } catch (err) {
    console.error("Error fetching blog:", err);
    throw new Error("Failed to fetch blog");
  }
};

// delete blog
export const deleteBlog = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    // Connect to database
    await connect();

    // Find the blog by ID to get the image URL
    const blog = await Post.findById(id);
    if (!blog) {
      throw new Error("Blog not found!");
    }

    // Extract the image file name from the blog image URL (assuming it's a direct Firebase Storage URL)
    const imageUrl = blog.blogImage; // Assuming this is the field in your model

    if (!imageUrl.includes("hostinger")) {
      // when imageUrl contains "placeholder"
      const fileName = imageUrl.split('/').pop().split('?')[0]; // Extract file name before the query string
      await bucket.file(fileName).delete();
    }

    // Delete the image from Firebase Storage

    // Now delete the blog from the database
    await Post.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete blog and its image!");
  }

  // Revalidate the path for product list after deletion
  revalidatePath("/dashboard/blogs-list");
};
// delete blog


export const fetchSiteProducts = async (q = "", page = 1) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 12;

  try {
    await connect();
    const count = await Product.find({ name: { $regex: regex } }).countDocuments();
    const siteproducts = await Product.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1)).lean();

    // Convert MongoDB documents to plain objects and stringify _id
    const plainProducts = siteproducts.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
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
