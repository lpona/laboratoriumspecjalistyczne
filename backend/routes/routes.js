import { Router } from 'express';
import authRoutes from './auth.js';
import movieRoutes from './movies.js';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);

export default router;
