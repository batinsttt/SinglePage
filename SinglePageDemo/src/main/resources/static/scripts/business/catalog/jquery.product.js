/**
 * Product manager.
 * @author tulv2
 * @sine 20/05/2014
 */
var Product = {
	_xhrSave : null,
	_xhrDel: null,	
	countArray:null,
	indexPrice : 1000,
	_basicMode : true,
	mapPrice : new Map(),
	mapPricePackage : new Map(),
	_zCat : "Z",
	hideTabs: function() {
		$('#tab1').removeClass('Active');
		$('#tab2').removeClass('Active');
		$('#tab3').removeClass('Active');
		$('#content1').hide();
		$('#content2').hide();
		$('#content3').hide();
		$('.ErrorMsgStyle').hide();
		$('.SuccessMsgStyle').hide();
//		Utils.hideMessage();//LamNH
	},
	activeTab1: function() {
		alert('1');
		Product.hideTabs();
		$('#tab1').addClass('Active');
		$('#content1').show();
	},
	activeTab2: function() {
		Product.hideTabs();
		$('#tab2').addClass('Active');
		$('#content2').show();
		Product.loadImage();
	},
	activeTab3: function() {
		Product.hideTabs();
		$('#tab3').addClass('Active');
		$('#content3').show();
	},
	searchProduct: function() {
		var params = new Object();
		var categoryStr = '';
		var arr = $('#category').val();
		if (arr == null) arr = [];
//		if (arr.length > 0 && arr[0] == '-1') arr.splice(0, 1);
		var n = arr.length;
		for (var i = 0; i < n; i++) {
			if (i != 0) categoryStr += '-';
			categoryStr += arr[i];
		}
		params.productCode = $('#productCode').val().trim();
		params.productName = $('#productName').val().trim();
		params.categoryStr = categoryStr;
		params.statusValue = $('#status').val();
		
		//Tim kiem theo thuoc tinh dong - haupv3
		var arr1 = new Array();
		var arr2 = new Array();
		var arrMultiSize = new Array();
		if(Product._basicMode == false){
			var i = 0;
			$('.attributeCls').each(function() {
				var objectId = '#' + $(this).attr('id');
				var type = $(objectId).attr('multiple');
				var idx = objectId.split('_')[1];
				if(Utils.isEmpty($('#attH_' + idx).val())){
					arr1[i] = " ";
				}else{
					arr1[i] = $('#attH_' + idx).val();
					
				}
				
				if (type != null && type != undefined && type == 'multiple') {
					if(!Utils.isEmpty($(objectId).combobox('getValues'))){
						arr2[i] = $(objectId).combobox('getValues');
						arrMultiSize[i] = $(objectId).combobox('getValues').length;
					}else{
						arr2[i] = " ";
						arrMultiSize[i] = 1;
					}
				} else {
					if(!Utils.isEmpty($(objectId).val())){
						arr2[i] = $(objectId).val();
						arrMultiSize[i] = 1;
					}else{
						arr2[i] = " ";
						arrMultiSize[i] = 1;
					}
				}
				if (arr2[i] == null || arr2[i] == '-1') {
					arr2[i] = " ";
					arrMultiSize[i] = 1;
				}
				i++;
			});		
		}
		
		params.lstAttIdArray = arr1.toString();
		params.lstAttValueArray = arr2.toString();
		params.lstMultiSizeArr = arrMultiSize.toString();
		
		$('#productGrid1').datagrid('load', params);
		return false;
	},
	fillCategories: function() {
		$.ajax({
			url: '/catalog/product/get-category',
			method: 'GET',
			success: function(rs) {
				if (rs.error != undefined && !rs.error) {
					var lstCategory = rs.rows;
					$('#category').removeAttr('disabled');
					var html = '';
					if(lstCategory.length > 0){
//						html += '<option value="-1" >--' + msgAll + '--</option>';
						html += '<option value="ALL">--' + msgAll + '--</option>';
						html += '<option value="OTHERS"  >'+notBelongToCategory+'</option>';
						for(var i=0; i < lstCategory.length; i++){
							html += '<option value="'+ Utils.XSSEncode(lstCategory[i].productInfoCode) +'">' +
								Utils.XSSEncode(lstCategory[i].productInfoCode) + ' - ' +
								Utils.XSSEncode(lstCategory[i].productInfoName) + '</option>';  
						}
						$('#category').html(html);
						$('#category').change();
						$('#ddcl-category').remove();
						$('#ddcl-category-ddw').remove();
						$('#category').dropdownchecklist({
							emptyText:msgsChonNganhHang,
							firstItemChecksAll: true,
							maxDropHeight: 350
						});
					} else {
						$('#category').html('');
						$('#category').attr('disabled','disabled');
						$('#category').dropdownchecklist({
							emptyText:'-------------------',
							firstItemChecksAll: true,
							maxDropHeight: 350
						});
					}
					$('.ui-dropdownchecklist-text').css({"padding-left":"5px"});
					var w = $('#productCode').width() - 24;
					$('.CatSelectDiv .ui-dropdownchecklist-selector').css('width', w+'px');
					$('.CatSelectDiv #ddcl-category-ddw').css('width', (w + 33)+'px');
					$('.CatSelectDiv .MySelectBoxClass').css('width', $('#productCode').width()+ 'px');
				}
			}
		});
	},
	importExcel: function() {
		ReportsUtils.uploadExcel(function(){
			$('#productGrid1').datagrid('reload');
		});
	},	
	exportExcel: function() {
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
		$('#sucExcelMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		$.messager.confirm(msgXacNhan, msgQuestionExport, function(r){
			if (r){//point
				var params = new Object();
				var categoryStr = '';
				var arr = $('#category').val();
				if (arr == null) arr = [];
				if (arr.length > 0 && arr[0] == '-1') arr.splice(0, 1);
				var n = arr.length;
				for (var i = 0; i < n; i++) {
					if (i != 0) categoryStr += '-';
					categoryStr += arr[i];
				}
				params.productCode = $('#productCode').val().trim();
				params.productName = $('#productName').val().trim();
				params.categoryStr = categoryStr;
				params.statusValue = $('#status').val();
				//Tim kiem theo thuoc tinh dong - haupv3
				var arr1 = new Array();
				var arr2 = new Array();
				var arrMultiSize = new Array();
				if(Product._basicMode == false){
					var i = 0;
					$('.attributeCls').each(function() {
						var objectId = '#' + $(this).attr('id');
						var type = $(objectId).attr('multiple');
						var idx = objectId.split('_')[1];
						if(Utils.isEmpty($('#attH_' + idx).val())){
							arr1[i] = " ";
						}else{
							arr1[i] = $('#attH_' + idx).val();
							
						}
						
						if (type != null && type != undefined && type == 'multiple') {
							if(!Utils.isEmpty($(objectId).combobox('getValues'))){
								arr2[i] = $(objectId).combobox('getValues');
								arrMultiSize[i] = $(objectId).combobox('getValues').length;
							}else{
								arr2[i] = " ";
								arrMultiSize[i] = 1;
							}
						} else {
							if(!Utils.isEmpty($(objectId).val())){
								arr2[i] = $(objectId).val();
								arrMultiSize[i] = 1;
							}else{
								arr2[i] = " ";
								arrMultiSize[i] = 1;
							}
						}
						if (arr2[i] == null || arr2[i] == '-1') {
							arr2[i] = " ";
							arrMultiSize[i] = 1;
						}
						i++;
					});		
				}
				
				params.lstAttIdArray = arr1.toString();
				params.lstAttValueArray = arr2.toString();
				params.lstMultiSizeArr = arrMultiSize.toString();
				
				var url = "/catalog/product/export-excel";
				CommonBusiness.exportExcelData(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
	},
	beforeImportExcel: function(){
		if(!previewImportExcelFile(document.getElementById("excelFile"))){
			return false;
		}
		$('#errExcelMsg').html('').hide();
		$('#sucExcelMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		$('.VinamilkTheme #divOverlay').show();
		return true;
	},
	afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
		$('#excelFile').val('');
		$('#fakefilepc').val('');
		$('#productGrid1').datagrid('reload');
		$('.VinamilkTheme #divOverlay').hide();
		if (statusText == 'success') {
			Product.fillCategories();
	    	$("#responseDiv").html(responseText);
	    	var token = $('#tokenValue').html();
//	    	$('#tokenImportantValue').val(token);
			$('#token').val(token);
	    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
	    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
//	    		Utils.showMessage($('#errorExcelMsg').html());//LamNH
	    	} else {
	    		if($('#typeView').html().trim() == 'false'){
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var numSuccess =  totalRow - numFail ;
	    			//var mes = 'Nhập thành công ' + (totalRow - numFail) + ' dòng, thất bại ' + numFail + ' dòng. ';
	    			var mes = format(msgErr_result_import_excel, numSuccess , numFail); 
	    			if(numFail > 0){
	    				mes += msgsXemChiTietLoi + '!';
	    				$('#sucExcelMsg').html('<a style="color:#f00" href="'+ fileNameFail +'">' +
	    						mes + '</a>').show();
//	    				Utils.showMessage('<a style="color:#f00" href="'+ fileNameFail +'">' +
//	    						mes + '</a>');//LamNH
	    			} else {
	    				$('#sucExcelMsg').html(mes).show();
//	    				Utils.showMessage(mes);//LamNH
	    			}
	    			
	    			setTimeout(function(){
						$('#sucExcelMsg').html('').hide();
//						Utils.hideMessage();//LamNH
					},15000);
	    		}
	    	}
	    }
	},
	showViewScreen: function(productId) {
		$('.VinamilkTheme #divOverlay').show();
		hrefPost('/catalog/product/view-product?productId=' + productId, {allowed:false});
		return false;
	},
	loadImage:function(seq,error, errMsg){
		var productId = $("#productId").val().trim();
		var data = new Object();
		data.productId = productId;
		var kData = $.param(data, true);
		if (CKEDITOR.instances['description'] != null){
			CKEDITOR.instances['description'].destroy(true); 
		}
		$.ajax({
			type : "POST",
			url : "/catalog/product/image",
			data : (kData),
			dataType: "html",
			success : function(data) {
				setTimeout(function(){
					$('#pageDown').show();
				 	if(Math.floor($('#numPage').val()/8) < 1){
						$('#pageDown').hide();
					} 
				}, 500);
				$("#divImageProduct").html(data).show();
				if($('#language').val() != undefined && $('#language').val() == 'en'){
					editor = CKEDITOR.replace('description',{
						language : $('#language').val()
					});
				}else{
					editor = CKEDITOR.replace('description');
				}
				$('.cke_dialog_ui_hbox_last').css('padding', '5px');
				$('#divMI').css({'padding-left':0,'padding-right':0});
				var w = $('#divMI').width() - 310;
				if (w > 0) {
					$('#divMI').css({'padding-left':w/2,'padding-right':w/2});
				}
				if(seq!=undefined && seq!=null){
					if(error){
						$('#errMsgUpload').html(seq).show();
//						Utils.showMessage(seq);//LamNH
					}else{
						$('#successMsgUpload').html(seq).show();
//						Utils.showMessage(seq);//LamNH
					}
				}
				if (errMsg != undefined && errMsg != null){
					$('#errMsgUpload').html(errMsg).show();
//					Utils.showMessage(errMsg);//LamNH
				}
				Product.countArray = new Map();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						if($('#language').val() != undefined && $('#language').val() == 'en'){
							editor = CKEDITOR.replace('description',{
								language : $('#language').val()
							});
						}else{
							editor = CKEDITOR.replace('description');
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
//						window.location.href = '/home';
						Product.activeTab1();
					}
				});
			}
		});
		return false;
	},
	
	getListMediaItem:function(type){
		if(type == 0){
			if($('#numIndex').val() != null && parseInt($('#numIndex').val()) > 0){
				$('#numIndex').val(parseInt($('#numIndex').val())-1);
				if($('#numIndex').val() == 0){
					$('#pageUp').hide();
				}
			}
			$('#pageDown').show();
		}else{
			$('#numIndex').val(parseInt($('#numIndex').val())+1);
			if(($('#numIndex').val() == Math.floor($('#numPage').val()/8))||
					(parseInt($('#numIndex').val())+1 == Math.floor($('#numPage').val()/8)&&$('#numPage').val()%8==0)){
				$('#pageDown').hide();
			}
			$('#pageUp').show();
		}
		$.ajax({
			type : "POST",
			url : "/catalog/product/getlistmediaitem",
			data : ({productId:$('#productId').val(),numIndex:$('#numIndex').val()}),
			dataType: "html",
			success : function(data) {
				$('#divMI').html(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH + '/home';
					}
				});
			}
		});
	},
	
	changeProductDescription:function(){
		var msg = '';
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
//			Utils.showMessage(errMsg);//LamNH
			return false;
		}
		var dataModel = new Object();
		dataModel.productId = $('#productId').val();
		dataModel.introductionId = $('#introductionId').val();
		dataModel.description = CKEDITOR.instances['description'].getData();
		Utils.addOrSaveData(dataModel, "/catalog/product/change-product-description", Product._xhrSave, null,null);
		return false;
	},
	
	changeProductImage:function(productId){
		$('#errMsgUpload').html('').hide();
		Utils.hideMessage();//LamNH
		var msg = ''; 
		var size = parseInt($('#totalImage').val().trim()) + Product.countArray.size();
		if( size>20){
			msg = format(msgsFileUploadMax, 20);
		}
		if(msg.length==0 && $('#fileQueue').html().length>0 && Product.countArray.size()==0){
			msg = msgsNoImageChoose;
		}
		if(msg.length>0){
			$('#errMsgUpload').html(msg).show();
//			Utils.showMessage(errMsg);//LamNH
			return false;
		}
		$('#divOverlay').show();
		$('#imageFile').uploadifySettings('scriptData',{
			'productId':productId,
			'currentUser':currentUser,
			'langOfSession': langOfSession
		});
		if($('#videoMsg').html() != "" && parseInt($('#mediaType').val()) == 1){
			$('#videoMsg').html(msgsOnlyOneFileVideo).show();
		}
		$('#imageFile').uploadifyUpload();
		if($('#fileQueue').html() == "" || parseInt($('#successUpload').val().trim()) == 1){
			$('#importFrm').submit();
		}
		return false;
	},
	uploadVideo:function(){
		$('#importFrm').submit();
		return true;
	},
	beforeImportItem: function(){
		if(!Product.previewImportFile(document.getElementById("videoFile"),1)){
			$('#errorValue').val(1);
			$('#divOverlay').hide();
			return false;
		}
		$('#videoMsg').html('').hide();
		return true;
	},
	afterImportItem: function(responseText, statusText, xhr, $form){
		responseText = responseText.substring(5);
		responseText = responseText.substring(0, responseText.length - 6);
		eval("var obj="+responseText);
		var msg = '';
		var error = true;
		if(obj.status!=null && obj.status==2){
			 msg = format(msgsUploadFileTooLarge, 10);
		}else{
			
			if($('#countFail').val() <= 0){
				error = false;
			}
			if(obj.status == 1){
				//msg = "Tải thành công "+ $('#countSuccess').val() +" hình ảnh,tải thất bại "+ $('#countFail').val() +" hình ảnh và 1 video";
				msg = format(msgsThongBaoKQImport2_1, $('#countSuccess').val(), $('#countFail').val());				
				if (!StringUtils.isNullOrEmpty(obj.errMsg)){
					$('#errMsgUpload').html(obj.errMsg).show();
//					Utils.showMessage(obj.errMsg);//LamNH
					error = true;
					Product.loadImage(obj.errMsg, error);
				}
			}else {			
				msg = format(msgsThongBaoKQImport3_1, $('#countSuccess').val(), $('#countFail').val());
				Product.loadImage(msg,error);
			}
		}
		$('#divOverlay').hide();
	},
	previewImportFile:function (fileObj,type){
		if(type == 0){
			if (fileObj.value != '') {
				if (!/(\.jpg|\.png)$/i.test(fileObj.value)) {
					$('#errMsgUpload').html(msgsFileKhongHopLe).show();
//					Utils.showMessage(msgsFileKhongHopLe);//LamNH
					fileObj.value = '';
					fileObj.focus();
					$('#errorValue').val(1);
					return false;
				} else {
					$('#errorValue').val(0);
					$('#errMsgUpload').html('').hide();
					Utils.hideMessage();//LamNH
				}
			}else{
				$('#errMsgUpload').html(msgsNoFileChoose1).show();
//				Utils.showMessage(msgsNoFileChoose1);//LamNH
				$('#successUpload').val(1);
				return false;
			}
		}else{
			if (fileObj.value != '') {
				if (!/(\.mp4|\.avi|\.flv)$/i.test(fileObj.value)) {
					$('#errMsgUpload').html(msgsFileNotRightType).show();
//					Utils.showMessage(msgsFileNotRightType);//LamNH
					fileObj.value = '';
					fileObj.focus();
					$('#errorValue').val(1);
					return false;
				} else if(fileObj.files[0].size > 10485760){//>10M					
					$('#errMsgUpload').html(format(msgsUploadFileTooLarge, 10)).show();
//					Utils.showMessage(format(msgsUploadFileTooLarge, 10));//LamNH
					fileObj.value = '';
					fileObj.focus();
					$('#errorValue').val(1);	
					return false;
				} else{
					$('#errorValue').val(0);
					$('#videoMsg').html(fileObj.value).show();
				}
			}else{
				$('#errMsgUpload').html(msgsNoFileChoose1).show();
//				Utils.showMessage(msgsNoFileChoose1);//LamNH
				$('#errorValue').val(1);
				return false;
			}
		}
		return true;
	},
	
	deleteMediaItem: function(){
		var dataModel = new Object();
		dataModel.mediaItemId = $('#mediaItemId').val();	
		$.messager.confirm(msgXacNhan, msgsConfirmDelete1, function(r){
			if (r){
				Utils.saveData(dataModel, "/catalog/product/remove-media-item", Product._xhrDel, null,function(data){
					Product.loadImage();
				},null,null,true);
			}
		});	
		return false;		
	},
	
	liveUpdateImageForProduct:function (object,mediaType,mediaItemId,checkPermission){
		$('#mediaItemId').val(mediaItemId);
		if(mediaType == 0){
			$('#player').html('').hide();
			$('#imageBox').show();			
			var orgSrc = object.attr('data');
			var source = imgServerPath+orgSrc;
			$('#imageBox').html('<img width="715" height="551" alt="" src="'+source+'" />');
			if (checkPermission == 1) {
				$('#imageBox').append('<a class="Sprite1 HideText DeleteLinkStyle" onclick="return Product.deleteMediaItem();" href="javascript:void(0)">' + msgText4 +'</a>');
			}
		}else{
			$('#player').show();
			$('#imageBox').hide();
			var orgSrc = object.attr('data');
			var source = imgServerPath+orgSrc;
			if(orgSrc.substring(orgSrc.length - 3,orgSrc.length) == 'avi'){
				$('#player').html('<a class="media" href="'+source+'"></a>');
				$('.media').media({width:715, height:551, autoplay: true});
			}else{
				flowplayer("player", WEB_CONTEXT_PATH + "/resources/scripts/plugins/flowplayer-3.2.16/flowplayer/flowplayer-3.2.16.swf",{
					plugins: {
						audio: {
							url: WEB_CONTEXT_PATH + '/resources/scripts/plugins/flowplayer-3.2.16/flowplayer/audio/flowplayer.audio-3.2.10.swf'
						}
					},
					clip: {
						url: source,
						autoPlay: true,
						autoBuffering: true
					},
					play: {
						replayLabel: msgsXemlai
					}
				});
			}
		}
		var w = $('.GeneralMIn.MediaPlayerSection').width();
		w = w + w * .15;
		$('#videoBox #player').width(w);
		$('#videoBox #player .media').width(w);
		$('#videoBox #player object').width(w);
	},
	exportExcelTemplate:function(){
		var url='/catalog/product/export-template-excel-product';
		if(CommonSearch._xhrReport != null){
			CommonSearch._xhrReport.abort();
			CommonSearch._xhrReport = null;
		}
		$('#divOverlay_New').show();
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			dataType: "json",
			success : function(data) {
				hideLoadingIcon();	
				$('#divOverlay_New').hide();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msgsThongBaoKQImport3 + escapeSpecialChar(data.errMsg)).show();
//					Utils.showMessage(msgsThongBaoKQImport3 + escapeSpecialChar(data.errMsg));//LamNH
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msgsThongBaoKQImport2).show();
//						Utils.showMessage(msgsThongBaoKQImport2);//LamNH
					} else{
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
				$('#divOverlay_New').hide();
			}
		});
		return false;
	},
	changeProduct : function(){
		$('#errMsgTab1').html("").hide();
		Utils.hideMessage();//LamNH
 		var message = "";
 		var flag = false;
 		$('.requirements').each(function(){
 			if (this.value == undefined || this.value == null || this.value == ""){
 				flag = true;
 			}
 		});
 		if (flag){
 			$('#errMsgTab1').html(msgTuyen11+'<span class="ReqiureStyle">(*)</span>').show();
// 			Utils.showMessage(msgTuyen11+'<span class="ReqiureStyle">(*)</span>');//LamNH
 			return false;
 		}
		if(message.length == 0){
			message = Utils.getMessageOfSpecialCharactersValidate('productCode',msgMaSanPham,Utils._CODE);
		}
		if(message.length == 0){
//			if(/[<>\\/?]/g.test($('#productName').val()) == true ){
			if(/[<>]/g.test($('#productName').val()) == true ){
				message = msgTenSpKhongDcChua;
			}					
		}
		if(message.length == 0){
			if($('#convfact').val() != '' && Number($('#convfact').val()) <= 0){
				message = msgTuyen13;
			}
		}
 		if (message != ''){
 			$('#errMsgTab1').html(message).show();
// 			Utils.showMessage(message);//LamNH
 			return false;
 		}
 		
 		var dataModel = new Object();
 		dataModel.productId = $('#productId').val();
 		dataModel.productCode = $('#productCode').val().trim();
 		dataModel.productName = $('#productName').val().trim();
 		dataModel.catCode = $('#catCode').val();
 		dataModel.subCatCode = $('#subCatCode').val();
 		dataModel.brandCode = $('#brandCode').val();
 		dataModel.packingCode = $('#packingCode').val();
 		dataModel.flavourCode = $('#flavourCode').val();
 		dataModel.convfact = $('#convfact').val();
 		dataModel.uom1Code = $('#uom1Code').val();
 		dataModel.uom2Code = $('#uom2Code').val();
 		dataModel.grossWeight = $('#grossWeight').val();
 		dataModel.volumn = $('#volumn').val();
 		dataModel.netWeight = $('#netWeight').val();
 		dataModel.expiryDate = $('#expiryDate').val();
 		dataModel.expiryType = $('#expiryType').val();
 		dataModel.vat = $('#vat').val();
 		dataModel.status = $('#status').val();
 		var length = $('#priceGrid').datagrid('getRows').length;
 		for(var i = 0; i <= length ; i++){
 			$('#priceGrid').datagrid('selectRow',i);
 		}
 		
 		$('#productName').focus();
 		var rows = $('#priceGrid').datagrid('getChanges');
 		var priceList = new Array(); // gia le 
 		var pricePackageList = new Array(); // gia thung
 		var customerTypeList = new Array();
 		var idList = new Array();
 		var customerTypeId = 0;
 		var flag = false;
 		var isHavePriceCompany = true;
 		var isHavePriceType = false;
 		
 		var pdCat = $('#catCode').val();
 		var isZCat = false;
 		var isCompanyPrice = false;
 		if(!Utils.isEmpty(pdCat)){
 			if(pdCat == Product._zCat){
 				isZCat = true;
 			}
 		}
 		

 		var hasChange = false;
 		for(var i = 0; i < rows.length ; i++){
 			hasChange = true;
 			if(rows[i].customerType != null){
 				customerTypeId = rows[i].customerType.id;
 				if((rows[i].price != '' && rows[i].price != null && rows[i].price != undefined)
 	 				||(rows[i].pricePackage != '' && rows[i].pricePackage != null && rows[i].pricePackage != undefined)){
 					isHavePriceType = true;
 				}
 			}else{
 				customerTypeId = 0;
 				isCompanyPrice = true;
 				if((rows[i].price == '' || rows[i].price == null || rows[i].price == undefined)
 					&&(rows[i].pricePackage == '' || rows[i].pricePackage == null || rows[i].pricePackage == undefined)){
 					flag = true;
 					isHavePriceCompany = false;
 				}
 			}
 			
 			//anhhpt: kiem tra gia thung > gia le 
 			if( !isNullOrEmpty(rows[i].price) && !isNullOrEmpty(rows[i].pricePackage) && 					
 				Number(rows[i].price) > Number(rows[i].pricePackage)){				
 				var msg = format(msgComapareValue,i18n.price_retail_info.toLowerCase(),msgGiaThung.toLowerCase()); 
 				$('#errMsgTab1').html(msg).show();
// 				Utils.showMessage(msg);//LamNH
 				return false;
 			}
 			
 			
 			priceList.push(rows[i].price);
 			pricePackageList.push(rows[i].pricePackage);
 			
 			var rowType = "";
 			if(rows[i].customerType == null){
 				rowType = msgTuyen10;
 			}else{
 				rowType = rows[i].customerType.channelTypeName;
 			}
 			
 			if(rows[i].price != null && rows[i].price != ""){
 				if((Number(rows[i].price) == 0)){
 	 				if(isZCat == false){
 	 					$('#errMsgTab1').html(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero).show();
// 	 					Utils.showMessage(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero);//LamNH
 	 					return false;
 	 				}
 				}

 			}

 			if(rows[i].pricePackage != null && rows[i].pricePackage != ""){
 				if((Number(rows[i].pricePackage) == 0)){
 	 				if(isZCat == false){
 	 					$('#errMsgTab1').html(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero).show();
// 	 					Utils.showMessage(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero);//LamNH
 	 					return false;
 	 				}
 				}

 			}
 			
// 			if( (Number(rows[i].price != Number(Product.mapPrice.get(i)))) || 
// 					(Number(rows[i].pricePackage != Number(Product.mapPricePackage.get(i)))) )
// 					{
 						if(!isNullOrEmpty(customerTypeId)){
 							customerTypeList.push(customerTypeId);
 						}else{
 							customerTypeList.push("0");
 						}
// 					}
 			
 			idList.push(rows[i].id);
 		}
 		
 		if(isHavePriceType && !isHavePriceCompany && flag){
 			$('#errMsgTab1').html(msgTuyen12).show();
// 			Utils.showMessage(msgTuyen12);//LamNH
 			return false;
 		}
 		dataModel.priceList = priceList;
 		dataModel.pricePackageList = pricePackageList;
 		dataModel.customerTypeList = customerTypeList;
 		dataModel.idList = idList;
		Utils.addOrSaveData(dataModel, "/catalog/product/change-product", Product._xhrSave, 'errMsgTab1',function(data){
			$('#sucMsgTab1').html(msgCommon1).show();
//			Utils.showMessage(msgCommon1);//LamNH
			var tm = setTimeout(function(){
				$('#sucMsgTab1').html('').hide();
				Utils.hideMessage();//LamNH
				clearTimeout(tm); 
			}, 10000);
			window.location.href = WEB_CONTEXT_PATH+'/catalog/product/view-product?productId='+data.productId;
		});
		return false;
	},
	viewPriceHistory:function(customerTypeId,customerTypeName,productId){
		$('#viewDiv').css('visibility','visible');
		$('#viewDialog').dialog('open');
		$('#applyType').html(customerTypeName);
		var url = Product.getPriceHistoryUrl(customerTypeId, customerTypeName,productId);
		$("#gridDialog").datagrid({
			  url:url,
		  	  pageList  : [10,20,30],
			  width: 500,
			  pageSize : 10,
			  height:'auto',
			  scrollbarSize : 0,
			  pagination:true,
			  pageNumber:1,
			  fitColumns:true,
			  method : 'GET',
			  rownumbers: true,
			  columns:[[
			    {field: 'price', title: msgGiaLe, width: 200, sortable:false,resizable:false, align: 'left',
			    	formatter:function(value, row, index){
			    		if(!Utils.isEmpty(value)){
			    			return formatFloatValue(Utils.XSSEncode(value),numFloat);
			    		}
			    		return value;
			    	}
			    },
			    {field: 'pricePackage', title: msgGiaThung, width: 200, sortable:false,resizable:false, align: 'left',
			    	formatter:function(value, row, index){
			    		if(!Utils.isEmpty(value)){
			    			return formatFloatValue(Utils.XSSEncode(value),numFloat);
			    		}
			    		return value;
			    	}
			    },
				{field: 'fromDate', title: msgTuNgay, width: 150, sortable:false,resizable:false, align: 'center',
		        	  formatter:function(value, row, index) {
		        		  if(row.fromDate!=null){
//	        			  		var date = moment(row.fromDate);
//		   						var d = new Date(date.parseZone().format());
//		   						return $.datepicker.formatDate('dd/mm/yy', d);
		        			  return DateUtils.formatDateTime(Utils.XSSEncode(row.fromDate));
		        		  }  
			          }
			    },
			    {field: 'toDate', title: msgDenNgay, width: 150, sortable:false,resizable:false, align: 'center',
		        	  formatter:function(value, row, index) {
		        		  if(row.toDate!=null){
//		        			  	var date = moment(row.toDate);
//	   							var d = new Date(date.parseZone().format());
//		   						return $.datepicker.formatDate('dd/mm/yy', d);
		        			  return DateUtils.formatDateTime(Utils.XSSEncode(row.toDate));
		        		  }
			          }
			    },		  
			  ]],
			  onLoadSuccess:function(){
			      	var easyDiv = '#gridDialogContainer ';
			    	$(easyDiv+'.datagrid-header-rownumber').html(stt_label);
		    		updateRownumWidthForDataGrid('#gridDialog');
		    		$(window).resize();
			  }
		});
		return false;
	},
	getPriceHistoryUrl:function(customerTypeId, customerTypeName,productId){
		return WEB_CONTEXT_PATH +"/catalog/product/price-history?&customerTypeName="+ encodeChar(customerTypeName) 
				+ "&customerTypeId=" + customerTypeId 
				+ "&productId=" + productId;
	},
	saveProperty: function() {
		var arr1 = [];
		var arr2 = [];
		var i = 0;
		$('.attributeCls').each(function() {
			var objectId = '#' + $(this).attr('id');
			var type = $(objectId).attr('multiple');
			var idx = objectId.split('_')[1];
			arr1[i] = $('#attH_' + idx).val();
			if (type != null && type != undefined && type == 'multiple') {
				arr2[i] = $(objectId).combobox('getValues');
			} else {
				arr2[i] = $(objectId).val();
			}
			if (arr2[i] == null || arr2[i] == '-1') {
				arr2[i] = '';
			}
			i++;
		});		
		var dataModel = new Object();
		dataModel.attValueArray = arr2;
		dataModel.attIdArray = arr1;
		dataModel.productId = $('#productId').val();
		Utils.addOrSaveData(dataModel, "/catalog/product/product-saveproperty",
				Customer._xhrSave, 'errMsgProperty', function(data) {
				if(data.error != null && data.error == false){
					$('#successMsg').html(msgCommon1).show();
//					Utils.showMessage(msgCommon1);//LamNH
				} else {
					$('#errMsgProperty').html(data.errMsg).show();
//					Utils.showMessage(data.errMsg);//LamNH
				}
			}, null);
		return false;
	},
	removePrice : function(customerTypeId,productId){
		$.messager.confirm(msgXacNhan, xoaGia, function(r){
			if (r){
				var dataModel = new Object();
				dataModel.customerTypeId = customerTypeId;
				dataModel.productId = productId;
				Utils.addOrSaveData(dataModel, "/catalog/product/remove-price",Product._xhrSave, 'errMsgProperty', function(data) {
					if(data.error != null && data.error == false){
						$('#successMsg').html(msgCommon1).show();
					} else {
						$('#errMsgProperty').html(data.errMsg).show();
					}
					window.location.href =WEB_CONTEXT_PATH+ '/catalog/product/view-product?productId='+data.productId;
				}, null);
			}
		});
 		return false;
	}
};
