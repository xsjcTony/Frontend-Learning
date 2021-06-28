function dateFormat(format, date) {
	// deal with year
	// get yyyy
	let yearStr = format.match(/y+/); // find one or more "y"
	if(yearStr) {
		yearStr = yearStr[0];
		// get date's year
		let yearNum = date.getFullYear() + "";
		yearNum = yearNum.substr(4 - yearStr.length);
		// replace yyyy by current year
		format = format.replace(yearStr, yearNum);
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
		let reg = new RegExp(key);
		let formatStr = format.match(reg);
		if(formatStr) {
			formatStr = formatStr[0];
			if(formatStr.length === 1) {
				format = format.replace(formatStr, obj[key]);
			}
			else {
				let numStr = "00" + obj[key];
				numStr = numStr.substr((obj[key] + "").length);
				format = format.replace(formatStr, numStr);
			}
		}
	}

	return format;
}