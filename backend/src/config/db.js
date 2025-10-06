import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(ENV.MONGODB_URI);
    if (connect.connection) {
      console.log('MongoDB Connected Successfully');
    }
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
