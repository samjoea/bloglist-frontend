import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import { addNewBlog, getAll, removeBlog, updateBlog } from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { login } from './services/login';
import Togglable from './components/Togglable';
import AddBlog from './components/AddBlog';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState({});
	const [user, setUser] = useState({});
	const [messageData, setMessageData] = useState({ message: '', type: '' });
	const componentRef = useRef();
	const getUser = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		const getBlog = async () => {
			try {
				const blogs = await getAll();
				setBlogs(blogs);
			} catch (error) {
				console.error(error.message);
			}
		};
		getBlog();
	}, [newBlog]);

	const logOut = () => {
		localStorage.removeItem('user');
		setUser({});
		setMessageData({ message: 'Logout Successfully', type: 'success' });
	};

	const handleLogin = async (event, loginData) => {
		event.preventDefault();
		setMessageData({ message: '', type: '' });
		const response = await login(loginData);
		if(response.status === 200) {
			setMessageData({ message: 'Login Successful', type: 'success' });
			localStorage.setItem('user', JSON.stringify(response?.data));
			setUser(response?.data);
		}
		else{
			setMessageData({ message: response?.data, type: 'error' });
		}
	};

	const handleAddBlog = async (event, blogData) => {
		event.preventDefault();
		setMessageData({ message: '', type: '' });
		const response = await addNewBlog(blogData);
		if(response.status === 201) {
			setNewBlog(response?.data);
			setMessageData({ message: `a new blog ${response?.data?.title} was added`, type: 'success' });
		}
		else {
			setMessageData({ message: response.data, type: 'error' });
		}
	};

	const addLikes = async ({ id, likes }) => {
		const blog = {
			likes: likes + 1
		};
		const response = await updateBlog(id, blog);
		if(response.status === 200) {
			setNewBlog(response?.data);
		}
		else {
			setMessageData({ message: response.data, type: 'error' });
		}
	};

	const deleteBlog = async (id) => {
		setMessageData({ message: '', type: '' });
		const response = await removeBlog(id);
		if(response.status === 204) {
			setMessageData({ message: 'Blog Deleted', type: 'success' });
			setNewBlog({});
		}
		else {
			setMessageData({ message: response.data, type: 'error' });
		}
	};

	const handleChange = (event, ref) => {
		const name = event.target.name;
		const value = event.target.value;
		ref[name] = value;
	};

	if (!user?.token && !getUser?.token) {
		return(
			<div>
				<div>Log in to application</div>
				<Notification messageData={messageData} />
				<LoginForm
					handleLogin={handleLogin}
					handleChange={handleChange} />
			</div>
		);
	}

	return (
		<div>
			<h1>blogs</h1>
			<Notification messageData={messageData} />
			<div>
				{user?.name || getUser?.name} logged in
				<button data-cy='log-out' onClick={logOut} >logout</button>
			</div>
			<br />
			<div>
				<Togglable ref={componentRef} buttonLable='create new blog' >
					<AddBlog
						handleAddBlog={handleAddBlog}
						handleChange={handleChange} />
				</Togglable>
			</div>
			<div data-cy='blog-posts'>
				{blogs?.sort((blog1, blog2) => blog2.likes - blog1.likes)?.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						addLikes={addLikes}
						userName={getUser?.username}
						deleteBlog={deleteBlog}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
