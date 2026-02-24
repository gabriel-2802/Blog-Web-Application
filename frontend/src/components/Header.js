import React from 'react'
import '../styles/header.css'
import Image from '../assets/pexels-sheep-1846422.jpg'

function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'> Poems and Statements </span>
        <span className='headerTitleLg'> Gabriel's Blog </span>
        <img className='headerImg' src={Image} alt='' />
      </div>
      
    </div>
  )
}

export default Header
