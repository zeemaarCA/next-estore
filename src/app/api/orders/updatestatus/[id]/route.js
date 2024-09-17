import Order from "@utils/models/order.model";
import { connect } from "@utils/mongodb/mongoose.js";
import { revalidatePath } from 'next/cache'; // Add this import

export const PATCH = async (request, { params }) => {
  try {
    await connect();

    if (!params.id) {
      return new Response(
        JSON.stringify({ error: "Order ID not provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { orderStatus } = await request.json();

    if (!orderStatus) {
      return new Response(
        JSON.stringify({ error: "Order status not provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const order = await Order.findById(params.id);

    if (!order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update only the orderStatus field
    await Order.updateOne({ _id: params.id }, { $set: { orderStatus } });

    // Revalidate the /dashboard/orders page
    revalidatePath('/dashboard/orders'); // Add this line

    return new Response(
      JSON.stringify({ message: "Order status updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    return new Response(
      JSON.stringify({ error: "Error updating order status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

};