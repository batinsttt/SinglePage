;(function($){
/**
 * jqGrid English Translation
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "Xem {0} - {1} của {2}",
		emptyrecords: "Không có kết quả",
		loadtext: "Đang tải...",
		pgtext : "Trang {0} của {1}"
	},
	search : {
		caption: "Tìm kiếm...",
		Find: "Tìm",
		Reset: "Thiết lập lại",
		odata : ['bằng', 'không bằng', 'nhỏ hơn', 'nhỏ hơn hoặc bằng','lớn hơn','lớn hơn hoặc bằng', 'bắt đầu với','không bắt đầu với','trong khoảng','không trong khoảng','kết thúc với','không kết thúc với','chứa','không chứa'],
		groupOps: [	{ op: "AND", text: "Tất cả" },	{ op: "OR",  text: "bất kỳ" }	],
		matchText: " match",
		rulesText: " rules"
	},
	edit : {
		addCaption: "Thêm dòng",
		editCaption: "Sửa dòng",
		bSubmit: "Submit",
		bCancel: "Hủy",
		bClose: "Đóng",
		saveData: "Dữ liệu có thay đổi! Bạn có muốn lưu không?",
		bYes : "Đồng ý",
		bNo : "Từ chối",
		bExit : "Hủy",
		msg: {
			required:"Trường bắt buộc",
			number:"Vui lòng nhập số",
			minValue:"giá trị phải lớn hơn hoặc bằng ",
			maxValue:"giá trị phải nhỏ hơn hoặc bằng",
			email: "không đúng định dạng email",
			integer: "Vui lòng nhập số nguyên",
			date: "Vui lòng nhập giá trị ngày",
			url: "URL không hợp lệ. Tiền tố bắt buộc ('http://' or 'https://')",
			nodefined : " không xác định!",
			novalue : " giá trị trả về là bắt buộc!",
			customarray : "Chức năng tùy chỉnh nên trả về mảng!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Xem dòng",
		bClose: "Đóng"
	},
	del : {
		caption: "Xóa",
		msg: "Xóa dòng được chọn?",
		bSubmit: "Xóa",
		bCancel: "Hủy"
	},
	nav : {
		edittext: "",
		edittitle: "Chỉnh sửa dòng được chọn",
		addtext:"",
		addtitle: "Thêm dòng mới",
		deltext: "",
		deltitle: "Xóa dòng được chọn",
		searchtext: "",
		searchtitle: "Tìm dòng",
		refreshtext: "",
		refreshtitle: "Tải lại lưới",
		alertcap: "Cảnh báo",
		alerttext: "Vui lòng chọn dòng",
		viewtext: "",
		viewtitle: "Xem dòng được chọn"
	},
	col : {
		caption: "Chọn các dòng",
		bSubmit: "Đồng ý",
		bCancel: "Hủy bỏ"
	},
	errors : {
		errcap : "Lỗi",
		nourl : "Không có url được thiết lập",
		norecords: "Không có dòng nào để xử lý",
		model : "Length of colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7",
				"Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"
			],
			monthNames: [
				"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
				"Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
			],
			AmPm : ["sáng","chiều","Sáng","Chiều"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'd-m-Y',
			newformat: 'n/j/Y',
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				ISO8601Long:"d-m-Y H:i:s",
				ISO8601Short:"d-m-Y",
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				SortableDateTime: "d-m-Y\\TH:i:s",
				UniversalSortableDateTime: "d-m-Y H:i:sO",
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);
