import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AUTH_MESSAGES } from "../constants/messages.js";

const { INVALID_CREDENTIALS, INVALID_TOKEN } = AUTH_MESSAGES;

/**
 * @desc    Sign up.
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signUpController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Hash password.
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  let user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    // Save to database.
    await user.save();

    // Convert to user object.
    user = user.toUserObject();

    // Generate token.
    var token = jwt.sign(user, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(500).json(error);
  }

  return res.status(201).json({ user, token });
};

/**
 * @desc    Sign in.
 * @route   POST /api/auth/signin
 * @access  Public
 */
const signInController = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email.
  let user = await User.findOne({ email }, { __v: 0 });

  // Check if user with the given email exists.
  if (!user) return res.status(401).json({ message: INVALID_CREDENTIALS });

  // Compare passwords.
  const isPasswordMatching = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatching)
    return res.status(401).json({ message: INVALID_CREDENTIALS });

  // Convert to user object.
  user = user.toUserObject();

  // Generate token.
  const token = jwt.sign(user, process.env.JWT_SECRET);

  return res.status(200).json({ user, token });
};

/**
 * @desc    Verify the token and return it if it's valid.
 * @route   GET /api/auth/verify-token
 * @access  Public
 */
const verifyTokenController = async (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (!token) throw new Error("Missing token.");

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists.
    let user = await User.findById(_id, { __v: 0 });

    if (!user) throw new Error("User doesn't exist.");

    user = user.toUserObject();

    return res.status(200).json({ user, token });
  } catch ({ message }) {
    console.error({ message });

    return res.status(401).json({
      message: INVALID_TOKEN,
    });
  }
};

export { signUpController, signInController, verifyTokenController };
