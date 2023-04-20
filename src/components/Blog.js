import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, addLikes, userName, deleteBlog }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };
	const hideRemoveButton = { display: blog.user.username === userName ? '' : 'none' };
	const blogStyle = {
		border: '2px solid black',
		padding: '5px',
		margin: '2px',
	};
	const removeStyle = {
		backgroundColor: 'lightblue',
		borderRadius: '8px',
	};

	const toggleVisibility = () => {
		setVisible(prev => !prev);
	};
	const handleLike = () => {
		addLikes({ id: blog.id, likes: blog.likes });
	};
	const handleRemove = () => {
		const askUser = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
		if (askUser) {
			deleteBlog(blog.id);
		}
	};

	return(
		<div>
			<div style={{ ...hideWhenVisible, ...blogStyle }}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility} >view</button>
			</div>
			<div style={{ ...showWhenVisible, ...blogStyle }}>
				<div>
					{blog.title} {blog.author}
					<button onClick={toggleVisibility} >hide</button>
				</div>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button onClick={handleLike} >like</button>
				</div>
				<div>{blog.user.name}</div>
				<div style={hideRemoveButton}>
					<button style={removeStyle} onClick={handleRemove} >remove</button>
				</div>
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.shape({}).isRequired,
	addLikes: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
	deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
