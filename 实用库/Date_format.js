function dateFormat(format, date) {
	// deal with year
	// get yyyy
	let yearStr = format.match(/y+/); // find one or more "y"
	if(yearStr) {
		// replace yyyy by current year
		format = format.replace(yearStr[0], (date.getFullYear() + "").substr(4 - yearStr[0].length));
	}

	// deal with other time
	let obj = {
		"M+": date.getMonth() + 1, // month need to be added by 1
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	};

	// traverse to get all time
	for(let key in obj) {
		let formatStr = format.match(new RegExp(key));
		format = format.replace(formatStr[0], (formatStr[0].length === 1) ? obj[key] : ("00" + obj[key]).substr((obj[key] + "").length));
	}

	return format;
}
