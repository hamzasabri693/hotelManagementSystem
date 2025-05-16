// controllers/reservationController.js
import Booking from '../models/bookingModel.mjs';
import Room from '../models/roomModel.mjs';


//Check In Controller
export const checkIn = async (req, res) => {
    try {
      const { id } = req.params;
  
      const booking = await Booking.findById(id).populate('room');
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      if (booking.status !== 'booked') {
        return res.status(400).json({ message: 'Booking is not in booked state' });
      }
  
      booking.status = 'checked-in';
      await booking.save();
  
      booking.room.status = 'occupied';
      await booking.room.save();
  
      res.json({ message: 'Check-in successful', booking });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  //Check Out Controller
  export const checkOut = async (req, res) => {
    try {
      const { id } = req.params;
  
      const booking = await Booking.findById(id).populate('room');
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      if (booking.status !== 'checked-in') {
        return res.status(400).json({ message: 'Booking is not in checked-in state' });
      }
  
      booking.status = 'checked-out';
      await booking.save();
  
      // Room is now ready for cleaning
      booking.room.status = 'cleaning';
      await booking.room.save();
  
      // Example billing: room.price * number of nights
      const nights = Math.ceil(
        (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
      );
      const totalAmount = nights * booking.room.price;
  
      res.json({
        message: 'Check-out successful',
        booking,
        billing: {
          nights,
          ratePerNight: booking.room.price,
          totalAmount
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  