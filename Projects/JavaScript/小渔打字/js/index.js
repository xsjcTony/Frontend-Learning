let playButton = document.querySelector("img");
let bgMusic = document.querySelector("#bgm");
let hitFx = document.querySelector("#hit-fx");
let specterList = [];

playButton.onclick = () => {
	playButton.parentNode.removeChild(playButton);
	hitFx.play();
	bgMusic.play();

	setInterval(() => {
		let specter = new Specter();
		specter.fly();
		specterList.push(specter);
	}, 1000);
}

class Specter {
	constructor() {
		// create div
		let div = document.createElement("div");
		div.style.top = `1000px`;
		div.style.left = `${getRandomIntInclusive(20, 1600)}px`;

		// create span
		let span = document.createElement("span");
		let key = String.fromCharCode(getRandomIntInclusive(65, 90));
		span.innerText = key;
		div.className = `specter ${key}`;
		div.appendChild(span);

		document.body.appendChild(div);
		this.div = div;
	}

	fly() {
		let top = parseInt(this.div.style.top);
		this.timer = setInterval(() => {
			top -= 30;
			if(top < -300) {
				this.bomb();
			}
			this.div.style.top = `${top}px`;
		}, 200);
	}

	bomb() {
		this.div.parentNode.removeChild(this.div);
		clearInterval(this.timer);
	}
}

document.body.onkeydown = (event) => {
	let key = event.key.toUpperCase();
	let specter = document.querySelector(`.${key}`);
	let specterIndex = specterList.findIndex((element) => {
		return element.div === specter;
	});
	console.log(specterList);
	if(specterIndex !== -1) {
		hitFx.play();
		specterList[specterIndex].bomb();
		specterList.splice(specterIndex, 1);
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}