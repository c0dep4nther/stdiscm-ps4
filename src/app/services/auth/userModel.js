import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty'], required: true },
});

const User = mongoose.model('User', userSchema);

export const findUser = async (username) => {
  return await User.findOne({ username });
};

export default User;
