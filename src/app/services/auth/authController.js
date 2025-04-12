import { findUser } from './userModel.js';
import { generateToken } from './jwt.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUser(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logout successful (discard token on client)' });
};

