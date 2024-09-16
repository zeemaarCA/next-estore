import { NextResponse } from 'next/server';
import { connect } from "@utils/mongodb/mongoose.js";
import User from "@utils/models/user.model";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const db = await connect();

    const user = await User.findOne({ id: id });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive information if necessary
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}