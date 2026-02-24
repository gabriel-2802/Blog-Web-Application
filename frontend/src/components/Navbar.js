import React from 'react'
import '../styles/navbar.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from '../assets/top.jpeg'
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/Context';
import ProfileImage from '../assets/profile.jpg';
import {isAdmin} from '../context/Context';

function Navbar() {
    const {user, dispatch} = useContext(LoginContext);
    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }

  return (
    <div className='top'>
        <div className='topLeft'>
            <a href='https://github.com/gabriel-2802'> <GitHubIcon/> </a>
            <span className='logo'> Gabriel's Blog</span>
        </div>
        <div className='topCenter'>
            <ul className='topList'>
                <Link to='/write' className='homeLink'>
                    <li className='topListItem'> {isAdmin(user) && "Write"} </li>
                </Link>
                <Link to='/' className='homeLink'>
                    <li className='topListItem'> Home </li>
                </Link>
                <Link to='/login' className='homeLink'>
                    <li className='topListItem'> Login </li>
                </Link>
                <Link to='/' className='homeLink' onClick={handleLogout}>
                    <li className='topListItem'> {user && "Logout"} </li>
                </Link>
            </ul>
        </div>
        <div className='topRight'>
        <Link to='profile' className='link'> <img className='topImg'
                                                    src={ user?.profilePicture != null ? user.profilePicture : ProfileImage
                                                    } /> </Link>
            <i className='topSearchIcon'> <button className='topSearchButton'> <SearchIcon/> </button> </i>
        </div>
      
    </div>
  )
}

export default Navbar
