let playButton = document.querySelector("img");

playButton.onclick = () => {
	// clear everything in the page
	document.body.innerHTML = "";

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