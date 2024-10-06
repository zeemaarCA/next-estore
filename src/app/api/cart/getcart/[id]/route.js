import Cart from "@utils/models/cart.model.js";
import { connect } from "@utils/mongodb/mongoose.js";
export const dynamic = "force-dynamic";
// Define the GET handler for this API route
export async function GET(req, { params }) {
  const { id: userId } = params; // Extract userId from route params
  try {
    await connect();
    const cart = await Cart.findOne({ userId: userId }).lean();

    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });
    }

    // Return the serialized cart data
    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch cart items" }), { status: 500 });
  }
}
