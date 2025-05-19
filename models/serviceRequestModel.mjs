import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  guestName: String,
  roomNumber: String,
  serviceType: {
    type: String,
    enum: ['room service', 'wake-up call', 'transportation', 'laundry'],
    required: true,
  },
  details: String,
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ServiceRequest', serviceRequestSchema);
