import { generateToken } from '../config/stream.js';

export const handleGenerateToken = async (req, res) => {
  try {
    const { userId } = req.auth();
    const token = generateToken(userId);
    return res.status(200).json({ token });
  } catch (error) {
    console.log('Error in generating token of Stream', error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to generate Stream token' });
  }
};
