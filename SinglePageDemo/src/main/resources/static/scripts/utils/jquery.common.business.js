var CommonSearch = {
	_currentSearchCallback : null,
	_arrParams : null,
	_mapCheckProduct:new Map(),
	_xhrReport:null,
	_listCustomer:null,
	divId : null,
	getResultSeachStyle1EasyUIDialog : function(rowIndex,divId) {
		var grid = $('.easyui-dialog #searchStyle1Grid');
		grid.datagrid('unselectAll');
		grid.datagrid('selectRow',rowIndex);
		var row = grid.datagrid('getSelected');		
		var obj = {};
		obj.code = row[$('.easyui-dialog #searchStyle1CodeText').val()];
		obj.name = row[$('.easyui-dialog #searchStyle1NameText').val()];
		obj.id = row[$('.easyui-dialog #searchStyle1IdText').val()];
		if (CommonSearch._currentSearchCallback != null) {
			//$('.easyui-dialog').dialog('close');
			//	tuannd20
			var dialog = $('.easyui-dialog:has(:parent:visible)');
			if(divId != null && divId != undefined){
				dialog = divId;
			}
			if ($(dialog).length != 0){
				$(dialog).dialog('close');
			} else {
				$('.easyui-dialog').dialog('close');
			}
			//			
			CommonSearch._currentSearchCallback.call(this, obj);
		}
		return false;
	},
	openSearchStyle1Dialog : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, addressText, addressFieldText) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				isFromBKPTHNVGH = false;//lampv
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.fancybox-inner #searchStyle1AddressText').val(addressFieldText);
					$('.fancybox-inner #seachStyle1AddressLabel').show();
					$('.fancybox-inner #seachStyle1Address').show();
					$('.fancybox-inner #btnSearchStyle1').css('margin-left', 45);
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var addressField = 'address';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					addressField = addressFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$('.fancybox-inner #seachStyle1AddressLabel').html(addressText);
				
				Utils.bindAutoSearch();
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam, ''),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : addressField,index : addressField,label : addressText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatter},
						            {name : 'id',index : 'id',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$(".fancybox-overlay").scrollTop(0);
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
										
										
										var fancyHeight = $('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('height');
										fancyHeight = parseInt(fancyHeight);
										var wWidth = window.innerWidth;
										wWidth = parseInt(wWidth);
										var wHeight = window.innerHeight;
										wHeight = parseInt(wHeight);
										var distant = wHeight - fancyHeight;
										distant = distant / 2;
										
										setTimeout(function(){
											$(".fancybox-overlay").scrollTop(0);
										}, 500);
										/*if(wHeight > fancyHeight) {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop +  distant}, 50);
											}, 10);				
										} else {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop}, 50);
											}, 10);	
										}*/
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				} else {
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
									}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatter},
						            {name : 'id',index : 'id',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				}
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams,address);
					} else {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					}
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
				//$.fancybox.update();
			},
			afterClose : function() {
				isFromBKPTHNVGH = true;//lampv
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1EasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDiv').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        position: 'top',
	    	height:500,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
//				Utils.bindAutoSearch();
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width : ($('#searchStyle1EasyUIDialog').width() - 40),
				    columns:[[  
				        {field:codeField,title:codeText,align:'left', width:110, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },  
				        {field:nameField,title:nameText,align:'left', width:$('#searchStyle1EasyUIDialog').width() - 25 - 110 - 80, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },				        
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
//			    		 $(window).resize();
//			    		 var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height() + 600;
//			        	    $('.window-mask').css("height",height);
			        	setTimeout(function() {
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :'', name: '',address:''});*/
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {
					if(!$(this).is(':hidden')){
						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDiv').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	openSearchProductOnDialog1 : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDiv').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
//				Utils.bindAutoSearch();
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width : ($('#searchStyle1EasyUIDialog').width() - 40),
				    columns:[[  
				        {field:'categoryCode',title:'Ngành',align:'left', width:110, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },
				        {field:codeField,title:codeText,align:'left', width:110, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },  
				        {field:nameField,title:nameText,align:'left', width:$('#searchStyle1EasyUIDialog').width() - 25 - 110 - 80, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },				        
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
//			    		 $(window).resize();
//			    		 var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height() + 600;
//			        	    $('.window-mask').css("height",height);
			        	setTimeout(function() {
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :'', name: '',address:''});*/
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {
					if(!$(this).is(':hidden')){
						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDiv').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	openSearchStyle1DialogForStaff : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, objectStaff) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(objectStaff!=undefined && objectStaff!=null){
					DebitPayReport._objectStaff = objectStaff;
				}else{
					DebitPayReport._objectStaff = null;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
									}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForStaff},
						            {name : 'staffCode',index : 'staffCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForSupervisorStaff : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, addressText, addressFieldText) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.fancybox-inner #searchStyle1AddressText').val(addressFieldText);
					$('.fancybox-inner #seachStyle1AddressLabel').show();
					$('.fancybox-inner #seachStyle1Address').show();
					$('.fancybox-inner #btnSearchStyle1').css('margin-left', 45);
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var addressField = 'address';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					addressField = addressFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$('.fancybox-inner #seachStyle1AddressLabel').html(addressText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForSupervisorStaff},
						            {name : 'staffCode',index : 'staffCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams,address);
					} else {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					}
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForCustomer : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, addressText, addressFieldText) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.fancybox-inner #searchStyle1AddressText').val(addressFieldText);
					$('.fancybox-inner #seachStyle1AddressLabel').show();
					$('.fancybox-inner #seachStyle1Address').show();
					$('.fancybox-inner #btnSearchStyle1').css('margin-left', 45);
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var addressField = 'address';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					addressField = addressFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$('.fancybox-inner #seachStyle1AddressLabel').html(addressText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam, ''),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : addressField,index : addressField,label : addressText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForCustomer},
						            {name : 'shortCode',index : 'shortCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
										
										var fancyHeight = $('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('height');
										fancyHeight = parseInt(fancyHeight);
										var wWidth = window.innerWidth;
										wWidth = parseInt(wWidth);
										var wHeight = window.innerHeight;
										wHeight = parseInt(wHeight);
										var distant = wHeight - fancyHeight;
										distant = distant / 2;
										if(wHeight > fancyHeight) {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop +  distant}, 50);
											}, 10);				
										} else {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop}, 50);
											}, 10);	
										}
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams,address);
					} else {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					}
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForProduct : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, objectProduct) {
		var html = $('#searchProduct').html();
		$(window).unbind('keyup');
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchProduct').html('');
				$('.fancybox-inner #searchProductCode').focus();
				$('.fancybox-inner #searchProductUrl').val(url);
				
				$('.fancybox-inner #searchProductCodeText').val(codeFieldText);
				$('.fancybox-inner #searchProductNameText').val(nameFieldText);
				$('.fancybox-inner #productSelect').bind('click',function(){
					var stR = "";
					if(CRMReportDSPPTNH._listProductCode.length > 0){
						for (var i=0; i< CRMReportDSPPTNH._listProductCode.length; i ++){
							stR += CRMReportDSPPTNH._listProductCode[i];
							if (i != CRMReportDSPPTNH._listProductCode.length-1) stR +=";";
						}
						$('#productCode').val(stR);
						$.fancybox.close();
					}else{
						$('#errProDiaMsg').html('Vui lòng chọn sản phẩm').show();
					}
				});
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(objectProduct!=undefined && objectProduct!=null){
					DebitPayReport._objectProduct = objectProduct;
				}else{
					DebitPayReport._objectProduct = null;
				}
				$('.fancybox-inner #searchProductCodeLabel').html(codeText);
				$('.fancybox-inner #searchProductNameLabel').html(nameText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchProductGrid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForProduct},
						            {name : 'productCode',index : 'productCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchProductPager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchProductContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchProductGrid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchProductPager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchProductPager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchProductPager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchProduct').bind('click',function(event) {
					$('#errProDiaMsg').html('').hide();
					var code = $('.fancybox-inner #searchProductCode').val().trim();
					var name = $('.fancybox-inner #searchProductName').val().trim();
					var address = $('.fancybox-inner #searchProductAddress').val().trim();
					var url = '';
					url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchProductUrl').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchProductGrid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #searchProductCode').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchProduct').html(html);
				ReportUtils.bindEnterOnWindow();
			}
		});
		return false;
	},
	openSearchStyle1DialogForSubCat : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, objectSubCat) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(objectSubCat!=undefined && objectSubCat!=null){
					DebitPayReport._objectSubCat = objectSubCat;
				}else{
					DebitPayReport._objectSubCat = null;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForSubCat},
						            {name : codeFieldText,index : codeFieldText,hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForDisplay : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				ProgrammeDisplayCatalog._mapCheckSubCat = new Map();// danh sach check box nganh hang con
				Utils.bindAutoSearch();
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('.fancybox-inner .BoxDialogBtm .ButtonSection').html("<button class='BtnGeneralStyle BtnGeneralCStyle BtnGeneralMStyle Sprite2' onclick='return CommonSearch.getResultSeachStyle1ForDisplay()'><span class='Sprite2'>Lưu</span></button> "+$('.fancybox-inner .BoxDialogBtm .ButtonSection').html());
				$('.fancybox-inner .BoxDialogBtm').html("<p id='errMsgFancybox' class='ErrorMsgStyle Sprite1' style='display: none'></p> "+$('.fancybox-inner .BoxDialogBtm').html());
				$('#searchStyle1').html('');
				if(codeText == 'Mã ngành hàng con'){
					$('.fancybox-inner #seachStyle1Code').attr('style','width:90px;');
					$('.fancybox-inner #seachStyle1Name').attr('style','width:90px;');
					
					$('.fancybox-inner #seachStyle1CodeLabel').attr('style','width:120px;');
					$('.fancybox-inner #seachStyle1NameLabel').attr('style','width:120px;');
				}
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$(".fancybox-inner #searchStyle1Grid").jqGrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
			        	  			return Utils.XSSEncode(cellvalue);
			          			}},
					            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
						        	  return Utils.XSSEncode(cellvalue);
						          }},
					            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForDisplay},
					            {name : 'id',index : 'id',hidden : true}
					            ],
					            pager : $('.fancybox-inner #searchStyle1Pager'),
								height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
								gridComplete : function() {
									$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
									$('#pg_searchStyle1Pager').css('padding-right','20px');
									var tm = setTimeout(function() {
										$(window).resize();
										$.fancybox.update();
										clearTimeout(tm);
									}, 50);
									tabindex = 1;
									$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
										if (this.type != 'hidden') {
										$(this).attr("tabindex", '');
										tabindex++;
										}
									});
									updateRownumWidthForJqGrid('.fancybox-inner');
									$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
								}												})
								.navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
								$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
									var code = $('.fancybox-inner #seachStyle1Code').val().trim();
									var name = $('.fancybox-inner #seachStyle1Name').val().trim();
									var url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
									$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
									$('.fancybox-inner #seachStyle1Code').focus();
								});
							},
							afterClose : function() {
								var tabindex = 1;
								$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
									if (this.type != 'hidden') {
										$(this).attr("tabindex", '');
									}
									tabindex ++;
								});	
								var curIdFocus = $('#cur_focus').val();
								$('#'+ curIdFocus).focus();
								CommonSearch._currentSearchCallback = null;
								ProgrammeDisplayCatalog._mapCheckSubCat = new Map();// danh sach check box nganh hang con
								$('#searchStyle1').html(html);
							}
						});
		return false;
	},
	openSearchStyle1EasyUI : function(codeText, nameText, title, url, callback,
			codeFieldText, nameFieldText, arrParam, searchDiv) {
		
		
		$(".easyui-window #searchStyle5Grid").jqGrid('GridUnload');
		$('#' + searchDiv).show();
		$('#' + searchDiv).window({title : title});
		$('#' + searchDiv).window('open');
		
		CommonSearch._arrParams = null;
		Utils.bindAutoSearchForEasyUI();
		$('.easyui-window #searchStyle1Url').val(url);
		$('.easyui-window #searchStyle1CodeText').val(codeFieldText);
		$('.easyui-window #searchStyle1NameText').val(nameFieldText);
		CommonSearch._currentSearchCallback = callback;
		CommonSearch._arrParams = arrParam;
		var codeField = 'code';
		var nameField = 'name';
		if (codeFieldText != null && codeFieldText != undefined
				&& codeFieldText.length > 0) {
			codeField = codeFieldText;
		}
		if (nameFieldText != null && nameFieldText != undefined
				&& nameFieldText.length > 0) {
			nameField = nameFieldText;
		}
		$('.easyui-window #seachStyle1CodeLabel').html(codeText);
		$('.easyui-window #seachStyle1NameLabel').html(nameText);
		$('.easyui-window #seachStyle1Code').val('');
		$('.easyui-window #seachStyle1Name').val('');
		$('.easyui-window #seachStyle4Address').val('');
		$(".easyui-window #searchStyle5Grid")
				.jqGrid(
						{
							url : CommonSearch.getSearchStyle1GridUrl(url, '','', arrParam),
							colModel : [
									{name: codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : function(cellvalue, options, rowObject) {
											return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachEasyUI1(" + options.rowId + ", '" + searchDiv + "');\">Chọn</a>";
										}
									}, {name : 'id',index : 'id',hidden : true}, ],
							pager : $('.easyui-window #searchStyle5Pager'),
							rowNum : 10,
							width : ($('.easyui-window #searchStyle1ContainerGrid')
									.width()),
							gridComplete : function() {
								$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
								/*$('.easyui-window #searchStyle1ScrollBody')
										.jScrollPane();*/
								/*$('.easyui-window #searchStyle1ScrollBody .jspContainer').css('width', '476px');*/
								$('.easyui-window #seachStyle1Code').bind('keypress',Utils.unitCharactersAz094Code);
								$('.easyui-window #seachStyle1Name').bind('keypress',Utils.unitCharactersAz094Name);
								$('.easyui-window #seachStyle1Code').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Code','',Utils._CODE);
										if (msg.length > 0) {$('#seachStyle1Code').val('');}
										clearTimeout(tm);
									}, 50);});
								$('.easyui-window #seachStyle1Name').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Name','',Utils._NAME);
										if (msg.length > 0) {$('#seachStyle1Name').val('');}
										clearTimeout(tm);
									}, 50);});
								updateRownumWidthForJqGrid();
								var tm = setTimeout(function(){
									$('.panel').css('top', document.documentElement.scrollTop + 100);
									$('.window-shadow').css('top', document.documentElement.scrollTop + 100);
									clearTimeout(tm);
								}, 500);
							}
						}).navGrid($('.easyui-window #searchStyle5Pager'), {
					edit : false,
					add : false,
					del : false,
					search : false
				});
		$('.easyui-window #btnSearchStyle1').bind('click',function(event) {
			var code = $('.easyui-window #seachStyle1Code').val()
					.trim();
			var name = $('.easyui-window #seachStyle1Name').val()
					.trim();
			var url = CommonSearch.getSearchStyle1GridUrl($(
					'.easyui-window #searchStyle1Url').val().trim(),
					code, name, CommonSearch._arrParams);
			$(".easyui-window #searchStyle5Grid").setGridParam({
				url : url,
				page : 1
			}).trigger("reloadGrid");});
		var needReloadGrid = $('.easyui-window #needReloadGrid').val();
		if(needReloadGrid == true || needReloadGrid == 'true') {
			$(".easyui-window #searchStyle5Grid").trigger("reloadGrid");
		} else {
			$('.easyui-window #needReloadGrid').val(true);
		}
	},
	openSearchStyle1EasyUIForCustomer : function(codeText, nameText, title, url, callback,
			codeFieldText, nameFieldText, arrParam, searchDiv, addressText, addressFieldText) {
		$(".easyui-window #searchStyle5Grid").jqGrid('GridUnload');
		$('#' + searchDiv).show();
		$('#' + searchDiv).window({title : title});
		$('#' + searchDiv).window('open');
		
		CommonSearch._arrParams = null;
		Utils.bindAutoSearchForEasyUI();
		$('.easyui-window #searchStyle1Url').val(url);
		$('.easyui-window #searchStyle1CodeText').val(codeFieldText);
		$('.easyui-window #searchStyle1NameText').val(nameFieldText);
		if(addressText!=null && addressText!=undefined && addressText.length > 0
				&& addressFieldText!=null && addressFieldText != undefined && addressFieldText.length > 0){
			$('.easyui-window #searchStyle1AddressText').val(addressFieldText);
			$('.easyui-window #seachStyle1Address').show();
		}
		CommonSearch._currentSearchCallback = callback;
		CommonSearch._arrParams = arrParam;
		var codeField = 'code';
		var nameField = 'name';
		var addressField='address';
		if (codeFieldText != null && codeFieldText != undefined
				&& codeFieldText.length > 0) {
			codeField = codeFieldText;
		}
		if (nameFieldText != null && nameFieldText != undefined
				&& nameFieldText.length > 0) {
			nameField = nameFieldText;
		}
		if(addressFieldText != null && addressFieldText != undefined && addressFieldText.length > 0){
			$('.easyui-window #seachStyle1AddressLabel').show();
			addressField = addressFieldText;
		}
		$('.easyui-window #seachStyle1CodeLabel').html(codeText);
		$('.easyui-window #seachStyle1NameLabel').html(nameText);
		$(".easyui-window #searchStyle5Grid")
				.jqGrid(
						{
							url : CommonSearch.getSearchStyle1GridUrl(url, '','', arrParam),
							colModel : [
									{name: codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : addressField,index : addressField,label : addressText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : function(cellvalue, options, rowObject) {
											return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachEasyUI1(" + options.rowId + ", '" + searchDiv + "');\">Chọn</a>";
										}
									}, {name : 'id',index : 'id',hidden : true}, ],
							pager : $('.easyui-window #searchStyle5Pager'),
							rowNum : 10,
							width : ($('.easyui-window #searchStyle1ContainerGrid')
									.width()),
							gridComplete : function() {
								$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
								/*$('.easyui-window #searchStyle1ScrollBody')
										.jScrollPane();*/
								/*$('.easyui-window #searchStyle1ScrollBody .jspContainer').css('width', '476px');*/
								$('.easyui-window #seachStyle1Code').bind('keypress',Utils.unitCharactersAz094Code);
								$('.easyui-window #seachStyle1Name').bind('keypress',Utils.unitCharactersAz094Name);
								$('.easyui-window #seachStyle1Code').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Code','',Utils._CODE);
										if (msg.length > 0) {$('#seachStyle1Code').val('');}
										clearTimeout(tm);
									}, 50);});
								$('.easyui-window #seachStyle1Name').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Name','',Utils._NAME);
										if (msg.length > 0) {$('#seachStyle1Name').val('');}
										clearTimeout(tm);
									}, 50);});
								updateRownumWidthForJqGrid();
								var tm = setTimeout(function(){
									$('.panel').css('top', document.documentElement.scrollTop + 100);
									$('.window-shadow').css('top', document.documentElement.scrollTop + 100);
									clearTimeout(tm);
								}, 500);
							}
						}).navGrid($('.easyui-window #searchStyle5Pager'), {
					edit : false,
					add : false,
					del : false,
					search : false
				});
		$('.easyui-window #btnSearchStyle1').bind('click',function(event) {
			var code = $('.easyui-window #seachStyle1Code').val().trim();
			var name = $('.easyui-window #seachStyle1Name').val().trim();
			var address = '';
			if(addressText!=null && addressText!=undefined && addressText.length > 0
					&& addressFieldText!=null && addressFieldText != undefined && addressFieldText.length > 0){
				address = $('.easyui-window #seachStyle1Address').val().trim();
			}
			
			var url = CommonSearch.getSearchStyle1GridUrl($(
					'.easyui-window #searchStyle1Url').val().trim(),
					code, name, CommonSearch._arrParams,address);
			$(".easyui-window #searchStyle5Grid").setGridParam({
				url : url,
				page : 1
			}).trigger("reloadGrid");});
		var needReloadGrid = $('.easyui-window #needReloadGrid').val();
		if(needReloadGrid == true || needReloadGrid == 'true') {
			$(".easyui-window #searchStyle5Grid").trigger("reloadGrid");
		} else {
			$('.easyui-window #needReloadGrid').val(true);
		}
	},
	getSearchStyle1GridUrl : function(url, code, name, arrParam, address) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		return searchUrl;
	},
	getResultSeachStyle1 : function(rowId) {
		var code = $(".fancybox-inner #searchStyle1Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle1CodeText').val());
		var name = $(".fancybox-inner #searchStyle1Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle1NameText').val());
		var id = $(".fancybox-inner #searchStyle1Grid").jqGrid('getCell',rowId, 'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	getResultSeachStyle1ForDisplay : function() {
		var selected =new Array();
		var customerMapKey = ProgrammeDisplayCatalog._mapCheckSubCat.keyArray;
		var customerMapValue = ProgrammeDisplayCatalog._mapCheckSubCat.valArray;
		if(customerMapKey.length>0){
			for( i = 0,n=customerMapKey.length ; i < n;) {				
				selected.push(customerMapValue[i]);
				i++;
			}
			if (CommonSearch._currentSearchCallback != null) {
				CommonSearch._currentSearchCallback.call(this, selected);
			}
		}else{
			$('#errMsgFancybox').html('Bạn chưa chọn ngành hàng con nào.').show();
			var tm = setTimeout(function(){
				$('#errMsgFancybox').html('').hide();
				clearTimeout(tm);					
			}, 5000);
		}
		return false;
	},
	getResultPayrollSeachEasyUI : function(rowId, searchDiv) {
		var code = $(".easyui-window #easyTGrid").jqGrid('getCell',
				rowId, $('.easyui-window #payrollTableCodeEasy').val());
		var name = $(".easyui-window #easyTGrid").jqGrid('getCell',
				rowId, $('.easyui-window #payrollTableNameEasy').val());
		var id = $(".easyui-window #easyTGrid").jqGrid('getCell', rowId,
				'payrollId');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$('#' + searchDiv).window('close');
		}
		return false;
	},
	getResultSeachEasyUI1 : function(rowId, searchDiv) {
		var code = $(".easyui-window #searchStyle5Grid").jqGrid('getCell',
				rowId, $('.easyui-window #searchStyle1CodeText').val());
		var name = $(".easyui-window #searchStyle5Grid").jqGrid('getCell',
				rowId, $('.easyui-window #searchStyle1NameText').val());
		var id = $(".easyui-window #searchStyle5Grid").jqGrid('getCell', rowId,
				'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$('#' + searchDiv).window('close');
		}
		return false;
	},
	searchRouteOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã tuyến BH", "Tên tuyến BH",
				"Tìm kiếm tuyến bán hàng", "/commons/route/search", callback,
				"routingCode", "routingName", arrParam);
		return false;
	},
	searchStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchStaffBCNVKBMOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/staff/search-staff-nvkbm", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},	
	searchNVBHOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên bán hàng", "/commons/nvbh/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},//PhuT : search nvbh
	searchNVGSOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên giám sát", "/commons/nvgs/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},//PhuT : search nvgs
	searchNVGSOnDialog2 : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên giám sát", "/commons/nvgs/search2", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},//SangTN : search nvgs
	//CuongND : search GSNPP - TBHV . 
	searchGSNPPOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã GSNPP", "Tên GSNPP",
				"Tìm kiếm GSNPP", "/superviseshop/manage-trainingplanTBHV/getlistGS", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	//end: search GSNPP - TBHV
	searchPromotionOnDialog : function(callback,appParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTKM", "Tên CTKM",
				"Tìm kiếm CTKM",WEB_CONTEXT_PATH+ "/commons/promotion/search", callback,
				"promotionProgramCode", "promotionProgramName",appParam);
		return false;
	},
	searchPromotionSupportOnDialog : function(callback,appParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTHTTM", "Tên CTHTTM",
				"Tìm kiếm CTHTTM",  WEB_CONTEXT_PATH+ "/commons/promotion/search", callback,
				"promotionProgramCode", "promotionProgramName",appParam);
		return false;
	},
	searchPayrollTemplateOnDialog: function(callback, appParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã bảng lương", "Tên bảng lương",
				"Tìm kiếm bảng lương mẫu", "/commons/payroll-table/search", callback,
				"payrollTCode", "payrollTName",appParam);
	},
	searchProductOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product/search", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchProductInCatZOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product-cat-z/search", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchProductWithPriceOnDialog : function(callback, arrParam) {
		/*CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product/search-product-with-valid-price", callback,
				"productCode", "productName", arrParam);*/
		CommonSearch.openSearchProductOnDialog1("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product/search-product-with-valid-price", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	//liemtpt: Lay danh sach san pham con hieu luc co phat sinh doanh so
	searchProductHasSaleOrderOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product/search-product-has-sale-order", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchProductOnDialogCheckbox : function(callback, arrParam, objectProduct) {
		CommonSearch.openSearchStyle1DialogForProduct("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product/search", callback,
				"productCode", "productName", arrParam,objectProduct);
		return false;
	},
	searchDeviceOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã thiết bị", "Tên thiết bị",
				"Tìm kiếm thiết bị", "/commons/device/search", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchShopOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/commons/shop/search", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchShopOnDialogByChannelType : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/commons/shop/search1", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchOnlyShopOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/commons/only-shop/search", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchShopOfSupervisorOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/commons/shop-of-supervisor/search", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchIncentiveProgramOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTKT", "Tên CTKT",
				"Tìm kiếm CTKT", "/commons/incentive-program/search", callback, "incentiveCode",
				"incentiveName", arrParam);
		return false;
	},
	searchShopOnDialogOfStock : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/stock/update/search-shop", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchCustomerOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	searchCustomerByShopOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer-in-shop/search", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	searchCustomerByShopOnDialogEx2 : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/report/customer/search/customer-shop", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	searchCustomerWithAddressOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam, msgTuyen3, 'address');
		return false;
	},	
	searchCustomerWithAddressByShopOnDialog : function(callback, arrParam,divId, successGridCallback) {
		CommonSearch.openSearchStyle1EasyUIDialogCustomerSO(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer-in-shop/search", callback,
				"customerCode", "customerName", arrParam, null,msgTuyen3, 'address',divId, successGridCallback);
		return false;
	},
	//Anhdt10 them
	searchCustomerWithAddressByShopOnDialog4report : function(callback, arrParam,divId, successGridCallback) {
		CommonSearch.openSearchStyle1EasyUIDialogCustomerSO(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer-in-shop-report/search", callback,
				"customerCode", "customerName", arrParam, null,msgTuyen3, 'address',divId, successGridCallback);
		return false;
	},
	//
	searchCustomerWithAddressByShopOnDialogCheckbox : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialogForCustomer(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer-of-shop/search", callback,
				"shortCode", "customerName", arrParam, msgTuyen3, 'address');
		return false;
	},
	searchCustomerOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUIForCustomer(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam, searchDiv,msgTuyen3,"address");
	},
	searchStaffOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/sale-staff/search", callback,
				"staffCode", "staffName", arrParam, searchDiv);
	},
	searchProductOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", "/commons/product/search", callback,
				"productCode", "productName", arrParam, searchDiv);
	},
	searchShopOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/commons/shop/search", callback,
				"shopCode", "shopName", arrParam, searchDiv);
	},
	searchPayrollTableOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã bảng lương mẫu", "Tên bảng lương mẫu",
				"Tìm kiếm bảng lương mẫu", "/commons/payroll-table/search", callback,
				"payrollTCode", "payrollTName", arrParam, searchDiv);
	},
	searchCategoryOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã ngành hàng", "Tên ngành hàng",
				"Tìm kiếm ngành hàng", "/commons/category/search", callback,
				"productInfoCode", "productInfoName");
		return false;
	},
	searchSubCategoryOnDialog : function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã ngành hàng con",
				"Tên ngành hàng con", "Tìm kiếm ngành hàng con",
				"/commons/sub-category/search", callback, "productInfoCode",
				"productInfoName",arrParam);
		return false;
	},
	searchSubCategoryOnDialogCheckbox : function(callback,arrParam,objectSubCat) {
		CommonSearch.openSearchStyle1EasyUIDialogForSubCat("Mã nhãn hàng",
				"Tên nhãn hàng", "Tìm kiếm nhãn hàng",
				"/commons/sub-category/search", callback, "productInfoCode",
				"productInfoName",arrParam,objectSubCat);
		return false;
	},
	searchSubCategoryByDisplayOnDialog : function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhãn hàng",
				"Tên nhãn hàng", "Tìm kiếm nhãn hàng",
				"/commons/sub-category-by-display/search", callback, "productInfoCode",
				"productInfoName",arrParam);
		return false;
	},
	searchDisplayProgramOnDialog:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTTB",
				"Tên CTTB", "Tìm kiếm CTTB",
				"/catalog/programme-display/program/search", callback, "displayProgramCode",
				"displayProgramName",arrParam);
		return false;
	},
	searchDisplayProgramOnDialogCommons:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTTB",
				"Tên CTTB", "Tìm kiếm CTTB",
				"/commons/display-program/search", callback, "displayProgramCode",
				"displayProgramName",arrParam);
		return false;
	},	
	searchSubCategoryOnDialogDisplay : function(callback,arrParam) {
		CommonSearch.openSearchStyle1DialogForDisplay("Mã ngành hàng con",
				"Tên ngành hàng con", "Tìm kiếm ngành hàng con",
				"/commons/sub-category/search", callback, "productInfoCode",
				"productInfoName",arrParam);
		return false;
	},
	searchProvinceOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã tỉnh/TP", "Tên tỉnh/TP",
				"Tìm kiếm", "/commons/province/search", callback, "areaCode",
				"areaName");
		return false;
	},
	searchDistrictOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã quận/huyện", "Tên quận/huyện",
				"Tìm kiếm", "/commons/district/search", callback, "areaCode",
				"areaName", arrParam);
		return false;
	},
	searchWardOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã phường/xã", "Tên phường/xã",
				"Tìm kiếm", "/commons/ward/search", callback, "areaCode",
				"areaName", arrParam);
		return false;
	},
	searchStaffTypeOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã loại nhân viên",
				"Tên loại nhân viên", "Tìm kiếm loại nhân viên",
				"/commons/staff-type/search", callback, "channelTypeCode",
				"channelTypeName");
		return false;
	},
	searchCustomerTypeOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã loại KH", "Tên loại KH",
				"Tìm kiếm", "/commons/customer-type/search", callback,
				"channelTypeCode", "channelTypeName");
		return false;
	},
	searchPromotionCustomerMapOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm", "/commons/promotion-shop-map/search", callback,
				"shopCode", "shopName", arrParam);
		return false;
	},
	searchCycleCountOnDialog : function(callback, arrParam, typeInventory, shopCodeAndName) {
		CommonSearch.openSearchStyle2Dialog("Mã kiểm kê", "Mô tả",
				"Trạng thái", "Ngày kiểm kê", "Tìm kiếm mã kiểm kê",
				"/commons/cycle-count/search", callback, "cycleCountCode",
				"name", "description", "status", "startDate",
				"cycleCountType", "sortByType", "firstNumber", arrParam, typeInventory,shopCodeAndName);
		return false;
	},
	searchSupervisorStaffOnDialog : function(callback, arrParam,typeInventory) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/supervisor-staff/search",
				callback, "staffCode", "staffName", arrParam, typeInventory);
		return false;
	},
	searchSupervisorStaffUnderOnDialog : function(callback, arrParam,typeInventory) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/supervisor-staff/searchunder",
				callback, "staffCode", "staffName", arrParam, typeInventory);
		return false;
	},
	searchToolOnDialog : function(callback, arrParam,typeInventory) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã tủ", "Tên tủ",
				"Tìm kiếm tủ", "/commons/tool/search",
				callback, "productCode", "productName", arrParam);
		return false;
	},
	searchCustomerByStaffRoutingOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer-in-staff-routing/search", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	openSearchStyle2Dialog : function(codeText, descriptionText, statusText,
			dateText, title, url, callback, codeFieldText, nameFieldText,
			desFieldText, statusFieldText, dateFieldText,
			cycleCountTypeFieldText, sortByFieldText, firstNumberFieldText,
			arrParam, typeInventory,shopCodeAndName) {
		var html = $('#searchStyle2').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
							modal : true,
							autoResize: false,
							title : title,
							afterShow : function() {
								//@CuongND : my try Code <reset tabindex>
								var tabindex = -1;
								$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
									if (this.type != 'hidden') {
										$(this).attr("tabindex", tabindex);
										tabindex -=1;
									}
								});
								Utils.bindAutoSearch();
								//end <reset tabindex>
								$('#searchStyle2').html('');
								if(typeInventory == 1){
									//NHAP KIEM KHO
									var html = new Array();
									html.push('<select id="seachStyle2Status" class="MySelectBoxClass" disabled="disabled">');
									html.push('<option value="0">Đang thực hiện</option>');
									html.push('</select>');
									$('.fancybox-inner #cycleCountTypeDiv').html(html.join(""));
									$('.fancybox-inner #typeInventory').val(typeInventory);
								}else if(typeInventory == 2){
									//DUYET KIEM KHO
									var html = new Array();
									html.push('<select id="seachStyle2Status" class="MySelectBoxClass">');
									html.push('<option value="0">Đang thực hiện</option>');
									html.push('<option value="1">Hoàn thành</option>');
									html.push('</select>');
									$('.fancybox-inner #cycleCountTypeDiv').html(html.join(""));
									$('.fancybox-inner #typeInventory').val(typeInventory);
								} else {
									$('.fancybox-inner #typeInventory').val(0);
								}
								$('.fancybox-inner #seachStyle2Code').focus();
								$('.fancybox-inner #seachStyle2Shop').val(shopCodeAndName);
								$('.fancybox-inner #searchStyle2Url').val(url);
								$('.fancybox-inner #searchStyle2CodeText').val(codeFieldText);
								$('.fancybox-inner #searchStyle2NameText').val(nameFieldText);
								$('.fancybox-inner #searchStyle2StartDateText').val(dateFieldText);
								$('.fancybox-inner #searchStyle2DesText').val(desFieldText);
								$('.fancybox-inner #searchStyle2TypeText').val(cycleCountTypeFieldText);
								$('.fancybox-inner #searchStyle2SortText').val(sortByFieldText);
								$('.fancybox-inner #searchStyle2FirstNumberText').val(firstNumberFieldText);
								CommonSearch._currentSearchCallback = callback;
								CommonSearch._arrParams = arrParam;
								$('.fancybox-inner #seachStyle2Status').customStyle();

								if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
									codeField = codeFieldText;
								}
								if (nameFieldText != null && nameFieldText != undefined && nameFieldText.length > 0) {
									nameField = nameFieldText;
								}
								if (desFieldText != null && desFieldText != undefined && desFieldText.length > 0) {
									desField = desFieldText;
								}
								if (statusFieldText != null && statusFieldText != undefined && statusFieldText.length > 0) {
									statusField = statusFieldText;
								}
								if (dateFieldText != null && dateFieldText != undefined && dateFieldText.length > 0) {
									dateField = dateFieldText;
								}
								if (cycleCountTypeFieldText != null && cycleCountTypeFieldText != undefined && cycleCountTypeFieldText.length > 0) {
									typeField = cycleCountTypeFieldText;
								}
								if (sortByFieldText != null && sortByFieldText != undefined && sortByFieldText.length > 0) {
									sortbyField = sortByFieldText;
								}
								if (firstNumberFieldText != null && firstNumberFieldText != undefined && firstNumberFieldText.length > 0) {
									firstnumberField = firstNumberFieldText;
								}

								$(".fancybox-inner #searchStyle2Grid").jqGrid({
													url : CommonSearch.getSearchStyle2GridUrl(url,'','','','','','',CommonSearch._arrParams,typeInventory),
													colModel : [
																	{name : codeField, index : codeField,  label : codeText, width : 100, align : 'left', sortable : false, resizable : false, formatter:function(cellvalue, options, rowObject){
															        	  return Utils.XSSEncode(cellvalue);
															          } },
																	{name : desField, index : desField, label : descriptionText, width : 150, sortable : false, resizable : false, align : 'left', formatter:function(cellvalue, options, rowObject){
															        	  return Utils.XSSEncode(cellvalue);
															          } },
																	{name : statusField, index : statusField, label : statusText, width : 100, sortable : false, resizable : false,align : 'left', formatter : CountingFormatter.statusFormat2 },
																	{name : dateField, index : dateField, label : dateText, sortable : false, resizable : false, width : 100, align : 'center', formatter : 'date', formatoptions : { srcformat : 'Y-m-d H:i:s', newformat : 'd/m/Y' } },
																	{name : '', label : CreateSalePlan_chon, width : 50, align : 'center', sortable : false, resizable : false, formatter : CommonSearchFormatter.selectCell },
																	{name : typeField, index : typeField, hidden : true },
																	{name : sortbyField, index : sortbyField, hidden : true },
																	{name : firstnumberField, index : firstnumberField, hidden : true }, 
																	{name : 'id', index : 'id', hidden : true }, 
																],
													pager : $('.fancybox-inner #searchStyle2Pager'),
													height : 'auto',
													rowNum : 10,
													width : ($('.fancybox-inner #searchStyle2ContainerGrid').width()),
													gridComplete : function() {
														$('#jqgh_searchStyle2Grid_rn').html(jspCustomerAttributeSTT);
														//$('.fancybox-inner #fbScrollBody').jScrollPane();
														var tm = setTimeout(function() {
															$(window).resize();
															$.fancybox.update();
															clearTimeout(tm);
														}, 50);
														tabindex = 1;
														$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
															if (this.type != 'hidden') {
															$(this).attr("tabindex", '');
															tabindex++;
															}
														});
														updateRownumWidthForJqGrid('.fancybox-inner');
														$('#searchStyle2Pager_right').css('width','180px');//@LamNH:fix bug 0003172
														applyDateTimePicker('.fancybox-inner #seachStyle2From');														
														applyDateTimePicker('.fancybox-inner #seachStyle2To');
													}
												})
										.navGrid($('.fancybox-inner #searchStyle2Pager'),{edit : false, add : false, del : false, search : false});
								$('.fancybox-inner #btnSearchStyle2').bind('click',function(event) {
									$('#errMsgSearchStyle2').html('').hide();
									var msg = Utils.getMessageOfInvalidFormatDateEx('seachStyle2From',msgTuNgay, Utils._DATE_DD_MM_YYYY);
									if(msg.length ==0){
										msg = Utils.getMessageOfInvalidFormatDateEx('seachStyle2To',msgDenNgay, Utils._DATE_DD_MM_YYYY);
									}
									if(msg.length > 0){
										$('#errMsgSearchStyle2').html(msg).show();
										return false;
									}
									var code = $('.fancybox-inner #seachStyle2Code').val().trim();
									var status = $('.fancybox-inner #seachStyle2Status').val().trim();
									var des = $('.fancybox-inner #seachStyle2Des').val().trim();
									var from = $('.fancybox-inner #seachStyle2From').val().trim();
									var to = $('.fancybox-inner #seachStyle2To').val().trim();
									var shop = $('.fancybox-inner #seachStyle2Shop').val().trim();
									var typeInventory = $('.fancybox-inner #typeInventory').val();
													
									var url = CommonSearch.getSearchStyle2GridUrl($('.fancybox-inner #searchStyle2Url').val().trim(), code, status, des, shop, from, to, CommonSearch._arrParams, typeInventory);
									$(".fancybox-inner #searchStyle2Grid").setGridParam({url : url, page : 1 }) .trigger( "reloadGrid");
									});
								// setDateTimePicker('.fancybox-inner
								// #seachStyle2From');
								// setDateTimePicker('.fancybox-inner
								// #seachStyle2To');
							},
							afterClose : function() {
								var tabindex = 1;
								$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
									if (this.type != 'hidden') {
										$(this).attr("tabindex", '');
									}
									tabindex ++;
								});	
								var curIdFocus = $('#cur_focus').val();
								$('#'+ curIdFocus).focus();
								CommonSearch._currentSearchCallback = null;
								$('#searchStyle2').html(html);
							}
						});

		return false;
	},
	openSearchStyle1EasyUIDialogCustomerSO : function(codeText, nameText, title, url, callback, codeFieldText, 
			nameFieldText, arrParam,idFieldText,addressText, addressFieldText,divId, successGridCallback) {
		if(divId != null && divId != undefined){
			CommonSearch.divId = divId;
		}
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDivSO').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width:650,
//	        width:900,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width :600,
//					width :850,
				    columns:[[  
				        {field:codeField,title:codeText,align:'left', width:100, sortable : false,resizable : false,
				        	formatter: function(val, row) {
				        		if (val != undefined && val != null) {
				        			return Utils.XSSEncode(val);
				        		}
				        		return '';
				        	}
				        },  
				        {field:nameField,title:nameText,align:'left', width:200, sortable : false,resizable : false,
				        	formatter: function(val, row) {
				        		if (val != undefined && val != null) {
				        			return Utils.XSSEncode(val);
				        		}
				        		return '';
				        	}
				        },	
				        {field:'address',title:msgTuyen3,align:'left', width:400, sortable : false,resizable : false},
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	if (successGridCallback != null){
				    		successGridCallback.call(this);
				    	}
				    	successGridCallback = null;
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1200);
			        	setTimeout(function() {
//			        		var height = $('#searchStyle1EasyUIDialogCustomerSO').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {
					if(!$(this).is(':hidden')){
						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
//						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						var address = '';
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDivSO').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});*/
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	getSearchStyleDistrictGridUrl : function(url, code, name, arrParam) {
		var searchUrl = url + '?code=' + encodeChar(code) + "&name=" + encodeChar(name);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '&curTime=' + encodeChar(curTime);
		return searchUrl;
	},
	getResultSeachStyleDistrict : function(rowId) {
		var code = $(".fancybox-inner #searchStyleDistrictGrid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyleDistrictCodeText').val());
		var name = $(".fancybox-inner #searchStyleDistrictGrid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyleDistrictNameText').val());
		var id = $(".fancybox-inner #searchStyleDistrictGrid").jqGrid('getCell',rowId, 'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	openSearchStyleForDistrictDialog : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam) {
		var html = $('#searchStyleDistrict').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				Utils.bindAutoSearch();
				$('#searchStyleDistrict').html('');
				$('.fancybox-inner #seachStyleDistrictCode').focus();
				$('.fancybox-inner #searchStyleDistrictUrl').val(url);
				
				$('.fancybox-inner #searchStyleDistrictCodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyleDistrictNameText').val(nameFieldText);
				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				$('.fancybox-inner #seachStyleDistrictCodeLabel').html(codeText);
				$('.fancybox-inner #seachStyleDistrictNameLabel').html(nameText);
				$(".fancybox-inner #searchStyleDistrictGrid").jqGrid({
					url : CommonSearch.getSearchStyleDistrictGridUrl(url, '', '', arrParam),
					colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
						        	  return Utils.XSSEncode(cellvalue);
						          }},
					            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
						        	  return Utils.XSSEncode(cellvalue);
						          }},
					            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellDistrictIconFormatter},
					            {name : 'id',index : 'id',hidden : true}
					            ],
					            pager : $('.fancybox-inner #searchStyleDistrictPager'),
								height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyleDistrictContainerGrid').width()),
								gridComplete : function() {
									$('#jqgh_searchStyleDistrictGrid_rn').html(jspCustomerAttributeSTT);
									$(window).resize();
									$.fancybox.update();
									updateRownumWidthForJqGrid('.fancybox-inner');
									$(window).resize();
									
								}												})
								.navGrid($('.fancybox-inner #searchStyleDistrictPager'),{edit : false,add : false,del : false,search : false});
								$('.fancybox-inner #btnSearchStyleDistrict').bind('click',function(event) {
									var code = $('.fancybox-inner #seachStyleDistrictCode').val().trim();
									var name = $('.fancybox-inner #seachStyleDistrictName').val().trim();
									var url = CommonSearch.getSearchStyleDistrictGridUrl($('.fancybox-inner #searchStyleDistrictUrl').val().trim(),code,name,CommonSearch._arrParams);
									$(".fancybox-inner #searchStyleDistrictGrid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
									$(".fancybox-inner #seachStyleDistrictCode").focus();
								});
							},
							afterClose : function() {
								CommonSearch._currentSearchCallback = null;
								$('#searchStyleDistrict').html(html);
							}
						});
		return false;
	},
	getSearchStyle2GridUrl : function(url, code, status, des, shop, from, to,arrParam,typeInventory) {
		var searchUrl = url + '?cycleCountCode=' + encodeChar(code) + "&cycleCountStatus="
				+ encodeChar(status) + '&description=' + encodeChar(des) + "&startDate=" + encodeChar(from)
				+ '&endDate=' + encodeChar(to);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		} else {
			searchUrl += "&shopCode=" + encodeChar(shop);
		}
		if(typeInventory !=null && typeInventory != undefined){
			searchUrl += "&typeInventory=" + encodeChar(typeInventory);
		}
		return searchUrl;
	},
	getResultSeachStyle2 : function(rowId) {
		var code = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2CodeText').val());
		var name = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2NameText').val());
		var type = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2TypeText').val());
		var sortby = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2SortText').val());
		var des = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2DesText').val());
		var startdate = $(".fancybox-inner #searchStyle2Grid").jqGrid(
				'getCell', rowId,
				$('.fancybox-inner #searchStyle2StartDateText').val());
		var firstnumber = $(".fancybox-inner #searchStyle2Grid").jqGrid(
				'getCell', rowId,
				$('.fancybox-inner #searchStyle2FirstNumberText').val());
		var id = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, 'id');
		var status = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, 'status');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.type = type;
		obj.sortby = sortby;
		obj.des = des;
		obj.startdate = startdate;
		obj.firstnumber = firstnumber;
		obj.id = id;
		obj.status = status;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	searchSaleStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/sale-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	//cuongND
	searchBCBHOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/sale-staff/bc/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSaleStaffOnDialogCheckbox : function(callback, arrParam) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/sale-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSupervisorStaffOnDialogCheckbox : function(callback, arrParam) {
		CommonSearch.openSearchStyle1DialogForSupervisorStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/supervisor-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchPreAndValStaffOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/pv-staff/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchPreAndValStaffHasChildOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/pv-staff-child/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchTBHVOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/tbhv/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchGSNPPOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/gsnpp/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchPreAndValStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/pv-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchPreSaleStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/preSale-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSaleStaffOnDialogForSuperviseManage : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/superviseshop/manage-trainingplan/search-staff", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSaleStaffVansaleOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/staff/search-vansale",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	searchCashierStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/cashier-staff/search",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	searchTransferStaffOnDialog : function(callback, arrParam) {
//		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
//				"Tìm kiếm nhân viên", "/commons/transfer-staff/search",
//				callback, "staffCode", "staffName", arrParam);
		//SangTN
		CommonSearch.openSearchStyle1EasyUIDialog("Mã NVGH", "Tên NVGH",
				"Tìm kiếm nhân viên giao hàng", "/commons/transfer-staff/search",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	getResultCSSearch : function(index) {
		var rows = $('.easyui-dialog #listCommercialSupport').datagrid('getRows');
		var code = rows[index].code;
		var name = rows[index].name;
		var type = rows[index].type;
		var promotionType = rows[index].promotionType;
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.type = type;
		if(promotionType==null)
			promotionType = '';
		obj.promotionType = promotionType;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$('#searchStyle4CS').dialog('close');
		}
		return false;
	},
	searchCommercialSupportOnDialog : function(callback, arrParam) {
		$('#searchStyle4CSContainer').show();
		var html = $('#searchStyle4CS').html();
		CommonSearch._currentSearchCallback = callback;
		CommonSearch._arrParams = arrParam;
		$('#searchStyle4CS').dialog({
	        closed: false,  
	        modal: true,
	        onOpen: function(){
	        	$('.easyui-dialog #listCommercialSupport').datagrid({
	        		url:CommonSearch.getCommercialSupportUrl(arrParam),
	        		method:'GET',
	        		pagination:true,
	        		rownumbers:false,
	        		fitColumns:true,
	    	        scrollbarSize:0,
	    	        singleSelect:true,
	        		width: $('#searchStyle4CS').width() - 25,
	        		columns:[[  
	        		          {field:'code',title:'Mã CT',width:150, align:'left', sortable:false, resizable:false, formatter:function(value, row, index) {
	        		        	  return Utils.XSSEncode(value);
	        		          }},
	        		          {field:'name',title:'Tên CT',width:350, align:'left', sortable:false, resizable:false, formatter:function(value, row, index) {
	        		        	  return Utils.XSSEncode(value);
	        		          }},
	        		          {field:'type',title:CreateSalePlan_chon,width:$('#searchStyle4CS').width() - 25 - 150 - 350,align:'center', sortable:false, resizable:false, formatter: function(value,row,index) {
	        		        	  return "<a href='javascript:void(0)' class='getCommercialSupport' onclick=\"return CommonSearch.getResultCSSearch(" + index + ");\">Chọn</a>";
	        		          }}
	        		      ]]
	        	}); 
	        },
	        onBeforeClose: function() {
	        	$('#searchStyle4CS').html(html);
	        	$('#searchStyle4CSContainer').hide();
	        }
		});
		return false;
	},
	searchStaffVansaleOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/catalog/delivery-group/staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	// ////LamNH,tientv
	openSearchStyle3Dialog : function(callback, arrParam) {
		var html = $('#searchStyle3').html();
		var url1 = '/sale-plan/create/search-product';
		CommonSearch._arrParams = null;
		$.fancybox(html,{
							modal : true,
							title : 'Chọn SKU',
							afterShow : function() {
								$('#searchStyle3').html('');
								CommonSearch._currentSearchCallback = callback;
								CommonSearch._arrParams = arrParam;
								$(".fancybox-inner #searchStyle3Grid").jqGrid({url : CommonSearch.getSearchStyle3GridUrl(url1, '','','','',arrParam),
													colModel : [
															{ name : 'productCode', index : 'productCode', align : 'left', label : 'Mã SP', width : 100, sortable : false, resizable : false, formatter:function(cellvalue, options, rowObject){
													        	  return Utils.XSSEncode(cellvalue);
													          } },
															{ name : 'productName', index : 'productName', label : 'Tên SP', sortable : false, resizable : false, align : 'left', formatter:function(cellvalue, options, rowObject){
													        	  return Utils.XSSEncode(cellvalue);
													          } },
															{ name : 'staffQuantity', index : 'staffQuantity', label : 'Số lượng', width : 100, align : 'right', sortable : false, resizable : false, formatter:function(cellvalue, options, rowObject){		
																return '<input type="text" onkeypress="return NextAndPrevTextField(event, this,\'cls_quantity_vos\');" size="12" class="cls_quantity_vos InputTextStyle InputText1Style AlignRight" id="'+options.rowId+'_staffQuantity" value="'+cellvalue+'" name="staffQuantity" style="text-align:right; width:100%" role="textbox" maxlength="10"/>';
															}},
															{ name : 'id', index : 'id', hidden : true },
															{ name : 'productId', index : 'productId', hidden : true },
															{ name : 'staffCode', index : 'staffCode', hidden : true },
															{ name : 'month', index : 'month', hidden : true },
															{ name : 'year', index : 'year', hidden : true },
															{ name : 'price', index : 'price', hidden : true },
															{ name : 'amount', index : 'amount', hidden : true },
															{ name : 'shopQuantityAssign', index : 'shopQuantityAssign', hidden : true },
															{ name : 'shopQuantity', index : 'shopQuantity', hidden : true },
															{ name : 'shopLeftQuantity', index : 'shopLeftQuantity', hidden : true },
															{ name : 'shopCode', index : 'shopCode', hidden : true },
															],
													pager : $('.fancybox-inner #searchStyle3Pager'),
													height : 'auto',
													multiselect : true,
													recordpos : 'right',
													rowNum : 10,
													forceFit : true,
													cellEdit : true,
													cellsubmit : 'clientArray',
													afterSaveCell : function( rowid, name, val, iRow, iCol) {
														if (name == 'staffQuantity') {
															var taxval = $(".fancybox-inner #searchStyle3Grid") .jqGrid( 'getCell', rowid, iCol + 1);
															$(".fancybox-inner #searchStyle3Grid").jqGrid('setRowData',rowid,{total : parseInt(val)+ parseInt(taxval)});
														}
													},
													beforeSelectRow: function (id, e) {
														  var _id = 'jqg_searchStyle3Grid_' + id;
														  var isCheck = CommonSearch._mapCheckProduct.get(_id);
														  var object = {};
														  if(isCheck || isCheck == 'true') {
															  //da co trong map roi->remove no di
															  CommonSearch._mapCheckProduct.remove(_id);
															  var tm = setTimeout(function(){
																  $('#'+_id).removeAttr('checked');
																  $('#'+id).removeClass('ui-state-highlight');
															  }, 100);
														  } else {
															  object.shopCode = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopCode');
															  object.staffCode = $("#searchStyle3Grid").jqGrid ('getCell', id, 'staffCode');
															  object.productCode = $("#searchStyle3Grid").jqGrid ('getCell', id, 'productCode');
															  object.productName = $("#searchStyle3Grid").jqGrid ('getCell', id, 'productName');
															  object.month = $("#searchStyle3Grid").jqGrid ('getCell', id, 'month');
															  object.year = $("#searchStyle3Grid").jqGrid ('getCell', id, 'year');
															  object.price = $("#searchStyle3Grid").jqGrid ('getCell', id, 'price');
															  object.shopQuantityAssign = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopQuantityAssign');
															  object.shopQuantity = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopQuantity');
															  object.shopLeftQuantity = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopLeftQuantity');
															  object.amount = $("#searchStyle3Grid").jqGrid ('getCell', id, 'amount');
															  object.productId = id;
															  object.staffQuantity = $('#'+id+'_staffQuantity').val().trim();
//															  object.staffQuantity = $("#searchStyle3Grid").jqGrid ('getCell', id, id+'_staffQuantity');
															  //chua co trong map -> put vao
															  CommonSearch._mapCheckProduct.put(_id, object);
															  var tm = setTimeout(function(){
																  $('#'+_id).attr('checked', 'checked');
																  $('#'+id).addClass('ui-state-highlight');
															  }, 100);
														  }
														  return true;
													  },
											      onSelectAll: function(aRowids, status) {
														  for(var i = 0; i < aRowids.length; i++) {
															  var object = {};
															  if(status) {
																  var _id = 'jqg_searchStyle3Grid_' + aRowids[i];
																  object.shopCode = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopCode');
																  object.staffCode = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'staffCode');
																  object.productCode = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'productCode');
																  object.productName = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'productName');
																  object.month = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'month');
																  object.year = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'year');
																  object.price = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'price');
																  object.shopQuantityAssign = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopQuantityAssign');
																  object.shopQuantity = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopQuantity');
																  object.shopLeftQuantity = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopLeftQuantity');
																  object.amount = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'amount');
																  object.productId = aRowids[i];
																  object.staffQuantity = $('#'+aRowids[i]+'_staffQuantity').val().trim();
																  //put vao map
																  CommonSearch._mapCheckProduct.put(_id, object);
															  } else {
																  var _id = 'jqg_searchStyle3Grid_' + aRowids[i];
																  CommonSearch._mapCheckProduct.remove(_id);
															  }
														  }
													  },
													width : ($('.fancybox-inner #searchStyle3ContainerGrid').width()),
													gridComplete : function() {
														$('.fancybox-inner #searchStyle3Code').focus();
														Utils.bindAutoSearch();
														$('#jqgh_searchStyle3Grid_rn').html(jspCustomerAttributeSTT);
														$(window).resize();
														$.fancybox.update();
														updateRownumWidthForJqGrid('.fancybox-inner');
														$('.ui-jqgrid-bdiv .cbox').each(function() {
															 var isCheck = CommonSearch._mapCheckProduct.get(this.id);
															 if(isCheck || isCheck == 'true') {
																 productId = $("#searchStyle3Grid").jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
																 $(this).attr('checked', 'checked');										 
																 $('#'+productId).addClass('ui-state-highlight');
															 }
															 $(this).parent().css('padding', '3px 3px');	
														  });
														$('.cls_quantity_vos').each(function(){
															var SELECTOR =  $(this).attr('id');
															Utils.bindFormatOnTextfield(SELECTOR, Utils._TF_NUMBER_CONVFACT);															
														});
													}
												})
										.navGrid($('.fancybox-inner #searchStyle3Pager'),{edit : false,add : false,del : false,search : false});
								$('.fancybox-inner #btnSearchStyle3').bind('click',function(event) {
													$('#errDialogMsg').hide();
													$('#errMsgUpdateDiv').hide();
													var code = $('.fancybox-inner #searchStyle3Code').val().trim();
													var name = $('.fancybox-inner #searchStyle3Name').val().trim();
													var fromQuantity = $('.fancybox-inner #searchStyle3From').val().trim();
													var toQuantity = $('.fancybox-inner #searchStyle3To').val().trim();
													if(fromQuantity != '' && toQuantity != ''){
														if(parseInt(fromQuantity) > parseInt(toQuantity)){
															$('#errDialogMsg').html('Giá trị Từ phải nhỏ hơn giá trị Đến').show();
															$('.fancybox-inner #searchStyle3From').focus();
															return false;
														}
													}
													var url = CommonSearch.getSearchStyle3GridUrl(url1,code,name,fromQuantity,toQuantity,CommonSearch._arrParams);
													$(".fancybox-inner #searchStyle3Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
												});
								$('.fancybox-inner #btnProductAdd').bind('click', function(event) {
														CreateSalePlan.addRow();});
								$(".fancybox-inner #searchStyle3From").bind("paste",function(){
								    return false;
								});
								$(".fancybox-inner #searchStyle3To").bind("paste",function(){
								    return false;
								});
							},
							afterClose : function() {
								$('#searchStyle3').html(html);
								CommonSearch._currentSearchCallback = null;
								CommonSearch._mapCheckProduct = new Map();
							}
						});
		return false;
	},
	getSearchStyle3GridUrl : function(url, code, name,fromQuantity,toQuantity, arrParam) {
		var searchUrl = url + '?code=' + encodeChar(code) + "&name=" + encodeChar(name) + '&fromQty=' + encodeChar(fromQuantity) + "&toQty=" + encodeChar(toQuantity);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		return searchUrl;
	},
	searchProductSalePlanOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle3Dialog(callback, arrParam);
		return false;
	},
	getCommercialSupportUrl : function(arrParams) {
		var searchUrl = '/commons/commercial-support/search';
		if (arrParams != null && arrParams != undefined && arrParams.length > 0) {
			for ( var i = 0; i < arrParams.length; i++) {
				if (i == 0) {
					searchUrl = searchUrl + '?' + arrParams[i].name + '='
							+ arrParams[i].value;
				} else {
					searchUrl = searchUrl + '&' + arrParams[i].name + '='
							+ arrParams[i].value;
				}
			}
		}
		return searchUrl;
	},
	showDialogProductCancel : function(productCode, productName, totalCancel,
			shopCode) {
		var params = new Object();
		params.productCodeCancel = productCode;
		params.productNameCancel = productName;
		params.totalCancel1Cancel = totalCancel;
		params.shopCodeCancel = shopCode;

		var url = '/sale-product/create-order/product-cancel-info';		
		Utils.getHtmlDataByAjax(params, url, function(data) {
			if (data != null || data != undefined || data != '') {
				$.fancybox(data, {
					modal : true,
					title : 'Nhập lô hủy',
					afterShow : function() {
						$('#listLotProductCancel').jScrollPane();
					},
					afterClose : function() {
					}
				});
			}
		}, null, 'GET');
	},
	getListProductLotUrl : function(productCode) {
		var url = '/commons/product/list-product-lot?code=' + encodeChar(productCode);
		return url;
	},
	showProductInfo : function(productCode, productName, convfactNumber,
			stockNumber,pricePackage, priceValue, total, promotionProgram) {
		$('#showProductInfoContainer').show();
		$('#showProductInfo').dialog({
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){
	        	if (stockNumber == '0/0') {
	        		stockNumber = "";
	        	}
	        	if (total == '0') {
	        		total = "";
	        	}
				$('#productCode').text(productCode);
				$('#productName').text(Utils.XSSDeEncode(productName));
				$('#convfactNumber').text(convfactNumber);
				$('#stockNumber').text(stockNumber);
				$('#pricePackage').text(formatFloatValue(Utils.returnMoneyValue(pricePackage),numFloat));
				$('#priceValue').text(formatFloatValue(Utils.returnMoneyValue(priceValue),numFloat));
				$('#totalDialog').text(total);
				if (configAutoPromo) {
					if (promotionProgram == null || promotionProgram == undefined || promotionProgram.length == 0) {
						$('#promotionProgram').text('');
					} else {
						$('#promotionProgram').text(promotionProgram);
					}
				} else {
					$('#promotionProgram').hide();
					$('#promotionLabel').hide();
				}
								
	        },
	        onClose:function() {
	        	$('#showProductInfoContainer').hide();
	        }
		});
	},	
	showCustomerInfoEasyUI : function(customerId) {
		$('#easyui-showCustomerInfo #info-listCustomerOrderEasyUI').jqGrid('GridUnload');
		var getCustomerInfoUrl = '/commons/customer/get-info?customerId='+ customerId;
		Utils.getJSON(getCustomerInfoUrl, function(data) {
			$('#easyui-showCustomerInfoContainer').show();
			$('#easyui-showCustomerInfo').dialog({
				closed: false,  
		        cache: false,  
		        modal: true,
		        onOpen: function(){
		        	$('#easyui-showCustomerInfo #info-customerCodeEasyUI').text(data.customerShortCode);
					$('#easyui-showCustomerInfo #info-customerNameEasyUI').text(data.customerName);
					$('#easyui-showCustomerInfo #info-addressEasyUI').text(data.address);
					$('#easyui-showCustomerInfo #info-phoneEasyUI').text(data.phone);
					$('#easyui-showCustomerInfo #info-mobiphoneEasyUI').text(data.mobiphone);
					$('#easyui-showCustomerInfo #info-shopTypeNameEasyUI').text(data.shopTypeName);
					$('#easyui-showCustomerInfo #info-loyaltyEasyUI').text(data.loyalty);
					$('#easyui-showCustomerInfo #info-contactNameEasyUI').text(data.contactName);
					$('#easyui-showCustomerInfo #info-totalInDateEasyUI').text(formatCurrency(data.totalInDate));
					$('#easyui-showCustomerInfo #info-numSkuInDateEasyUI').text(data.numSkuInDate);
					$('#easyui-showCustomerInfo #info-numOrderInMonthEasyUI').text(data.numOrderInMonth);
					$('#easyui-showCustomerInfo #info-avgTotalInLastTwoMonthEasyUI').text(formatCurrency(data.avgTotalInLastTwoMonth));
					$('#easyui-showCustomerInfo #info-totalInMonthEasyUI').text(formatCurrency(data.totalInMonth));
					
					var getListOrderUrl = '/commons/customer/get-sale-order?customerId='+ customerId;
					
					$('#easyui-showCustomerInfo #info-listCustomerOrderEasyUI').datagrid({
						url : '/commons/customer/get-sale-order',
						queryParams:{customerId : customerId},
						pagination:true,
						rownumbers:true,
						width:$('#easyui-showCustomerInfo').width() - 25,
						columns:[[  
						    {field:'orderDate',title:'Ngày',width:80, align:'center', sortable:false, resizable:false, formatter:function(value,row,index) {
						    	var date = new Date(row.orderDate);
								return $.datepicker.formatDate('dd/mm/yy',date);
						    }},  
						    {field:'orderNumber',title:'Số hóa đơn', align:'left',width:150, sortable:false,resizable:false, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},  
						    {field:'amount',title:'Thành tiền',width:100,align:'right', formatter:function(value,row,index) {
						    	return formatCurrency(row.amount);
						    }}  
						]]
					});
		        },
		        onClose:function() {
		        	$('#easyui-showCustomerInfoContainer').hide();
		        }
			});
		});
	},	
	searchPromotionProduct : function(arrParams) {
		var searchUrl = '/commons/promotion-product/get';
		if (arrParams != null && arrParams != undefined && arrParams.length > 0) {
			for ( var i = 0; i < arrParams.length; i++) {
				if (i == 0) {
					searchUrl = searchUrl + '?' + encodeChar(arrParams[i].name) + '='
							+ encodeChar(arrParams[i].value);
				} else {
					searchUrl = searchUrl + '&' + encodeChar(arrParams[i].name) + '='
							+ encodeChar(arrParams[i].value);
				}
			}
		}
		return searchUrl;
	},
	fillShopNameByShopCode : function(tfShopCode, tfShopName,callback) {
		$('#' + tfShopCode).bind('blur',function() {
			if ($('#' + tfShopCode).val().trim().length > 0) {
				Utils.getJSON('/rest/catalog/delivery-group/shop/'+ $('#' + tfShopCode).val().trim()+ '/name.json', function(data) {
					if (data != null && data.name != null && data.name != undefined) {
						$('#' + tfShopName).val(data.name);
					}
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
				});
			} else {
				$('#' + tfShopName).val('');
			}
		});
		return false;
	},
	fillObjectCodeByObjectId : function(tfObjectId, tfObjectCode, tfObjectType,callback) {
		if ($('#' + tfObjectId).val().trim().length > 0) {
			Utils.getJSON('/rest/catalog/object/'+ $('#' + tfObjectId).val()+ '/'+tfObjectType+'/code.json', function(data) {
				if (data != null && data.name != null && data.name != undefined) {
					$('#' + tfObjectCode).val(data.name);
					if (callback!= undefined && callback != null) {
						callback.call(this, true);
					}
				}
			});
		} else {
			$('#' + tfObjectCode).val('');
		}
		return false;
	},
	fillCustomerNameByShortCode : function(shopCode,shortCode, customerName) {
		$('#' + shortCode).bind('blur',function() {
			if ($('#' + shortCode).val().trim().length > 0) {
				Utils.getJSON('/rest/catalog/customer/' + $('#' + shopCode).val().trim()
						+ '/'+ $('#' + shortCode).val().trim()
						+ '/name.json', function(data) {
					if (data != null && data.name != null && data.name != undefined) {
						$('#' + customerName).val(data.name);
					}
				});
			} else {
				$('#' + customerName).val('');
			}
		});
		return false;
	},
	fillShopCodeAndNameByShopCode : function(shopCodeAndNameId, callback) {
		CommonSearch._currentSearchCallback = callback;
		$('#' + shopCodeAndNameId).bind(
				'blur',
				function() {
					if ($('#' + shopCodeAndNameId).val().trim().length > 0) {
						Utils.getJSON('/rest/catalog/delivery-group/shop/'
								+ $('#' + shopCodeAndNameId).val().trim()
								+ '/name.json', function(data) {
							if (data != null && data.name != null
									&& data.name != undefined) {
								$('#' + shopCodeAndNameId).val(
										data.code + ' - ' + data.name);
								if (callback != null && callback != undefined) {
									CommonSearch._currentSearchCallback.call(
											this, data);
								}
							}
						});
					}
				});
	},
	searchPO : function() {		
		var html = $('#searchPO').html();
		$.fancybox(html, {
			modal : true,
			autoResize: false,
			title : 'Tìm kiếm đơn hàng',
			afterShow : function() {
				//('.fancybox-inner #ordernumber').focus();
				$('.fancybox-inner #fDate').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('fancybox-inner #tDate').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #ordernumber').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #shortcode').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #customername').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #staffid').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #deliveryid').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #fDate').attr('id', 'fromDate');
				$('.fancybox-inner #tDate').attr('id', 'toDate');
				$('.fancybox-inner #ordernumber').attr('id', 'orderNumber');
				$('.fancybox-inner #shortcode').attr('id', 'shortCode');
				$('.fancybox-inner #customername').attr('id', 'customerName');
				$('.fancybox-inner #staffid').attr('id', 'staffCode');
				$('.fancybox-inner #deliveryid').attr('id', 'deliveryCode');
				setDateTimePicker('fromDate');
				setDateTimePicker('toDate');
				SPReturnOrder.searchSaleOrder();
				
			},
			afterClose : function() {

			}
		});
	},
	showPromotionProgramInfo : function(ppCode, ppName, ppType, ppFormat,
			fromDate, toDate, ppDescription) {
		var html = $('#showPromotionProgramInfo').html();
		$.fancybox(html, {
			modal : true,
			autoResize: false,
			title : 'Thông tin CT HTTM',
			afterShow : function() {
				$('#showPromotionProgramInfo').html('');
				$('#programCode').text(ppCode);
				$('#programName').text(ppName);
				$('#programType').text(ppType);
				$('#programFormat').text(ppFormat);
				$('#fromDate1').text(fromDate);
				$('#toDate1').text(toDate);
				$('#programDescription').text(ppDescription);
				var tm = setTimeout(function(){
					$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop + 210);
					clearTimeout(tm);
				}, 500);
			},
			afterClose : function() {
				$('#showPromotionProgramInfo').html(html);
			}
		});
	},
	/** Tao don hang : Lo san pham huy */
	viewDetailLot : function(callback, arrParam,title) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#adjustOrderLotDialog').html();
		$('#adjustOrderLotDialogContainer').show();
		var url = '/sale-product/create-order/list-product-lot';
		url = CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam);		
		$('#adjustOrderLotDialog').dialog({
			title:title,
			closed: false, 
			cache: false,
			modal: true,
			onOpen: function() {
				Utils.getJSON(url, function(data) {					
					if(SPCreateOrder._isSave) {
						$('.fancybox-inner #saleProductLotLot').attr('disabled', 'disabled');
						$('.fancybox-inner #saleProductLotQuantity').attr('disabled', 'disabled');
						$('.fancybox-inner #btnCloseProductLot').removeAttr('onclick');
					}
					if (callback != null && callback != undefined) {
						CommonSearch._currentSearchCallback.call(this, data);
					}
				});
			},
			onClose : function(){
				$('#adjustOrderLotDialog').html(html);
				$('#adjustOrderLotDialogContainer').hide();
			}
		});
	},
	/** Tao don hang : Lo san pham ban,doi,tra, km tay */
	viewDetailSaleLot : function(callback, arrParam) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#adjustSaleOrderLotDialog').html();
		$('#adjustSaleOrderLotDialogContainer').show();
		var url = '/sale-product/create-order/list-product-lot?productCode=' + arrParam[0].value;
		if(arrParam.length>1){
			url+='&orderId='+arrParam[1].value;
		}
		$('#adjustSaleOrderLotDialog').dialog({
			closed: false, 
			cache: false,
			modal: true,
			onOpen: function() {
				Utils.getJSON(url, function(data) {
					$('#adjustSaleOrderLotDialog.easyui-dialog #saleProductLotCode').html(Utils.XSSEncode(data.productCode));
					$('#adjustSaleOrderLotDialog.easyui-dialog #saleProductLotName').html(Utils.XSSEncode(data.productName));
					if (callback != null && callback != undefined) {
						CommonSearch._currentSearchCallback.call(this, data);
					}
				});
			},
			onClose : function(){
				$('#adjustSaleOrderLotDialog').html(html);
				$('#adjustSaleOrderLotDialogContainer').hide();
			}
		});
	},
	viewDetailPromotionSaleLot : function(callback, arrParam) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#adjustPromotionSaleOrderLotDialog').html();
		$('#adjustPromotionSaleOrderLotDialogContainer').show();
		
		var url = CommonSearch.getSearchStyle1GridUrl('/sale-product/create-order/list-product-lot', '', '', arrParam, '');
		$('#adjustPromotionSaleOrderLotDialog').dialog({
			closed: false, 
			cache: false,
			modal: true,
			onOpen: function() {
				Utils.getJSON(url, function(data) {
					$('.easyui-dialog #saleProductLotCode').html(Utils.XSSEncode(data.productCode));
					$('.easyui-dialog #saleProductLotName').html(Utils.XSSEncode(data.productName));
					if (callback != null && callback != undefined) {
						CommonSearch._currentSearchCallback.call(this, data);
					}
				});
			},			
			onClose : function(){			
				$('#adjustPromotionSaleOrderLotDialog').html(html);
				$('.easyui-dialog tbody').html("");
				$('#adjustPromotionSaleOrderLotDialogContainer').hide();
			}
		});
	},
	viewCustomerImageInfo : function(arrParam,callback) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#customerImageDetail').html();
		var title='Hình ảnh khách hàng';
		if(arrParam.objectType==0){
			title='Hình ảnh đóng cửa';
		}else if(arrParam.objectType==1){
			title='Hình ảnh trưng bày';
		}else{
			title='Hình ảnh điểm bán';
		}
		$.fancybox(html, {
			modal : true,
			autoResize: false,
			'title' : title,
			'afterShow' : function() {	
				$('#customerImageDetail').html('');
				Utils.getHtmlDataByAjax(arrParam, '/catalog/customer/view-image-detail',
					function(data) {
						try {
							var myData = JSON.parse(data);
							if (callback != null && callback != undefined) {
								CommonSearch._currentSearchCallback.call(this, myData);
							}
						} catch (err) {
							var myData=new Object();
							myData.error=true;
							myData.errMsg='Lỗi. Xin liên hệ quản trị hệ thống để biết thêm chi tiết.';
							return;
						}
				}, 'customerImageLoading', 'POST');
			},
			'afterClose' : function() {
				CommonSearch._currentSearchCallback = null;
				$('#customerImageDetail').html(html);
			}
		});
	},
	viewBigMap : function(arrParam) {
		var html = $('#viewBigMap').html();
		
		$('#viewBigMap').dialog({
			closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){
	        	var tm = setTimeout(function(){//chuyen ban do toi vi tri man hinh
					//load map
					var lat = arrParam.lat;
					var lng = arrParam.lng;
					var zoom=null;
					if(lat!='' && lng!=''){ 
						zoom=16;
					}
					MapUtil.loadMapResource(function(){
//						Vietbando.loadBigMap('bigMapContainer',lat,lng,zoom, function(point){
//							$('#lat').val(point.latitude);
//							$('#lng').val(point.longitude);
//						});	
						ViettelMap.loadBigMap('bigMapChange',lat, lng, zoom, function(lat, lng){
								$('#lat').val(lat);
								$('#lng').val(lng);
						});
					});
					clearTimeout(tm);
				}, 500);
	        },
	        onClose:function() {
	        	var lat = $('#lat').val();
				var lng = $('#lng').val();
				var zoom=15;
				var showmarker=false;
				if(lat!='' && lng!=''){
					zoom=18;
					showmarker=true;
				}
				Vietbando._map=null;
				Vietbando._marker=null;
				MapUtil.loadMapResource(function(){
					Vietbando.loadMap('mapContainer',lat,lng,zoom, function(point){
						$('#lat').val(point.latitude);
						$('#lng').val(point.longitude);
					},showmarker);	
				});
	        	$('#viewBigMap').html(html);
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
	},
	exportExcelData:function(dataModel,url,errMsg){
		if(errMsg == null || errMsg == undefined){
			errMsg = 'errExcelMsg';
		}
		var kData = $.param(dataModel,true);
		if(CommonSearch._xhrReport != null){
			CommonSearch._xhrReport.abort();
			CommonSearch._xhrReport = null;
		}
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
			success : function(data) {
				hideLoadingIcon();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msgCommon6 + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msgCommon7).show();
					} else{
//						window.location.href = data.view;			
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
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						CommonSearch._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href =WEB_CONTEXT_PATH +'/home';
					}
				});
			}
		});
		return false;
	},
	openPayrollTableEasyUI : function(arrParam) {
		$(".easyui-window #easyTGrid").jqGrid('GridUnload');
		$('#payrollTableEasyUIDiv').show();
		$('#payrollTableEasyUIDiv').window({title : 'Tìm kiếm bảng lương'});
		$('#payrollTableEasyUIDiv').window('open');
		CommonSearch._arrParams = arrParam;
		applyDateTimePicker("#dateSearchEasy", "mm/yy",null,null,null,null,null,null,null,true);
		var url = '/commons/payroll/search';
		Utils.bindAutoSearchForEasyUI();
		$(".easyui-window #easyTGrid").jqGrid(
						{
							url : CommonSearch.getSearchStyle1GridUrl(url, '','', CommonSearch._arrParams),
							colModel : [
									{name :'payrollCode',index : 'payrollCode',align : 'left',label :'Mã bảng lương',width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name :'payrollName',index : 'payrollName',label : 'Tên bảng lương',sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name :'periodPrCode',index : 'periodPrCode',label : 'Kỳ lương',sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : function(cellvalue, options, rowObject) {
											return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultPayrollSeachEasyUI(" + options.rowId + ", 'payrollTableEasyUIDiv');\">Chọn</a>";
										}
									}, 
									{name : 'payrollId',index : 'payrollId',hidden : true}, ],
							pager : $('.easyui-window #easyTPager'),
							rowNum : 10,
							width : ($('.easyui-window #payrollTableEasyGrid').width()),
							gridComplete : function() {
								$('#jqgh_easyTGrid_rn').html(jspCustomerAttributeSTT);
								$('.easyui-window #payrollTableCodeEasy').bind('keypress',Utils.unitCharactersAz094Code);
								$('.easyui-window #payrollTableNameEasy').bind('keypress',Utils.unitCharactersAz094Name);
								$('.easyui-window #payrollTableCodeEasy').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('payrollTableCodeEasy','',Utils._CODE);
										if (msg.length > 0) {$('#payrollTableCodeEasy').val('');}
										clearTimeout(tm);
									}, 50);});
								$('.easyui-window #payrollTableNameEasy').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('payrollTableNameEasy','',Utils._NAME);
										if (msg.length > 0) {$('#payrollTableNameEasy').val('');}
										clearTimeout(tm);
									}, 50);});
								updateRownumWidthForJqGrid();
								var tm = setTimeout(function(){
									$('.panel').css('top', document.documentElement.scrollTop + 100);
									$('.window-shadow').css('top', document.documentElement.scrollTop + 100);
									clearTimeout(tm);
								}, 500);
							}
						}).navGrid($('.easyui-window #easyTPager'), {
					edit : false,
					add : false,
					del : false,
					search : false
				});
		$('.easyui-window #btnPayrollSearch').bind('click',function(event) {
			var code = $('.easyui-window #payrollTableCodeEasy').val().trim();
			var name = $('.easyui-window #payrollTableNameEasy').val().trim();
			var url = '/commons/payroll/search';
			var url = CommonSearch.getSearchStyle1GridUrl(url,code, name, CommonSearch._arrParams);
			$(".easyui-window #easyTGrid").setGridParam({
				url : url,
				page : 1
			}).trigger("reloadGrid");});
		var needReloadGrid = $('.easyui-window #tReloadGrid').val();
		if(needReloadGrid == true || needReloadGrid == 'true') {
			$(".easyui-window #easyTGrid").trigger("reloadGrid");
		} else {
			$('.easyui-window #tReloadGrid').val(true);
		}
	},
	openSearchStyle4Dialog : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, shopCode,shopName) {
		var html = $('#searchStyle4').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				//end <reset tabindex>
				$('#searchStyle4').html('');
				$('.fancybox-inner #seachStyle4Code').focus();
				$('.fancybox-inner #searchStyle4Url').val(url);
				$('.fancybox-inner #searchStyle4CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle4NameText').val(nameFieldText);
				$('.fancybox-inner #seachStyle4ShopCode').val(shopCode);
				$('.fancybox-inner #seachStyle4ShopName').val(shopName);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				$('.fancybox-inner #seachStyle4CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle4NameLabel').html(nameText);
				Utils.bindAutoSearch();
				$(".fancybox-inner #searchStyle4Grid").jqGrid({
					url : CommonSearch.getSearchStyle4GridUrl(url, '', '', arrParam),
					colModel : [
			            {name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  return Utils.XSSEncode(cellvalue);
				          }},
			            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
				        	  return Utils.XSSEncode(cellvalue);
				          }},
			            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatter4},
			            {name : 'id',index : 'id',hidden : true}
		            ],
		            pager : $('.fancybox-inner #searchStyle4Pager'),
					height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle4ContainerGrid').width()),
					gridComplete : function() {
						$('#jqgh_searchStyle4Grid_rn').html(jspCustomerAttributeSTT);
						$('#pg_searchStyle4Pager').css('padding-right','20px');																	
						tabindex = 1;
						$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
							if (this.type != 'hidden') {
							$(this).attr("tabindex", '');
							tabindex++;
							}
						});
						updateRownumWidthForJqGrid('.fancybox-inner');
						$('#searchStyle4Pager_right').css('width','180px');//@LamNH:fix bug 0003172
						
						//$.fancybox.update();
						$(window).resize();
						var fancyHeight = $('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('height');
						fancyHeight = parseInt(fancyHeight);
						var wWidth = window.innerWidth;
						wWidth = parseInt(wWidth);
						var wHeight = window.innerHeight;
						wHeight = parseInt(wHeight);
						var distant = wHeight - fancyHeight;
						distant = distant / 2;
						if(wHeight > fancyHeight) {
							var tm = setTimeout(function() {
								//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
								$(window).resize();
								$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop +  distant}, 50);
							}, 10);				
						} else {
							var tm = setTimeout(function() {
								//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
								$(window).resize();
								$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop}, 50);
							}, 10);	
						}
					}
				}).navGrid($('.fancybox-inner #searchStyle4Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle4').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle4Code').val().trim();
					var name = $('.fancybox-inner #seachStyle4Name').val().trim();
					var url = CommonSearch.getSearchStyle4GridUrl($('.fancybox-inner #searchStyle4Url').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchStyle4Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle4Code').focus();
				});
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle4').html(html);
			}
		});
		return false;
	},
	getResultSeachStyle4 : function(rowId) {
		var code = $(".fancybox-inner #searchStyle4Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle4CodeText').val());
		var name = $(".fancybox-inner #searchStyle4Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle4NameText').val());
		var id = $(".fancybox-inner #searchStyle4Grid").jqGrid('getCell',rowId, 'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	getSearchStyle4GridUrl : function(url, code, name, arrParam) {
		var searchUrl = '';
		searchUrl = url + '?code=' + encodeChar(code) + "&name=" + encodeChar(name);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '&curTime=' + encodeChar(curTime);
		return searchUrl;
	},
	searchCustomerEquipmentOnDialog : function(callback, arrParam,shopCode,shopName) {
		CommonSearch.openSearchStyle4Dialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam,shopCode,shopName);
		return false;
	},
	searchStaffEquipmentOnDialog : function(callback, arrParam,shopCode,shopName) {
		CommonSearch.openSearchStyle4Dialog(msgFormatter9, msgFormatter10,
				"Tìm kiếm nhân viên", "/commons/staff/search-vansale", callback,
				"staffCode", "staffName", arrParam, shopCode, shopName);
		return false;
	},
	searchPayrollOnDialog: function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã bảng lương", "Tên bảng lương",
				"Tìm kiếm bảng lương", "/commons/payroll/search", callback,
				"payrollCode", "payrollName", arrParam);
		return false;
	},
	searchSuperviseStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã NVGS", "Tên NVGS",
				"Tìm kiếm NVGS", "/commons/report/searchSuperviseStaff", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSuperviseSaleStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã NVBH", "Tên NVBH",
				"Tìm kiếm NVBH", "/commons/report/searchSuperviseSaleStaff", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchDisplayProgramRunningOnDialog:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTTB",
				"Tên CTTB", "Tìm kiếm CTTB",
				"/commons/report/searchDisplayProgramRunning", callback, "displayProgramCode",
				"displayProgramName",arrParam);
		return false;
	},
	searchShopPromotionProgram:function(callback,arrParam, successCallback) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop(msgMaDoiTuong,
				msgTenDoiTuong, jspKhuyenMai1,
				 WEB_CONTEXT_PATH+ "/commons/promotion/searchShopAndQuantity", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShop','searchStyleShop1','promotion',successCallback);
		return false;
	},
	searchShopFocusProgram:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop("Mã đơn vị",
				"Tên đơn vị", "Chọn đơn vị",
				"/commons/bary-centric-programme/searchShopDialog", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShopFocus','searchStyleShopFocus1','focus');
		return false;
	},
	searchShopIncentiveProgram:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop("Mã đơn vị",
				"Tên đơn vị", "Chọn đơn vị",
				"/commons/bary-centric-programme/searchShopDialog", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShopIncentive','searchStyleShopIncentive1','incentive');
		return false;
	},
	searchShopDisplayProgram:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop("Mã đơn vị",
				"Tên đơn vị", "Chọn đơn vị",
				"/commons/display-programme/searchShopDialog", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShopDisplay','searchStyleShopDisplay1','display');
		return false;
	},
	openSearchStyle1EasyUICopyPromotionShop : function(codeText, nameText, title, codeFieldText, nameFieldText, searchDiv,arrParam) {
		CommonSearchEasyUI._arrParams = null;
		CommonSearchEasyUI._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDivEx').css("visibility", "visible");
		var html = $('#searchStyle1EasyUIDialogDivEx').html();
		$('#searchStyle1EasyUIDialogEx').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
	        	//@CuongND : my try Code <reset tabindex>
	        	$('.easyui-dialog #__btnSaveIncentiveProgram').unbind('click');
	        	var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				tabindex = 1;
	    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
		    		 if (this.type != 'hidden') {
			    	     $(this).attr("tabindex", '');
						 tabindex++;
		    		 }
				 });
				//end <reset tabindex>
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #errMsgSearch').html("").hide();
				$('.easyui-dialog #successMsgInfo').html("").hide();
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				
				$('.easyui-dialog #__btnSave').bind('click',function(event) {
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						if(arrParam != null && arrParam != undefined){
							if(arrParam[0] == "promotion"){
								$('.easyui-dialog #errMsgSearch').html(msgBanChuaNhapMaCTKM).show();
							}
							if(arrParam[0] == "promotionManual"){
								$('.easyui-dialog #errMsgSearch').html(msgBanChuaNhapMaCTHTTM).show();
							}
						}
						
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', msgMaCTKMCopy,Utils._CODE);
					if(arrParam[0] == "promotionManual"){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', msgMaCTHTTMCopy,Utils._CODE);
					}
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						if(arrParam[0] == "promotion"){
							$('.easyui-dialog #errMsgSearch').html(msgErrBanChuaNhapGiaTriTenCTKM).show();
						}
						if(arrParam[0] == "promotionManual"){
							$('.easyui-dialog #errMsgSearch').html(msgErrBanChuaNhapGiaTriTenCTHTTM).show();
						}
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', msgTenCTKMCopy);
					if(arrParam[0] == "promotionManual"){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', msgTenCTHTTMCopy);
					}
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var promotionId = $('#promotionId').val();
					var params = new Object();
					params.promotionId = promotionId;
					params.promotionProgramCode = code;
					params.promotionProgramName = name;
					var title = msgBanCoMuonSaoChepCTKM;
					var promotionType = $('#promotionType').val();
					if(promotionType == "CTKM"){
						params.proType = 1;
						title = msgBanCoMuonSaoChepCTKM;
					}
					if(promotionType == "CTHTTM"){
						params.proType = 2;
						title = msgBanCoMuonSaoChepCTHTTM;
					}
					params.promotionType = promotionType;
					Utils.addOrSaveData(params, '/catalog/promotion/copypromotionprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html(msgSaoChepThanhCong).show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						//$('#promotionId').val(data.promotionId);
						var proType = $('#proType').val();
						window.location.href = WEB_CONTEXT_PATH +'/catalog/promotion/viewdetail?promotionId='+encodeChar(data.promotionId)+'&proType='+encodeChar(proType);
					}, null, null, null, title, null);
				});
				$('.easyui-dialog #__btnSaveFocusProgram').bind('click',function(event){
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Mã CTTT.").show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã CTTT',Utils._CODE);
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Tên CTTT.").show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', 'Tên CTTT');
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var focusId = $('#progId').val();
					var params = new Object();
					params.id = focusId;
					params.code = code;
					params.name = name;
					Utils.addOrSaveData(params, '/catalog/bary-centric-programme/copyfocusprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html("Sao chép dữ liệu thành công.").show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						//$('#promotionId').val(data.promotionId);
						window.location.href =WEB_CONTEXT_PATH + '/catalog/bary-centric-programme/change?id='+encodeChar(data.focusId);
					}, null, null, null, "Bạn có muốn sao chép CTTT này ?", null);
				});
				$('.easyui-dialog #__btnSaveIncentiveProgram').bind('click',function(event){
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						msg = "Bạn chưa nhập giá trị trường Mã CTKT.";
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã CTKT',Utils._CODE);
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Tên CTKT.").show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', 'Tên CTKT');
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var id = $('#id').val();
					var params = new Object();
					params.id = id;
					params.code = code;
					params.name = name;
					Utils.addOrSaveData(params, '/catalog/intensive-program/copyincentiveprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html("Sao chép dữ liệu thành công.").show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						window.location.href =WEB_CONTEXT_PATH + '/catalog/intensive-program/view?id='+encodeChar(data.incentiveId);
					}, null, null, null, "Bạn có muốn sao chép CTKT này ?", null);
				});
				$('.easyui-dialog #__btnSaveDisplayProgram').bind('click',function(event){
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						msg = "Bạn chưa nhập giá trị trường Mã CTTB.";
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã CTTB',Utils._CODE);
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Tên CTTB.").show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', 'Tên CTTB');
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var id = $('#selId').val();
					var params = new Object();
					params.id = id;
					params.code = code;
					params.name = name;
					Utils.addOrSaveData(params, '/catalog/programme-display/copydisplayprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html("Sao chép dữ liệu thành công.").show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						window.location.href =WEB_CONTEXT_PATH + '/catalog/programme-display/change?id='+encodeChar(data.displayProgramId);
					}, null, null, null, "Bạn có muốn sao chép CTTB này ?", null);
				});
	        },	       
	        onClose : function(){
	        	var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
	        	$('#searchStyle1EasyUIDialogDivEx').html(html);
	        	$('#searchStyle1EasyUIDialogDivEx').css("visibility", "hidden");
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #__btnSaveFocusProgram').unbind('click');
	        	$('.easyui-dialog #__btnSave').unbind('click');
	        }
	    });
		return false;
	},
	openSearchStyle1EasyUIPromotionShop : function(codeText, nameText, title, url, 
			callback, codeFieldText, nameFieldText, arrParam,searchDiv,searchDialog,program, successCallback) {
		CommonSearchEasyUI._arrParams = null;
		CommonSearchEasyUI._currentSearchCallback = null;
		var html = $('#'+searchDiv).html();
		$('#'+searchDialog).dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
				$('.easyui-dialog #seachStyleShopCode').focus();
				$('.easyui-dialog #searchStyleShopUrl').val(url);
				$('.easyui-dialog #searchStyleShopCodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyleShopNameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
				$('.easyui-dialog #seachStyleShopCodeLabel').html(codeText);
				$('.easyui-dialog #seachStyleShopNameLabel').html(nameText);
				if(program != null && program != undefined && program == "promotion"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:jsSaleSuperviseTreeGridColumnHeader2nd,resizable:false,width:535, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
//					        {field:'editSoSuat',title:'Số suất',width:140,align:'center',resizable:false,formatter:function(value,row,index){
//					        	if(row.isJoin == 1){
//					        		return '<input type ="text"  disabled="disabled" maxlength="9" size="13" style="text-align:right;" class="soSuatKMDialogShop" onkeypress="return numbersonly(event, this);" onfocus="PromotionCatalog.bindFormat();">';
//					        	}
//					        	if(row.isShop == 1){
//					        		return '<input type ="text" id="txtQuantity_'+row.id+'" maxlength="9" size="13" style="text-align:right;" class="soSuatKMDialogShop" onkeypress="return numbersonly(event, this);" onfocus="PromotionCatalog.bindFormat();">';
//					        	}
//					        }},
					        {field:'edit',title:'',width:30,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	var type = 1;
					        	if(row.type != undefined && row.type != null){
					        		type = row.type;
					        	}
					        	if (PromotionCatalog._isPromotionPage != null && PromotionCatalog._isPromotionPage == true){
					        		if (row != null && (row.type == 1 || row.type == 2)){
						        		if ($('#adminUser').val() == 'true'){
						        			return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return PromotionCatalog.onCheckShop('+row.id+','+type+');">';
							        	}
						        		return '';
						        	}
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return PromotionCatalog.onCheckShop('+row.id+','+type+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	//var row = $('.easyui-dialog .treegrid-tr-tree .datagrid-row');
					    	var length = parseInt(data.solg);
					    	$('#solg').val(length);
					    	var s = $('#width').val();
					    	if(s == null || s == "" || s == undefined){
					    		s = $('.datagrid-header-row td[field=editSoSuat] div').width();
					    		$('#width').val(s);
					    	}
					    	$('.soSuatKMDialogShop').each(function(){
					    		Utils.formatCurrencyFor($(this).attr('id'));
					    	});
					    	if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId.length > 0){
					    		var listSize = PromotionCatalog._listShopId.length;
					    		for(var i=0;i<listSize;i++){
					    			var value = PromotionCatalog._listQuantity[i];
					    			$('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val(value);
					    			$('.easyui-dialog #check_'+PromotionCatalog._listShopId[i]).attr('checked','checked');
								} 
					    	}
					    	$('input[type=checkbox]').each(function(){
				 	    		if($(this).is(':checked')){
				 	    			++length;
				 	    		}	    		
				 	    	});	 
				 	    	if(data.rows.length==length){
				 	    		$('.datagrid-header-check input').attr('checked','checked');
				 	    	}else{
								$('.datagrid-header-check input').removeAttr('checked');
				 	    	}
				 	    	if(data.rows == null || data.rows == undefined || data.rows.length == 0){
				 	    		$('.datagrid-header-check input').removeAttr('checked');
				 	    	}
					    	if(length > 15){
//					    		var s = $('.datagrid-header-row td[field=editSoSuat] div').width();
//					    		$('#width').val(s);
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=editSoSuat] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=editSoSuat] div').width(s-17);
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    	if (successCallback != null){
					    		successCallback.call(this, data);
					    	}
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=editSoSuat] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=editSoSuat] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=editSoSuat] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=editSoSuat] div').width(s);
					    	}
					    }
					});
				}
				if(program != null && program != undefined && program == "focus"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:'Đơn vị',resizable:false,width:516, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
					        {field:'edit',title:'',width:50,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return BaryCentricProgrammeCatalog.onCheckShop('+row.id+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	if(data.rows != null && data.rows != undefined){
						    	var length = parseInt(data.solg);
						    	$('#solg').val(length);
						    	var s = $('#width').val();
						    	if(s == null || s == "" || s == undefined){
						    		s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
						    		$('#width').val(s);
						    	}
						    	if(length > 15){
//						    		var s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
//						    		$('#width').val(s);
						    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
					    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
						    	}
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s);
					    	}
					    }
					});
				}
				if(program != null && program != undefined && program == "incentive"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:'Đơn vị',resizable:false,width:516, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
					        {field:'edit',title:'',width:50,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return IncentiveProgramCatalog.onCheckShop('+row.id+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	var length = parseInt(data.solg);
					    	$('#solg').val(length);
					    	var s = $('#width').val();
					    	if(s == null || s == "" || s == undefined){
					    		s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
					    		$('#width').val(s);
					    	}
					    	if(length > 15){
//					    		var s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
//					    		$('#width').val(s);
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s);
					    	}
					    }
					});
				}
				if(program != null && program != undefined && program == "display"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:'Đơn vị',resizable:false,width:516, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
					        {field:'edit',title:'',width:50,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return ProgrammeDisplayCatalog.onCheckShop('+row.id+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	var length = parseInt(data.solg);
					    	$('#solg').val(length);
					    	var s = $('#width').val();
					    	if(s == null || s == "" || s == undefined){
					    		s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
					    		$('#width').val(s);
					    	}
					    	if(length > 15){
//					    		var s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
//					    		$('#width').val(s);
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s);
					    	}
					    }
					});
				}
				$('.easyui-dialog #btnSearchStyleShop').bind('click',function(event) {
					$('.easyui-dialog #errMsgDialog').html('').hide();
					var code = $('.easyui-dialog #seachStyleShopCode').val().trim();
					var name = $('.easyui-dialog #seachStyleShopName').val().trim();
					var url = CommonSearch.getSearchStyleShopGridUrl($('.easyui-dialog #searchStyleShopUrl').val().trim(),code, name, CommonSearch._arrParams);
					if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId != undefined && PromotionCatalog._listShopId.length > 0){
						var listSize = PromotionCatalog._listShopId.length;
						for(var i=0;i<listSize;i++){
							var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
							if(value != null && value != undefined){
								PromotionCatalog._listQuantity[i] = value;	
							}
						}
					}
					$('.easyui-dialog #searchStyleShopGrid').treegrid({url:url});
				});
				$('.easyui-dialog #seachStyleShopCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgDialog').html('').hide();
						var code = $('.easyui-dialog #seachStyleShopCode').val().trim();
						var name = $('.easyui-dialog #seachStyleShopName').val().trim();
						var url = CommonSearch.getSearchStyleShopGridUrl($('.easyui-dialog #searchStyleShopUrl').val().trim(),code, name, CommonSearch._arrParams);
						if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId != undefined && PromotionCatalog._listShopId.length > 0){
							var listSize = PromotionCatalog._listShopId.length;
							for(var i=0;i<listSize;i++){
								var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
								if(value != null && value != undefined){
									PromotionCatalog._listQuantity[i] = value;	
								}
							}
						}
						$('.easyui-dialog #searchStyleShopGrid').treegrid({url:url});
					}
				});
				$('.easyui-dialog #seachStyleShopName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgDialog').html('').hide();
						var code = $('.easyui-dialog #seachStyleShopCode').val().trim();
						var name = $('.easyui-dialog #seachStyleShopName').val().trim();
						var url = CommonSearch.getSearchStyleShopGridUrl($('.easyui-dialog #searchStyleShopUrl').val().trim(),code, name, CommonSearch._arrParams);
						if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId != undefined && PromotionCatalog._listShopId.length > 0){
							var listSize = PromotionCatalog._listShopId.length;
							for(var i=0;i<listSize;i++){
								var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
								if(value != null && value != undefined){
									PromotionCatalog._listQuantity[i] = value;	
								}
							}
						}
						$('.easyui-dialog #searchStyleShopGrid').treegrid({url:url});
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#'+searchDiv).html(html);
	        	//$('#searchStyleShopContainerGrid').html('<table id="searchStyleShopGrid" class="easyui-treegrid"></table>');
	        	$('.easyui-dialog #seachStyleShopCode').val('');
	        	$('.easyui-dialog #seachStyleShopName').val('');
	        	$('.easyui-dialog #errMsgDialog').html('').hide();
	        	PromotionCatalog._listShopId = new Array();
	        	PromotionCatalog._listQuantity = new Array();
	        	PromotionCatalog.lstType = new Array();
