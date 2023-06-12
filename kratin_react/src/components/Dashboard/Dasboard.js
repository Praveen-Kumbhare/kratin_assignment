import { useState, useContext,useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Context } from '../../context/Context';
import axios from 'axios';
const Dashboard = () => {
    const {user} = useContext(Context)
  const [medicationReminders, setMedicationReminders] = useState([]);

  useEffect(() => {
    
    axios.get(`http://localhost:4000/api/v1/users/medicine/${user?.data?._id}`)
      .then(response => {
        setMedicationReminders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <Container>
      <h2 className="text-center mb-4">Medication Reminders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>sr.no</th>
            <th>Medicine Name</th>
            <th>Dosage (mg)</th>
            <th>Medicine Type</th>
            <th>Interval</th>
            <th>Starting Time</th>
          </tr>
        </thead>
        <tbody>
          {medicationReminders.map((reminder, index) => (
            <tr key={reminder.id}>
              <td>{index + 1}</td>
              <td>{reminder.medicineName}</td>
              <td>{reminder.dosage}</td>
              <td>{reminder.medicineType}</td>
              <td>{reminder.interval}</td>
              <td>{reminder.startingTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;