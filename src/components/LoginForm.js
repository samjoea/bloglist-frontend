import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, handleChange }) => {
	const inputData = useRef({});

	return (
		<div>
			<form onSubmit={(e) => handleLogin(e, inputData.current)} >
				<div>
          username: <input type="text" name="username" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<div>
          password: <input type="password" name="password" onChange={(e) => handleChange(e, inputData.current)} />
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default LoginForm;
