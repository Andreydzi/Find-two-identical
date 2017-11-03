import React from 'react';

const Card = () => {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://kde.link/test/get_field_size.php', false);
		xhr.send();

	return JSON.parse(xhr.response);
};

export default Card;