"use server";

import { connect } from "@utils/mongodb/mongoose.js";
import User from "@utils/models/user.model";



export const getAllCustomers = async () => {
  try {
    await connect();
    const rawallcustomers = await User.find().lean();
    const allcustomers = JSON.parse(JSON.stringify(rawallcustomers));
    return allcustomers;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get customers");
  }
};