window.onload = function () {
	// initialize images
	let mainDiv = document.querySelector(".main");
	let images = initImages(mainDiv);

	// initialize mainDiv width
	let columns = resetWidth(mainDiv, images);

	// waterfall
	waterfall(images, columns);

	// monitor window resize
	window.onresize = throttle(function () {
		let images = document.querySelectorAll(".box");
		let columns = resetWidth(mainDiv, images);
		waterfall(images, columns);
	}, 500);

	// monitor images load
	loadImages(mainDiv, images);
}

/**
 * create all images
 */
function initImages(mainDiv) {
	for(let i = 1; i <= 40; i++) {
		let div = document.createElement("div");
		div.className = "box";
		mainDiv.appendChild(div);
		
		let img = document.createElement("img");
		let index = i < 10 ? "0" + i : i;
		img.src = `images/img${index}.jpg`;
		div.appendChild(img);
	}
	return document.querySelectorAll(".box");
}

function resetWidth(mainDiv, images) {
	// get screen width
	let width = getScreenWidthHeight().width;

	// get width of images
	let imgWidth = images[0].offsetWidth;

	// calculate num of images per row
	let columns = Math.floor(width / imgWidth);

	// calculate mainDiv width
	let mainDivWidth = columns * imgWidth;

	// set mainDiv width
	mainDiv.style.width = mainDivWidth + "px";
	mainDiv.style.margin = "0 auto";

	return columns;
}

function waterfall(images, columns) {
	// create an array for rowHeight
	let rowHeight = [];

	// get all images
	for(let i = 0; i < images.length; i++) {
		// determine whether within first row
		if(i < columns) {
			// if yes, clear all absolute position
			images[i].style.position = "";
			// store its height into array
			rowHeight.push(images[i].offsetHeight);
		}
		else {
			// if not, compose by waterfall rule
			// find the element with smallest height
			let minHeight = Math.min(...rowHeight);
			// find the index of element with smallest height
			let minIndex = rowHeight.findIndex(value => value === minHeight);
			// get the element with smallest height by index
			let minItem = images[minIndex];
			// get offsetLeft and height of the element
			let minLeft = minItem.offsetLeft;
			// set offsetLeft and height to the current image
			images[i].style.position = "absolute";
			images[i].style.left = minLeft + "px";
			images[i].style.top = minHeight + "px";
			// modify the height of current column
			rowHeight[minIndex] += images[i].offsetHeight;
		}
	}
}

function loadImages(mainDiv, images) {
	// monitor page scroll
	window.onscroll = debounce(function () {
		// get last image
		let lastImage = images[images.length - 1];
		// get offsetTop
		let lastImageTop = lastImage.offsetTop;
		// get half of image height
		let lastImageHeight = lastImage.offsetHeight / 2;
		// get screen height
		let screenHeight = getScreenWidthHeight().height;
		// get scrollY
		let offsetY = getPageScroll().y;
		// determine whether new images need to be loaded
		if((lastImageTop + lastImageHeight) <= (screenHeight + offsetY)) {
			images = initImages(mainDiv);
			let columns = resetWidth(mainDiv, images)
			waterfall(images, columns);
		}
	}, 500);
}