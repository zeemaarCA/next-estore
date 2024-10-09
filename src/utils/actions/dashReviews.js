"use server";

import User from "@utils/models/user.model";
import Product from "@utils/models/product.model";
import Review from "@utils/models/review.model";
import { connect } from "@utils/mongodb/mongoose.js";

export const reviewsPage = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 12;

  try {
    await connect();
    const count = await Review.find({ review: { $regex: regex } }).countDocuments();
    const reviews = await Review.find({ review: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    // Extract unique clerkIds from reviews
    const clerkIds = reviews.map(review => review.userId);

    // Fetch associated user details by clerkId
    const users = await User.find({ clerkId: { $in: clerkIds } }).lean();
    const products = await Product.find({ _id: { $in: reviews.map(review => review.productId) } }).lean();

    // Map through reviews and attach user and product details
    const reviewsData = reviews.map(review => {
      const user = users.find(u => u.clerkId === review.userId);
      const product = products.find(p => p._id.toString() === review.productId);

      return {
        userName: user ? user.firstName : "Unknown User",
        productName: product ? product.name : "Unknown Product",
        productImage: product ? product.productImage : null,
        reviewText: review.review,
        rating: review.rating,
        createdAt: review.createdAt, // Keep the original date for formatting
      };
    });


    return { reviewsData, count };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch reviews with details");
  }
};