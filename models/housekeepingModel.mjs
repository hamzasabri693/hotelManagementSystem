import mongoose from 'mongoose';

const housekeepingTaskSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  scheduledBy: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  scheduledAt: { type: Date, default: Date.now },
  completedAt: Date,
});

export default mongoose.model('HousekeepingTask', housekeepingTaskSchema);
