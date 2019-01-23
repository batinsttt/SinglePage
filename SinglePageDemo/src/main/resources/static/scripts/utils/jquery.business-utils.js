/**
   Search Commons va DialogCommon
 * @author tientv11
 * @sine 05/05/2014
 */
var CommonBusiness = {
		/** Dialog search CODE - NAME - CHỌN */
		_currentSearchCallback: null,
		_arrParams: null,
		_xhrReport:null,
	openSearchStyle1EasyUIDialog : function(){
		
	},
	getSearchStyle1GridShopKAUrl : function(url, code, name, arrParam) {
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date(sysDateFromDB);
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		searchUrl += "&customerCode="+code+"&nameOrAddress="+name;
		return searchUrl;
	},
	exportExcelData:function(dataModel,url,errMsg,typeErr){
		var kData = $.param(dataModel,true);
		if(CommonBusiness._xhrReport != null){
			CommonBusiness._xhrReport.abort();
			CommonBusiness._xhrReport = null;
		} 
		$('.VinamilkTheme #divOverlay').show();
		CommonBusiness._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
			success : function(data) {
				$('.VinamilkTheme #divOverlay').hide();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(escapeSpecialChar(data.errMsg)).show();
//					Utils.showMessage(escapeSpecialChar(data.errMsg));//LamNH
					setTimeout(function(){
						$('#'+ errMsg).hide();
//						$('#commonMessage').hide();//LamNH
					},10000);
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						if(typeErr!=undefined && typeErr){
							$('#'+ errMsg).html(msgCommon7).show();
//							Utils.showMessage(msgCommon7);//LamNH
						}else{
							$('#'+ errMsg).html(msgCommon7).show();
//							Utils.showMessage(msgCommon7);//LamNH
						}
					} else{
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
		                    CommonSearch.deleteFileExcelExport(data.view);
						}, 50000000);
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
						CommonBusiness._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH +'/home';
					}
				});
			}
		});
		return false;
	},
	deleteFileExcelExport:function(excelFileName){
        $.ajax({
              type : "POST",
              url : "/commons/deleteFile",
              data : ({
                    excelFileName: excelFileName
              }),
              dataType : "json",
              success : function(data) {
            	  Utils.updateTokenForJSON(data);
              },
              error : function(XMLHttpRequest, textStatus, errorDivThrown) {
              }
        });
	}
};
var CommonSearchEasyUI = {
		_currentSearchCallback : null,
		_arrParams : null,
		_mapMutilSelect : null,
		_isOpenDialog : null,
		fitEasyDialog:function(objectId){
			if(objectId!=undefined && objectId!=null && objectId!=''){ objectId="#"+objectId;
			}else objectId=".easyui-dialog";
			$(objectId).each(function(){
				try{
					if($(this).parent().css('display')!='none'){
						var hDialog=parseInt($(this).parent().height());
						var hWindow=parseInt($(window).height());
						if(hDialog>=hWindow){
							$(this).parent().css('top',0);
						}else{
							var distant=hWindow-hDialog;
							distant=distant/2+document.documentElement.scrollTop;
							$(this).parent().css('top',distant);
						}
					}
				}catch(e){}
			});
		},
		hiddenTabIndex : function() {
			var tabindex = -1;
			$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
				if (this.type != 'hidden') {
					$(this).attr("tabindex", tabindex);
					tabindex -=1;
				}
			});
		},
		showTabIndex : function (parentDiv) {
			var parentId = '';
			if(parentDiv!= null && parentDiv!= undefined){
				parentId = parentDiv;
			}
			var tabindex = 1;
			var tabindexObject = parentId +' .InputTextStyle';
			tabindexObject += parentId +' select';
			tabindexObject += parentId +' input';
			tabindexObject += parentId +' button';
			$(tabindexObject).each(function () {
				if (this.type != 'hidden') {
					$(this).attr("tabindex", tabindex);
				}
				tabindex ++;
			});	
		},
		getSearchStyleEasyUIGridUrl : function(url,arrParam) {
			var searchUrl = '';
			searchUrl = url;
			var curDate = new Date(sysDateFromDB);
			var curTime = curDate.getTime();
			searchUrl+= '?curTime=' + encodeChar(curTime);
			if (arrParam != null && arrParam != undefined) {
				for ( var i = 0; i < arrParam.length; i++) {
					searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
				}
			}
			return searchUrl;
		},
		getResultSearchStyle2EasyUIDialog : function(rowIndex) {
			var grid = $('#searchStyle2EasyUIGrid');
			grid.datagrid('unselectAll');
			grid.datagrid('selectRow',rowIndex);
			var row = grid.datagrid('getSelected');		
			if (CommonSearchEasyUI._currentSearchCallback != null) {
				CommonSearchEasyUI._currentSearchCallback.call(this, row);
				$('#searchStyle2EasyUIDialog').dialog('close');
			}
			return false;
		},
		openSearchStyle2EasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
			CommonSearchEasyUI._arrParams = null;
			CommonSearchEasyUI._currentSearchCallback = null;
			var html = $('#searchStyle2EasyUIDialogDiv').html();
			$('#searchStyle2EasyUIDialog').dialog({  
		        title: title,  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        width : 616,
		        height :'auto',
		        onOpen: function(){
		        	CommonSearchEasyUI.hiddenTabIndex();
					$('#searchStyle2EasyUICode').focus();
					$('#searchStyle2EasyUIUrl').val(url);
					$('#searchStyle2EasyUICodeText').val(codeFieldText);
					$('#searchStyle2EasyUINameText').val(nameFieldText);
					CommonSearchEasyUI._currentSearchCallback = callback;
					CommonSearchEasyUI._arrParams = arrParam;
					CommonSearchEasyUI._isOpenDialog = true;
					
					var codeField = 'code';
					var nameField = 'name';
					if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
						codeField = codeFieldText;
					}
					if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
						nameField = nameFieldText;
					}
					
					$('#seachStyle2EasyUICodeLabel').html(codeText);
					$('#seachStyle2EasyUINameLabel').html(nameText);
					$('#searchStyle2EasyUIGrid').show();
					$('#searchStyle2EasyUIGrid').datagrid({
						url : CommonSearchEasyUI.getSearchStyleEasyUIGridUrl(url, arrParam),
						autoRowHeight : true,
						rownumbers : true, 
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						scrollbarSize : 0,
						fitColumns:true,
						pageList  : [10,20,30],
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
					        {field:codeField,title:codeText,align:'left', width:150, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:nameField,title:nameText,align:'left', width:400, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:'select', align:'center',sortable : false,resizable : false,formatter : CommonSearchEasyUIFormatter.selectSearchStyle2EasyUIDialog},
					        {field:'id',hidden : true},
					    ]],
					    onLoadSuccess :function(){
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    		CommonSearchEasyUI.showTabIndex('#searchStyle2EasyUIDialog');
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
					    }
					});  
					$('#btnSearchStyle2EasyUI').bind('click',function(event) {
						var code = $('#searchStyle2EasyUICode').val().trim();
						var name = $('#searchStyle2EasyUIName').val().trim();
						$('#searchStyle2EasyUIGrid').datagrid('load',{code :code, name: name});
						$('#searchStyle2EasyUICode').focus();
					});
					$('#btnSearchStyle2EasyUIUpdate').hide();
					$('#btnSearchStyle2EasyUIClose').show();
		        },
		        onClose : function(){
		        	$('#searchStyle2EasyUIDialog').dialog('destroy');
		        },
		        onDestroy :function() {
		        	CommonSearchEasyUI.showTabIndex();
					CommonSearchEasyUI._currentSearchCallback = null;
					var curIdFocus = $('#cur_focus').val();
					$('#'+ curIdFocus).focus();			
		        	$('#searchStyle2EasyUIDialogDiv').html(html);
		        	CommonSearchEasyUI._isOpenDialog = false;
		        }
		    });
			return false;
		},
		openSearchStyle2EasyUIMutilSelectDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
			CommonSearchEasyUI._arrParams = null;
			CommonSearchEasyUI._currentSearchCallback = null;
			CommonSearchEasyUI._mapMutilSelect = new Map();
			var html = $('#searchStyle2EasyUIDialogDiv').html();
			$('#searchStyle2EasyUIDialog').dialog({  
		        title: title,  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        width : 616,
		        height :'auto',
		        onOpen: function(){
		        	CommonSearchEasyUI.hiddenTabIndex();
					$('#searchStyle2EasyUICode').focus();
					$('#searchStyle2EasyUIUrl').val(url);
					$('#searchStyle2EasyUICodeText').val(codeFieldText);
					$('#searchStyle2EasyUINameText').val(nameFieldText);
					CommonSearchEasyUI._currentSearchCallback = callback;
					CommonSearchEasyUI._arrParams = arrParam;
					CommonSearchEasyUI._isOpenDialog = true;
					
					var codeField = 'code';
					var nameField = 'name';
					if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
						codeField = codeFieldText;
					}
					if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
						nameField = nameFieldText;
					}
					
					$('#seachStyle2EasyUICodeLabel').html(codeText);
					$('#seachStyle2EasyUINameLabel').html(nameText);
					$('#searchStyle2EasyUIGrid').show();
					$('#searchStyle2EasyUIGrid').datagrid({
						url : CommonSearchEasyUI.getSearchStyleEasyUIGridUrl(url, arrParam),
						autoRowHeight : true,
						rownumbers : true, 
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						scrollbarSize : 0,
						fitColumns:true,
						pageList  : [10,20,30],
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
					        {field:codeField,title:codeText,align:'left', width:150, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:nameField,title:nameText,align:'left', width:400, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:'id',checkbox:true, align:'center',sortable : false,resizable : false},
					    ]],
					    onSelect : function(rowIndex, rowData) {
					    	var selectedId = rowData['id'];
					    	CommonSearchEasyUI._mapMutilSelect.put(selectedId, rowData);
					    },
					    onUnselect : function(rowIndex, rowData) {
					    	var selectedId = rowData['id'];
					    	CommonSearchEasyUI._mapMutilSelect.remove(selectedId);
					    },
					    onSelectAll : function(rows) {
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchEasyUI._mapMutilSelect.put(selectedId, row);
					    		}
					    	}
					    },
					    onUnselectAll : function(rows) {
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchEasyUI._mapMutilSelect.remove(selectedId);
					    		}
					    	}
					    },
					    onLoadSuccess :function(){
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
					    	var exitsAll = false;
				    		var runner = 0;
				    		$(easyDiv+'input:checkbox[name=id]').each(function() {
				    			var selectedId = this.value;
				    			if(CommonSearchEasyUI._mapMutilSelect.get(selectedId) != null || CommonSearchEasyUI._mapMutilSelect.get(selectedId) != undefined) {
				    				exitsAll = true;
				    				$('#searchStyle2EasyUIGrid').datagrid('selectRow',runner);
				    			} 
				    			runner ++; 
				    		});
				    		if (exitsAll==false){
				    			$(easyDiv+'td[field=id] .datagrid-header-check input:checkbox').attr('checked', false);
					    	}
				    		CommonSearchEasyUI.showTabIndex('#searchStyle2EasyUIDialog');
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
					    }
					});  
					$('#btnSearchStyle2EasyUI').bind('click',function(event) {
						var code = $('#searchStyle2EasyUICode').val().trim();
						var name = $('#searchStyle2EasyUIName').val().trim();
						$('#searchStyle2EasyUIGrid').datagrid('load',{code :code, name: name});
						$('#searchStyle2EasyUICode').focus();
					});
					$('#btnSearchStyle2EasyUIUpdate').show();
					$('#btnSearchStyle2EasyUIClose').hide();
					$('#btnSearchStyle2EasyUIUpdate').bind('click', function(event) {
						$('#errMsgSearchStyle2EasyUI').html('').hide();
	        			if(CommonSearchEasyUI._mapMutilSelect == null || CommonSearchEasyUI._mapMutilSelect.size() <= 0) {
	    	        		if (codeFieldText == 'shopCode'){
	    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn đơn vị nào. Yêu cầu chọn').show();
	    	        		}else if(codeFieldText == 'staffCode'){
	    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn nhân viên nào. Yêu cầu chọn').show();
	    	        		}else if(codeFieldText == 'productCode'){
	    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn sản phẩm nào. Yêu cầu chọn').show();
	    	        		}else{
	    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn mục nào. Yêu cầu chọn').show();
	    	        		}
	    	        		return false;
	    	        	}
	    	        	if (CommonSearchEasyUI._currentSearchCallback != null) {
	    	        		CommonSearchEasyUI._currentSearchCallback.call(this, CommonSearchEasyUI._mapMutilSelect.valArray);
	    	    			$('#searchStyle2EasyUIDialog').dialog('close');
	    	    		}
					});
		        },
		        onClose : function(){
		        	$('#searchStyle2EasyUIDialog').dialog('destroy');
		        },
		        onDestroy :function() {
		        	CommonSearchEasyUI.showTabIndex();
					CommonSearchEasyUI._currentSearchCallback = null;
					var curIdFocus = $('#cur_focus').val();
					$('#'+ curIdFocus).focus();			
		        	$('#searchStyle2EasyUIDialogDiv').html(html);
		        }
		    });
			return false;
		},
		openSearchStaffDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
			CommonSearchEasyUI._arrParams = null;
			CommonSearchEasyUI._currentSearchCallback = null;
			var html = $('#searchStyle2EasyUIDialogDiv').html();
			$('#searchStyle2EasyUIDialog').dialog({
		        title: title,  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        width : 616,
		        height :'auto',
		        onOpen: function(){
					$('#searchStyle2EasyUICode').focus();
					$('#searchStyle2EasyUIUrl').val(url);
					$('#searchStyle2EasyUICode').val('');
					$('#searchStyle2EasyUIName').val('');
					$('#searchStyle2EasyUICodeLabel').val(codeFieldText);
					$('#searchStyle2EasyUINameLabel').val(nameFieldText);
					CommonSearchEasyUI._currentSearchCallback = callback;
					CommonSearchEasyUI._arrParams = arrParam;
					CommonSearchEasyUI._isOpenDialog = true;
					
					var codeField = 'code';
					var nameField = 'name';
					if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
						codeField = codeFieldText;
					}
					if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
						nameField = nameFieldText;
					}
					$('#errMsgSearchStyle2EasyUI').html('').hide();
					$('#searchStyle2EasyUICodeLabel').html(codeText);
					$('#searchStyle2EasyUINameLabel').html(nameText);					
					$('#searchStyle2EasyUIGrid').show();
					$('#searchStyle2EasyUIGrid').datagrid({
						url : CommonSearchEasyUI.getSearchStyleEasyUIGridUrl(url, arrParam),
						autoRowHeight : true,
						rownumbers : true, 
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						scrollbarSize : 0,
						singleSelect:true,
						fitColumns:true,
						pageList  : [10,20,30],
						queryParams:{page:1},
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
					        {field:codeField,title:codeText, width:150, formatter: function(value){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:nameField,title:nameText, width:400, formatter: function(value){
					        	return Utils.XSSEncode(value);
					        }},
					        {field:'select', align:'center',formatter : AttributeCustomerCatalogFormatter.selectSearchStyle2EasyUIDialog},
					        {field:'id',hidden : true},
					    ]],
					    onLoadSuccess :function(){
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
					    }
					});  
					$('#btnSearchStyle2EasyUI').bind('click',function(event) {
						var code = $('#searchStyle2EasyUICode').val().trim();
						var name = $('#searchStyle2EasyUIName').val().trim();
						$('#searchStyle2EasyUIGrid').datagrid('load',{staffCode :code, staffName: name});
						$('#searchStyle2EasyUICode').focus();
					});
					$('#searchStyle2EasyUICode,#searchStyle2EasyUIName,#btnSearchStyle2EasyUI').bind('keyup', function(event){
						if(event.keyCode == keyCodes.ENTER){
							var code = $('#searchStyle2EasyUICode').val().trim();
							var name = $('#searchStyle2EasyUIName').val().trim();
							$('#searchStyle2EasyUIGrid').datagrid('load',{staffCode :code, staffName: name});
							$('#searchStyle2EasyUICode').focus();
						}
					});
					$('#btnSearchStyle2EasyUIUpdate').hide();
					$('#btnSearchStyle2EasyUIClose').show();
					$('.datagrid-body').css('overflow', 'hidden');
		        },
		        onClose : function(){
		        	CommonSearchEasyUI._currentSearchCallback = null;
		        	var curIdFocus = $('#cur_focus').val();
		        	$('#'+ curIdFocus).focus();
		        	CommonSearchEasyUI._isOpenDialog = false;
		        	$('#searchStyle2EasyUIGrid').datagrid('load',{page:1});
		        }
		    });
			return false;
		}
	};