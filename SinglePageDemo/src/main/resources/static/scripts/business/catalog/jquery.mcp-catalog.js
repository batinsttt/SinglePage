var MCPCatalog = {
		_mapMultiSelectSub:null,
		_mapMultiSelect:null,
		_xhrSave : null,
		_xhrSearch : null,
		parentsId:null,
		searchFilter:null,
		selectNodeTree:-1,
		isRefresh:false,
		isUpdate:false,
		_idSearch:null,
		_shopCodeSearch:null,
		_mcpCodeSearch:null,
		_nextRoutingCode:null,
		_mcpShopIdSearch:null,
		_mcpId:null,
		_lstRoutingCode: new Map(),
		_idCus:null,//dung khi thay doi 1 kh vao mcp khac
		_mcpIdSelect:-1,
		_title:'',
		_shopCodeExcel:null,
		flag : true,
		search: function(mcpId,isNotSearch) {
			var msg = '';
			$('#errMsg').html('').hide();
			$('#errExcelMsg').html('').hide();
			var node = $('#tree').tree('getSelected');
			if (mcpId == null || mcpId == undefined) {
				if (node != null && node.id != null) {
					mcpId = node.id;
				} else {
					mcpId = 0 ;
				}
			} else {
				$('#infoCustomer').html(msgTuyen1);
			}
			var shopCode = MCPCatalog._mcpShopIdSearch;
			var customerCode = $('#customerCode').val().trim();
			var customerName = $('#customerName').val().trim();
			var status = $('#status').val();
			if(msg.length > 0){
				$('#errMsg').html(msg).show();
				return false;
			}
			var houseNumberOrStreet = '';
			var areaId = '';
			var groupId = 0;
			if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
				groupId = $('#chooseGroup').val();
			}
			$('#grid').datagrid('load',{page : 1,groupId:groupId, shopId: $('#shopIdLogin').val(), isNotSearch: isNotSearch,mcpId : mcpId,customerCode: customerCode, customerName: Utils.XSSEncode(customerName, false), status: status, houseNumberOrStreet: houseNumberOrStreet, areaId: areaId });
			if($('#supervisorUser').val() == 'true' && mcpId > 0){
				MCPCatalog._title = '<a href="javascript:void(0);" onclick="return MCPCatalog.openAddCusInMCPPopup();"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png"/></a>';
				$('#btnInsert').css('visibility', 'visible');
				$(".datagrid-htable td[field='edit'] .datagrid-cell").html(MCPCatalog._title);
			}else{
				$('#btnInsert').css('visibility', 'hidden');
				$(".datagrid-htable td[field='edit'] .datagrid-cell").html('');
			}
		},
		
		//ham tim kiem theo cay MCP
		searchMCPTree: function(shopCode) {
			$('#errMsg').html('').hide();
			if (shopCode != null && shopCode != undefined && shopCode != ""){
				MCPCatalog.loadAreaTree(null,shopCode);
				MCPCatalog._shopCodeExcel = shopCode;
			} else {
				$('#errMsg').html(msgTuyenErr1).show();
				return false;
			}
		},
		
		//ham mo dialog Chuyen KH vao MCPID
		openChangeCusInMCPPopup:function(idCus){
			$('#errMsg').html('').hide();
			$('#errExcelMsg').html('').hide();
			if(idCus!= undefined){
				MCPCatalog._idCus = idCus;
			}else{
				if(MCPCatalog._mapMutilSelect == null || MCPCatalog._mapMutilSelect.size() <= 0){
					$('#errMsg').html(msgTuyenErr2).show();
					return false;
				}
			}
			$('#changeCusInMCPPopupDIV').css('visibility','visible');
			$('#errMsgPopup3').hide();
			var html = $('#changeCusInMCPPopup').html();
			$('#changeCusInMCPPopup').dialog({
				closed: false,  
		        cache: false,  
		        modal: true,
		        position: 'middle',
		        center: true, 
				onOpen: function(){
		        	$('.easyui-dialog #mcpidCBX').customStyle();
		        	var groupId = 0;
		        	if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
		        		groupId = $('#chooseGroup').val();
		        	}
		        	Utils.getJSON('/rest/catalog/get-list-routing/'+ $('#shopIdLogin').val() +'/'+ groupId +'/list.json', function(data){
		        		var arrHtml = new Array();
		        		for(var i=0;i<data.length;i++){
		        			arrHtml.push('<option value="'+ data[i].value +'">'+ Utils.XSSEncode(data[i].name) +'</option>');
		        		}
		        		$('#mcpidCBX').html($('#mcpidCBX').html()+arrHtml.join(""));
		        		$('#mcpidCBX').change();
		        	});
		        },
				onClose : function(){
					MCPCatalog._idCus = null;
					$('#changeCusInMCPPopup').html(html);
					$('#changeCusInMCPPopupDIV').css('visibility','hidden');
		        }
			});
			return false;
		},
		//ham add KH vao MCP (tren popup chuyen kh vao mcpid)
		insertCusToMCP:function(){
			var dataModel = new Object();
			if(MCPCatalog._idCus != null){
				dataModel.lstCusId = MCPCatalog._idCus;
			}else{
				if(MCPCatalog._mapMutilSelect == null || MCPCatalog._mapMutilSelect.size() <= 0) {
					$('#errMsgPopup3').html(msgTuyenErr2).show();
	        		return false;
	        	}
				var mapKey = MCPCatalog._mapMutilSelect.keyArray;
				var mapValue = MCPCatalog._mapMutilSelect.valArray;
				dataModel.lstCusId = mapValue;
			}
			var mcpidCBX = $('#mcpidCBX').val();
			if(MCPCatalog._mcpIdSelect==mcpidCBX){
				$('#errMsgPopup3').html(msgTuyenErr3).show();
        		return false;
			}
			dataModel.mcpId = $('#mcpidCBX').val();
			MCPCatalog.saveCus(dataModel);
		},
		
		//ham init dialog them moi MCPID
		initEditMCP: function(isCreate) {
			$('#errMsgTree').html('').hide();
			MCPCatalog._mcpCodeSearch = null;
			MCPCatalog._mcpCodeSearch = $('#mcpSearchCode').val();
			//Mo dialog Them/Chinh sua MCPID
			$('#addNewMCPPopupDIV').css('visibility','visible');
//			$('#mcpCode').val(MCPCatalog._nextRoutingCode);
			if(isCreate != null && isCreate != undefined && isCreate == false){
				$('#mcpCode').attr('disabled',true);
			}else if(isCreate != null && isCreate != undefined && isCreate == true){
				$('#mcpCode').attr('disabled',false);
			}
			
			$('#mcpCode').val('');
			$('#mcpName').val('');
			$('#mcpCode').focus();
			var html = $('#addNewMCPPopup').html();
			$('#addNewMCPPopup').dialog({  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        position: 'middle',
		        center: true, 
		        onOpen: function(){
		        	$('.easyui-dialog #saleStaffSelector').customStyle();
		        	var groupId = 0;
		        	if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
		        		groupId = $('#chooseGroup').val();
		        	}
		        	Utils.getJSON('/rest/catalog/sale-staff/'+ currentUser +'/'+ groupId +'/list.json', function(data){
		        		var arrHtml = new Array();
		        		for(var i=0;i<data.length;i++){
		        			arrHtml.push('<option value="'+ data[i].value +'">'+ Utils.XSSEncode(data[i].name) +'</option>');
		        		}
		        		$('#saleStaffSelector').html($('#saleStaffSelector').html()+arrHtml.join(""));
		        		$('#saleStaffSelector').change();
		        	});
		        	if(isCreate){
		        		$('#btnEditMCP').html(msgText2);
		        		MCPCatalog.flag = true;
		        		$('#errMsgMCPAddPopup').hide();
		        	}else{
		        		$('#btnEditMCP').html(msgText3);
		        		MCPCatalog.flag = false;
		        		var node = $('#tree').tree('getSelected');
						if(node!=null && node.id > 0){
							setTimeout(function(){
								Utils.getJSON('/rest/catalog/routing-info/'+ node.id +'.json', function(data){
									$('#mcpCode').val(data.content1);
									$('#mcpName').val(data.content2);
									if(data != null && data != undefined && data.content3 != undefined){
										$('#saleStaffSelector').val(parseInt(data.content3));
										$('#saleStaffSelector').change();
									}
								});
							},500);
						}
		        	}
		        },
		        onBeforeClose: function() {
		        },
		        onClose : function(){
		        	$('#addNewMCPPopup').html(html);
		        	$('#addNewMCPPopupDIV').css('visibility','hidden');
		        }
		    });
			return false;
		},
		
		//ham them moi MCPID
		editMCP: function() {
			$('#errMsgMCPAddPopup').html('').hide();
			var msg = "";
			msg = Utils.getMessageOfRequireCheck('mcpCode',msgTuyen4);
			if (msg.length == 0) {
				msg = Utils.getMessageOfSpecialCharactersValidate('mcpCode',msgTuyen4,Utils._CODE);
			}
			if (msg.length == 0) {
				msg = Utils.getMessageOfRequireCheck('mcpName',msgTuyen5);
			}
			if (msg.length == 0) {
				msg = Utils.getMessageOfSpecialCharactersValidate('mcpName',msgTuyen5, Utils._NAME);
			}
			if (msg.length == 0) {
				msg = Utils.getMessageOfRequireCheck('saleStaffSelector',msgTuyen6, true);
			}
			if (msg.length > 0) {
				$('#errMsgMCPAddPopup').html(msg).show();
				return false;
			}
			var dataModel = new Object();
			var mcpDom = $('#mcpCode');
			var mcpCode = '';
			if (mcpDom != undefined && mcpDom != null && mcpDom.val() != null){
				mcpCode = mcpDom.val().trim().toUpperCase();
			}
			dataModel.mcpCode = mcpCode;
			dataModel.mcpNewText = $('#mcpName').val().trim();
			dataModel.staffId = $('#saleStaffSelector').val();
			dataModel.shopId = $('#shopIdLogin').val();
			if(!MCPCatalog.flag){
				var node = $('#tree').tree('getSelected');
				if(node != null && node != undefined){
					dataModel.routingId = node.id;
				}
			}
			Utils.addOrSaveData(dataModel, "/catalog/mcp/editMCP", MCPCatalog._xhrSave,'errMsgMCPAddPopup', function(data){
				if (!data.error) {
					$('#addNewMCPPopup').dialog('close');
					MCPCatalog.loadAreaTree(0,null);
					$('#successMsgTree').html(msgCommon1).show();
					setTimeout(function(){
						$('#successMsgTree').html('').hide();
					},4000);
				} else {
					$('#errMsgMCPAddPopup').html(data.errMsg).show();
				}
			});
		},
		
		//ham load cay MCP
		loadTreeEx:function(idSearch){
			MCPCatalog.loadAreaTree(idSearch);
		},
		loadAreaTree:function(mcpId,shopCode){
			$('#errExcelMsg').html('').hide();
			if(mcpId==null){
				mcpId = 0;
			}
			if(shopCode!=undefined && shopCode!=null && shopCode!=""){//search đến MCP cần tìm
				MCPCatalog._shopCodeSearch=shopCode;
				MCPCatalog._mcpShopIdSearch = shopCode; //dung khi admin vua chon shop roi bam tim kiem ma khong click tren cay
			}
			var groupId = 0;
			if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
				groupId = $('#chooseGroup').val();
			}
			$('#tree').tree({
//        		url: "/rest/catalog/mcpid-tree/combotree/"+ mcpId+".json",
        		url: "/rest/catalog/mcpid-tree/combotree/"+ $('#shopIdLogin').val()+"/"+ groupId +".json",
        		lines:true,
        		formatter:function(node){
        			return Utils.XSSEncode(node.text);
        		},
        		onContextMenu:function(e, node){
    		    	e.preventDefault();
    		    	if($('#supervisorUser').val() == 'true'){
    		    		$('#tree').tree('select', node.target);
    		    		$('#contextMenu').menu('show', {
    		    			left : e.pageX-5,
    		    			top : e.pageY-5
    		    		});
    		    		$('#contextMenu').css('height', 'auto');
    		    	}
    			},
        		onBeforeLoad: function(n,p){
    		    	if(MCPCatalog._shopCodeSearch!=null && MCPCatalog._shopCodeSearch!=""){
    		    		p.shopCode=MCPCatalog._shopCodeSearch;
    		    		$('#divOverlay').show();
    		    	}
    		    },
        		onLoadSuccess:function(parent,data){
        			MCPCatalog._nextRoutingCode = null;
                	if(MCPCatalog._idSearch!=null){
    		    		try{
    		    			var id=MCPCatalog._idSearch;
    		    			var node = $('#tree').tree('find', id);
    			    		if(node!=null){
    			    			$('#tree').tree('select', node.target);
    			    		}
    		    		}catch(e){}
    		    		MCPCatalog._idSearch=null;
    		    		$('#divOverlay').hide();
    		    	} else if (MCPCatalog._shopCodeSearch!=null) {
    		    		try{
    		    			var shopCode=MCPCatalog._shopCodeSearch;
    		    			var node = $('#tree').tree('find', shopCode);
    			    		if(node!=null){
    			    			$('#tree').tree('select', node.target);
    			    		}
    		    		}catch(e){}
    		    		MCPCatalog._shopCodeSearch=null;
    		    		$('#divOverlay').hide();
    		    	}
                	if (data != null && data[0] != null && data[0].children != null && data[0].children[0] != undefined) {
                		MCPCatalog._nextRoutingCode = data[0].children[0].nextRoutingCode;
                	} else if (data != null && data[0] != undefined && data[0] != null){
                		MCPCatalog._nextRoutingCode = data[0].nextRoutingCode;
                	}
    	        },
    	        onClick:function(node) {
    	        	$('#errMsg').html('').hide();
    	        	if($('#grid').length==1 && node!=null && node.id!=null){
    	        		
    	        		MCPCatalog._mapMutilSelect = new Map();
    	        		if (node.id == -2) {
    	        			MCPCatalog._mcpShopIdSearch = node.attributes.shop.shopCode;
    	        		}
    	        		MCPCatalog.search(node.id);
	        			MCPCatalog._mcpIdSelect = node.id;
    	        		$('#infoCustomer').html(msgTuyen2 + ' ' + node.text);
    				}
    	        }
			});	
		},
		
		//----------------------PHUONGVM-----------------START------------------------------------------
		getGridCusUrl:function(cusCode, cusName, channelTypeId, address, areaId, mcpId){
			return WEB_CONTEXT_PATH +"/catalog/mcp/searchCus?customerCode=" + encodeChar(cusCode) 
			+ "&customerName=" + encodeChar(cusName) 
			+ "&channelTypeId=" + channelTypeId 
			+ "&houseNumberOrStreet=" + address 
			+ "&areaId=" + areaId 
			+ "&mcpId=" + mcpId;
		},
		//Tim kiem KH tren dialog MCPID
		searchCus:function(){
			var customerCode = $('#cusCode').val().trim();
			var customerName = $('#cusName').val().trim();
//			var channelTypeId = $('#typeCus').combobox('getValue').trim();
			var houseNumberOrStreet = '';
			var areaId = '';
			var url = MCPCatalog.getGridCusUrl(customerCode, customerName, -1 , houseNumberOrStreet, areaId);
//			$("#gridCus").datagrid({url:url,pageNumber:1});
			MCPCatalog._mapMutilSelectSub = new Map();
			$("#gridCus").datagrid({
				  url:url,
			  	  pageList  : [10,20,30],
				  width: 750,
				  pageSize : 10,
				  checkOnSelect :true,
				  height:'auto',
				  scrollbarSize : 0,
				  pagination:true,
				  pageNumber:1,
				  fitColumns:true,
				  method : 'GET',
				  rownumbers: true,
				  columns:[[
				            //here
				    {field: 'customerCode', title: catalog_customer_code, width: 70, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
			    			return row.customerCode;
			    		}
				    },
					{field: 'customerName', title: catalog_customer_name, width: 130, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
			    			return row.customerName;
			    		}
				    },
				    {field: 'address', title: SuperviseManageRouteCreate_customerAddress, width: 300, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
			    			return row.address;
			    		}
				    },
//				    {field: 'type', title: 'Loại khách hàng', width: 200, sortable:false,resizable:false, align: 'left',
//				    	formatter:function(data, row, index){
//				    		if(row.channelType != null)
//				    			return row.channelType.channelTypeName;
//				    		}
//				    },
				    {field: 'id',title: '', checkbox:true, width:50,align:'center',sortable : false,resizable : false},			  
				  ]],
				  onSelect : function(rowIndex, rowData) {
				    	var selectedId = rowData['id'];
				    	MCPCatalog._mapMutilSelectSub.put(selectedId, rowData.id);
				    },
				    onUnselect : function(rowIndex, rowData) {
				    	var selectedId = rowData['id'];
				    	MCPCatalog._mapMutilSelectSub.remove(selectedId);
				    },
				    onSelectAll : function(rows) {
				    	if($.isArray(rows)) {
				    		for(var i = 0; i < rows.length; i++) {
				    			var row = rows[i].id;
				    			var selectedId = rows[i].id;
				    			MCPCatalog._mapMutilSelectSub.put(selectedId, row);
				    		}
				    	}
				    },
				    onUnselectAll : function(rows) {
				    	if($.isArray(rows)) {
				    		for(var i = 0; i < rows.length; i++) {
				    			var row = rows[i];
				    			var selectedId = row['id'];
				    			MCPCatalog._mapMutilSelectSub.remove(selectedId);
				    		}
				    	}
				    },
				   onLoadSuccess:function(){
				      	var easyDiv = '#gridCusContainer ';
				    	$(easyDiv+'.datagrid-header-rownumber').html(stt_label);
				    	var exitsAll = false;
			    		var runner = 0;
			    		$(easyDiv+'input:checkbox[name=id]').each(function() {
			    			var selectedId = this.value;
			    			if(MCPCatalog._mapMutilSelectSub.get(selectedId) != null || MCPCatalog._mapMutilSelectSub.get(selectedId) != undefined) {
			    				exitsAll = true;
			    				$('#gridCus').datagrid('selectRow',runner);
			    			} 
			    			runner ++; 
			    		});
			    		if (exitsAll==false){
			    			$(easyDiv+'td[field=id] .datagrid-header-check input:checkbox').attr('checked', false);
				    	}
				    	
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
			    		updateRownumWidthForDataGrid('#gridCus');
			    		$(window).resize();

				      }
			});
		},
		//Mo dialog Them KH vao MCPID
		openAddCusInMCPPopup:function(){
			$('#addCusInMCPPopupDIV').css('visibility','visible');
			$('.panel').css('top', '35px');

			$('#addCusInMCPPopup').dialog({
				onOpen : function() {
					SuperviseManageRouteCreate._isDialog = true;
				},
				onClose : function(){
					SuperviseManageRouteCreate._isDialog = false;
				}
			});
			$('#addCusInMCPPopup').dialog('open');
			$('#errMsgPopup1').hide();
			$('#errExcelMsg').html('').hide();
			MCPCatalog._mapMutilSelectSub = new Map();
			$('#customerInfo').val('');
			$('#customerAddr').val('');
			$('#outOfDate').attr('checked', false);
			$('#customerInfo').focus();
			$('#addCusInMCPPopup #customerInfo').unbind('keyup');
			$('#addCusInMCPPopup #customerInfo').bind('keyup', function(event) {
			      var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
			      if (keycode == 13) {
			    	  SuperviseManageRouteCreate.searchCusInCreateRouting();
			      }
			});
			$('#addCusInMCPPopup #customerAddr').unbind('keyup');
			$('#addCusInMCPPopup #customerAddr').bind('keyup', function(event) {
			      var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
			      if (keycode == 13) {
			    	  SuperviseManageRouteCreate.searchCusInCreateRouting();
			      }
			});
			SuperviseManageRouteCreate.searchCusInCreateRouting();
			return false;
		},
		//Them KH vao MCPID
		saveCusInMCP:function(){
			$('#errMsgPopup1').html('').hide();
			if(MCPCatalog._mcpIdSelect<0){
				$('#errMsgPopup1').html(msgTuyenErr4).show();
        		return false;
			}
			if(MCPCatalog._mapMutilSelectSub == null || MCPCatalog._mapMutilSelectSub.size() <= 0) {
				$('#errMsgPopup1').html(msgTuyenErr2).show();
        		return false;
        	}
			var mapKey = MCPCatalog._mapMutilSelectSub.keyArray;
			var mapValue = MCPCatalog._mapMutilSelectSub.valArray;
			var dataModel = new Object();
			dataModel.lstCusId = mapValue;
			dataModel.mcpId = MCPCatalog._mcpIdSelect;
			MCPCatalog.saveCus(dataModel);
		},
		saveCus:function(dataModel){
			Utils.addOrSaveData(dataModel, "/catalog/mcp/save", null, 'errMsg',function(data){	
				if(data.errMsg!=undefined && data.errMsg.length==0){
					$('#addCusInMCPPopup').dialog('close');
					$('#changeCusInMCPPopup').dialog('close');
					$('#successMsg').html(msgCommon1).show();
					setTimeout(function(){$('#successMsg').html('').hide();},1500);
					MCPCatalog._mapMutilSelect = new Map();
					$("#grid").datagrid("reload");
				}
			});	
		},
		getGridCusMCPIDUrl:function(cusCode, cusId){
			var url= "/catalog/mcp/searchHisoryMCP?customerCode=" + cusCode;
			if ($('#routingId') != undefined && $('#routingId').val() != null){
				url += '&routingId=' + $('#routingId').val().trim();
			}
			if (cusId != null && cusId > 0){
				url += '&customerId=' + cusId;
			}
			return url;
		},
		//Mo dialog Xem lich su khach hang thuoc MCPID
		openViewHistoryCusInMCPPopup:function(customerId, customerCode, customerName, address, type){
			$('#viewHistoryCusInMCPPopupDIV').css('visibility','visible');
			$('#viewHistoryCusInMCPPopup').dialog('open');
			$('#errMsgPopup2').hide();
			if(customerCode == 'null' || customerCode == undefined){
				customerCode = '';
			}
			if(customerName == 'null' || customerName == undefined){
				customerName = '';
			}
			if(address == 'null' || address == undefined){
				address = '';
			}
			$('#cusCodeLabel').html(Utils.XSSEncode(customerCode));
			$('#cusNameLabel').html(Utils.XSSEncode(customerName));
			$('#addressLabel').html(Utils.XSSEncode(address));
			$('#typeLabel').html(type);
			var url = MCPCatalog.getGridCusMCPIDUrl(customerCode, customerId);
			$("#gridCusMCPID").datagrid({
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
				    {field: 'routingCode', title: msgTuyen4, width: 200, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
				    		if(row.routing != null)
				    			return Utils.XSSEncode(row.routing.routingCode);
				    		return '';
				    	}
				    },
					{field: 'fromDate', title: msgTuNgay, width: 150, sortable:false,resizable:false, align: 'left',
			        	  formatter:function(value, row, index) {
			        		  if(row.fromDate!=null){
			        			  return toDateString(new Date(row.fromDate));
			        		  }  
				          }
				    },
				    {field: 'toDate', title: msgDenNgay, width: 150, sortable:false,resizable:false, align: 'left',
			        	  formatter:function(value, row, index) {
			        		  if(row.toDate!=null){
			        			  return toDateString(new Date(row.toDate));
			        		  }
				          }
				    },		  
				  ]],
				   onLoadSuccess:function(){
				      	var easyDiv = '#gridCusContainer ';
				    	$(easyDiv+'.datagrid-header-rownumber').html(stt_label);
			    		updateRownumWidthForDataGrid('#gridCus');
			    		$(window).resize();
				      }
			});
			return false;
		},
		upload : function(){ //upload trong fancybox
			$('#errExcelMsg').html('').hide();
			$('#errMsg').html('').hide();
			if ($('#excelFile').val() == '') {
				$('#errExcelMsg').html(msgCommon12).show();
				return false;
			}
			var params = new Object();
			params.token = $('#token').val().trim();
			var options = { 
					beforeSubmit: MCPCatalog.beforeImportExcelEx,   
					success:      MCPCatalog.afterImportExcelEx,
					type: "POST",
					dataType: 'html',
					data: params
			};		
			$('#importFrm').ajaxForm(options);
			$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
				if (r){
					var type = $('input[name="mcpType"]:checked').val();
					$('#typeExport').val(type);
					$('#divOverlay').show();
					$('#importFrm').submit();
				}
			}); 
			return false;
		},
		beforeImportExcelEx: function(){
			$('#errExcelMsg').html('').hide();	
			return true;
		},
		afterImportExcelEx: function(responseText, statusText, xhr, $form){
			if (statusText == 'success') {
				$('#divOverlay').hide();
		    	$("#responseDiv").html(responseText);
		    	var responseToken = $('#responseToken').html().trim();
				if (responseToken != undefined && responseToken != null && responseToken != ''){
					$('#token').val(responseToken);
				}
				if ($('#errorExcelMsg').html().length > 0){
					$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
				}else{
					var totalRow = parseInt($('#totalRow').html().trim());
		    		var numFail = parseInt($('#numFail').html().trim());
		    		var fileNameFail = $('#fileNameFail').html();
		    		var mes = format(msgErr_result_import_excel,(totalRow - numFail),numFail);	
		    		if(totalRow<numFail){
	    				mes = format(MCPCatalog_confirmImport,numFail);
	    			}
		    		if(numFail > 0){
		    			mes+= ' <a href="'+ fileNameFail +'">"'+msgsXemChiTietLoi+'"</a>';
		    		}
		    		$('#errExcelMsg').html(mes).show();
				}
			}
		},
		beforeImportExcel: function(){
			if(!previewImportExcelFile(document.getElementById("excelFile"))){
				return false;
			}
//			showLoadingIcon();
			$('#errExcelMsg').html('').hide();
			$('#successMsg1').html('').hide();
			return true;
		},
		afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
			$('#divOverlay').hide();
			if (statusText == 'success') {		
//				hideLoadingIcon();
		    	$("#responseDiv").html(responseText);		   
		    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
		    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
		    	} else {
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var mes = format(msgErr_result_import_excel,(totalRow - numFail),numFail);
	    			if(totalRow<numFail){
	    				mes=format(MCPCatalog_rowsInvalide,numFail);
	    			}
	    			if(numFail > 0){
	    				mes+= ' <a href="'+ fileNameFail +'">"'+msgsXemChiTietLoi+'"</a>';
	    			}
	    			if($('#excelFile').length!=0 && $('#fakefilepc').length!=0){
	    				try{$('#excelFile').val('');$('#fakefilepc').val('');}catch(err){}
	    			}
	    			$('#errExcelMsg').html(mes).show();
	    			$("#grid").datagrid("reload");
		    	}
		    }	
		},
		exportData : function(){
			var value = $('input[name="mcpType"]:checked').val();
			if(value == 'mcpCode'){
				MCPCatalog.exportMCPCode();
			}else{
				MCPCatalog.exportMCPCustomer();
			}
		},
		exportMCPCode:function(){
			if (MCPCatalog._shopCodeExcel  != null && MCPCatalog._shopCodeExcel  != undefined && MCPCatalog._shopCodeExcel  != ""){

			} else {
				$('#errMsg').html(MCPCatalog_selectUnit).show();
				return false;
			}
			$('#errExcelMsg').html('').hide();
			var shopCode = MCPCatalog._shopCodeExcel.trim();
			var params = new Object();
			params.shopCode = shopCode;
			params.mcpId = MCPCatalog._mcpIdSelect;
			var url = "/catalog/mcp/exportMCPCode";
			$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
				if (r){
					CommonSearch.exportExcelData(params,url,'errExcelMsg');
				}
			});
		},
		exportMCPCustomer:function(){
			$('#errExcelMsg').html('').hide();
			var shopCode = MCPCatalog._mcpShopIdSearch;
			var customerCode = $('#customerCode').val().trim();
			var customerName = $('#customerName').val().trim();
			var status = $('#status').val();
			var houseNumberOrStreet = $('#houseNumberOrStreet').val().trim();
			var areaId = $('#areaId').val();
			var mcpId = MCPCatalog._mcpIdSelect;
			var params = new Object();
			params.shopCode = shopCode;
			params.customerCode = customerCode;
			params.customerName = customerName;
			params.status = status;
			params.houseNumberOrStreet = houseNumberOrStreet;
			params.areaId = areaId;
			params.mcpId = mcpId;
			var url = "/catalog/mcp/exportMCPCustomer";
			$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
				if (r){
					CommonSearch.exportExcelData(params,url,'errExcelMsg');
				}
			});
		},
		removeRouting:function(){
			$.messager.confirm(msgXacNhan, msgTuyenErr5, function(r){
				if (r){
					var node = $('#tree').tree('getSelected');
						var dataModel = new Object();
						dataModel.routingId = node.id;
						Utils.addOrSaveData(dataModel, "/catalog/mcp/remove-routing", MCPCatalog._xhrSave, null,function(data){
							$('#tree').tree('reload');
							$('#grid').datagrid('reload');
						},null,null,true);	
						return false;
					}
				}
			);
	 	}
//		changeTemplate:function(){
//			if($('input[name="mcpType"]:checked').val()=='mcpCode')
//				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/bieu_mau_mcp_code.xls');
//			else $('#downloadTemplate').attr('href',excel_template_path + 'catalog/bieu_mau_mcp_code.xls');
//		}
};