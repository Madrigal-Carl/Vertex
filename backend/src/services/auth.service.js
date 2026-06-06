import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import emailQueue from "../queues/email.queue.js";
import { EMAIL_JOBS } from "../queues/email.jobs.js";

import {
  generateAccessToken,
  generateRefreshToken,
  generateVerifyToken,
} from "../utils/generateToken.js";

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const verifyToken = generateVerifyToken(user._id);

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

  await emailQueue.add("email:verify", {
    type: EMAIL_JOBS.VERIFY_EMAIL,
    data: {
      to: user.email,
      verifyUrl,
    },
  });

  return user;
};

export const verifyUserEmail = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    return user;
  }

  user.isVerified = true;
  await user.save();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return { user, accessToken, refreshToken };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Email is not registered");
  }

  // GOOGLE ACCOUNT
  if (user.googleId) {
    throw new Error("Please sign in with Google");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Password is incorrect");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthUser = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub: googleId, email, name, email_verified } = payload;

  if (!email_verified) {
    throw new Error("Google email not verified");
  }

  let user = await User.findOne({ email });

  // Existing email/password account?
  if (user && !user.googleId) {
    throw new Error("This email is already registered with password login");
  }

  // CREATE USER
  if (!user) {
    user = await User.create({
      fullname: name,
      email,
      googleId,
      isVerified: true,
    });
  }

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  return {
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async () => {
  return true;
};
