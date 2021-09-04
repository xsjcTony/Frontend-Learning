class SnakeMap {
	constructor(width, height) {
		// SnakeMap constants
		this.width = width;
		this.height = height;
		this.imgUrl = "images/map.jpg";

		// create SnakeMap div
		let mapDiv = document.createElement("div");

		// set SnakeMap div style
		mapDiv.style.width = `${this.width}px`;
		mapDiv.style.height = `${this.height}px`;
		mapDiv.style.background = `url("${this.imgUrl}")`;
		mapDiv.style.position = "absolute";
		mapDiv.style.top = "50%"
		mapDiv.style.left = "50%"
		mapDiv.style.transform = "translate(-50%, -50%)";

		// add SnakeMap to body
		document.body.appendChild(mapDiv);

		// save the div as SnakeMap property
		this.mapDiv = mapDiv;
	}
}