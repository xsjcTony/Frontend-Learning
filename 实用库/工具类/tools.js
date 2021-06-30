(function () {
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
	function addEvent(element, name, fn) {
		if(element.attachEvent) { // <IE9
			element.attachEvent("on" + name, fn);
		}
		else { // >=IE9
			element.addEventListener(name, fn);
		}
	}
	function getStyleAttribute(element, name) {
		if(element.currentStyle) {
			return element.currentStyle[name];
		}
		else {
			return getComputedStyle(element)[name];
		}
	}

	window.getScreen = getScreen;
	window.getPageScroll = getPageScroll;
	window.addEvent = addEvent;
	window.getStyleAttribute = getStyleAttribute;
})();