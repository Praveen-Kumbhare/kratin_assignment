import "./login.css"
import { Link } from "react-router-dom";
import {useContext,useRef} from 'react';
import {Context} from '../../context/Context';
import axios from "axios";

export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const {isFetching, dispatch} = useContext(Context)
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(typeof(dispatch))
    dispatch({type:"LOGIN_START"})
    console.log('bye')
    try{
      const res = await axios.post("http://localhost:4000/api/v1/users/login",{
        username : userRef.current.value,
        password:passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    }catch(errr){
      dispatch({type:'LOGIN_FAILURE'})
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your Username..."
         ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."
        ref={passwordRef} />
        <button className="loginButton" type="sumbit" disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton" type="submit">
        <Link className="link" to={"/register"}>REGISTER</Link>
        </button>
    </div>
  )
}