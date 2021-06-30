function addEvent(element, name, fn) {
	if(element.attachEvent) { // <IE9
		element.attachEvent("on" + name, fn);
	}
	else { // >=IE9
		element.addEventListener(name, fn);
	}
}