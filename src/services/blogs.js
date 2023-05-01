import axios from 'axios';
const baseUrl = '/api/blogs';
const token = JSON.parse(localStorage.getItem('user'))?.token;

const blogApi = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + token
	}
});

const getAll = async () => {
	try {
		const request = await blogApi.get('/');
		return request?.data;
	} catch (error) {
		console.error(error.message);
	}
};

const addNewBlog = async (blog) => {
	try {
		const response = await blogApi.post('/',blog);
		return {
			status: response?.status,
			data: response?.data
		};
	} catch (error) {
		return {
			status: error?.response?.status,
			data: error?.response?.data?.error
		};
	}
};

const updateBlog = async (id, blog) => {
	try {
		const response = await blogApi.put(`/${id}`, blog);
		return {
			status: response?.status,
			data: response?.data
		};

	} catch (error) {
		return {
			status: error?.response?.status,
			data: error?.response?.data?.error
		};
	}
};

const removeBlog = async (id) => {
	try {
		const response = await blogApi.delete(`/${id}`);
		return {
			status: response?.status,
			data: response?.data
		};
	} catch (error) {
		const info = error?.response;
		return {
			status: info.status,
			data: info.data.error || info.data.message
		};
	}
};

export { getAll, addNewBlog, updateBlog, removeBlog };
