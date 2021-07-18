window.onload = function () {
	// get elements
	let toolBar = document.querySelector(".toolbar");
	let navBar = document.querySelector(".nav");
	let menuBar = document.querySelector("#myMenu");
	let previousBtn = document.querySelector(".menu-up");
	let nextBtn = document.querySelector(".menu-down");
	let tip = document.querySelector(".tips");

	// initialize fullpage
	new fullpage('#fullpage', {
		// navigation
		menu: '#myMenu',
		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],

		// design
		sectionsColor: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
		verticalCentered: false,

		// callbacks
		onLeave: function (origin, destination, direction) {
			// check if scrolling to first screen
			if(destination.isFirst) {
				// first screen
				toolBar.style.display = "block";
				navBar.style.top = "42px";
				menuBar.style.display = "none";
			}
			else {
				// not first screen
				toolBar.style.display = "none";
				navBar.style.top = "0";
				menuBar.style.display = "block";
			}
			// check if scrolling to footer
			if(destination.isLast) {
				// footer
				tip.style.display = "none";
			}
			else {
				// not footer
				tip.style.display = "block";
			}
		}
	});

	// monitor menuBar onclick
	previousBtn.onclick = function () {
		fullpage_api.moveSectionUp();
	}

	nextBtn.onclick = function () {
		fullpage_api.moveSectionDown();
	}

	// initialize 4th screen animation
	init4thScreenAnimation();
}

function init4thScreenAnimation() {
	// get elements
	let items = document.querySelectorAll(".section-four>ul>li");
	let imgs = document.querySelectorAll(".section-four>ul>li>img");
	let titles = document.querySelectorAll(".section-four>ul>li>h3");

	// monitor onmouseenter & onmouseleave
	for(let i = 0; i < items.length; i++) {
		let item = items[i];
		item.onmouseenter = function () {
			items[0].style.width = "20%";
			items[1].style.width = "20%";
			items[2].style.width = "20%";
			item.style.width = "60%";
			imgs[i].style.opacity = 1;
			titles[i].style.opacity = 0;

			if(i === 0) {
				imgs[0].style.left = "0";
			}
			else if(i === 2) {
				imgs[2].style.right = "0";
			}
		}
		item.onmouseleave = function () {
			items[0].style.width = "33%";
			items[1].style.width = "34%";
			items[2].style.width = "33%";
			imgs[i].style.opacity = 0.6;
			titles[i].style.opacity = 1;

			if(i === 0) {
				imgs[0].style.left = "-180px";
			}
			else if(i === 2) {
				imgs[2].style.right = "-180px";
			}
		}
	}
}