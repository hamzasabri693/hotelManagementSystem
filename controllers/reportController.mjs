import Room from '../models/roomModel.mjs';
import Booking from '../models/bookingModel.mjs';
import Feedback from '../models/feedbackModel.mjs';

// Reporting Dashboard
export const getDashboardReport = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
    const occupancyRate = (occupiedRooms / totalRooms) * 100;

    const bookings = await Booking.find();
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    const feedbacks = await Feedback.find();
    const avgRating =
      feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / (feedbacks.length || 1);

    res.status(200).json({
      occupancyRate: occupancyRate.toFixed(2) + '%',
      totalRevenue,
      avgRating: avgRating.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Booking Analytics (Bookings per month)
export const getBookingAnalytics = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $group: {
          _id: { $month: '$checkInDate' },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    res.status(200).json({ bookingsPerMonth: bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Pricing Analytics (average price by room type)
export const getPricingAnalytics = async (req, res) => {
  try {
    const result = await Room.aggregate([
      {
        $group: {
          _id: '$type',
          avgPrice: { $avg: '$price' },
        },
      },
    ]);
    res.status(200).json({ averagePriceByRoomType: result });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
