function nowDate(date) {
	var now;
	date == null ? now = new Date() : now = new Date(date);

	var nowYear = now.getFullYear(); //年

	var nowMonth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth(); //月

	var nowDay = now.getDate() < 10 ? "0" + now.getDate() : now.getDate(); //日期
	var nowHour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(); //时
	var nowMinute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(); //分
	var time = nowYear + "-" + nowMonth + "-" + nowDay + "T" + nowHour + ":" + nowMinute;
	return time;
}

function compareDate(stime, etime) {
	//			alert(stime);-8*3600*1000

	var bool = new Date(stime) - new Date(etime);
	//	console.log(bool);
	return bool;
}

function netNowDate() {

	mui.get(HEAD + '/Lease/WebService1.asmx/GetSystemTime', {
		category: 'news'
	}, function(data) {
		time = stringJson(data)
			//				alert(time)
		nowTime(time);

	}, 'text');

}

function afterNowDay(t, dateType) {
	var now = new Date();
	var nextDate = new Date(now);
	if (dateType == "hour") {
		nextDate.setHours(now.getHours() + t);
	} else if (dateType == "day") {
		nextDate.setDate(now.getDate() + t);
	}else if(dateType == "year"){
		nextDate.setYear(now.getYear() + t)
	}

	var nextDateMonth = (nextDate.getMonth() + 1) < 10 ? "0" + (nextDate.getMonth() + 1) : (date2.getMonth() + 1)
	var nextDateDay = nextDate.getDate() < 10 ? "0" + nextDate.getDate() : nextDate.getDate();
	var nextDateHours = nextDate.getHours() < 10 ? "0" + nextDate.getHours() : nextDate.getHours();
	var nextDateMinutes = nextDate.getMinutes() < 10 ? "0" + nextDate.getMinutes() : nextDate.getMinutes();
	var nextDateStr = nextDate.getFullYear() + "-" + nextDateMonth + "-" + nextDateDay + " " + nextDateHours + ":" + nextDateMinutes;
	var nextDateStr1 = nextDate.getFullYear() + "-" + nextDateMonth + "-" + nextDateDay;
	
	if (dateType == "hour" || dateType == "year") {
		return nextDateStr
	}else{
		return nextDateStr1;
	}
	
//	return nextDateStr; 
}