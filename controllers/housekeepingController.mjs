import HousekeepingTask from '../models/housekeepingModel.mjs';
import Room from '../models/roomModel.mjs';

// View rooms by status (e.g., cleaning, maintenance)
export const getRoomsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const rooms = await Room.find({ status });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Schedule cleaning
export const scheduleCleaning = async (req, res) => {
  try {
    const { roomId, scheduledBy } = req.body;
    const task = new HousekeepingTask({ room: roomId, scheduledBy });
    await task.save();
    await Room.findByIdAndUpdate(roomId, { status: 'cleaning' });
    res.status(201).json({ message: 'Cleaning task scheduled', task });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark cleaning as completed
export const completeCleaning = async (req, res) => {
  try {
    const { roomId } = req.params;
    const task = await HousekeepingTask.findOneAndUpdate(
      { room: roomId, status: { $ne: 'completed' } },
      { status: 'completed', completedAt: new Date() },
      { new: true }
    );
    if (task) {
      await Room.findByIdAndUpdate(roomId, { status: 'available' });
      res.json({ message: 'Cleaning completed', task });
    } else {
      res.status(404).json({ error: 'Task not found or already completed' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
