/**
   APIs Report
 * @author tientv11, tulv2
 * @sine 05/05/2014
 */
var ReportsUtils = {
		_xhrReport:null,
		versionDMS : {
			BASIC : 1,
			PLUS:2,
			AVANDANCE:3
		},
		_hasSalesChart: null,
		versionDMSLogin:null,
		reportName : '',
	/** Import excel */
		uploadExcel:function(callback,params,formId,tit,fileObject,prefix,errMsgId,pFakefilepc){
			var frm = 'importFrm';
			if(formId!=null && formId!=undefined){
				from = formId;
			}				
			var title = msgCommon4;
			if(tit!=null && tit!=undefined){
				title = tit;
			}
			var file = 'excelFile';
			var fakefilepc = 'fakefilepc'; 
			if(pFakefilepc!=null && pFakefilepc!=undefined){
				fakefilepc = pFakefilepc;
			}
			if(fileObject!=null && fileObject!=undefined){
				file = fileObject;
			}			
			if(!ReportsUtils.previewImportExcelFile(document.getElementById(file))){
				return false;
			}
			var objectErrorSelector = '#errExcelMsg';
			if(prefix!=null && prefix!=undefined && errMsgId!=null && errMsgId!=undefined){
				objectErrorSelector = prefix + " " + errMsgId;
			
			}else if(prefix!=null && prefix!=undefined && (errMsgId==null || errMsgId==undefined)){
				objectErrorSelector = prefix + " #errExcelMsg";
				
			}else if((prefix==null || prefix==undefined) && (errMsgId!=null && errMsgId!=undefined)){
				objectErrorSelector =  errMsgId;
			}		
			var options = {
					beforeSubmit : function(){					
						$('.ErrorMsgStyle').html('').hide();
//						Utils.hideMessage();//LamNH
						$('#divOverlay').show();
						return true;
					},				
					success : function(responseText, statusText, xhr, $form){
						$('#divOverlay').hide();
						if (statusText == 'success') {	
							$("#responseDiv").html(responseText);
							if($('#tokenValue').html() !=null && $('#tokenValue').html() !=undefined){
								$('#token').val($('#tokenValue').html().trim());
							}
							if(($('#errorExcel').html() != null && $('#errorExcel').html().trim() == 'true') || ($('#errorExcelMsg').html() != null && $('#errorExcelMsg').html().trim().length > 0)){
								$(objectErrorSelector).html($('#errorExcelMsg').html()).show();
//								Utils.showMessage($('#errorExcelMsg').html());//LamNH
								var tmAZ = setTimeout(function(){
									$(objectErrorSelector).html($('#errorExcelMsg').html()).hide();
//									Utils.hideMessage();//LamNH
									clearTimeout(tmAZ);
								}, 20000);
							} else {
								$('#divOverlay').hide();
								var obj = new Object();
				    			obj.totalRow = Number($('#totalRow').html().trim());
				    			obj.numFail = Number($('#numFail').html().trim());
				    			var fileNameFail = $('#fileNameFail').html();
				    			var message =format(msgErr_result_import_excel,(obj.totalRow - obj.numFail),obj.numFail);		    		
				    			if(obj.numFail > 0){
				    				message+= ' <a href="'+WEB_CONTEXT_PATH+'/commons/downloadFile?file='+ fileNameFail +'">'+msgCommon5+'</a>';
				    			}
				    			if(obj.totalRow==0 && obj.numFail==0){
				    				message=msgErr_result_import_excel_null;
				    			}
				    			if($('#'+file).length!=0 && $('#'+fakefilepc).length!=0){
				    				try{
				    					$('#'+file).val('');
				    					$('#'+fakefilepc).val('');
				    				}catch(err){
				    					
				    				}
				    			}			    
				    			$(objectErrorSelector).html(message).show();
//				    			Utils.showMessage(message);//LamNH
				    			var tmAZ = setTimeout(function(){
				    				$(objectErrorSelector).html(message).hide();
//				    				Utils.hideMessage();//LamNH
				    				clearTimeout(tmAZ);
				    			}, 20000);
				    			if(callback!= null && callback!= undefined){
									callback.call(this,obj);
								}
					    	}
						}
					},
					type : "POST",
					dataType : 'html',
					data : params
			};
			$('#divOverlay').hide();
		$('#'+frm).ajaxForm(options);
		$.messager.confirm(msgXacNhan, title, function(r){
			if (r){
				$('#'+frm).submit();
			}
		});
	},
	
	/** Export Excel */
	exportExcel : function(dataModel,url,errMsg){

		if(errMsg == null || errMsg == undefined){
			errMsg = 'errExcelMsg';
		}
		var kData = $.param(dataModel,true);
		if(ReportsUtils._xhrReport != null){
			ReportsUtils._xhrReport.abort();
			ReportsUtils._xhrReport = null;
		}
		ReportsUtils._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
			success : function(data) {
//				$('.VinamilkTheme #divOverlay').hide();
				hideLoadingIcon();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msgCommon6 + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msgCommon7).show();
					} else{
						hideLoadingIcon();
//						window.location.href = data.view;
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
	                        CommonSearch.deleteFileExcelExport(data.view);
						},300000);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				$('.VinamilkTheme #divOverlay').hide();
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						ReportsUtils._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href =WEB_CONTEXT_PATH + '/home';
					}
				});
			}
		});
		return false;
	},
	
	/** Cay bao cao */
	loadTreeReport : function(url){
		/**
		 * (A) add parameter: url
		 * @author tuannd20
		 * @date 13/07/2014
		 */
		if (url != null && url != undefined && url.toString().trim().length !== 0){
			loadDataForTree(url);
		} else {
			loadDataForTree('/rest/report/tree.json');
		}
		$('#tree').bind("loaded.jstree", function(event, data){
			$('#tree').jstree('select_node', '#' + $('#tree ul li ul li')[0].id);
		});
		$('#tree').bind("select_node.jstree", function (event, data) {			
			var id = data.rslt.obj.attr("id");
			if(id!= null && id!= undefined && id.length > 0){
				ReportsUtils.showReportForm(id);
			}
	    });
		$('#tree').bind("open_node.jstree", function (event, data) {
	    });
	},
	setCurrentDateForCalendar: function(objId,firstDay){
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		if(day < 10){
			day = '0' + day;
		}
		if(firstDay != undefined && firstDay != null ){
			day = firstDay;
		}
		$('#' + objId).val(day + '/' + month + '/' + year);
	},
	setCurrentMonthForCalendar: function(objId){
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		$('#' + objId).val(month + '/' + year);
	},
	getCurrentDateString: function(){
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		if(day < 10){
			day = '0' + day;
		}
		return day + '/' + month + '/' + year;
	},
	showReportForm: function(id){
		var url = '';
		var text = '';
		var shopType = $('#shopTypeId').val();
		if (shopType != null && shopType != undefined){
			shopType = shopType.trim();
		}
		if (id == 'BCTGGTKH'){
			url = '/report/bctggtkh/info';
			text = msgCommon8;			
		} else if (id == 'BCLTCTNVBH'){
			url = '/report/bcltctnvbh/info';
			text = msgCommon9;
		}else if (id == 'BCDSSL'){
			url = '/report/bcdssl/info';
			text = msgCommon10;
		}else if(id == 'BCDSSLNVBH'){ // author :anhhpt
			url = '/report/bcdsslnvbh/info?typeReport=14';
			text = msgCommon15;
		}else if(id == 'BCTLCTKPI'){
			url = '/report/bcdsslnvbh/info?typeReport=15';
			text = msgCommon16;
		}else if(id == 'BCDSSLKH'){ // author :anhhpt
			url = '/report/bcdsslkh/info?isBcDsSlKh=true';//haupv3: bo sung filter theo thuoc tinh kh
			text = msgReportTitle16;
		}else if (id == 'BCKHTT'){
			url= '/report/bckhtt/info';
			text = msgCommon17;
		}else if (id == 'BCXNT'){ //author:anhhpt
			url= '/report/bcxnt/info';
			text = msgCommon18;
		}else if (id == 'BCXNTCT'){ //author:anhhpt
			url= '/report/bcxntct/info';
			text = msgCommon19;
		}else if (id == 'BCDSDH'){ //author:anhhpt
			url= '/report/bcdsdh/info';
			text = msgCommon20;
		}else if (id == 'BCKM'){ //author:haupv3
			url= '/report/bckm/info';
			text = msgBcKM;
		}else if (id == 'BCBDTK'){
			url= '/report/chart/sales-chart';
			text = msgThongKeChung;
		}else if (id == 'BCCC'){//author: haupv3
			url= '/report/bccc/info';
			text = msgChamCong;
		}else if (id == 'BCTDKP'){//author:haupv3
			url= '/report/bctdkp/info';
			text = msgBaoCaoDSVD;
		}else if (id == 'BCTKDL'){//author:haupv3
			url= '/report/bctkdl/info';
			text = msgTonKhoDiemLe;
		}else if (id == 'BCKQDT'){//author:haupv3
			url= '/report/bckqdt/info';
			text = msgKetQuaDiTuyen;
		}else if (id == 'BCMMKH'){//author:anhhpt
			url= '/report/bcmmkh/info';
			text = msgBaocCaoMoMoiKhachHang;
		}else if (id == 'BCKGTKH'){//author:lochp
			url= '/report/bckgtkh/info';
			text = msgKhongGheThamKH;
		}else if (id == 'BCKHPSDS'){
			url= '/report/bckhpsds/info?bcpsds=1';
			text = msgKhachHangPSDS;
		}else if (id == 'BCCBKHT'){
			url= '/report/bccbkht/info';//author: haupv3
			text = msgCanhBaoKHTrung;
		}else if (id == 'BCTTT'){
			url= '/report/bcttt/info';//author: haupv3
			text = msgThongTinTuyen;
		}else if (id == 'BCCTDHXB'){
			url= '/report/bcctdhxb/info';//author: LamNH
			text = msgChiTietDonHangXuatBan;
		}else if (id == 'BCTHSDDMS'){
			url= '/report/bcthsdDMS/info';//author: LamNH
			text = msgTinhHinhSuDungDMS;
		}else if (id == 'BCTDTG'){
			url= '/report/bctdtg/info';//author: Lochp
			text = msgBCTDTG;
		}
		//anhdt10
		else if (id == 'BC41CTTT'){
			url = '/report/bc41cttt/info';
			text = msgBCChiTietThanhToan;
		}else if (id == 'BC4_4'){
			url = '/report/4_4/info';
			text = msgBC4_4;
		}else if (id == 'BCQDDC'){
			url = '/report/bcqddc/info';
			text = msgBCQuangDuongDiChuyen;
		}
		//
		$('#divOverlay').show();
		$.ajax({
			type : 'GET',
			url : url,			
			dataType : "html",
			success : function(data) {
				$('#title2').html(text);
				$('#reportContainer').html(data);
				$('#divOverlay').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay').hide();
			}
		});
	},
	previewImportExcelFile : function (fileObj,formId,inputText){
		if($('.ErrorMsgStyle').length>0){
			$('.ErrorMsgStyle').html('').hide();
//			Utils.hideMessage();//LamNH
		}
		var inputId = 'fakefilepc';
		if(inputText != null || inputText != undefined){
			inputId = inputText;
		}
		var fileTypes=["xls","xslx"];
		if (fileObj.value != '') {
			if (!/(\.xls|\.xlsx)$/i.test(fileObj.value)) {
				$('#errExcelMsg').html(msgErr_excel_file_invalid_type).show();
//				Utils.showMessage(msgErr_excel_file_invalid_type);//LamNH
				fileObj.value = '';
				fileObj.focus();
				document.getElementById(inputId).value ='';			
				return false;
			} else {
				$('#errExcelMsg').html('').hide();
//				Utils.hideMessage();//LamNH
				var src = '';
				if ($.browser.msie){
				    var path = encodeURI(what.value);
				    path = path.replace("C:%5Cfakepath%5C","");
				    var path = decodeURI(path);
				    document.getElementById(inputId).value = path;
				}else{
					document.getElementById(inputId).value = fileObj.value;
				}	
			}
			if($('#excelFile')[0].files[0].size > 10485760){
	        	$('#errExcelMsg').html(msgCommon11).show();
//	        	Utils.showMessage(msgCommon11);//LamNH
	        	return false;
	        }
		}else{
			$('#errExcelMsg').html(msgCommon12).show();	
//			Utils.showMessage(msgCommon12);//LamNH
			return false;
		}
		return true;
	}
};
