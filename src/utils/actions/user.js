import User from '@utils/models/user.model';
import { connect } from '@utils/mongodb/mongoose';

export const fetchedUser = async (id) => {
  try {
    await connect(); // Connect to MongoDB only if not already connected
    const userData = await User.findOne({ clerkId: id }).lean();
    if (userData) {
      // Convert ObjectId to string and dates to ISO strings
      const serializableUserData = JSON.parse(JSON.stringify(userData));
      return serializableUserData;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};


export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
) => {
  try {
    await connect();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.log('Error creating or updating user:', error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();

    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};