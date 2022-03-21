import { Router } from 'express';
import {
  signInController,
  signUpController,
  verifyTokenController,
} from '../controllers/auth.js';

const router = Router();

// Sign up
router.post('/signup', signUpController);

// Sign in
router.post('/signin', signInController);

// Verify token
router.get('/verify-token', verifyTokenController);

export default router;
