

import mongoose from 'mongoose';

const uri = "mongodb+srv://muheebkhan:muheebkhan9553049@cluster0.gtnzcw5.mongodb.net/luxurystay?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;

