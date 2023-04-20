import React, { useRef } from 'react';

const AddBlog = ({ handleAddBlog, handleChange }) => {
	const inputData = useRef({});

	return (
		<div>
			<div>Create new blog</div>
			<form onSubmit={(e) => handleAddBlog(e, inputData.current)}>
				<div>
               title: <input type="text" name="title" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<div>
               author: <input type="text" name="author" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<div>
               url: <input type="text" name="url" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AddBlog;