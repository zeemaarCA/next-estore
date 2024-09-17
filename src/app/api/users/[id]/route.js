import { NextResponse } from 'next/server';
import { connect } from "@utils/mongodb/mongoose.js";
import User from "@utils/models/user.model";

export const GET = async (request, { params }) => {
  try {
    await connect()

    const user = await User.findOne({ clerkId: params.id });
    if (!user) return new Response("User Not Found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 })

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}