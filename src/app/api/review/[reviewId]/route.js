import Review from "@utils/models/review.model";
import { connect } from "@utils/mongodb/mongoose";

export const GET = async (request, { params }) => {
  try {
    await connect()

    const review = await Review.findById(params.reviewId);
    if (!review) return new Response("Review Not Found", { status: 404 });

    return new Response(JSON.stringify(review), { status: 200 })

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
  const { rating, review } = await request.json();

  try {
    await connect();

    if (!params.reviewId) {
      // return new Response("Review ID not provided", { status: 400 });
      return new Response(
        JSON.stringify({ error: "Review ID not provided" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the existing review by ID
    const existingReview = await Review.findById(params.reviewId);

    if (!existingReview) {
      // return new Response("Review not found", { status: 404 });
      return new Response(
        JSON.stringify({ error: "Review not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update the review with new data

    if (!rating) {
      return new Response(
        JSON.stringify({ message: "Please provide a rating" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!review) {
      return new Response(
        JSON.stringify({ message: "Please provide a review" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    existingReview.rating = rating;
    existingReview.review = review;



    await existingReview.save();

    return new Response(
      JSON.stringify({ message: "Successfully updated the review" }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return new Response(
      JSON.stringify({ error: "Error updating review" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};