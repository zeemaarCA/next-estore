"use server";

import User from "@utils/models/user.model";
import Payment from "@utils/models/payment.model";
import Product from "@utils/models/product.model";
import Order from "@utils/models/order.model";
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
  const raworders = await Order.find()
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

    return result;
  } catch (error) {
    console.error('Error fetching user order counts:', error);
    throw error;
  }
};