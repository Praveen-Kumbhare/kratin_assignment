const User = require('../models/User')

exports.loginUser = async (req,res) =>{
    const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    if (user.password !== password) {
      return res.status(401).send('Invalid username or password');
    }
    res.status(201).json({
      status: 'success',
      message: 'Patient Login Successfully',
      data: user,
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
exports.registerUser = async(req,res)=>{
  const { username, password, contact, email, address, city } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).send('Username or email already exists');
    }
    const user = new User({ username, password, contact, email, address, city });
    await user.save();
    res.status(201).json({
      status: 'success',
      message: 'User Register Successfully',
      data: user,
    });
  } catch (error) {
   res.status(500).json({ status: 'error', message: err.message });
  }
}

exports.getMedications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('Medications');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const medications = user.Medications;
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



