"use server"

import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import { connect } from "../mongodb/mongoose.js";

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

export const fetchCart = async (userId) => {
  try {
    await connect();
    const cart = await Cart.findOne({ userId: userId }).lean(); // Use lean() to convert Mongoose object to plain JS

    if (!cart) {
      return null;
    }

    return JSON.parse(JSON.stringify(cart)); // Serialize cart for the client
  } catch (err) {
    console.error("Error fetching cart items:", err);
    throw new Error("Failed to fetch cart items");
  }
};
