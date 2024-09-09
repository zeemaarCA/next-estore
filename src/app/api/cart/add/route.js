// Importing necessary modules and functions
import { auth } from "@clerk/nextjs/server"; // Clerk for user authentication
import Cart from "@utils/models/cart.model"; // Cart model for MongoDB schema
import { connect } from "@utils/mongodb/mongoose"; // Function to connect to MongoDB

// Async function to handle POST requests for adding items to the cart
export async function POST(request) {
  try {
    // Authenticate user using Clerk
    const { userId } = auth();
    // If user is not authenticated, return a 401 Unauthorized response
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Connect to the MongoDB database
    await connect();

    // Parse the request body to extract product information
    const { id, title, price, image, slug, category, quantity } = await request.json();

    // Find the user's cart in the database using the userId
    let cart = await Cart.findOne({ userId: userId });

    // If no cart exists for this user, create a new cart
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] }); // Create a new cart with an empty items array
    }

    // Check if the product is already in the user's cart
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    // If the product already exists in the cart, update its quantity
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      cart.items.push({ id, title, price, image, slug, category, quantity });
    }

    // Save the updated cart to the database
    await cart.save();

    // Return a success response with the updated cart data
    return new Response(JSON.stringify({ message: "Item added to cart", cart }), { status: 201 });
  } catch (error) {
    // Catch any errors that occur and log them
    console.error("Error in /api/cart/add:", error);

    // Return a 500 Internal Server Error response with the error message
    return new Response(JSON.stringify({ message: "Failed to add item to cart", error: error.message }), { status: 500 });
  }
}




