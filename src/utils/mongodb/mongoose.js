import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (initialized) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'next-store',
    });
    console.log('MongoDB connected');
    initialized = true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Connection string:', process.env.MONGODB_URI);
    throw error; // Re-throw the error to be caught by the calling function
  }
};
