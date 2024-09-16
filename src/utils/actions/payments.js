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

    const user = await User.findOne({ userId: userId }).lean();

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