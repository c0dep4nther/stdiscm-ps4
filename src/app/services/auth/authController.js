import { findUser } from './userModel.js';
import { generateToken } from './jwt.js';

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: user.id, role: user.role });
  res.json({ token, role: user.role });
};

export const logout = (req, res) => {
  // Client should discard the JWT
  res.json({ message: 'Logout successful (discard token on client)' });
};
