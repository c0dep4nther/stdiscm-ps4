import User from './userModel';  // Assuming User model is defined in userModel.js

export async function POST(request) {
  const { username, password } = await request.json();

  // Check if the username and password match in the database
  const user = await User.findOne({ username });

  if (user && user.password === password) {
    // Assuming JWT token creation happens here
    const token = generateJWTToken(user);  // Implement JWT generation using the JWT secret
    return Response.json({ token });
  }

  return new Response(JSON.stringify({ error: "Invalid credentials" }), {
    status: 401,
  });
}
