import Review from "@utils/models/review.model";
import { connect } from "@utils/mongodb/mongoose";

export const POST = async (request) => {
  const { userId, orderId, productId, rating, review } = await request.json();

  if (!userId || !orderId || !productId || !rating || !review) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
  );
  }

  // check if user already post review review of the product

  const existingReview = await Review.findOne({ userId, productId, orderId });
  if (existingReview) {
    return new Response(
      JSON.stringify({ message: "You have already reviewd this product" }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
  );
  }


  try {
    await connect();
    const newReview = new Review({
      userId,
      productId,
      orderId,
      review,
      rating
    });

    await newReview.save();

    return new Response(JSON.stringify(newReview), { status: 201, })
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
