(function () {
	let timerId = null;

	function easeAnimation(ele, target) {
		// clear existing interval
		clearInterval(timerId);

		timerId = setInterval(() => {
			// get current position
			let begin = parseInt(ele.style.marginLeft) || 0;
			// create variable for step
			// (target - begin) * coefficient (0~1)
			let step = (target - begin) * 0.3;
			// calculate new location
			begin += step;
			if(Math.abs(Math.floor(step)) <= 1) {
				clearInterval(timerId);
				begin = target;
			}
			// set new position
			ele.style.marginLeft = begin + "px";
		}, 100);
	}

	function linearAnimation(ele, target) {
		// clear existing interval
		clearInterval(timerId);

		timerId = setInterval(() => {
			// get current position
			let begin = parseInt(ele.style.marginLeft) || 0;
			// create variable for step
			let step = (begin - target) > 0 ? -40 : 40;
			// calculate new location
			begin += step;
			if(Math.abs(target - begin) <= Math.abs(step)) {
				clearInterval(timerId);
				begin = target;
			}
			// set new position
			ele.style.marginLeft = begin + "px";
		}, 100);
	}

	// bind function to window
	window.linearAnimation = linearAnimation;
	window.easeAnimation = easeAnimation;
})();