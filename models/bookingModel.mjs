import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'checked-out', 'cancelled','reserved'],
    default: 'booked',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
