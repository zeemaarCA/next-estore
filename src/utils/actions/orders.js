"use server";

import { connect } from "@utils/mongodb/mongoose.js";
import { revalidatePath } from "next/cache";
import Cart from "@utils/models/cart.model.js";
import Order from "@utils/models/order.model.js";
import User from "@utils/models/user.model";

export const fetchProductsInCart = async (id) => {
  try {
    await connect();
    const cart = await Cart.findOne({ userId: id }).lean();

    const formattedCartItems = JSON.parse(JSON.stringify(cart.items));
    if (!cart) {
      return []; // Return an empty array if no cart is found
    }
    return formattedCartItems; // This already returns all items in the cart
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products in cart");
  }
};

export const createOrder = async (userId, paymentIntent) => {
  try {
    await connect();

    // Check if order already exists
    const existingOrder = await Order.findOne({ orderId: paymentIntent.id });
    if (existingOrder) {
      return existingOrder;
    }

    const user = await User.findOne({ userId: userId }).lean();

    if (!user) {
      throw new Error("User not found");
    }
    console.log(user.email)

    const cart = await Cart.findOne({ userId }).lean();
    if (!cart || !cart.items.length) {
      throw new Error("Cart is empty or not found");
    }

    const order = new Order({
      orderId: paymentIntent.id,
      userId: userId,
      email: user.email || 'N/A',
      products: cart.items.map(item => ({
        productId: item.id,
        title: item.title,
        quantity: item.quantity,
      })),
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      paymentStatus: paymentIntent.status,
      orderStatus: "pending",
    });

    await order.save();

    // Clear the cart after creating the order
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    revalidatePath('/orders');
    return order;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create order");
  }
};


export const getOrders = async (userId) => {
  try {
    await connect();
    const raworders = await Order.find({ userId }).lean();
    const orders = JSON.parse(JSON.stringify(raworders));
    return orders;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get orders");
  }
};


export const getAllOrders = async () => {
  try {
    await connect();
    const rawallorders = await Order.find().lean();
    const allorders = JSON.parse(JSON.stringify(rawallorders));
    return allorders;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get orders");
  }
};