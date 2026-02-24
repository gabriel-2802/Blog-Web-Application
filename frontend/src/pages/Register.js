import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await axios.post('http://localhost:8000/auth/register',
      {"username": username, "email": email, "password": password});

      response.data && nav('/login');
    } catch (error) {
      setError(true);
      setErrorText(error.response.data);
    }
  }

  return (
    <div className='login'>
        <span className="loginTitle"> Register </span>
        <form action="" className="loginForm" onSubmit={handleSubmit}>
            <label> Username </label>
            <input type="text" placeholder=" enter your username..." className='logInput' onChange={e=>setUsername(e.target.value)}/>
            <label> Email </label>
            <input type="email" placeholder=" enter your email..." className='logInput' onChange={e=>setEmail(e.target.value)}/>
            <label> Password </label>
            <input type="password" placeholder=" enter your password..." className='logInput' onChange={e=>setPassword(e.target.value)}/>
            <button className="loginButton" type="submit"> Register </button>
            {error && <span className='logError'> {errorText} </span>}
        </form>
        <button className="loginRegisterButton"> <Link to='/login' className='buttonLink'> Login </Link> </button>
      
    </div>
  )
}

export default Register
