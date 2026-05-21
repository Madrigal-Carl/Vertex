export const resetPasswordTemplate = ({ resetUrl }) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1>Reset Your Password</h1>

    <p>Click below to reset your password:</p>

    <a href="${resetUrl}"
       style="display:inline-block;padding:10px 15px;background:#0F2436;color:white;text-decoration:none;border-radius:5px;">
      Reset Password
    </a>

    <p style="margin-top:20px;color:gray;font-size:12px;">
      This link expires in 10 minutes.
    </p>
  </div>
`;
