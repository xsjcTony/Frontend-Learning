class Snake {
	constructor(width, height, bodyImgUrl, headImgUrl, snakeMap, snakeFood) {
		// snake constants
		this.width = width;
		this.height = height;
		this.bodyImgUrl = bodyImgUrl;
		this.headImgUrl = headImgUrl;
		this.map = snakeMap;
		this.snakeFood = snakeFood;
		this.bodies = [
			{
				type: 1,
				x: 2,
				y: 1
			},
			{
				type: 0,
				x: 1,
				y: 1
			},
			{
				type: 0,
				x: 0,
				y: 1
			}
		];

		// calculate column and row numbers
		this.colNum = Math.floor(this.map.width / this.width);
		this.rowNum = Math.floor(this.map.height / this.height);

		// save snake direction by user input
		this.direction = "east";
		let key;
		document.body.onkeydown = (event) => {
			key = event.key;
			switch(key) {
				case "w":
					if(this.direction !== "south") {
						this.direction = "north";
					}
					break;
				case "a":
					if(this.direction !== "east") {
						this.direction = "west";
					}
					break;
				case "s":
					if(this.direction !== "north") {
						this.direction = "south";
					}
					break;
				case "d":
					if(this.direction !== "west") {
						this.direction = "east";
					}
					break;
				default:
					break;
			}
		}
	}

	render() {
		// delete current snake
		let snakes = document.querySelectorAll(".snake");
		for(let i = snakes.length - 1; i >= 0; i--) {
			snakes[i].parentNode.removeChild(snakes[i]);
		}

		// create a for of loop of snake bodies array
		for(let value of this.bodies) {
			// create snake div
			let snakeDiv = document.createElement("div");

			// set snake div style
			snakeDiv.className = "snake";
			snakeDiv.style.width = `${this.width}px`;
			snakeDiv.style.height = `${this.height}px`;
			// check if the current one is body or head
			if(value.type === 1) { // head
				snakeDiv.style.background = `url("${this.headImgUrl}")`;
			}
			else { // body
				snakeDiv.style.background = `url("${this.bodyImgUrl}")`;
			}
			snakeDiv.style.position = "absolute";
			snakeDiv.style.top = `${value.y * 100}px`;
			snakeDiv.style.left = `${value.x * 100}px`;

			// add SnakeFood to SnakeMap
			this.map.mapDiv.appendChild(snakeDiv);
		}
	}

	update() {
		// update snake per 0.3 second (300ms)
		this.timer = setInterval(() => {
			this.move();
			if(this.inspection()) {
				this.render();
			}
		}, 300);
	}

	move() {
		// move body
		// save lastBody before move in case snake eats a food
		this.lastBody = {
			type: 0,
			x: this.bodies[this.bodies.length - 1].x,
			y: this.bodies[this.bodies.length - 1].y
		};
		// move body forward
		for(let i = this.bodies.length - 1; i > 0; i--) {
			this.bodies[i].x = this.bodies[i - 1].x;
			this.bodies[i].y = this.bodies[i - 1].y;
		}

		// move head
		// check direction
		let head = this.bodies[0];
		switch(this.direction) {
			case "north":
				head.y -= 1;
				break;
			case "west":
				head.x -= 1;
				break;
			case "south":
				head.y += 1;
				break;
			case "east":
				head.x += 1;
				break;
			default:
				break;
		}
	}

	inspection() {
		let head = this.bodies[0];

		// check if head is within the map
		if(head.x >= this.colNum || head.y >= this.rowNum || head.x < 0 || head.y < 0) {
			alert("GAME OVER!");
			clearInterval(this.timer);
			this.generatePlayButton();
			return false;
		}

		// check if head collides body
		for(let i = this.bodies.length - 1; i > 2; i--) {
			if(this.bodies[i].x === head.x && this.bodies[i].y === head.y) {
				alert("GAME OVER!");
				clearInterval(this.timer);
				this.generatePlayButton();
				return false;
			}
		}

		// check if head hit the food
		if(head.x === this.snakeFood.x && head.y === this.snakeFood.y) {
			// generate a new food
			this.snakeFood.remove();
			this.snakeFood.render(this);

			// extend snake body
			let newBody = {
				type: 0,
				x: this.lastBody.x,
				y: this.lastBody.y
			};
			this.bodies.push(newBody);
		}

		return true;
	}

	generatePlayButton() {
		// clear everything in the page
		document.body.innerHTML = "";

		// generate play button
		let playButton = document.createElement("img");
		playButton.src = "images/play.png";
		playButton.alt = "playButton";
		document.body.appendChild(playButton);

		playButton.onclick = () => {
			// remove play button
			playButton.parentNode.removeChild(playButton);

			// generate new game
			let snakeMap = new SnakeMap(1000, 800);
			let snakeFood = new SnakeFood(100, 100, snakeMap);
			let snake = new Snake(100, 100, "images/body.png", "images/head.png", snakeMap, snakeFood);

			snakeFood.render(snake);
			snake.render();

			// start after 2 seconds (2000ms)
			setTimeout(() => {
				snake.update();
			}, 2000);
		}
	}
}