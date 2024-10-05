// update cart items quantity in the database
import Cart from "@utils/models/cart.model"; // Cart model for MongoDB schema
import { connect } from "@utils/mongodb/mongoose"; // Function to connect to MongoDB
import { revalidatePath } from "next/cache";

export const PATCH = async (request, { params }) => {
  const { itemId, newQuantity } = await request.json();
  try {
    await connect(); // Ensure the database is connected

    if (!params.id) {
      return new Response(
        JSON.stringify({ error: "Cart ID or user ID not provided" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the existing cart by user ID or cart ID
    const existingCart = await Cart.findOne({ userId: params.id });

    if (!existingCart) {
      return new Response(
        JSON.stringify({ error: "Cart not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the item to update in the cart
    const cartItem = existingCart.items.find(item => item.id.toString() === itemId);

    if (!cartItem) {
      return new Response(
        JSON.stringify({ error: "Item not found in cart" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update the quantity of the item in the cart
    if (newQuantity <= 0) {
      // Optionally, remove the item if the quantity is 0 or less
      existingCart.items = existingCart.items.filter(item => item.id.toString() !== itemId);
    } else {
      cartItem.quantity = newQuantity;
    }

    // Save the updated cart
    await existingCart.save();
    revalidatePath("/cart");
    return new Response(
      JSON.stringify({ message: "Successfully updated the cart", cart: existingCart }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return new Response(
      JSON.stringify({ error: "Error updating cart" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};


// remove item from the cart in the database

export const DELETE = async (request, { params }) => {
  const { itemId } = await request.json();
  try {
    await connect(); // Ensure the database is connected

    if (!params.id) {
      return new Response(
        JSON.stringify({ error: "Cart ID or user ID not provided" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the cart for the specific user
    const cart = await Cart.findOne({ userId: params.id });

    if (!cart) {
      return new Response(
        JSON.stringify({ error: "Cart not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Remove the item from the cart's items array
    cart.items = cart.items.filter(item => item.id !== itemId);

    if (cart.items.length === 0) {
      // If no items are left, delete the entire cart
      await Cart.deleteOne({ userId: params.id });
      return new Response(
        JSON.stringify({ message: "Cart deleted as no items are left" }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save the updated cart back to the database
    await cart.save();
    revalidatePath("/cart");
    return new Response(
      JSON.stringify({ message: "Item deleted successfully" }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting item" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

