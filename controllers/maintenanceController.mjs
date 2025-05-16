import MaintenanceRequest from '../models/maintenanceRequestModel.mjs';

// Report issue
export const reportIssue = async (req, res) => {
  try {
    const { roomId, reportedBy, issue } = req.body;
    const request = new MaintenanceRequest({ room: roomId, reportedBy, issue });
    await request.save();
    res.status(201).json({ message: 'Issue reported', request });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update status to resolved
export const resolveIssue = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'resolved', resolvedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Issue resolved', request });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// View all maintenance requests
export const getAllIssues = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().populate('room');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
