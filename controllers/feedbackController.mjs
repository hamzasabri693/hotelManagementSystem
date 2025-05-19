import Feedback from '../models/feedbackModel.mjs';

export const submitFeedback = async (req, res) => {
  try {
    const { guestName, rating, comment } = req.body;
    const feedback = new Feedback({ guestName, rating, comment });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
