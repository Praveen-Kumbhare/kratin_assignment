
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart ,Line} from 'react-chartjs-2'

import { useState, useEffect } from 'react';
import './tracker.css';

const ActivityTracker = () => {
  const [steps, setSteps] = useState(0);
  const [exercise, setExercise] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [measurements, setMeasurements] = useState([]);

  const updateSteps = (value) => {
    setSteps((prevSteps) => prevSteps + value);
  };

  const updateExercise = (value) => {
    setExercise(value);
  };

  const updateHeartRate = (value) => {
    setHeartRate(value);
  };

  const updateBloodPressure = (value) => {
    setBloodPressure(value);
  };

  const updateBloodSugar = (value) => {
    setBloodSugar(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMeasurements((prevMeasurements) => [
      ...prevMeasurements,
      {
        date: new Date().toLocaleDateString(),
        heartRate,
        bloodPressure,
        bloodSugar,
      },
    ]);
  };

  useEffect(() => {
    
    const generateRandomData = () => {
      const randomData = Array.from({ length: 5 }, () => ({
        heartRate: Math.floor(Math.random() * 100),
        bloodPressure: Math.floor(Math.random() * 100),
        bloodSugar: Math.floor(Math.random() * 100),
      }));

      setMeasurements(randomData);
    };

    generateRandomData();
    const interval = setInterval(() => {
      updateSteps(1); 
    }, 1000);

    return () => {
      clearInterval(interval); 
    };
  }, []);

  const DATA_COUNT = 7;
  const currentDate = new Date();
  const labels = [...Array(DATA_COUNT).keys()].map((_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Heart Rate',
        data: measurements.map((measurement) => measurement.heartRate),
        borderColor: 'red',
        backgroundColor: 'red',
      },
      {
        label: 'Blood Pressure',
        data: measurements.map((measurement) => measurement.bloodPressure),
        borderColor: 'blue',
        backgroundColor: 'blue',
      },
      {
        label: 'Blood Sugar',
        data: measurements.map((measurement) => measurement.bloodSugar),
        borderColor: 'green',
        backgroundColor: 'green',
      },
    ],
  };

  return (
    <div className="activity-tracker">
      <h2>Activity Tracker</h2>
      <p>Steps taken: {steps}</p>
     

      <p>Exercise routine: {exercise}</p>
      <input
        type="text"
        placeholder="Enter exercise routine"
        value={exercise}
        onChange={(e) => updateExercise(e.target.value)}
      />

      <h3>Vital Signs</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Heart Rate:
          <input
            type="text"
            value={heartRate}
            onChange={(e) => updateHeartRate(e.target.value)}
          />
        </label>
        <label>
          Blood Pressure:
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => updateBloodPressure(e.target.value)}
          />
        </label>
        <label>
          Blood Sugar:
          <input
            type="text"
            value={bloodSugar}
            onChange={(e) => updateBloodSugar(e.target.value)}
          />
        </label>
        <button style={{ margin: '20px' }} type="submit">
          Submit
        </button>
      </form>

      <h3>Progress towards Step Goal:</h3>
      <div
        style={{
          width: '200px',
          border: '1px solid #ccc',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: `${(steps / 10000) * 100}%`,
            height: '20px',
            backgroundColor: 'green',
          }}
        ></div>
      </div>
      <p>{Math.round((steps / 10000) * 100 )}% completed</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90vw', height: '50vh' }}>
  <div style={{ textAlign: 'center',width: '800px', height: '400px' }}>
    <h3>Measurement History</h3>
    {measurements.length > 0 ? (
      <Line data={data} />
    ) : (
      <p>No measurements recorded yet.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default ActivityTracker;

