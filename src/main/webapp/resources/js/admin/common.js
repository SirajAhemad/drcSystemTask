function getLocalDateTime(data){
	if(data=='null' || data==undefined){
		return '';
	}

	var utcDate = Date.UTC(data.year,data.monthValue-1,data.dayOfMonth,data.hour,data.minute,data.second,0);
	var date = new Date(utcDate);
	return addZ(date.getDate())+"-"+addZ(Number(date.getMonth())+1)+"-"+addZ(date.getFullYear())+" "+addZ(date.getHours())+":"+addZ(date.getMinutes());
}

function getLocalDate(data){
	if(data=='null' || data==undefined){
		return '';
	}
	var utcDate = Date.UTC(data.year,data.monthValue-1,data.dayOfMonth);
	var date = new Date(utcDate);
	return addZ(date.getDate())+"-"+addZ(Number(date.getMonth())+1)+"-"+addZ(date.getFullYear());
}

function getLocalTime(datetime){
	if(datetime===null || datetime==undefined){
		return '';
	}
	var utcDate = new Date("01/01/1970 "+datetime.hour+":"+datetime.minute+":"+datetime.second);
	return moment(utcDate).format('hh:mm A');
}

function addZ(n){return n<10? '0'+n:''+n;}


function getDuration(date1,date2){

	if(date1!=null && date2!=null){
		var utcDate1 = Date.UTC(date1.year,date1.monthValue-1,date1.dayOfMonth,date1.hour,date1.minute,date1.second,0);
		var startDateTime = new Date(utcDate1);

		var utcDate2 = Date.UTC(date2.year,date2.monthValue-1,date2.dayOfMonth,date2.hour,date2.minute,date2.second,0);
		var endDateTime = new Date(utcDate2);

		var mintuesDiff = moment(endDateTime).diff(moment(startDateTime), 'minutes');

		return mintuesDiff;
	}

	return '';

}

function getCustomDateTime(date){

	if(date == null || date ==undefined || date == ""){
		return "";
	} else{
		date  = new Date(date + " UTC");
		return moment(date).format("DD-MM-YYYY HH:MM");
	}

}

 function getMiliSeconds(data){
	
	if(data=='null' || data==undefined || data==""){
		return new Date().valueOf();
	}
	var date = new Date(data);
	date = Date.UTC(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	);

	return date.valueOf();
 }

 function getISOToLocalDateTime(data,datetimeFormat){
	var date = new Date(data.replace("T"," ")+"Z");
	return moment(date).format(datetimeFormat);
 }

 function getTime(data){
	 var date = new Date();
	 date.setHours(data.hour);
	 date.setMinutes(data.minute);
	 date.setSeconds(data.second);

	 return moment(date).format("hh:mm A");
 }

