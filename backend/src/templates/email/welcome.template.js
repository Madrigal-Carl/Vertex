export const welcomeEmailTemplate = ({ name }) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1>Welcome to Vertex, ${name || "User"} 👋</h1>
    <p>Your account was successfully created.</p>

    <hr />
    <p style="color: gray; font-size: 12px;">
      If this wasn't you, please ignore this email.
    </p>
  </div>
`;
