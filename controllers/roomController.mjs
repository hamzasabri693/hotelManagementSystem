import Room from '../models/roomModel.mjs';

// Add new room
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status } = req.body;
    const existingRoom = await Room.findOne({ roomNumber });

    if (existingRoom) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    const room = new Room({ roomNumber, type, price, status });
    await room.save();
    res.status(201).json({ message: 'Room added successfully', room });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a room
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Room updated', room: updatedRoom });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a room
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    res.status(200).json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Update room status only
export const updateRoomStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(id,status);

    if (!['available', 'occupied', 'cleaning', 'maintenance'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.status = status;
    await room.save();

    res.status(200).json({ message: 'Room status updated', room });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
