import User from "./userModel.js"; // Import the User model
import { generateJWTToken } from "./jwt.js"; // Import the JWT generation function

export async function login(req, res) {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ username });

  // If the user exists and passwords match, generate a JWT token
  if (user && user.password === password) {
    // Generate JWT token using the user data
    const token = generateJWTToken(user);
    return res.status(200).json({ token });
  }

  // If credentials don't match, send error response
  return res.status(401).json({ error: "Invalid credentials" });
}

export const logout = (req, res) => {
  res.json({ message: "Logout successful (discard token on client)" });
};
