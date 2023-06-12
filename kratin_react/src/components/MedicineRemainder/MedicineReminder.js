import React, { useState,useContext } from 'react';
import { Context } from '../../context/Context';

import "./MedicineRemainder.css"
import axios from 'axios';
const MedicineReminder = () => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [interval, setInterval] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const {user} = useContext(Context)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'medicineName':
        setMedicineName(value);
        break;
      case 'dosage':
        setDosage(value);
        break;
      case 'medicineType':
        setMedicineType(value);
        break;
      case 'interval':
        setInterval(value);
        break;
      case 'startingTime':
        setStartingTime(value);
        break;
      default:
        break;
    }
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
   try{
    const res = await axios.post("http://localhost:4000/api/v1/med/create",{
      medicineName,
      dosage,
      medicineType,
      interval,
      startingTime,
      user: user.data._id,
    })
    res.data && window.location.replace("/dashboard");
   }catch(err){
    console.log(err.message)
   }
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Add logic to handle the submission, e.g., save the reminder details
  //   console.log('Medicine Name:', medicineName);
  //   console.log('Dosage:', dosage);
  //   console.log('Medicine Type:', medicineType);
  //   console.log('Interval:', interval);
  //   console.log('Starting Time:', startingTime);
  //   // Clear the input fields
  //   setMedicineName('');
  //   setDosage('');
  //   setMedicineType('');
  //   setInterval('');
  //   setStartingTime('');
  // };
    return (
      <div className='MedicineReminder'>
      <h2>Medicine Reminder</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Medicine Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="medicineName"
                  value={medicineName}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Dosage (mg):</label>
              </td>
              <td>
                <input
                  type="number"
                  name="dosage"
                  value={dosage}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Medicine Type:</label>
              </td>
              <td>
                <select
                  name="medicineType"
                  value={medicineType}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Injection">Injection</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Interval:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="interval"
                  value={interval}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Starting Time:</label>
              </td>
              <td>
                <input
                  type="time"
                  name="startingTime"
                  value={startingTime}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Set Reminder</button>
      </form>
    </div>
  );
}



export default MedicineReminder;
