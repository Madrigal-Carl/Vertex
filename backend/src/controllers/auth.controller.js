import { registerUser, verifyUserEmail } from "../services/auth.service.js";
import { sendTokenCookies } from "../utils/sendTokenCookies.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  await registerUser(req.body);

  return res.status(201).json({
    message: "Account created. Please verify your email.",
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const { accessToken, refreshToken } = await verifyUserEmail(token);

  sendTokenCookies({
    res,
    accessToken,
    refreshToken,
  });

  return res.json({
    message: "Email verified successfully",
  });
});
