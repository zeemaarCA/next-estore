// Importing necessary modules and functions
import { auth } from "@clerk/nextjs/server";
import Cart from "@utils/models/cart.model";
import Promo from "@utils/models/promo.model";
import { connect } from "@utils/mongodb/mongoose";
export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await connect();

    const { promotionCode } = await request.json();

    // Check if promo code exists
    const promo = await Promo.findOne({ code: promotionCode });
    if (!promo) {
      return new Response(JSON.stringify({ message: "Promotion code not found" }), { status: 404 });
    }

    const userCart = await Cart.findOne({ userId: userId });
    if (!userCart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), { status: 404 });
    }

    // Check if the promo code has already been applied to the cart
    if (userCart.isPromoApplied) {
      return new Response(JSON.stringify({ message: "Promotion code already applied" }), { status: 400 });
    }
    // Apply promo code to cart items
    const discountPercentage = promo.discount; // assuming 'promo' has a 'discount' field

    const updatedItems = userCart.items.map(item => {
      const originalPrice = item.price;
      const discountedPrice = (originalPrice * (1 - discountPercentage / 100)).toFixed(2); // apply discount
      return {
        ...item,
        originalPrice, // store original price if needed for reference
        price: discountedPrice, // update price with discounted price
      };
    });

    // Update cart with new prices
    userCart.items = updatedItems;
    userCart.isPromoApplied = true;
    userCart.discount = discountPercentage;
    await userCart.save();

    return new Response(JSON.stringify({ message: "Promotion code applied successfully", cart: userCart, discount: discountPercentage }), { status: 201 });

  } catch (error) {
    console.error("Error in /api/cart/promo:", error);
    return new Response(JSON.stringify({ message: "Failed to apply promo code", error: error.message }), { status: 500 });
  }
}
