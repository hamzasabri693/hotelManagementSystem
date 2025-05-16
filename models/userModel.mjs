import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'receptionist', 'housekeeping'],
    default: 'receptionist',
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
