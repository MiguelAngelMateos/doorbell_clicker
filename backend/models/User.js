import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  record: { type: Number, default: null },
});

const User = mongoose.model('User', userSchema);

export default User;