import ServiceRequest from '../models/serviceRequestModel.mjs';

export const requestService = async (req, res) => {
  try {
    const { guestName, roomNumber, serviceType, details } = req.body;
    const service = new ServiceRequest({ guestName, roomNumber, serviceType, details });
    await service.save();
    res.status(201).json({ message: 'Service request submitted', service });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllServiceRequests = async (req, res) => {
  try {
    const services = await ServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const service = await ServiceRequest.findById(id);
    if (!service) return res.status(404).json({ message: 'Service request not found' });

    service.status = status;
    await service.save();

    res.status(200).json({ message: 'Service status updated', service });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
