import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  record: Number
});

const User = mongoose.model('User', userSchema);

export default User;