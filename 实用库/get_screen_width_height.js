function getScreen() {
	let width,
		height;

	if(window.innerWidth) {
		width = window.innerWidth;
		height = window.innerHeight;
	}
	else if(document.compatMode === "BackCompat") {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	else {
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	}

	return {
		width: width,
		height: height
	}
}