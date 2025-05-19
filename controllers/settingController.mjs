import Setting from '../models/settingModel.mjs';

export const updateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;
    const setting = await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Setting updated', setting });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ key });
    if (!setting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
