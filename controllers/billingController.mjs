import Booking from '../models/bookingModel.mjs';
import Room from '../models/roomModel.mjs';
import Bill from '../models/billModel.mjs';

export const generateBill = async (req, res) => {
  try {
    const { bookingId, additionalCharges = [] } = req.body;

    const booking = await Booking.findById(bookingId).populate('room');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const roomRate = booking.room.price;
    const roomCharge = roomRate * nights;

    const additionalTotal = additionalCharges.reduce((sum, item) => sum + item.amount, 0);
    const totalAmount = roomCharge + additionalTotal;

    const bill = new Bill({
      booking: booking._id,
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      room: booking.room._id,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      nightsStayed: nights,
      roomRate,
      roomCharge,
      additionalCharges,
      totalAmount
    });

    await bill.save();

    res.status(201).json({ message: 'Bill generated successfully', bill });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const bill = await Bill.findOne({ booking: bookingId }).populate('room');
    if (!bill) return res.status(404).json({ message: 'Invoice not found' });

    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
