const mongoose = require('mongoose')

const medicineReminderSchema = new mongoose.Schema({
    medicineName: String,
    dosage: Number,
    medicineType: String,
    interval: String,
    startingTime: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  });
const Medications = mongoose.model('Medications',medicineReminderSchema);
module.exports = Medications;