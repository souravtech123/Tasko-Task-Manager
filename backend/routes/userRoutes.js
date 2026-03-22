/**
 * User Routes
 * /api/user/dashboard (protected)
 */
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getDashboard } from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', requireAuth, getDashboard);

export default router;
