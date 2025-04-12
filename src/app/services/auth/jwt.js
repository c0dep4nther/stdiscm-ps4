import jwt from "jsonwebtoken";

export function generateJWTToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.isStudent ? "student" : "faculty",  // Assuming you have a role field
  };

  const secret = process.env.JWT_SECRET || "your_jwt_secret";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}
