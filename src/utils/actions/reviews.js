"use server";

import { connect } from "@utils/mongodb/mongoose.js";
import Order from "@utils/models/order.model.js";
import Product from "@utils/models/product.model.js";
import Review from "@utils/models/review.model.js";

// Fetch single order by ID
export const getSingleOrder = async (orderId) => {
  try {
    await connect();

    const order = await Order.findById(orderId).lean();
    if (!order) {
      console.warn(`Order with ID ${orderId} not found`);
      return null; // Return null if the order is not found
    }

    return JSON.parse(JSON.stringify(order));
  } catch (err) {
    console.error(`Failed to fetch order with ID ${orderId}:`, err);

  }
};

// Fetch single product by ID
export const getSingleProduct = async (productId) => {
  try {
    await connect();

    const product = await Product.findById(productId).lean();
    if (!product) {
      console.warn(`Product with ID ${productId} not found`);
      return null; // Return null if the product is not found
    }

    return JSON.parse(JSON.stringify(product));
  } catch (err) {
    console.error(`Failed to fetch product with ID ${productId}:`, err);

  }
};


// get single review

export const getReview = async (reviewId) => {
  try {
    await connect();

    const review = await Review.findById(reviewId).lean();
    if (!review) {
      console.warn(`Review with ID ${reviewId} not found`);
      return null; // Return null if the review is not found
    }

    return JSON.parse(JSON.stringify(review));
  } catch (err) {
    console.error(`Failed to fetch review with ID ${reviewId}:`, err);

  }
};


// fetch review for each product

export const getReviews = async (productId) => {
  try {
    await connect();

    const reviewsData = await Review.aggregate([
      {
        $match: { productId } // Match reviews for the specific product
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'clerkId',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: null, // Group all matched reviews together
          reviews: {
            $push: {
              _id: '$_id',
              review: '$review',
              rating: '$rating',
              createdAt: '$createdAt',
              userFirstName: '$user.firstName',
              userImage: '$user.avatar'
            }
          },
          averageRating: { $avg: '$rating' }, // Calculate average rating
          totalReviews: { $sum: 1 } // Count total number of reviews
        }
      }
    ]);

    if (!reviewsData || reviewsData.length === 0) {
      console.warn(`No reviews found for product with ID ${productId}`);
      return { reviews: [], averageRating: 0, totalReviews: 0 };
    }

    const { reviews, averageRating, totalReviews } = reviewsData[0];

    return {
      reviews: JSON.parse(JSON.stringify(reviews)),
      averageRating: averageRating || 0, // Default to 0 if there are no reviews
      totalReviews
    };
  } catch (err) {
    console.error(`Failed to fetch reviews for product with ID ${productId}:`, err);
  }
};