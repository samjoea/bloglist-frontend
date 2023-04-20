import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ children, buttonLable }, refs) => {
	const [visible, setVisible] = useState(false);
	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(prev => !prev);
	};
	useImperativeHandle(refs, () => ({ toggleVisibility }));

	return (
		<div>
			<div style={hideWhenVisible}>
				<button type="button" onClick={toggleVisibility}>{buttonLable}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button type="button" onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
	buttonLable: PropTypes.string.isRequired,
};

export default Togglable;