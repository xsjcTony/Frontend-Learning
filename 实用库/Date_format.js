function dateFormat(format, date) {
	let obj = {
		"M+": date.getMonth() + 1,                 //月份
		"d+": date.getDate(),                    //日
		"h+": date.getHours(),                   //小时
		"m+": date.getMinutes(),                 //分
		"s+": date.getSeconds()                 //秒
	};
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(let key in obj) {
		if(new RegExp(`${key}`).test(format)) {
			format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[key]) : (("00" + obj[key]).substr(("" + obj[key]).length)));
		}
	}
	return format;
}