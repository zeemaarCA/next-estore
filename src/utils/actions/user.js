import User from '@utils/models/user.model';
import { connect } from '@utils/mongodb/mongoose';



export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
  fullName,
  phone,
  city,
  country,
  address,
  isCompleted
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
          fullName: null,
          phone: null,
          city: null,
          country: null,
          address: null,
          isCompleted: false,
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