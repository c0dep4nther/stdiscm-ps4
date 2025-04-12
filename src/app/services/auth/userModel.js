import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty'], required: true },
});

// Create the user model
const User = mongoose.model('users', userSchema);

// Method to find user by username
export const findUser = async (username) => {
  return await User.findOne({ username });
};

export default User;
