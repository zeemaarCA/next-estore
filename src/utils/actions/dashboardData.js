"use server";

import User from "@utils/models/user.model";
import Payment from "@utils/models/payment.model";
import Product from "@utils/models/product.model";
import Order from "@utils/models/order.model";
import Post from "@utils/models/post.model";
import Review from "@utils/models/review.model";
import { connect } from "@utils/mongodb/mongoose.js";

export const userData = async () => {
  await connect();
  const rawusers = await User.find()
  const rawtotalUsers = await User.countDocuments();
  const rawlastMonthUsers = await User.countDocuments({
    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
  });

  const users = JSON.parse(JSON.stringify(rawusers));
  const totalUsers = JSON.parse(JSON.stringify(rawtotalUsers));
  const lastMonthUsers = JSON.parse(JSON.stringify(rawlastMonthUsers));

  return {
    users,
    totalUsers,
    lastMonthUsers,
  };
};

export const gettotalProducts = async () => {
  await connect();
  const rawproducts = await Product.find()
  const rawtotalProducts = await Product.countDocuments();
  const rawlastMonthProducts = await Product.countDocuments({
    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
  });
  const products = JSON.parse(JSON.stringify(rawproducts));
  const totalProducts = JSON.parse(JSON.stringify(rawtotalProducts));
  const lastMonthProducts = JSON.parse(JSON.stringify(rawlastMonthProducts));

  return {
    products,
    totalProducts,
    lastMonthProducts,
  };
};

export const userOrders = async () => {
  await connect();
  const raworders = await Order.find().limit(10)
  const rawtotalOrders = await Order.countDocuments();
  const rawlastMonthOrders = await Order.countDocuments({
    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
  });

  const orders = JSON.parse(JSON.stringify(raworders));
  const totalOrders = JSON.parse(JSON.stringify(rawtotalOrders));
  const lastMonthOrders = JSON.parse(JSON.stringify(rawlastMonthOrders));

  return {
    orders,
    totalOrders,
    lastMonthOrders,
  };
};

export const dashBlogs = async () => {
  await connect();
  const rawposts = await Post.find().limit(10)
  const rawtotalPosts = await Post.countDocuments();
  const rawlastMonthPosts = await Post.countDocuments({
    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
  });

  const posts = JSON.parse(JSON.stringify(rawposts));
  const totalPosts = JSON.parse(JSON.stringify(rawtotalPosts));
  const lastMonthPosts = JSON.parse(JSON.stringify(rawlastMonthPosts));

  return {
    posts,
    totalPosts,
    lastMonthPosts,
  };
};

export const dashReviews = async () => {
  try {
    await connect();

    // Fetch all reviews
    const reviews = await Review.find({}).lean().limit(10);

    // Extract unique clerkIds from reviews
    const clerkIds = reviews.map(review => review.userId);

    // Fetch associated user details by clerkId
    const users = await User.find({ clerkId: { $in: clerkIds } }).lean();
    const products = await Product.find({ _id: { $in: reviews.map(review => review.productId) } }).lean();

    // Map through reviews and attach user and product details
    const detailedReviews = reviews.map(review => {
      const user = users.find(u => u.clerkId === review.userId);
      const product = products.find(p => p._id.toString() === review.productId);

      return {
        userName: user ? user.firstName : "Unknown User",
        productName: product ? product.name : "Unknown Product",
        productImage: product ? product.productImage : null,
        reviewText: review.review,
        rating: review.rating,
        date: new Date(review.createdAt).toLocaleString(), // Format date
      };
    });
    return detailedReviews;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch reviews with details"); // More informative error message
  }
};




export const totalSalesAmount = async () => {
  await connect();
  try {
    const result = await Payment.collection.aggregate([
      {
        $group: {
          _id: null,
          totalSalesAmounts: { $sum: "$amount" },
        },
      },
    ]).toArray();

    // Extract total sales from the result
    const totalSalesAmounts = result.length > 0 ? result[0].totalSalesAmounts : 0;

    return totalSalesAmounts;
  } catch (error) {
    console.error('Error calculating total sales amount:', error);
    throw error;
  }
};

export const getUserOrderCounts = async () => {
  try {
    await connect();

    const result = await User.aggregate([
      {
        $lookup: {
          from: 'orders', // This should match the name of your orders collection in MongoDB
          localField: 'clerkId',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $project: {
          firstName: 1,
          email: 1,
          userOrders: { $size: '$orders' }
        }
      }
    ]);

    const formattedResults = JSON.parse(JSON.stringify(result));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching user order counts:', error);
    throw error;
  }
};