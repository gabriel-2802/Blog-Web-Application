import React from 'react'
import '../styles/profile.css'
import Sidebar from '../components/Sidebar'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/Context';
import ProfileImage from '../assets/profile.jpg'
import axios from 'axios';

function Profile() {
	const {user, jwt, dispatch} = useContext(LoginContext);
	const [email, setEmail] = useState(user?.email || null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);

	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState('');

	const [completed, setCompleted] = useState(false);
	const [completedText, setCompletedText] = useState('');

	const updateClick = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`http://localhost:8000/account/update/${user.username}`, 
							{
								email: email,
								password: password
							}, 
							{ headers: { Authorization: `Bearer ${jwt}`}});

			// TODO - update the user context
			setCompleted(true);
			setCompletedText("Profile Updated Succesfully!");
			setError(false);
		} catch (error) {
			setError(true);
			setCompleted(false);
			setErrorText("error");
			console.log(error);
		}
	}

	const deleteClick = async (e) => {
		e.preventDefault();
		try {
			await axios.delete(`http://localhost:8000/account/delete/${user.username}`,
			{ headers: { Authorization: `Bearer ${jwt}`}});
			dispatch({type: "LOGOUT"});
			setCompleted(true);
			setError(false);
			setCompletedText("Account Deleted Succesfully!");
			setEmail('');
			setPassword('');

		} catch (error) {
			setCompleted(false);
			setError(true);
			setErrorText(error.response.data);
		}
	}


	return (
		<div className='profile'>
		<div className="profileWrapper">
			<form action="" className="profileForm">
				<label> Profile Picture </label>
				<div className="profilePP">
					<img src={user?.profilePicture != null ? user.profilePicture : ProfileImage} className="profileImg" />
					<label htmlFor="fileInput"> <i className="profilePPIcon"> <AddAPhotoIcon /> </i> </label>
					<input type="file" id="fileInput" style={{display:"none"}} />
				</div>
				<label> Username: {user?.username} </label>	
				<label> Email </label>
				<input type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}/>

				<label> Password </label>
				<input type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} />

				<input type="password"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)} />
						{password && confirmPassword && password !== confirmPassword &&
							( <div style={{ color: 'red' }}>Passwords do not match.</div> )}


				<button className="profileSubmitButton"
						onClick={updateClick}> Update </button>
				<button className="profileDeleteButton"
						onClick={deleteClick}>Delete Account </button>
				{error && <span className="profileError"> {errorText} </span>}
				{completed && <span className="profileSuccess"> {completedText} </span>}

						
			</form>
		</div>
		<Sidebar />
		</div>
  )
}

export default Profile
