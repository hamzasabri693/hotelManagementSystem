import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  guestName: String,
  guestEmail: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkInDate: Date,
  checkOutDate: Date,
  nightsStayed: Number,
  roomRate: Number,
  roomCharge: Number,
  additionalCharges: [
    {
      service: String,
      amount: Number
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Bill', billSchema);
