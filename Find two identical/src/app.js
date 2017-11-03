import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';

ReactDOM.render(
	<Game title='Find two identical!'/>,
	document.getElementById('game')
)



// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://kde.link/test/get_field_size.php', true);
// xhr.onload = function() {
// 	var res = xhr.responseText;
//   	console.log(res);
// }

// xhr.send();

/*var width = 4;
var height = 4;

var game = document.getElementById('game');

	for (let i = 0; i < height; i++) {
		let tr = document.createElement('tr');
		game.appendChild(tr)
		for (let j = 0; j < width; j++) {
			let td = document.createElement('td');
			game.tr.appendChild(td)
		}
	}
	tr.style.backgroundColor = 'grey';
*/