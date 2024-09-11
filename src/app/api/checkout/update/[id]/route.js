import User from "@utils/models/user.model";
import { connect } from "@utils/mongodb/mongoose";


export const PATCH = async (request, { params }) => {
  const { fullName, phone, city, country, address, isCompleted } = await request.json();


  if (!fullName || !phone || !city || !country || !address) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.log("Request Body:", { fullName, phone, city, country, address, isCompleted });

  try {
    await connect();

    if (!params.id) {
      // return new Response("User ID not provided", { status: 400 });
      return new Response(
        JSON.stringify({ error: "User ID not provided" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the existing user by ID
    const existingUser = await User.findOne({ clerkId: params.id });

    if (!existingUser) {
      // return new Response("User not found", { status: 404 });
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    existingUser.fullName = fullName;
    existingUser.phone = phone;
    existingUser.city = city;
    existingUser.country = country;
    existingUser.address = address;
    existingUser.isCompleted = isCompleted;

    const savedUser = await existingUser.save();


    // Format the user data for the response
    const userObj = savedUser.toObject();

    return new Response(
      JSON.stringify({
        message: "Saved user details successfully",
        user: userObj, // Return the updated user data as a plain object
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ error: "Error saving user details" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};