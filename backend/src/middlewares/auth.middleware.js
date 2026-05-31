import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { generateAccessToken } from "../utils/generateToken.js";

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    // ACCESS TOKEN
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
          return res.status(401).json({
            message: "User not found",
          });
        }

        req.user = user;

        return next();
      } catch (err) {
        // access token expired
      }
    }

    // REFRESH TOKEN
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Session expired",
      });
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // GENERATE NEW ACCESS TOKEN
    const newAccessToken = generateAccessToken(user._id);

    // SET NEW ACCESS TOKEN COOKIE
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Session expired",
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user || null;
    next();
  } catch {
    req.user = null;
    next();
  }
};
