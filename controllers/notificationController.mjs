import Notification from '../models/notificationModel.mjs';

export const createNotification = async (req, res) => {
  try {
    const { message, type } = req.body;
    const notification = new Notification({ message, type });
    await notification.save();
    res.status(201).json({ message: 'Notification created', notification });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json({ message: 'Marked as read', notification });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
