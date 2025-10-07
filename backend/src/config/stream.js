import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';

const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET
);

export const upsertStremUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log('Upsert User Successfully');
  } catch (error) {
    console.log('Error in Upserting User to Stream', error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log('User deleted Successfully from Stream');
  } catch (error) {
    console.log('Error in Deleting User from Stream', error);
  }
};

export const generateToken = async (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log('Error in creating stream token');
    return null;
  }
};
