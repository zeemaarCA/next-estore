// its not used anymore

"use server"

import { revalidatePath } from 'next/cache'
import Cart from "../models/cart.model.js";
import { connect } from "../mongodb/mongoose.js";

export const fetchCart = async (userId) => {
  try {
    await connect();
    const cart = await Cart.findOne({ userId: userId }).lean(); // Use lean() to convert Mongoose object to plain JS

    if (!cart) {
      return null;
    }

    revalidatePath("/cart"); // Revalidate the cart page
    return JSON.parse(JSON.stringify(cart)); // Serialize cart for the client
  } catch (err) {
    console.error("Error fetching cart items:", err);
    throw new Error("Failed to fetch cart items");
  }
};
