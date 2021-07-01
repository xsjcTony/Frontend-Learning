window.onload = function () {
	// get elements
	let video = document.querySelector('video');
	let figure = document.querySelector('figure');
	let totalTime = document.querySelector('#total_time');
	let currentTime = document.querySelector('#current_time');
	let playBtn = document.querySelector("#play");
	let fullScreenBtn = document.querySelector("#full_screen");
	let progress = document.querySelector(".progress");
	let bar = document.querySelector(".bar");

	// monitor whether video finishes loading
	video.oncanplay = function () {
		// hide loading gif
		figure.style.backgroundImage = "none";
		// show video
		video.style.display = "block";
		// get video length and reformat
		let videoLength = formatTime(video.duration);
		// set to #total_time span
		totalTime.innerText = `${videoLength.hour}:${videoLength.minute}:${videoLength.second}`;
	}

	// monitor play button onclick
	let playing = false;
	playBtn.onclick = function () {
		if(playing) {
			// playing
			// change icon
			playBtn.className = "iconfont icon-bofang"
			// pause
			video.pause();
			playing = false;
		}
		else {
			// paused
			// change icon
			playBtn.className = "iconfont icon-zanting"
			// resume
			video.play();
			playing = true;
		}
	}

	// monitor video current time
	video.ontimeupdate = function () {
		// get and set current time
		let playedTime = formatTime(video.currentTime);
		currentTime.innerText = `${playedTime.hour}:${playedTime.minute}:${playedTime.second}`;
		// set progress bar
		let barPercentage = video.currentTime / video.duration * 100;
		bar.style.width = barPercentage + "%";
	}

	// monitor progress bar onclick
	progress.onclick = function (event) {
		event = event || window.event;
		// click position / progress bar width = currentTime / duration
		// currentTime = click position / progress bar width * duration
		// get click position
		video.currentTime = event.offsetX / progress.offsetWidth * video.duration;
	}

	// monitor video finish
	video.onended = function () {
		// reset currentTime
		video.currentTime = 0;
		// reset icon
		playBtn.className = "iconfont icon-bofang"
		// reset playing flag
		playing = false;
	}

	// monitor full screen button onclick
	fullScreenBtn.onclick = function () {
		toFullVideo(video);
	}
}

function toFullVideo(videoDom){
	if(videoDom.requestFullscreen){
		return videoDom.requestFullscreen();
	}else if(videoDom.webkitRequestFullScreen){
		return videoDom.webkitRequestFullScreen();
	}else if(videoDom.mozRequestFullScreen){
		return videoDom.mozRequestFullScreen();
	}else{
		return videoDom.msRequestFullscreen();
	}
}
