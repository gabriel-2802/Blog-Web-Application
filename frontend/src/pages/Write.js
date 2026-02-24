import React from 'react'
import '../styles/write.css'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PublishIcon from '@mui/icons-material/Publish';
import Image from '../assets/pexels-sheep-1846422.jpg';
import { useRef, useState} from 'react';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Write() {
	const {jwt} = useContext(LoginContext);
	const nav = useNavigate();
	const post = useLocation().state;
	const [title, setTitle] = useState('' || post?.title);
	const [text, setText] = useState('' || post?.content);
	const [file, setFile] = useState(null);

	const handleSubmit =async  (e) => {
		e.preventDefault();

		const newPost = {
			content: text,
			title: title,
			author: "test",
			category: "POEMS"

		};

		try {
			if (post) {
				const res = await axios.put(`http://localhost:8000/post/update/${post.id}`, newPost,
						{ headers: { Authorization: `Bearer ${jwt}`}});
			} else {
				const res = await axios.post(`http://localhost:8000/post/create`, newPost,
						{ headers: { Authorization: `Bearer ${jwt}`}});
			}

		} catch (error) {
			console.log(error);
		}

		nav('/');
	}

	useEffect(() => {
		setTitle(post?.title || '');
		setText(post?.content || '');
	  }, [post]);


	return (
		<div className='write'>
				<img className="writeImg" src={file != null ? URL.createObjectURL(file) : Image} alt="" />
				<form className="writeForm" onSubmit={handleSubmit}>
						<div className="writeFormGroup">
								<label className="fileInput" htmlFor='fileInput'> <AddPhotoAlternateIcon /> </label>
								<input  type="file"
										id="fileInput"
										style={{display:"none"}}
										onChange={(e) => setFile(e.target.files[0])}
								></input>

								<input 	type="text"
										placeholder="Title"
										className="writeInput"
										autoFocus={true}
										onChange={(e) =>setTitle(e.target.value)}
										value={title}/>
						</div>
						<div className="writeFormGroup">
								<textarea placeholder="State..."
										  type="text"
										  className="writeInput writeText" onChange={(e) => setText(e.target.value)}
										  value={text}/>
						</div>
						<button className="writeSubmit" type='submit'> <PublishIcon /> </button>
				</form>
			
		</div>
	)
}

export default Write
