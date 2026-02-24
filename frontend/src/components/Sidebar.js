import React from 'react'
import '../styles/sidebar.css'
import Image from '../assets/sidebar.jpg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:8000/post/categories");
      setCategories(res.data);
    }
    fetchCategories();
  }, []);


  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle"> About me </span>
        <img src={Image} alt='' />
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis impedit, distinctio cum officia totam earum ratione praesentium soluta est neque rerum maxime amet eaque, quo, facere iusto non modi architecto! </p>
      </div>
      <div className='sidebarItem'>
        <span className="sidebarTitle"> Categories </span>
        <ul className="sidebarList">
          {categories.map((category) => {
              return <Link to={`/?category=${category}`} className="link" key={category}> <li className="sidebarListItem"> {category} </li> </Link>
          }
          )}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
