import React from 'react'
import '../styles/post.css'
import Image from '../assets/pexels-sheep-1846422.jpg'
import { Link } from 'react-router-dom'

function Post({post}) {
  return (
    <div className='post'>
        <img src={Image} alt='' className='postImg' />
        <div className="postInfo">
            <div className="postCats">
                <span className="postCat"> {post.category} </span>
            </div>
            <Link to={`/post/${post.id}`} className='postLink'>
              <span className="postTitle"> {post.title} </span>
            </Link>
            <span className='postDesc'> {post.content.substring(0,15)}... </span>
            <hr />
            <span className="postDate"> {new Date(post.date).toDateString()} </span>
        </div>
    </div>
  )
}

export default Post
