import React, { useRef, useState } from 'react';

const AddBlog = ({ handleAddBlog, handleChange }) => {
	const [submit, setSubmit] = useState(false);
	const inputData = useRef({});

	return (
		<div>
			<div>Create new blog</div>
			<form onSubmit={(e) => handleAddBlog(e, inputData.current)}>
				<div>
               title: <input onFocus={() => setSubmit(false)} value={submit ? '' : null} data-cy='blog-title' type="text" name="title" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<div>
               author: <input value={submit ? '' : null} data-cy='blog-author' type="text" name="author" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<div>
               url: <input value={submit ? '' : null} data-cy='blog-url' type="text" name="url" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<button
					onClick={() => setSubmit(true)}
					data-cy='blog-submit'
					type="submit" id='create'
				>
					create
				</button>
			</form>
		</div>
	);
};

export default AddBlog;