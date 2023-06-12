import { useState } from "react";
import "./register.css"
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[contact, setContact] = useState("")
  const[address, setAddress] = useState("")
  const[city, setCity] = useState("")
  const[error, setError] = useState(false)
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError(false)
   try{
    const res = await axios.post("http://localhost:4000/api/v1/users/register",{
      username,
      email,
      password,
      contact,
      address,
      city
    })
    res.data && window.location.replace("/login");
   }catch(err){
    setError(true)
   }
  }
  return (
    <div className="register">
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleSubmit}>
      <label>Username</label>
      <input className="registerInput" type="text" placeholder="Enter your username..."
       onChange={e=>setUsername(e.target.value)} />
      <label>Email</label>
      <input className="registerInput" type="text" placeholder="Enter your email..."
       onChange={e=>setEmail(e.target.value)} />
      <label>Password</label>
      <input className="registerInput" type="password" placeholder="Enter your password..." 
      onChange={e=>setPassword(e.target.value)}/>
      <label>Contact</label>
      <input className="registerInput" type="text" placeholder="Enter your Contact..." 
      onChange={e=>setContact(e.target.value)}/>
      <label>Address</label>
      <input className="registerInput" type="text" placeholder="Enter your Address..." 
      onChange={e=>setAddress(e.target.value)}/>
      <label>City</label>
      <input className="registerInput" type="text" placeholder="Enter your City..." 
      onChange={e=>setCity(e.target.value)}/>
      <button className="registerButton" type="submit">Register</button>
    </form>
      <button className="registerLoginButton">
      <Link className="link" to={"/login"}>LOGIN</Link>
      </button>
      {error && <span style={{color:"red",marginTop:"10px"}}>Something went wrong</span>}
  </div>
  )
}
