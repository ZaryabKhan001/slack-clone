import express from 'express';
import { handleGenerateToken } from '../controllers/chat.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/token', verifyUser, handleGenerateToken);

export default router;
