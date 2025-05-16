import Booking from '../models/bookingModel.mjs';
import Room from '../models/roomModel.mjs';

// Book a room

  export const createBooking = async (req, res) => {
    try {
      const {
        guestName,
        guestEmail,
        roomId,
        checkInDate,
        checkOutDate,
        immediateCheckIn = false  // Optional flag to check-in directly
      } = req.body;
  
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });
  
      const overlappingBooking = await Booking.findOne({
        room: roomId,
        checkInDate: { $lt: new Date(checkOutDate) },
        checkOutDate: { $gt: new Date(checkInDate) }
      });
  
      if (overlappingBooking) {
        return res.status(400).json({ message: 'Room already booked for the selected dates' });
      }
  
      const booking = new Booking({
        guestName,
        guestEmail,
        room: roomId,
        checkInDate,
        checkOutDate,
        status: immediateCheckIn ? 'checked-in' : 'reserved'
      });
  
      await booking.save();
  
      // Update room status if check-in is immediate
      if (immediateCheckIn) {
        room.status = 'occupied';
        await room.save();
      }
  
      res.status(201).json({
        message: immediateCheckIn ? 'Room booked and checked-in' : 'Reservation successful',
        booking
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
