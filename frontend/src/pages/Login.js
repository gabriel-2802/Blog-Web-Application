import React, { useContext } from 'react'
import '../styles/login.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/Context'
import { useRef } from 'react'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const [errorText, setErrorText] = useState(``);
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const {user, dispatch, isFetching} = useContext(LoginContext);
  const handleLogin = async (e) => {
		e.preventDefault();
		dispatch({type: "LOGIN_START"});

	try {
	  const res = await axios.post('http://localhost:8000/auth/login',
	  		{username: userRef.current.value, password: passwordRef.current.value});
		
	  const token = res.data.accessToken; // returns the access token from the server
	  var user;
	  try {
		const res = await axios.get(`http://localhost:8000/account/info/${userRef.current.value}`,
		{ headers: {
			Authorization: `Bearer ${token}`
		  }
		});

		user = res.data;

		} catch (error) {
			setError(true);
			setErrorText("Invalid Credentials!");
			dispatch({type: "LOGIN_FAILURE"});
	  	}

		dispatch({type: "LOGIN_SUCCESS", payload: {user: user, jwt: token}});
		nav('/');

	} catch (error) {
		setError(true);
		setErrorText("Invalid Credentials!");
	  	dispatch({type: "LOGIN_FAILURE"});
	}
  }

  return (
	<div className='login'>
		<span className="loginTitle"> Login </span>
		<form action="" className="loginForm" onSubmit={handleLogin}>
			<label> Username </label>
			<input type="text" placeholder=" enter your username..."  className='logInput' ref={userRef}/>
			<label> Password </label>
			<input type="password" placeholder=" enter your password..." className='logInput' ref={passwordRef}/>
			<button className="loginButton" type='submit' disabled={isFetching}> <b> Login </b> </button>
			{error && <span className='logError'> {errorText} </span>}
		</form>
		<button className="loginRegisterButton"> <Link to='/register' className='buttonLink'> Register </Link> </button>
	  
	</div>
  )
}

export default Login
