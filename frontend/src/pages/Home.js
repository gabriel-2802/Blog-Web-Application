import React from 'react'
import '../styles/home.css'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Sidebar from '../components/Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../context/Context';

function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation(null);
  const category = search.split("=")[1];
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (search) {
        const res = await axios.get(`http://localhost:8000/post/category/${category}`);
        setPosts(res.data);
      } else {
        const res = await axios.get("http://localhost:8000/post/all");
        setPosts(res.data);
      }
    }
    fetchPosts();
  }, [search]);
  

  return (
    <>
    <Header />
    <div className='home'>
      <Posts posts={posts}/>
      <Sidebar />
    </div>
    </>
  )
}

export default Home
