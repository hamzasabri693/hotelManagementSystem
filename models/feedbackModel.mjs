import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  guestName: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', feedbackSchema);
