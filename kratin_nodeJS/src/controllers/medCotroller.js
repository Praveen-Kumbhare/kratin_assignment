const Medication = require('../models/Medications')
const User = require('../models/User')
exports.createMedication = async (req, res) => {
    try {
      const {
        medicineName,
        dosage,
        medicineType,
        interval,
        startingTime,
        user,
      } = req.body;
      const newMedication = new Medication({
        medicineName,
        dosage,
        medicineType,
        interval,
        startingTime,
        user
      });
      const savedMedication = newMedication.save()
      const usr = await User.findById(user);
      usr.Medications.push(usr._id);
      newMedication.save()
    .then((savedMedication) => {
        console.log('Medication reminder created:', savedMedication);
    User.findByIdAndUpdate(user, { $push: { Medications: savedMedication._id } })
      .then(() => {
        console.log('Medication added to the user');
      })
      .catch((error) => {
        console.error('Error updating user with medication:', error);
      });
  })
      res.status(201).json({
        status: 'success',
        message: 'Medicine Created Successfully',
        data: savedMedication,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error creating medication',
        error: error.message,
      });
    }
  };

  exports.getMedicineByUser
  