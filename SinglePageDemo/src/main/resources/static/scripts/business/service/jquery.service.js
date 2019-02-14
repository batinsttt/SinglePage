/**
 * Processing user's service
 * @author IT_SOL
 * @sine 12/02/2019
 */
var Service = {
	_countType: null,
	_isShowDlg: false,
	_loading: true,
	statusType:{ // defined bien enum cho combobox
		RUNNING:1,
		INACTIVE:0,
		DRAFT:2,
		REJECT:3
	},
	_WAITING : "WAITING",
	_REJECT : "REJECT",
	
/*--------------------Business service ------------------------------------*/
	/**
	 * Search channel
	 * @author IT_SOL
	 */
	searchChannel: function() {
		var addressFm = $('#address').val().trim();
		var phoneFm = $('#phone').val().trim();
		
		var arrParam = new Array();
		var param = new Object();
		param.name = "address";
		param.value = addressFm;
		arrParam.push(param);
		
		param = new Object();
		param.name = "phone";
		param.value = phoneFm;
		
		arrParam.push(param);
		
		var table1 = $('#example').DataTable();
		table1.ajax.url(Service.getUrlParam("http://10.30.176.198:9006/ITSolWebService/service/trackingSearch", arrParam)).load();
		 
	},	
	
		encodeChar: function(tst) {
		var result = "";
		if(tst!=null && tst!= undefined){
			tst=tst.toString();
			var char="!@#$%^&*()_+-:;<>?|\'\"\/";
			for(var i=0;i<tst.length;i++){
				if(char.indexOf(tst[i])!=-1){
					if(escape(tst[i])==tst[i]){
						result += encodeURIComponent(tst[i]);			
					}else{
						result += escape(tst[i]);
					}
				}else{
					result += encodeURI(tst[i]);
				}
			}
		}
		return result;
	},
	
	getUrlParam : function(url, params) {
		var searchUrl = '';
		var char = '?';
		searchUrl = url;
		if (params != null && params != undefined) {
			for ( var i = 0; i < params.length; i++) {
				searchUrl += i==0 : "?" + params[i].name + "=" + params[i].value;
				char = "&";
			}
		}
		return searchUrl;
	},
	
	
};