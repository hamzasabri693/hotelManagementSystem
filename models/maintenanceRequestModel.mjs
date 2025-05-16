import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  reportedBy: String,
  issue: String,
  status: {
    type: String,
    enum: ['reported', 'in-progress', 'resolved'],
    default: 'reported',
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
});

export default mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
