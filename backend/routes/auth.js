import { Router } from 'express';
import {
  changeNameController,
  signInController,
  signUpController,
  verifyTokenController,
  changePasswordController,
  changeEmailController
} from '../controllers/auth.js';

const router = Router();

// Sign up
router.post('/signup', signUpController);

// Sign in
router.post('/signin', signInController);

// Verify token
router.get('/verify-token', verifyTokenController);

// Change name
router.put('/change-name', changeNameController);

//change password
router.put('/change-password', changePasswordController);

//change email
router.put('/change-email', changeEmailController);


export default router;
