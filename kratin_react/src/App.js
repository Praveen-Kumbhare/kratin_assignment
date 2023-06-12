import TopBar from './components/topbar/TopBar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MedicineReminder from './components/MedicineRemainder/MedicineReminder';
import {Context} from '../src/context/Context'
import { useContext } from 'react';
import Home from './components/Home/Home'
import ActivityTracker from './components/Tracker/Tracker';
import Dashboard from './components/Dashboard/Dasboard';


function App() {
  const {user} = useContext(Context)
  return(
    <>
      <TopBar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={user?<Home/>:<Login/>}></Route>
        <Route path='/register' element={user?<Home/>:<Register/>}></Route>
        <Route path='/medRemainder' element={user?<MedicineReminder/>:<Login/>}></Route>
        <Route path='/trackHealth' element={user?<ActivityTracker/>:<Login/>}></Route>
        <Route path='/dashboard' element={user?<Dashboard></Dashboard>: <Login/>}></Route>
      </Routes>
    </>
  )
}

export default App;
