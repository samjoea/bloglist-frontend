import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ messageData }) => {
	const { type, message } = messageData;
	const [display, setDisplay] = useState(false);

	const typeColor = {
		success: 'green',
		error: 'red',
	};

	useEffect(() => {
		if (message) {
			setDisplay(true);
			setTimeout(() => {
				setDisplay(false);
			}, 2000);
		}
	}, [message]);

	if (!message) return null;

	return display ? (
		<div>
			<br />
			<div style={{
				color: typeColor[type],
				fontSize: '20px',
				paddingTop: '8px',
				paddingBottom: '8px',
				paddingLeft: '10px',
				border: `3px solid ${typeColor[type]}`,
				borderRadius: '5px',
				backgroundColor: 'lightgrey',
			}}
			>
				{message}
			</div>
			<br />
		</div>
	) : null;
};

Notification.prototype = {
	messageData: PropTypes.shape({
		type: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
	}).isRequired,
};

export default Notification;