function getPageScroll() {
	let x, y

		if(window.innerWidth) {
		x = window.pageXOffset;
		y = window.pageYOffset;
	}
else if(document.compatMode === "BackCompat") {
		x = document.body.scrollLeft;
		y = document.body.scrollTop;
	}
	else {
		x = document.documentElement.scrollLeft;
		y = document.documentElement.scrollTop;
	}

	return {
		x: x,
		y: y
	}
}