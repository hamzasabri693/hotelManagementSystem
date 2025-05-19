import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., "roomRates", "taxPercentage"
  value: mongoose.Schema.Types.Mixed, // Can hold string, number, object, etc.
});

export default mongoose.model('Setting', settingSchema);
