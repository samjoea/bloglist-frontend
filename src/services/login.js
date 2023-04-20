import axios from 'axios';
const baseUrl = '/api/login';

const login = async credentials => {
	try {
		const response = await axios.post(baseUrl, credentials);
		return {
			status: response?.status,
			data: response?.data
		};

	} catch (error) {
		return {
			status: error.response.status,
			data: error.response.data.error
		};
	}
};

export { login };