//	        	IncentiveProgramCatalog._listShopId = new Array();
//	        	BaryCentricProgrammeCatalog._listShopId = new Array();
	        }
	    });
		return false;
	},
	getSearchStyleShopGridUrl : function(url, code, name, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + arrParam[i].name + "=";
				if(arrParam[i].value != null && arrParam[i].value != undefined){
					searchUrl = searchUrl + arrParam[i].value;
				}
			}
		}
		searchUrl+= "&promotionProgramCode=" + encodeChar(code) + "&promotionProgramName=" + encodeChar(name);
		return searchUrl;
	},
	openSearchStyleCustomerShopEasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		//$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyleCustomerDialogDiv').css("visibility", "visible");
		var html = $('#searchStyleCustomerDialog').html();
		$('#searchStyleCustomerDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 600,
	        height : 'auto',
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyleCustomerCode').focus();
				$('.easyui-dialog #searchStyleCustomerUrl').val(url);
				$('.easyui-dialog #errMsgSearchCustomer').html("").hide();
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				Utils.bindFormatOnTextfield('searchStyleQuantity',Utils._TF_NUMBER,null);
		    	Utils.formatCurrencyFor('searchStyleQuantity');
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyleCustomerAddress').show();					
				}
//				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
//				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				$('#searchStyleCustomerGrid').show();
				$('#searchStyleCustomerGrid').datagrid({
					url : CommonSearch.getSearchStyleCustomerMapGridUrl(url, '', '','', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					rowNum : 10,
					pageNumber: 1,
					scrollbarSize : 0,
					fitColumns:true,
					pageList  : [10,20,30],
					width : ($('#searchStyleCustomerContainerGrid').width()),
				    columns:[[  
				        {field:'shortCode',title:codeText,align:'left', width:120, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.shortCode);
				        }},  
				        {field:'customerName',title:nameText,align:'left', width:170, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.customerName);
				        }},  
				        {field:'address', title:addressText,width:250, align:'left',sortable : false,resizable : false,formatter : function(value,row,index){
				        	return Utils.XSSEncode(row.address);
				        }},
				        {field: 'id', checkbox:true, align:'center', width:80,sortable : false,resizable : false}
				    ]],
				    onLoadSuccess :function(data){
				    	
				    	 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 if(data.rows.length == 0){
			    			 $('.datagrid-header-check input').removeAttr('checked');
			    		 }
//							setTimeout(function(){
//								$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
//								$('.datagrid-header-check input').removeAttr('checked');
//				    		},500);
					    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=shortCode] div').width();
					    	if(originalSize != null && originalSize != undefined){
					    		PromotionCatalog._listCustomerDialogSize.push(originalSize);
					    	}
					    	Utils.updateRownumWidthForJqGridEX1('.easyui-dialog ','shortCode',PromotionCatalog._listCustomerDialogSize,true);
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
			    		 $('input[name="id"]').each(function(){
			 				var temp = PromotionCatalog._listCustomer.get($(this).val());
			 				if(temp!=null) $(this).attr('checked','checked');
			 			});
			 	    	var length = 0;
			 	    	$('input[name="id"]').each(function(){
			 	    		if($(this).is(':checked')){
			 	    			++length;
			 	    		}	    		
			 	    	});	    	
			 	    	if(data.rows.length==length){
			 	    		$('.datagrid-header-check input').attr('checked','checked');
			 	    	}else{
							$('.datagrid-header-check input').removeAttr('checked');
			 	    	}
			 	    	if(data.rows == null || data.rows == undefined || data.rows.length == 0){
			 	    		$('.datagrid-header-check input').removeAttr('checked');
			 	    	}
				    },
				    onCheck:function(i,r){
				    	PromotionCatalog._listCustomer.put(r.id,r);
				    },
				    onUncheck:function(i,r){
				    	PromotionCatalog._listCustomer.remove(r.id);
				    },
				    onCheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		PromotionCatalog._listCustomer.put(r[i].id,r[i]);
				    	}
				    },
				    onUncheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		PromotionCatalog._listCustomer.remove(r[i].id);
				    	}
				    }
				}); 
				$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				$('.easyui-dialog #btnSearchStyleCustomer').bind('click',function(event) {
					
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});						
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
				});
				
				$('.easyui-dialog #btnSaveCustomer').bind('click',function(event) {
					//hoatv13 update 26/03/2014
					var allRowsRouting=$('#promotionRoutingExGrid').datagrid('getRows');
					var quantityMaxRouting=0;
					for(var i=0;i<allRowsRouting.length;i++){//Danh sách số suất KM cho tuyến đã có.
						if(arrParam[1].value==allRowsRouting[i].routingId){
							if(allRowsRouting[i].quantityMax!=null){
								quantityMaxRouting =quantityMaxRouting+parseInt(allRowsRouting[i].quantityMax);
							}else{
								quantityMaxRouting=null;
							}
						}
						
					}
					var allRowsCustomer=$('#promotionCustomerExGrid').datagrid('getRows');
					var flag=0;
					var quantityMaxCustomer=0;
					for(var i=0;i<allRowsCustomer.length;i++){//Danh sách số suất KM cho khách hàng đã có.
						if(allRowsCustomer[i].quantityMax !=null){
							quantityMaxCustomer =quantityMaxCustomer+parseInt(allRowsCustomer[i].quantityMax);
						}else{
							flag=1;
						}
						
					}
					var quantityMax = $('.easyui-dialog #seachStyleQuantity').val();
					if(quantityMax.length > 0 && (quantityMax * 1) <= 0){
						$('#errMsgSearchCustomer').html('Số suất phải là số nguyên dương.').show();
						return false;
					}
					var lstIdCustomer = new Array();
					for(i=0;i<PromotionCatalog._listCustomer.keyArray.length;i++){
						var temp = PromotionCatalog._listCustomer.get(PromotionCatalog._listCustomer.keyArray[i]);
						if(temp!=null){
							lstIdCustomer.push(temp.id);
							if(quantityMax !='' && quantityMax!=undefined){
								quantityMaxCustomer=quantityMaxCustomer+parseInt(quantityMax);
							}else{
								flag=1;
							}
						}
					}
					if( quantityMaxRouting!=null && quantityMaxRouting!=undefined && flag!=0){
						$('#errMsgSearchCustomer').html('Tuyến đã phân bổ số suất, không thêm khách hàng về dạng không quan tâm số suất được.').show();
						return false;
					}
					if( quantityMaxRouting!=null && quantityMaxRouting!=undefined && quantityMaxRouting<quantityMaxCustomer){
						$('#errMsgSearchCustomer').html('Số suất khuyến mãi của Khách hàng không được lớn hơn suất khuyến mãi của Tuyến.').show();
						return false;
					}
					//end
					var s = $('#errMsgSearchCustomer').html();
					var flag = true;
					if(s.length > 0){
						var value = quantityMax;
						if(value != null && value != undefined){
							value = value * 1;
							if(isNaN(value)){
								$('#errMsgSearchCustomer').show();
								return false;
							}
						}
					}else{
						var value = quantityMax;
						if(value != null && value != undefined){
							value = value * 1;
							if(isNaN(value)){
								$('#errMsgSearchCustomer').show();
								return false;
							}
						}
					}
					var params = new Object();
					params.quantityMax = quantityMax;
					params.listCustomerId =lstIdCustomer;
					params.shopId = $('#shopMapId').val();
					params.routingId = $('#routingId').val();
					params.promotionId = $('#promotionShopMap').val();
					if(lstIdCustomer == undefined || lstIdCustomer == null || lstIdCustomer.length <=0){
						$('.easyui-dialog #errMsgSearchCustomer').html("Bạn chưa chọn KH để cập nhật số suất.").show();
						return false;
					}
					$('#errMsgSearchCustomer').html('').hide();
					Utils.addOrSaveData(params, '/catalog/promotion/createcustomermap', null, 'errMsgSearchCustomer', function(data){
						if(data != null && data.error == undefined && data.errMsg == undefined){
							var routingCodeHidden = $('#routingCodeHidden').val();
							var routingIdHidden = $('#routingId').val();
							PromotionCatalog.searchCustomerShopMap($('#promotionShopMap').val(),$('#shopMapId').val(),routingCodeHidden, routingIdHidden);
							PromotionCatalog._listCustomer = new Map();
							$('#errMsgSearchCustomer').html("").hide();
							$('#searchStyleCustomerDialog').dialog('close');
							$('#errMsgCustomer').html("").hide();
							$('#successMsgCustomer').html(msgCommon1).show();
							var tm = setTimeout(function(){
								$('#successMsgCustomer').html('').hide();
								clearTimeout(tm); 
							}, 3000);
						}
					}, null, null, null, "Bạn có muốn thêm khách hàng không ?", null);
					//$('.easyui-dialog').dialog('close');
				});
				$('.easyui-dialog #seachStyleCustomerCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleCustomerName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleCustomerAddress').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#searchStyleCustomerDialog').html(html);
	        	$('#searchStyleCustomerDialogDiv').hide();
	        	//$('#searchStyleCustomerContainerGrid').html('<table id="searchStyleCustomerGrid" class="easyui-datagrid" style="width: 520px;"></table>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');
	        	$('.easyui-dialog #btnSaveCustomer').unbind('click');
	        	$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
	        	PromotionCatalog._listCustomer = new Map();
	        }
	    });
		return false;
	},
	//LocTT1 - 
	openSearchStyleRoutingShopEasyUIDialog : function(shopId, promotionShopMapId) {
		//$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyleRoutingDialogDiv').css("visibility", "visible");
		var html = $('#searchStyleCustomerDialog').html();
		$('#searchStyleRoutingDialog').dialog({  
	        title: 'Thông tin tuyến',  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 800,
//	        height : 'auto',
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});	
				var url = '/catalog/promotion/searchroutingshoppopup?shopId='+shopId+'&promotionShopMapId='+promotionShopMapId;
				$('.easyui-dialog #seachStyleRoutingCode').focus();
				$('.easyui-dialog #searchStyleRoutingUrl').val(url);
				$('.easyui-dialog #errMsgSearchRouting').html("").hide();
				
				$('#searchStyleRoutingGrid').show();
				$('#searchStyleRoutingGrid').datagrid({
					url : url,
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :false,
//					view: bufferview,
					pagination:true,
					rowNum : 10,
					pageNumber: 1,
					scrollbarSize : 0,
					fitColumns:true,
					pageList  : [10,20,30],
					width : ($('#searchStyleRoutingContainerGrid').width()),
				    columns:[[  
				        {field:'routingCode',title:'Mã tuyến',align:'left', width:160, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.routingCode);
				        }},  
				        {field:'routingName',title:'Tên tuyến',align:'left', width:250, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.routingName);
				        }},
				        {field:'fromDate',title:msgTuNgay,align:'left', width:120, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.fromDate);
				        }},  
				        {field:'toDate',title:msgDenNgay,align:'left', width:120, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.toDate);
				        }},
				        {field:'staffName',title:'NVBH',align:'left', width:270, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.staffName);
				        }},
				        {field:'quantityMax', title:'Số suất',width:250, align:'left',sortable : false,resizable : false,formatter : function(value,row,index){
				        	if(value != undefined && value != null){
				        		return '<input type="text" index="'+index+'" id="txt_'+row.id+'" value="'+value+'" style="text-align:center; width:140px;" class="soSuatKMRouting" maxlength="9" onkeypress="return numbersonly(event, this);"/>';
				        	}
				        	else
				        		return '<input type="text" index="'+index+'" id="txt_'+row.id+'" style="text-align:center; width:140px;" class="soSuatKMRouting" maxlength="9" onkeypress="return numbersonly(event, this);"/>';
				        	
				        }},
				        {field: 'id', checkbox:true, align:'center', width:80,sortable : false,resizable : false}
				    ]],
				    onLoadSuccess :function(data){
				    	 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.soSuatKMRouting').each(function(){
								var objectId = $(this).attr('id');
								if(objectId!=null && objectId!=undefined && objectId.length>0){
									Utils.bindFormatOntextfieldCurrencyFor(objectId, Utils._TF_NUMBER);
								}			
							});
				    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=routingCode] div').width();
				    	if(originalSize != null && originalSize != undefined){
				    		PromotionCatalog._listCustomerDialogSize.push(originalSize);
				    	}
				    	Utils.updateRownumWidthForJqGridEX1('.easyui-dialog ','routingCode',PromotionCatalog._listCustomerDialogSize,true);
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1500);
			    		 $('#searchStyleRoutingContainerGrid .datagrid-pager').html('').hide();
				    }
				}); 
				$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				$('.easyui-dialog #btnSearchStyleRouting').bind('click',function(event) {
						$('.easyui-dialog #errMsgSearchRouting').html('').hide();
						var code = $('.easyui-dialog #seachStyleRoutingCode').val().trim();
						var name = $('.easyui-dialog #seachStyleRoutingName').val().trim();
						var url = CommonSearch.getSearchStyleRoutingMapGridUrl($('.easyui-dialog #searchStyleRoutingUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleRoutingGrid').datagrid({url:url,pageNumber:1});						
						$('.easyui-dialog #seachStyleRoutingCode').focus();
				});
				$('.easyui-dialog #btnSaveRoutingShopMap').bind('click',function(event) {
					
					$('#errMsgSearchRouting').html('').hide();
					var listRoutingId = new Array();
					var listQuantityMax = new Array();
					var allRows = $('#searchStyleRoutingGrid').datagrid('getRows');
					for(var i=0;i<allRows.length;i++){
						if($('#searchStyleRoutingContainerGrid input:checkbox[name=id]:eq('+ i +')').is(':checked')){
							var quantityMax = ($("input.soSuatKMRouting[index="+i+"]")).val().trim();
							if(quantityMax != null && quantityMax.length > 0){
								if((quantityMax * 1) <= 0){
									$('#errMsgSearchRouting').html('Số suất ở dòng ' + (i + 1) + ' phải là số nguyên dương.').show();
									return false;
								}
								listRoutingId.push(allRows[i].routingId);
								listQuantityMax.push(quantityMax);
							}
							else{
								listRoutingId.push(allRows[i].routingId);
								listQuantityMax.push(-1);
							}
						}
					}
					//hoatv13 update 25/03/2014
					var allRowsRouting=$('#promotionRoutingExGrid').datagrid('getRows');
					var quantityMaxRouting=0;
					var flag=false;
					for(var i=0;i<allRowsRouting.length;i++){//Danh sách số suất KM cho tuyến đã có.
						if(allRowsRouting[i].quantityMax !=null){
							quantityMaxRouting =quantityMaxRouting+parseInt(allRowsRouting[i].quantityMax);
						}
						else{
							flag=true;
						}
					}
					for(var i=0;i<listQuantityMax.length;i++){//Danh sách số suất KM cho tuyến cần thêm.
						if(listQuantityMax[i] !=-1){
							quantityMaxRouting=quantityMaxRouting+parseInt(Utils.returnMoneyValue(listQuantityMax[i]));
						}
						else{
							flag=true;
						}
					}
					var quantityMaxNPP=$('#exGrid').treegrid('find',shopId).soXuatKM;
					
					if(listRoutingId.length== 0){
						$('#errMsgSearchRouting').html('Bạn chưa chọn tuyến nào để phân bổ').show();
						return;
					}
					if(quantityMaxNPP !=null && flag==true)
					{
						$('#errMsgSearchRouting').html('Đơn vị đã phân bổ số suất, không thêm tuyến về dạng không quan tâm số suất được.').show();
						return;
						
					}
					if(quantityMaxRouting!=null && quantityMaxRouting !=undefined && quantityMaxNPP!=null && parseInt(quantityMaxRouting)> parseInt(quantityMaxNPP) && flag!=true){
						$('#errMsgSearchRouting').html('Số suất khuyến mãi của Tuyến không được lớn hơn số suất khuyến mãi của Đơn vị').show();
						return;
					}
					//end
//					var lstIdCustomer = new Array();
//					for(var i=0;i<PromotionCatalog._listCustomer.keyArray.length;i++){
//						var temp = PromotionCatalog._listCustomer.get(PromotionCatalog._listCustomer.keyArray[i]);
//						if(temp!=null){
//							lstIdCustomer.push(temp.id);
//						}
//					}
//					var s = $('#errMsgSearchCustomer').html();
//					var flag = true;
//					if(s.length > 0){
//						var value = quantityMax;
//						if(value != null && value != undefined){
//							value = value * 1;
//							if(isNaN(value)){
//								$('#errMsgSearchCustomer').show();
//								return false;
//							}
//						}
//					}else{
//						var value = quantityMax;
//						if(value != null && value != undefined){
//							value = value * 1;
//							if(isNaN(value)){
//								$('#errMsgSearchCustomer').show();
//								return false;
//							}
//						}
//					}
					var params = new Object();
					params.listRoutingId = listRoutingId;
					params.listQuantityMax = listQuantityMax;
//					params.quantityMax = quantityMax;
//					params.listCustomerId =lstIdCustomer;
					params.shopId = $('#shopMapId').val();
					params.promotionId = $('#promotionShopMap').val();
//					if(lstIdCustomer == undefined || lstIdCustomer == null || lstIdCustomer.length <=0){
//						$('.easyui-dialog #errMsgSearchCustomer').html("Bạn chưa chọn KH để cập nhật số suất.").show();
//						return false;
//					}
					Utils.addOrSaveData(params, '/catalog/promotion/saveroutingshopmap', null, 'errMsgSearchRouting', function(data){
						if(data != null && data.error == undefined && data.errMsg == undefined){
							PromotionCatalog.searchRoutingShopMap($('#promotionShopMap').val(),$('#shopMapId').val(),data.shopCode);
							PromotionCatalog._listCustomer = new Map();
							$('#errMsgSearchCustomer').html("").hide();
							$('#searchStyleRoutingDialog').dialog('close');
							$('#errMsgCustomer').html("").hide();
							$('#successMsgCustomer').html(msgCommon1).show();
							var tm = setTimeout(function(){
								$('#successMsgCustomer').html('').hide();
								clearTimeout(tm); 
							}, 3000);
						}
					}, null, null, null, "Bạn có muốn thêm tuyến không ?", null);
					//$('.easyui-dialog').dialog('close');
				});
				$('.easyui-dialog #seachStyleRoutingCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleRoutingCode').val().trim();
						var name = $('.easyui-dialog #seachStyleRoutingName').val().trim();
						var url = CommonSearch.getSearchStyleRoutingMapGridUrl($('.easyui-dialog #searchStyleRoutingUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleRoutingGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleRoutingCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
//			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleRoutingName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchRouting').html('').hide();
						var code = $('.easyui-dialog #seachStyleRoutingCode').val().trim();
						var name = $('.easyui-dialog #seachStyleRoutingName').val().trim();
						var url = CommonSearch.getSearchStyleRoutingMapGridUrl($('.easyui-dialog #searchStyleRoutingUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleRoutingGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleRoutingName').focus();
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#searchStyleCustomerDialog').html(html);
	        	$('#searchStyleCustomerDialogDiv').hide();
	        	//$('#searchStyleCustomerContainerGrid').html('<table id="searchStyleCustomerGrid" class="easyui-datagrid" style="width: 520px;"></table>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');
	        	$('.easyui-dialog #btnSaveRoutingShopMap').unbind('click');
	        	$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
	        	PromotionCatalog._listCustomer = new Map();
	        }
	    });
		return false;
	},
	openSearchStyle1EasyUICreateUpdateGroupPOAuto : function(codeText, nameText, title, codeFieldText, nameFieldText, searchDialog,searchDiv,arrayParam) {
		CommonSearchEasyUI._arrParams = null;
		CommonSearchEasyUI._currentSearchCallback = null;
		$('#'+searchDiv).css("visibility", "visible");
		var html = $('#'+searchDiv).html();
		$('#'+searchDialog).dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
	        	//@CuongND : my try Code <reset tabindex>
	        	var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				tabindex = 1;
	    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
		    		 if (this.type != 'hidden') {
			    	     $(this).attr("tabindex", '');
						 tabindex++;
		    		 }
				 });
				//end <reset tabindex>
				//$('.easyui-dialog #searchStyle1Code').focus();
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
//				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
//				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				
				if(arrayParam != null && arrayParam[0] == 1){
					var code = arrayParam[2];
					var name = arrayParam[3];
					var status = arrayParam[4];
					$('.easyui-dialog #seachStyle1Code').attr('disabled','disabled');
					$('.easyui-dialog #seachStyle1Code').val(code);
					$('.easyui-dialog #seachStyle1Name').val(name);
					$('.easyui-dialog #seachStyle1Name').focus();
					$('.easyui-dialog #statusDialogUpdate option[value='+status+']').attr('selected','selected');
					var value = $('.easyui-dialog #statusDialogUpdate option[value='+status+']').html();
					$('.easyui-dialog .CustomStyleSelectBoxInner').html(value);
				}
				if(arrayParam != null && arrayParam[0] == 0){
					var value = $('.easyui-dialog #statusDialog option[selected=selected]').html();
					$('.easyui-dialog .CustomStyleSelectBoxInner').html(value);
					$('.easyui-dialog #seachStyle1Code').removeAttr('disabled').focus();
				}
			
				$('.easyui-dialog #__btnSave').bind('click',function(event) {
					var s = -1;
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					var msg = "";
					if(code == undefined || code == "" || code == null){
						msg = "Bạn chưa nhập giá trị cho trường Mã nhóm.";
						$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã nhóm', Utils._CODE, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
							$('.easyui-dialog #seachStyle1Code').focus();
							return false;
						}
					}
					if(msg.length == 0){
						if(name == undefined || name == "" || name == null){
							msg = "Bạn chưa nhập giá trị cho trường Tên nhóm.";
							$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
							$('.easyui-dialog #seachStyle1Name').focus();
							return false;
						}
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', jspKho_TenNhom, Utils._NAME, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
							$('.easyui-dialog #seachStyle1Name').focus();
							return false;
						}
					}
					if(arrayParam != null){
						s = arrayParam[0];
					}
					if(s == 0){
						var params = new Object();
						params.groupCode = code;
						params.groupName = name;
						params.statusValue = $('.easyui-dialog #statusDialog').val();
						Utils.addOrSaveData(params, '/catalog/group-po/creategrouppo', null, 'errMsgSearchCreate', function(data){
							$('#'+searchDialog).dialog('close'); 
							GroupPOAuto.search();
						}, null, null, null, "Bạn có muốn thêm nhóm mới không ?", null);
					}
					
				});
				$('.easyui-dialog #__btnSave1').bind('click',function(event) {
					var s = -1;
					var code = $('#searchStyle1EasyUIDialogUpdate #seachStyle1Code').val().trim();
					var name = $('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').val().trim();
					var msg = "";
					if(code == undefined || code == "" || code == null){
						msg = "Bạn chưa nhập giá trị cho trường Mã nhóm.";
						$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
						$('#searchStyle1EasyUIDialogUpdate #seachStyle1Code').focus();
						return false;
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('#searchStyle1EasyUIDialogUpdate #seachStyle1Code', 'Mã nhóm', Utils._CODE, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
							$('#searchStyle1EasyUIDialogUpdate #seachStyle1Code').focus();
							return false;
						}
					}
					if(msg.length == 0){
						if(name == undefined || name == "" || name == null){
							msg = "Bạn chưa nhập giá trị cho trường Tên nhóm.";
							$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
							$('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').focus();
							return false;
						}
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('#searchStyle1EasyUIDialogUpdate #seachStyle1Name', jspKho_TenNhom, Utils._NAME, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
							$('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').focus();
							return false;
						}
					}
					if(arrayParam != null){
						s = arrayParam[0];
					}
					if(s == 1){
						var params = new Object();
						params.id = arrayParam[1];
						var name = $('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').val().trim();
						params.groupName = name;
						params.statusValue = $('.easyui-dialog #statusDialogUpdate').val();
						Utils.addOrSaveData(params, '/catalog/group-po/updategrouppo', null, 'errMsgSearchUpdate', function(data){
							$('#'+searchDialog).dialog('close'); 
							GroupPOAuto.search();
						}, null, null, null, "Bạn có muốn cập nhật thông tin nhóm không ?", null);
					}
					
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
	        },
	        onClose : function(){
	        	$('#'+searchDiv).html(html);
	        	$('#'+searchDiv).css("visibility", "hidden");
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #__btnSave').unbind('click');
	        	$('.easyui-dialog #__btnSave1').unbind('click');
	        	$('.easyui-dialog #errMsgSearchCreate').html('').hide();
	        	$('.easyui-dialog #errMsgSearchUpdate').html('').hide();	
	        }
	    });
		return false;
	},
	getSearchStyleCustomerMapGridUrl : function(url, code, name,address, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		searchUrl+= "&customerCode=" + encodeChar(code) + "&customerName=" + encodeChar(name) + "&address=" + encodeChar(address);
		return searchUrl;
	},
	getSearchStyleExclusionMapGridUrl : function(url, code, name, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + arrParam[i].name + "=" + arrParam[i].value;
			}
		}
		searchUrl+= "&code=" + encodeChar(code) + "&name=" + encodeChar(name); 
		return searchUrl;
	},
	recursionFindParentShopCheck:function(id,type){
		if(id == null || id == undefined){
			return;
		}
    	$.ajax({
    		type : "POST",
			url : WEB_CONTEXT_PATH +'/commons/shopMap/getParentShop',
			data: ({shopId:id,type : type}),
			dataType: "json",
			success : function(data) {
				if(data != null && data != undefined && data.parentShopId != null && data.parentShopId != undefined){
					$('#check_'+data.parentShopId).attr('disabled','disabled').removeAttr('checked');
					if (data != null && data.type > 0){
						var i = PromotionCatalog.removeArrayByValue(PromotionCatalog._listShopId,data.parentShopId, data.type); 
						if (i != -1){
//							PromotionCatalog.removeArrayByValue(PromotionCatalog.lstType,data.type);
							PromotionCatalog.lstType.splice(i, 1);
						}
					}
					CommonSearch.recursionFindParentShopCheck(data.parentShopId,data.type);
				}
			}
    	});
	},
	recursionFindParentShopUnCheck:function(id,type){
		if(id == null || id == undefined){
			return;
		}
		$.ajax({
    		type : "POST",
			url : WEB_CONTEXT_PATH +'/commons/shopMap/getParentShop',
			data: ({shopId:id,type : type}),
			dataType: "json",
			success : function(data) {
				if(data != null && data != undefined && data.parentShopId != null && data.parentShopId != undefined){
					var flag = true;
					$('.class_'+data.parentShopId).each(function(){
						if($(this).is(':checked') || $(this).is(':disabled')){
							flag = false;
						}
					});
					var isCheck = false;
					if(data.type == 1){
						$('.easyui-dialog input[type=checkbox]').each(function(){
						    if($(this).is(":checked")){
						        isCheck = true;
						    }
						});
					}
					if(!isCheck){
						if(flag){
							$('#check_'+data.parentShopId).removeAttr('checked').removeAttr('disabled');
							CommonSearch.recursionFindParentShopUnCheck(data.parentShopId,data.type);
						}
						else{
							CommonSearch.recursionFindParentShopUnCheck();
						}
					}
				}
			}
    	});
	},
	recursionFindParentShopUnCheckCTTT:function(id){
		if(id == null || id == undefined){
			return;
		}
		$.ajax({
    		type : "POST",
			url : WEB_CONTEXT_PATH +'/commons/shopMap/getParentShop',
			data: ({shopId:id}),
			dataType: "json",
			success : function(data) {
				if(data != null && data != undefined && data.parentShopId != null && data.parentShopId != undefined){
					var flag = true;
					$('.class_'+data.parentShopId).each(function(){
						if($(this).is(':checked') || $(this).is(':disabled')){
							flag = false;
						}
					});
					if(flag){
						$('#check_'+data.parentShopId).removeAttr('checked').removeAttr('disabled');
						PromotionCatalog.removeArrayByValue(BaryCentricProgrammeCatalog._listShopId,data.parentShopId);
						CommonSearch.recursionFindParentShopUnCheckCTTT(data.parentShopId);
					}
//					else{
//						CommonSearch.recursionFindParentShopUnCheckCTTT();
//					}
				}
			}
    	});
	},
	openSearchStyleExclusionProgramEasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
		//$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyleExclusionDialogDiv').css("visibility", "visible");
		var html = $('#searchStyleExclusionDialogDiv').html();
		$('#searchStyleExclusionDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 600,
	        height : 'auto',
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyleExclusionCode').focus();
				$('.easyui-dialog #searchStyleExclusionUrl').val(url);
				$('.easyui-dialog #errMsgSearchExclusion').html("").hide();
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);			
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}

				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				$('#searchStyleExclusionGrid').show();
				$('#searchStyleExclusionGrid').datagrid({
					url : CommonSearch.getSearchStyleExclusionMapGridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					rowNum : 10,
					pageNumber: 1,
					scrollbarSize : 0,
					fitColumns:true,
					pageList  : [10,20,30],
					width : ($('#searchStyleExclusionContainerGrid').width()),
				    columns:[[  
				        {field:'displayProgramCode',title:codeText,align:'left', width:170, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.displayProgramCode);
				        }},  
				        {field:'displayProgramName',title:nameText,align:'left', width:370, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.displayProgramName);
				        }},  
				        {field: 'id', checkbox:true, align:'center', width:80,sortable : false,resizable : false}
				    ]],
				    onLoadSuccess :function(data){
				    	 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 if(data.rows.length == 0){
			    			 $('.datagrid-header-check input').removeAttr('checked');
			    		 }
//							setTimeout(function(){
//								$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
//								$('.datagrid-header-check input').removeAttr('checked');
//				    		},500);
					    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=displayProgramCode] div').width();
					    	if(originalSize != null && originalSize != undefined){
					    		ProgrammeDisplayCatalog._listExclusionDialogSize.push(originalSize);
					    	}
					    	Utils.updateRownumWidthForJqGridEX1('.easyui-dialog ','displayProgramCode',ProgrammeDisplayCatalog._listExclusionDialogSize,true);
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
			    		 $('input[name="id"]').each(function(){
			 				var temp = ProgrammeDisplayCatalog._listExclusion.get($(this).val());
			 				if(temp!=null) $(this).attr('checked','checked');
			 			});
			 	    	var length = 0;
			 	    	$('input[name="id"]').each(function(){
			 	    		if($(this).is(':checked')){
			 	    			++length;
			 	    		}	    		
			 	    	});	    	
			 	    	if(data.rows.length==length){
			 	    		$('.datagrid-header-check input').attr('checked','checked');
			 	    	}else{
							$('.datagrid-header-check input').removeAttr('checked');
			 	    	}
			 	    	if(data.rows == null || data.rows == undefined || data.rows.length == 0){
			 	    		$('.datagrid-header-check input').removeAttr('checked');
			 	    	}
				    },
				    onCheck:function(i,r){
				    	ProgrammeDisplayCatalog._listExclusion.put(r.id,r);
				    },
				    onUncheck:function(i,r){
				    	ProgrammeDisplayCatalog._listExclusion.remove(r.id);
				    },
				    onCheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		ProgrammeDisplayCatalog._listExclusion.put(r[i].id,r[i]);
				    	}
				    },
				    onUncheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		ProgrammeDisplayCatalog._listExclusion.remove(r[i].id);
				    	}
				    }
				}); 
				$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				$('.easyui-dialog #btnSearchStyleExclusion').bind('click',function(event) {
						$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
						var code = encodeChar($('.easyui-dialog #seachStyleExclusionCode').val().trim());
						var name = encodeChar($('.easyui-dialog #seachStyleExclusionName').val().trim());
						var url = CommonSearch.getSearchStyleExclusionMapGridUrl($('.easyui-dialog #searchStyleExclusionUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleExclusionGrid').datagrid({url:url,pageNumber:1});						
						$('.easyui-dialog #seachStyleExclusionCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleExclusionGrid').datagrid('uncheckAll');
//			    		},500);
				});
				$('.easyui-dialog #btnSaveExclusion').bind('click',function(event) {
					var lstIdCustomer = new Array();
					for(i=0;i<ProgrammeDisplayCatalog._listExclusion.keyArray.length;i++){
						var temp = ProgrammeDisplayCatalog._listExclusion.get(ProgrammeDisplayCatalog._listExclusion.keyArray[i]);
						if(temp!=null){
							lstIdCustomer.push(temp.id);
						}
					}

					var params = new Object();
					params.listExclusionId =lstIdCustomer;
					params.id = $('#selId').val();
					if(lstIdCustomer == undefined || lstIdCustomer == null || lstIdCustomer.length <=0){
						$('.easyui-dialog #errMsgSearchExclusion').html("Bạn chưa chọn CTTB để loại trừ.").show();
						return false;
					}
					Utils.addOrSaveData(params, '/catalog/programme-display/createExclusionProgram', null, 'errMsgExclusion', function(data){
						if(data != null && data.error == undefined && data.errMsg == undefined){
							ProgrammeDisplayCatalog.searchExclusionProgram();
							ProgrammeDisplayCatalog._listExclusion = new Map();
							$('#errMsgSearchExclusion').html("").hide();
							$('#searchStyleExclusionDialog').dialog('close');
							$('#errMsgExclusion').html("").hide();
							$('#successMsgExclusion').html(msgCommon1).show();
							var tm = setTimeout(function(){
								$('#successMsgExclusion').html('').hide();
								clearTimeout(tm); 
							}, 3000);
						}
					}, null, null, null, "Bạn có muốn thêm CTTB không ?", function(data){
						$('#errMsgSearchExclusion').html(data.errMsg).show();
						var tm = setTimeout(function(){
							$('#successMsgExclusion').html('').hide();
							clearTimeout(tm); 
						}, 3000);
					});
					//$('.easyui-dialog').dialog('close');
				});
				$('.easyui-dialog #seachStyleExclusionCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
						var code = $('.easyui-dialog #seachStyleExclusionCode').val().trim();
						var name = $('.easyui-dialog #seachStyleExclusionName').val().trim();
						var url = CommonSearch.getSearchStyleExclusionMapGridUrl($('.easyui-dialog #searchStyleExclusionUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleExclusionGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleExclusionCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleExclusionGrid').datagrid('uncheckAll');
//			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleExclusionName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
						var code = $('.easyui-dialog #seachStyleExclusionCode').val().trim();
						var name = $('.easyui-dialog #seachStyleExclusionName').val().trim();
						var url = CommonSearch.getSearchStyleExclusionMapGridUrl($('.easyui-dialog #searchStyleExclusionUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleExclusionGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleExclusionCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleExclusionGrid').datagrid('uncheckAll');
//			    		},500);
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#searchStyleExclusionDialogDiv').html(html);
	        	$('#searchStyleExclusionDialogDiv').hide();
	        	//$('#searchStyleCustomerContainerGrid').html('<table id="searchStyleCustomerGrid" class="easyui-datagrid" style="width: 520px;"></table>');
	        	$('.easyui-dialog #seachStyleExclusionCode').val('');
	        	$('.easyui-dialog #seachStyleExclusionName').val('');
	        	$('.easyui-dialog #btnSaveExclusion').unbind('click');
	        	$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
	        	ProgrammeDisplayCatalog._listExclusion = new Map(); 
	        }
	    });
		return false;
	},
	 fitEasyDialog:function(objectId){
			if(objectId!=undefined && objectId!=null && objectId!=''){
				objectId="#"+objectId;
			}else objectId=".easyui-dialog";
			$(objectId).each(function(){
				try{
					if($(this).parent().css('display')!='none'){
						var hDialog=parseInt($(this).parent().height());
						var hWindow=parseInt($(window).height());
						if(hDialog>=hWindow){//dialog dài hơn window
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
	searchTransferStaffOnDialogForTransact : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialogForTransact("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/commons/staff/search-vansale-transact",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	openSearchStyle1EasyUIDialogForTransact : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDiv').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
//				Utils.bindAutoSearch();
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width : ($('#searchStyle1EasyUIDialog').width() - 40),
				    columns:[[  
				        {field:codeField,title:codeText,align:'left', width:110, sortable : false,resizable : false, formatter:function(value, row, index) {
				        	  return Utils.XSSEncode(value);
				          }},  
				        {field:nameField,title:nameText,align:'left', width:$('#searchStyle1EasyUIDialog').width() - 25 - 110 - 80, sortable : false,resizable : false, formatter:function(value, row, index) {
				        	  return Utils.XSSEncode(value);
				          }},				        
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
//			    		 $(window).resize();
//			    		 var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height() + 600;
//			        	    $('.window-mask').css("height",height);
			        	setTimeout(function() {
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :'', name: '',address:''});*/
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {


					
					if(!$(this).is(':hidden')){

						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDiv').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	//LocTT1 - Feb08, 2014
	getSearchStyleRoutingMapGridUrl : function(url, code, name, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '&curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		searchUrl+= "&routingCode=" + encodeChar(code) + "&routingName=" + encodeChar(name);
		return searchUrl;
	}
};
var ExportActionLog = {
	CUSTOMER : 0,
	STAFF: 1,
	SHOP: 2,
	PRODUCT: 3,
	CUSTOMERCATLEVEL:4,
	STAFFCATLEVEL: 5,
	PROMOTION_PROGRAM: 6,
    INCENTIVE_PROGRAM: 7,
    FOCUS_PROGRAM: 8,
	DISPLAY_PROGRAM: 9,
	
	exportActionLog :function(objectId, type, fDate, tDate, errMsgId){
		var params = new Object();
		params.objectIdActionLog = objectId;
		params.fromDateActionLog = fDate;
		params.toDateActionLog = tDate;
		params.typeActionLog = type;
		$('#'+errMsgId).html('').hide();
		var msg = 'Bạn có muốn xuất file xem thông tin thay đổi?';
		Utils.addOrSaveData(params, '/commons/export/actionlog',null, errMsgId, function(data) {
			window.location.href = data.view;
		}, null, null, null, msg);
		return false;
	}
};
