import User from './userModel';  // Import the User model
import { generateJWTToken } from './jwt';  // Import the JWT generation function

export async function POST(request) {
  const { username, password } = await request.json();

  // Check if the user exists in the database
  const user = await User.findOne({ username });

  // If the user exists and passwords match, generate a JWT token
  if (user && user.password === password) {
    // Generate JWT token using the user data
    const token = generateJWTToken(user);
    return new Response(JSON.stringify({ token }), { status: 200 });
  }

  // If credentials don't match, send error response
  return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
}


export const logout = (req, res) => {
  res.json({ message: 'Logout successful (discard token on client)' });
};

