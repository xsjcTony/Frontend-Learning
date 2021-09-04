class SnakeFood {
	constructor(width, height, snakeMap) {
		// SnakeFood constants
		this.width = width;
		this.height = height;
		this.map = snakeMap;
		this.imgUrl = "images/body.png";

		// calculate column and row numbers
		this.colNum = Math.floor(this.map.width / this.width);
		this.rowNum = Math.floor(this.map.height / this.height);
	}

	render(snake) {
		// create SnakeFood div
		let foodDiv = document.createElement("div");

		// set SnakeFood div style
		foodDiv.style.width = `${this.width}px`;
		foodDiv.style.height = `${this.height}px`;
		foodDiv.style.background = `url("${this.imgUrl}")`;
		this.generatePosition(snake); // get random coordinate
		foodDiv.style.position = "absolute";
		foodDiv.style.left = `${this.x * 100}px`;
		foodDiv.style.top = `${this.y * 100}px`;

		// add SnakeFood to SnakeMap
		this.map.mapDiv.appendChild(foodDiv);

		// save SnakeFood div as SnakeFood property
		this.foodDiv = foodDiv;
	}

	remove() {
		// remove SnakeFood div from SnakeMap div
		this.foodDiv.parentNode.removeChild(this.foodDiv);
	}

	generatePosition(snake) {
		// generate random coordinate of the food
		do {
			this.x = getRandomIntInclusive(0, this.colNum - 1);
			this.y = getRandomIntInclusive(0, this.rowNum - 1);
		}
		while(this.positionCheck(snake));
	}

	positionCheck(snake) {
		// check if food position clashes with snake's body position
		for(let value of snake.bodies) {
			if(value.x === this.x && value.y === this.y) {
				return true;
			}
		}

		return false;
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}