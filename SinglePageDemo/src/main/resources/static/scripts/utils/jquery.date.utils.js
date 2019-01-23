var DateUtils = {
	DATE_FORMAT_STR: "dd/MM/yyyy",
	/** So sanh 2 ngay 
	 * @param startDate,toDate	 
	 * return -1 (startDate < endDate) : 0 (startDate = endDate): 1 (startDate > endDate)
	 */
	compareDate : function(startDate, endDate){
		if(startDate.length == 0 || endDate.length == 0){
			return true;			
		}
		var arrStartDate = startDate.split('/');
		var arrEndDate = endDate.split('/');
		var startDateObj = dates.convert(arrStartDate[1] + '/' + arrStartDate[0] + '/' + arrStartDate[2]);
		var endDateObj = dates.convert(arrEndDate[1] + '/' + arrEndDate[0] + '/' + arrEndDate[2]);
		return dates.compare(startDateObj,endDateObj);
	},
	/** Lay ngay/thang/nam hien tai */
	getCurrentDate : function(){
		var now = new Date(sysDateFromDB);
		var cYear = now.getFullYear();
		var cMonth = now.getMonth() + 1;
		var cDate = now.getDate();
		var currentDate = cDate+'/'+cMonth+'/'+cYear;
		return currentDate;
	},	
	/** Lay thang/nam hien tai */
	getCurrentMonth: function(){
		var d=new Date(sysDateFromDB);
		var dStr= ((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
		return dStr;
	},
	/** Lay nam hien tai */
	getCurrentYear : function(){
		var d=new Date(sysDateFromDB);
		return d.getFullYear();
	},
	/** Lay ngay cuoi tuan */
	getLastWeek : function(){
		var d = new Date(sysDateFromDB);
		var previousWeek= new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
		var lastWeek= (previousWeek.getDate().toString().length>1?previousWeek.getDate():'0'+previousWeek.getDate())+'/'+((previousWeek.getMonth()+1).toString().length>1?(previousWeek.getMonth()+1):'0'+(previousWeek.getMonth()+1))+'/'+previousWeek.getFullYear();
		return lastWeek;
	},
	/** Chuyen dinh dang thoi gian */
	formatDate: function(d){
		if(d != null || d != undefined){
			d = d.substring(0,10);
			d = d.split('-');
			d = d[2] + '/' + d[1] + '/' + d[0];
		}
		return d;
	},
	/** Chuyen dinh dang thoi gian */
	formatDateTime : function(d){
		if(d != null || d != undefined){
			var d1 = d.substring(0,10);
			var d2 = d.substring(11, 19);
			var arr = d1.split('-');
			d = arr[2] + '/' + arr[1] + '/' + arr[0] + ' ' + d2;
		}
		return d;
	},
	/** Chuyen dinh dang thoi gian */
	formatMonth: function(d){
		if(d != null || d != undefined){
			d = d.substring(0,10);
			d = d.split('-');
			d = d[1] + '/' + d[0];
		}
		return d;
	},
	/** So sanh 2 thang 
	 * @param startMonth,endMonth	 
	 * return -1 (startMonth < endMonth) : 0 (startMonth = endMonth): 1 (startMonth > endMonth)
	 */
	compareMonth: function(startMonth, endMonth){
		if(startMonth.length == 0 || endMonth.length == 0){
			return true;			
		}
		var arrStartMonth = startMonth.split('/');
		var arrEndMonth = endMonth.split('/');
		var startDateObj = dates.convert(arrStartMonth[0] + '/' + '01' + '/' + arrStartMonth[1]);
		var endDateObj = dates.convert(arrEndMonth[0] + '/' + arrEndMonth[0] + '/' + arrEndMonth[1]);
		return dates.compare(startDateObj,endDateObj);
	},
	isTime: function(timeStr){
		if (!StringUtils.isNullOrEmpty(timeStr)){
			var arr = timeStr.split(':');
			if (arr != null && arr.length == 2){
				if (/^[0-9]+$/.test(arr[0]) && /^[0-9]+$/.test(arr[1])
						&& (arr[0] >= 0 && arr[0] <= 24) && (arr[1] >= 0 && arr[1] <= 60)){
					return true;
				}
			}
		}
		return false;
	},
	/** Kiem tra gia tri co phai la dinh dang ngay theo format	  */
	isDate:function(txtDate, separator, type) {
	    var aoDate,           // needed for creating array and object
	        ms,               // date in milliseconds
	        isDate,			  // checkDate
	        month, day, year; // (integer) month, day and year
	    	
	    // if separator is not defined then set '/'
	    if (separator == undefined) {
	        separator = '/';
	    }
	    // split input date to month, day and year
	    aoDate = txtDate.split(separator);
	    // array length should be exactly 3 (no more no less)
	   
	    if(type == null || type == undefined){
			type = Utils._DATE_DD_MM_YYYY;
		}
	    switch (type) {
			case Utils._DATE_DD_MM_YYYY:
				if (aoDate.length !== 3) {
					return false;
				}
				 // define month, day and year from array (expected format is m/d/yyyy)
			    // subtraction will cast variables to integer implicitly
			    day = aoDate[0] - 0; // because months in JS start from 0
			    month = aoDate[1] - 1;
			    year = aoDate[2] - 0;
				break;
			case Utils._DATE_MM_YYYY:
				if (aoDate.length !== 2) {
					return false;
				}
				day = 1;
			    month = aoDate[0]-1;
			    year = aoDate[1]-0;
				break;
			default:
				break;
		}
	   
	    // test year range
	    if (year < 1000 || year > 3000) {
	        return false;
	    }
	    // convert input date to milliseconds
	    ms = (new Date(year, month, day)).getTime();
	    // initialize Date() object from milliseconds (reuse aoDate variable)
	    aoDate = new Date();
	    aoDate.setTime(ms);
	    // compare input date and parts from Date() object
	    // if difference exists then input date is not valid
	    if (aoDate.getFullYear() !== year ||
	        aoDate.getMonth() !== month ||
	        aoDate.getDate() !== day) {
	        return false;
	    }
	    // date is OK, return true
	    return true;
	},
	/** Chuyen string to date */
	convertDate : function(txtDate, separator){
		// if separator is not defined then set '/'
	    if (separator == undefined) {
	        separator = '/';
	    }
	    // split input date to month, day and year
	    aoDate = txtDate.split(separator);
	    // array length should be exactly 3 (no more no less)
	    if (aoDate.length !== 3) {
	        return false;
	    }
	    // define month, day and year from array (expected format is m/d/yyyy)
	    // subtraction will cast variables to integer implicitly
	    day = aoDate[0] - 0; // because months in JS start from 0
	    month = aoDate[1] - 1;
	    year = aoDate[2] - 0;
	    // test year range
	    if (year < 1000 || year > 3000) {
	        return null;
	    }
	    // convert input date to milliseconds
	    ms = (new Date(year, month, day)).getTime();
	    // initialize Date() object from milliseconds (reuse aoDate variable)
	    aoDate = new Date();
	    aoDate.setTime(ms);
	    // compare input date and parts from Date() object
	    // if difference exists then input date is not valid
	    if (aoDate.getFullYear() !== year ||
	        aoDate.getMonth() !== month ||
	        aoDate.getDate() !== day) {
	        return null;
	    }
	    // date is OK, return true
	    return aoDate;
	},
	toDateStringDDMMYYYY: function(d){
		var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+d.getFullYear();
		return dStr;
	},
	toDateStringDDMMYY: function(d){
		var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+DateUtils.getBriefYear(d);
		return dStr;
	},
	getBriefYear: function(d){
		var d = new Date();
		var x = d.getFullYear() + '';
		return x.substring(2, 4);
	},
	/** convert date to string */
	toDateString : function(d){
		var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+'/'+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
		return dStr;
	},	
	/** convert datetime to string */
	toTimeString : function(d){
		var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+d.getFullYear(); (d.getHours().toString().length>1?d.getHours():'0'+d.getHours())+':'+(d.getMinutes().toString().length>1?d.getMinutes():'0'+d.getMinutes());
		return dStr;
	},
	toDateTimeString : function(d){
		var dStr= d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds();
		return dStr;
	},
	/** So tuan cua nam */
	getWeekOfYear : function(d) {
		// Create a copy of this date object
		var target = new Date(d.valueOf());
		// ISO week date weeks start on monday
		// so correct the day number
		var dayNr = (d.getDay() + 6) % 7;		
		// Set the target to the thursday of this week so the
		// target date is in the right year
		target.setDate(target.getDate() - dayNr + 3);
		// ISO 8601 states that week 1 is the week
		// with january 4th in it
		var jan4 = new Date(target.getFullYear(), 0, 4);
		// Number of days between target date and january 4th
		var dayDiff = (target - jan4) / 86400000;
		// Calculate week number: Week 1 (january 4th) plus the
		// number of weeks between target date and january 4th
		var weekNr = 1 + Math.ceil(dayDiff / 7);
		return weekNr;
	},
	/** Ngay dau tien cua tuan */
	getFirstDayOfWeek : function(week,year){
		var dateTmp;
		if(week == null || week == undefined || week ==''){
			return '';
		}
		if(year == null || year == undefined || year == ''){
			var currentDate =new Date(sysDateFromDB);
			dateTmp = new Date (currentDate.getFullYear(),0,1);
		} else{
			dateTmp = new Date(year.toString(),0,1); // toString first so it parses correctly year numbers
		}
		var daysToFirstDay = (1 - dateTmp.getDay()); // Note that this can be also negative
		var firstDayOfFirstWeek = new Date(dateTmp.getTime() + daysToFirstDay * 86400000);
		var firstDate = new Date(firstDayOfFirstWeek.getTime() + (7 * (week - 1) * 86400000));
		return toDateString(firstDate);
	},
	/** Phep chia 2 ngay */
	dateDiff : function(idToDate, idFromDate) {
		var fDate = $('#'+idFromDate).val();
		var tDate = $('#'+idToDate).val();
		var arrFDate = fDate.split('/');
		var monthFTxt = arrFDate[0];
		var yearFTxt = arrFDate[1];
		var DateFTxt  = arrFDate[2];
		var arrTDate = tDate.split('/');
		var monthTTxt = arrTDate[0];
		var yearTTxt = arrTDate[1];
		var DateTTxt  = arrTDate[2];
		var d1 = new Date(yearFTxt+"/"+monthFTxt+"/"+DateFTxt);
		var d2 = new Date(yearTTxt+"/"+monthTTxt+"/"+DateTTxt);
		var datediff = d2.getTime() - d1.getTime();
	    return (datediff / (24*60*60*1000));   
	},
	/** Phep tru 2 ngay **/
	subDateForDay : function(){
		var fDate = $('#'+idDate).val();
		var arrFDate = fDate.split('/');
		var monthFTxt = arrFDate[0];
		var yearFTxt = arrFDate[1];
		var DateFTxt  = arrFDate[2];
		var d = new Date(yearFTxt+"/"+monthFTxt+"/"+DateFTxt);
		var b = new Date(d.getTime()-(24*60*60*1000*i));
		var kq = b.getDate()+'/'+ (b.getMonth()+1)+'/'+b.getFullYear();
		return kq;
	}
};
var MaskManager= {
	maskDate: function(selector){
		$(selector).mask("99/99/9999");
	},
	maskMonth: function(selector){
		$(selector).mask("99/9999");
	},
	maskPrice: function(selector){
		$(selector).mask("999999/99999");
	}
};
