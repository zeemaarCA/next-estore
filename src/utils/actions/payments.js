"use server";

import { connect } from "@utils/mongodb/mongoose.js";
import Payment from "@utils/models/payment.model.js";
import Cart from "@utils/models/cart.model.js";
import User from "@utils/models/user.model";

export const createPayment = async (userId, paymentIntent) => {
  try {
    await connect();

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ sessionId: paymentIntent.id });
    if (existingPayment) {
      return existingPayment;
    }

    const user = await User.findOne({ clerkId: userId }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({ userId }).lean();
    if (!cart || !cart.items.length) {
      throw new Error("Cart is empty or not found");
    }

    const payment = new Payment({
      userId: userId,
      email: user.email || 'N/A',
      sessionId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      paymentMethod: paymentIntent.payment_method_types[0],
      status: paymentIntent.status,
    });

    await payment.save();

    return payment;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create payment record");
  }
};

export const getPayments = async (userId) => {
  try {
    await connect();
    const rawpayments = await Payment.find({ userId }).lean();
    const payments = JSON.parse(JSON.stringify(rawpayments));
    return payments;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get payments");
  }
};

export const getAllPayments = async () => {
  try {
    await connect();
    const rawallpayments = await Payment.find().lean();
    const allpayments = JSON.parse(JSON.stringify(rawallpayments));
    return allpayments;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get payments");
  }
};