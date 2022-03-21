import jwt from 'jsonwebtoken';
import { AUTH_MESSAGES } from '../constants/messages.js';

const { INVALID_TOKEN } = AUTH_MESSAGES;

// Append this middleware to private routes.
const verifyTokenMiddleware = (req, res, next) => {
  // Extract token from request header.
  const token = req.headers['authorization'].replace('Bearer ', '');

  if (!token) return next();

  // Verify token.
  jwt.verify(token, process.env.JWT_SECRET, (error, currentUser) => {
    if (error) {
      return res.status(401).json({
        message: INVALID_TOKEN,
      });
    }

    /**
     * Add `currentUser` field to `req` object
     * for further use in controllers.
     */
    req.currentUser = currentUser;
    return next();
  });
};

export { verifyTokenMiddleware };
