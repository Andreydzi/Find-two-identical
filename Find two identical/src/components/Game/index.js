import React from 'react';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			size: this.aja(),
			img: 'http://kde.link/test/1.png',
			know: [],
			retry: [],
			head: '',
			disp: 'none'
		};

		this.aja = this.aja.bind(this);
		this.field = this.field.bind(this);
		this.open = this.open.bind(this);
	};

///////////////////////////////////////////////////////////////////////////
	aja() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://kde.link/test/get_field_size.php', false);
		xhr.send();

		var r = JSON.parse(xhr.response);
		return r;
	};

////////////////////////
	field() {
	    let size = [];
	    let pics = [];
	    let half = this.state.size.width * this.state.size.height / 2;

	    for (let j = 0; j < half; j++) {
	    	let srcss = 'http://kde.link/test/' + (Math.floor(Math.random() * (9 + 1))) + '.png';
	    	pics.push(<img src={srcss} />)
	    }

	    for (let i = 0; i < (this.state.size.width * this.state.size.height); i++) {
	        size.push(
	        	<div key={`${i}`} 
	        		onClick={this.open}
	        		className='card'
	        		style={{width: '96px', 
	        		height: '96px', 
	        		margin: '5px', 
	        		background: 'linear-gradient(to bottom, #f99f9f 0%, #990909 100%)',
	        		position: 'relative',
	        		borderRadius: '15px',
	        		overflow: 'hidden'}}>
	        			<div key={`${i}c`}
	        				style={{position: 'absolute',
	        				width: '100%',
	        				height: '100%',
	        				background: 'linear-gradient(to bottom, #d8d8d8 0%, #131313 100%)'}}>
	        			</div>
						{(pics[i] || pics[i - half])}
				</div>);
	    };  
	    return size;
	};

///////////////////
	open(e) {
		let know = this.state.know;
		let retry = this.state.retry;
		const elem = e.target;
		const parent = elem.parentElement;
		const elements = document.querySelectorAll('.card');
		const image = parent.getElementsByTagName("IMG");

////////////////////проверяем на уже отгаданную карту
		if (!elem.nextSibling) return;

////////////////////открываем карту
		if (!parent.classList.contains('active')) {
			parent.classList.add('active');
			elem.style.opacity = '0';
		} else {
			return; ////второй клик на одну и ту же карту не считается за клик по "такой же" карте
		};

		know.push(elem.nextSibling);

////////////////////открыто две карты, проверяем на совпадение
		if (know.length == 2) {
			if (know[0].getAttribute('src') 
				== know[1].getAttribute('src')) {
					document.querySelectorAll('.card.active').forEach(e => {
						setTimeout((function() {
							if (e.lastChild) e.lastChild.remove();
							e.classList.remove('active');
						}), 400);
						retry.push('1') 
					});
					know.length = 0;
			} else { 
				document.querySelectorAll('.card.active').forEach(e => {
					setTimeout((function() { 
						if (e.firstChild) e.firstChild.style.opacity = '1';
						e.classList.remove('active') }), 400)
					});
				know.length = 0; 
			}
		}

////////////////////отгадано все поле - завершаем игру
		if (retry.length == (this.state.size.width * this.state.size.height)) {
			this.setState({
				head: 'You Win!',
				disp: 'block'
				});
			setTimeout(function() {
				location.reload()
				}, 5000)
			};
	};


///////////////////////////////////////////////////////////////

	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<div 
					style={{display: 'flex', 
					flexWrap: 'wrap', 
					width: `calc(${this.state.size.width} * 106px)` }}>
					{this.field()}
				</div>
				<h2
					style={{width: `calc(${this.state.size.width} * 106px)`,
					backgroundColor: 'green',
					color: 'white',
					textAlign: 'center'}}>
						{this.state.head}
				</h2>
			</div>
		);
	}
};

export default Game;