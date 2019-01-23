var UnitTreeCatalog = {
	_listObjectPop : null,
	_isShowDlg: false,
	_xhrSave : null,
	_basicMode: true,
	_listNodeTree:null,
	_idGroup:1,
	_lstGroupAdd:null,
	_lstGroupDelete:null,
	_lstGroupChange:null,
	_lstStaffAdd:null,
	_lstStaffDelete:null,
	_typeScreen: 0,
	_staffOwnerId: 0,
	_zoom : 18,
	_nodeSelect:null,
	_callBack:null,
	_idSearch:null,
	_idSearchStaff:null,
	_idGroupAddNewStaff:null,
	_idOrgAddNewStaff:null,
	_typeAddGroup:null,//khi thêm group vào đơn vị chưa expand thì nó sẽ expand trước rồi trong onExpand mới xử lý addGroup
	_reload:null,
	_itv:null,
	_staffId:null,
	_maxAdmin: 9999,
	_maxGDM: 1,
	_maxGSKV: 1,
	_maxGDBH: 1,
	_maxDDTM: 9999,
	NOLIMIT: 9999,
	ERROR: -1,
	Admin: 1,
	GDM: 2,
	GSKV: 3,
	GSBH1: 4,
	GSBH2: 5,
	GSBH: 45,
	DDTM: 6,
	NVBH1: 7,
	NVBH2: 8,
	NVBH: 78,
	CD: 1,
	MIEN: 2,
	KHUVUC: 3,
	NPP: 4,
	SHOP: 1,
	STAFF: 2,
	GROUP: 3,
	_tree: null,
	_oldNode: null,
	_lat:null,
	_lng:null,
	_isSaveOrUpdateStaffGroup:null,
	_isCreateNewManager: false,
	_widthCbx: null,
	_mapValueOfCbx: null,
	_mapSelectedStaff: null,
	_mapStaffOfGrid: null,
	_staffTreeVO: null,
	_objectChangeGroup: null,
	_htmlPopup: null,
	insertStaffSucess:null,
	hideAllContextMenu:function(){
		$('#cmTaoNhom').hide();
		$('#cmTaoMoiGSBH').hide();
		$('#cmThemNVBH').hide();
		$('#cmTaoMoiNVBH').hide();
		$('#cmThemGSBH').hide();
		$('#cmXoaNhom').hide();
		$('#cmXoaNV').hide();
		$('#cmTaoMoiNVQL').hide();
		$('#cmChuyenNhomNV').hide();
		try{
			$('#cmCreateAccountant').hide();
			$('#cmCreateAccountantCompany').hide();
			$('#cmCreateVansaleStaff').hide();
		}catch(e){}
	},
	/**
	 * download template for import
	 * @author haupv3
	 * @since 16 July 2014
	 * **/
	exportTemplateForImport:function(){
		var url='/catalog/unit-tree/export-template-for-import';

		if(CommonSearch._xhrReport != null){
			CommonSearch._xhrReport.abort();
			CommonSearch._xhrReport = null;
		}
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			dataType: "json",
			success : function(data) {
				hideLoadingIcon();	
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(Warehouse._xuatfileloi + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(Warehouse._khongcodulieu).show();
					} else{
						window.location.href = data.view;
						setTimeout(function(){ 
	                        CommonSearch.deleteFileExcelExport(data.view);
	                  },300000);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {				
			}
		});
		return false;
	},
	showContextMenu:function(type, objectType, node, count, staffTreeVO){//objectType: 1-shop, 2-staff, 3-group
		var node = $('#tree').tree('getSelected');
		if (objectType == 1){
			$('#cmTaoNhom').show();
			$('#cmTaoMoiNVQL').show();
			try{
				$('#cmCreateAccountant').show();
				$('#cmCreateAccountantCompany').show();
			}catch(e){
				
			}
		} else if (objectType == 2){
			$('#cmXoaNV').show();
			if (staffTreeVO != null){
				if (staffTreeVO.staffType == 'NVBH'){
					$('#cmChuyenNhomNV').show();
					UnitTreeCatalog._staffTreeVO = staffTreeVO;
				}
			}
		} else if (objectType == 3){
			if(node.children!=null ){
				if(!UnitTreeCatalog.checkGSOnGroup(node)){
					$('#cmTaoMoiGSBH').show();
					$('#cmThemGSBH').show();
				} 
				
			}else{
				$('#cmTaoMoiGSBH').show();
				$('#cmThemGSBH').show();
				$('#cmXoaNhom').show();
			}
			$('#cmThemNVBH').show();
			$('#cmTaoMoiNVBH').show();
			try{
				$('#cmCreateVansaleStaff').show();
			} catch(e){}
		}
		
		return true;
	},
	filterContextMenu:function(node, count){
		UnitTreeCatalog._isCreateNewManager = false;
		if(node.attributes==null)
			return false;
		UnitTreeCatalog.hideAllContextMenu();
		if (node.attributes != null && node.attributes.shopTreeVO != null){
			return UnitTreeCatalog.showContextMenu(node.attributes.shopTreeVO.shopTypeId, 1, node, count);
		} else if (node.attributes != null && node.attributes.staffTreeVO != null){
			return UnitTreeCatalog.showContextMenu(node.attributes.staffTreeVO.staffTypeId, 2, node, count, node.attributes.staffTreeVO);
		} else if (node.attributes != null && node.attributes.staffGroupVO != null){
			return UnitTreeCatalog.showContextMenu(node.attributes.staffGroupVO, 3, node, count);
		} else 
			return false;
	},
	getParentNode: function(node, tree){
		if (tree.children == null)
			return null;
		for (var i=0; i < tree.children.length; i++){
			var n = tree.children[i];
			if ((n.id == node.id || (n.id.indexOf(node.id) != -1 && n.id.indexOf("g") != -1 )) && UnitTreeCatalog.isSameTypeNode(n, node))
				return tree;
			var pn = UnitTreeCatalog.getParentNode(node, n);
			if (pn != null)
				return pn;
		}
		return null;
	},
	isSameTypeNode: function(n1, n2){
		if (n1.attributes != null && n2.attributes != null){
			if ((	n1.attributes.staffTreeVO != null && n1.attributes.shopTreeVO == null && n1.attributes.staffGroupVO == null
					&& n2.attributes.staffTreeVO != null && n2.attributes.shopTreeVO == null && n2.attributes.staffGroupVO == null)
				|| (n1.attributes.staffTreeVO == null && n1.attributes.shopTreeVO != null && n1.attributes.staffGroupVO == null
					&& n2.attributes.staffTreeVO == null && n2.attributes.shopTreeVO != null && n2.attributes.staffGroupVO == null)
				|| (n1.attributes.staffTreeVO == null && n1.attributes.shopTreeVO == null && n1.attributes.staffGroupVO != null
					&& n2.attributes.staffTreeVO == null && n2.attributes.shopTreeVO == null && n2.attributes.staffGroupVO != null))
				return true;
		} else return false;
	},
	getNodeInTree: function(nid, tree, nodeType){	//1 : shop, 2 : staff, 3: group
		if (nid == UnitTreeCatalog._tree.id)
			return UnitTreeCatalog._tree;
		if (tree.children == null)
			return null;
		for (var i=0; i<tree.children.length; i++){
			var n = tree.children[i];
			if (n.id == nid){
				if (nodeType != undefined && nodeType != null){
					if ((nodeType == UnitTreeCatalog.SHOP && n.attributes.shopTreeVO != null) || 
							(nodeType == UnitTreeCatalog.STAFF && n.attributes.staffTreeVO != null) ||
							(nodeType == UnitTreeCatalog.GROUP && n.attributes.staffGroupVO != null))
						return n;
				} else
					return n;
			}
			var nn = UnitTreeCatalog.getNodeInTree(nid, n, nodeType);
			if (nn != null)
				return nn;
		}
		return null;
	},
	reloadUnitTree:function(){
		if(UnitTreeCatalog._idOrgAddNewStaff!=null){ 
			UnitTreeCatalog.loadUnitTree(UnitTreeCatalog._idOrgAddNewStaff);
		}else{
			var node = $('#tree').tree('getSelected');
			if(node!=null && node.attributes!=null){
				var attr=node.attributes;
				if(attr.org!=null) UnitTreeCatalog.loadUnitTree(attr.org.id);
				else if(attr.group!=null) UnitTreeCatalog.loadUnitTree(attr.group.org.id);
				else if(attr.staff!=null) UnitTreeCatalog.loadUnitTree(attr.staff.org.id);
				else UnitTreeCatalog.loadUnitTree();
			}else{
				UnitTreeCatalog.loadUnitTree();
			}
		}
	},
	loadUnitTree:function(idSearch,idSearchStaff, ownStaffId, openId){ // ownStaffId: cap nhat staffOwmer cho cac child staff
		UnitTreeCatalog._listNodeTree=new Map();
		UnitTreeCatalog._lstGroupAdd=new Map();
		UnitTreeCatalog._lstStaffAdd=new Map();
		UnitTreeCatalog._lstStaffDelete=new Map();
		UnitTreeCatalog._lstGroupChange=new Map();
		UnitTreeCatalog._lstGroupDelete=new Map();
		UnitTreeCatalog._idOrgAddNewStaff=null;
		if(idSearch!=undefined && idSearch!=null && idSearch!=0){//search đến org cần tìm
			UnitTreeCatalog._idSearch=idSearch;
			if(idSearchStaff!=undefined && idSearchStaff!=null && idSearchStaff!=0){
				UnitTreeCatalog._idSearchStaff=idSearchStaff;
			}
		}
		$('#tree').tree({  
		    url:'/catalog/unit-tree/get-unit-tree' ,
		    dnd:true,
		    lines:true,
		    singleSelect: false,
		    onBeforeLoad: function(n,p){
		    	if (p.id != undefined) return false;
		    	$('#divOverlay').show();
		    	if(UnitTreeCatalog._idSearch!=null && UnitTreeCatalog._idSearch!=0){
		    		p.idSearch=UnitTreeCatalog._idSearch;
		    		$('#divOverlay').show();
		    	}
		    },
		    onLoadSuccess:function(parent,data){
		    	UnitTreeCatalog._tree = data[0];
		    	if(UnitTreeCatalog._idSearch!=null){
		    		try{
		    			var id=UnitTreeCatalog._idSearch;
		    			if(UnitTreeCatalog._idSearchStaff!=null && UnitTreeCatalog._idSearchStaff!=0){
		    				id='s'+UnitTreeCatalog._idSearchStaff;
		    			}
		    			var node = $('#tree').tree('find', id);
			    		if(node!=null){
			    			$('#tree').tree('select', node.target);
			    		}
		    		}catch(e){}
		    		UnitTreeCatalog._idSearch=null;
		    	}
		    	if(UnitTreeCatalog._typeAddGroup!=null){
		    		UnitTreeCatalog.addNewGroup(UnitTreeCatalog._typeAddGroup);
		    	}
		    	UnitTreeCatalog.resize();
		    	if (openId != null && openId != -1)
		    		UnitTreeCatalog.expandToNode(openId);
		    	if (ownStaffId != undefined){
			    	if (ownStaffId.toString().indexOf("g") != -1)
			    		UnitTreeCatalog.updateStaffOwner(ownStaffId.substring(1), true);
			    	else UnitTreeCatalog.updateStaffOwner(ownStaffId, false);
		    	}
		    	$('#divOverlay').hide();
		    },
		    formatter:function(node){
		    	var supportText = '';
		    	if(node.role != null && node.role == 'GROUP'){
		    		supportText = formatTreeGroup;
		    	}else if (node.role != null && node.role == 'GS'){
		    		supportText = formatTreeGS;
		    	}else if (node.role != null && node.role == 'NV'){
		    		supportText = formatTreeNV;
		    	}else if (node.role != null && node.role == 'MANAGER' && node.id > 0){
		    		supportText = formatTreeQL;
		    	}
		    	return supportText + Utils.XSSEncode(node.text);
			},
		    onContextMenu:function(e, node){
		    	e.preventDefault();
				$('#tree').tree('select', node.target);
				if (UnitTreeCatalog.filterContextMenu(node)) {
					if($('#isManager').val() == 'false'){
						$('#contextMenu').menu('show', {
							left : e.pageX-5,
							top : e.pageY-5
						});
						$('#contextMenu').css('height', 'auto').css('width', 'auto').css('min-width', 150);
					}
				}
			},
			onCollapse:function(node){

				UnitTreeCatalog.resize();
			},
			onExpand :function(node) {
				UnitTreeCatalog.resize();
			},
	        onClick : function(node) {
				if ($('#searchStaffUnitTreeGrid').length == 1
						&& node != null
						&& node.attributes != null
						&& (node.attributes.staffGroupVO != null || node.attributes.shopTreeVO != null)) {
					UnitTreeCatalog.search(0);
				} else if (node != null
						&& node.attributes != null
						&& (node.attributes.staffGroupVO != null || node.attributes.shopTreeVO != null)) {
					UnitTreeCatalog.showSearchScreen();
				} else {//connv
					if(node.childrenId != null && node.childrenId != ''){
						UnitTreeCatalog.search(0);
					}
				}
			},
			onDblClick:function(node){
	        	if (node != null && node.attributes!=null){
	        		if (node.attributes.staffTreeVO != null){
	        			var pNode = UnitTreeCatalog.getParentNode(node, UnitTreeCatalog._tree);
	        			if (pNode != null){
	        				if (pNode.id.indexOf("g") != -1)
		        				pNode = UnitTreeCatalog.getParentNode(pNode, UnitTreeCatalog._tree);
		        			UnitTreeCatalog.showStaffEditScreen(node.attributes.staffTreeVO.staffId, 1,node.attributes.staffTreeVO.staffTypeId, pNode.id);
	        			}else if (node.attributes.isRoot){
	        				UnitTreeCatalog.showLastView();
	        			}
	        		}else if(node.attributes.staffGroupVO !=null){
	        			UnitTreeCatalog.dialogCreateStaffGroup(node.attributes.staffGroupVO);
	        		}else if(node.attributes.shopTreeVO !=null){
	        			UnitTreeCatalog.showLastView();
	        		}
	        	}
	        	
	        },
	        onBeforeEdit:function(nodeTarget){
	        },
	        onAfterEdit:function(nodeTarget){
	        },
			onBeforeDrag:function(node){
				if(!$('#cbChange').is(':checked')) return false;
				if(node.attributes != null && (node.attributes.shopTreeVO != null || node.attributes.staffGroupVO != null))
					return false;
				return true;
			},
			onBeforeDrop:function(target,source,point){
				if(point!=undefined) return false;
				var nodeTarget=$('#tree').tree('getNode', target);
				return UnitTreeCatalog.doDrop(source,nodeTarget);

			}
		});
	},
	checkStaffOnTree:function(staffId){
		for(var i=0;i<UnitTreeCatalog._listNodeTree.valArray.length;i++){
			var temp = UnitTreeCatalog._listNodeTree.valArray[i];
			if(temp!=null && temp.attributes!=null && temp.attributes.staff!=null && temp.attributes.staff.id==staffId){
					return true;
			}
		}
		return false;
	},
	checkGSOnGroup:function(node){
		for(var i=0;i<node.children.length;i++){
			var temp =node.children[i];
			if(temp!=null && temp.attributes!=null && temp.attributes.staffTreeVO!=null && temp.attributes.staffTreeVO.staffType=="GS"){
					return true;
			}
		}
		return false;
	}
	,
	parseStaff:function(staff){
		var staffVO = new Object();
		staffVO.id=staff.id;
		staffVO.org=staff.organization;
		staffVO.staffCode=staff.staffCode;
		staffVO.staffName=staff.staffName;
		staffVO.staffType=staff.roleType;
		return staffVO;
	},
	//-------------------------------------------------------------------------------------------------------
	resize: function() {
		var hSidebar3=$('#tree').height();
		var hSidebar1=$('.Content3Section').height();
		
		if(hSidebar3> 650) {
			$('.ReportTree2Section').css('height', 'auto');	
		} else {
			if(hSidebar3 <  hSidebar1) {
				if(hSidebar1 < 700) {
					$('.ReportTree2Section').height(hSidebar1-60);
				} else {
					$('.ReportTree2Section').height(650);
				}
			} else {
				if(hSidebar3 < 300) {
					$('.ReportTree2Section').height(300);
				} else {
					$('.ReportTree2Section').css('height', 'auto');	
				}
			}
		}
		var hSidebar2=$('.Sidebar1Section').height();
		if( hSidebar1 > hSidebar2 ) {
			$('.Content1Section').height(hSidebar1);
		}
		else $('.Content1Section').height(hSidebar2);
		return ;
	},
	showSearchScreen: function(view){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/show-search',function(data) {
			$("#unitTreeContent").html(data).show();

			//anhhpt: Khi tao nhan vien thanh cong, hien thi thong bao password ngay duoi datagrid
			if(UnitTreeCatalog.insertStaffSucess ){
				$('#msgPasswordDefault').show();
				$('#msgPasswordDefault').html(msgImportStaffPass);
//				Utils.showMessage(msgImportStaffPass);//LamNH
			}else{
				$('#msgPasswordDefault').hide();
				$('#msgPasswordDefault').html('');
				Utils.hideMessage();//LamNH
			}
			
		}, null, 'POST');
		return false;
	},
	showSearchScreenSuper: function(view){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree-supervise/show-search',function(data) {
			$("#unitTreeContent").html(data).show();

			//anhhpt: Khi tao nhan vien thanh cong, hien thi thong bao password ngay duoi datagrid
			if(UnitTreeCatalog.insertStaffSucess ){
				$('#msgPasswordDefault').show();
				$('#msgPasswordDefault').html(msgImportStaffPass);
//				Utils.showMessage(msgImportStaffPass);//LamNH
			}else{
				$('#msgPasswordDefault').hide();
				$('#msgPasswordDefault').html('');
				Utils.hideMessage();//LamNH
			}
			
		}, null, 'POST');
		return false;
	},
	//staffId : id cua nhan vien
	//typeView : check xem la xem thong tin hay chinh sua thong tin, 0:xem, 1:sua, 2:tao moi
	showShopEditScreen: function(shopId,typeView){
		UnitTreeCatalog.expandToNode(shopId, UnitTreeCatalog.SHOP);
		var params = new Object();
		params.shopId = shopId;
		params.typeView = typeView;
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/view-shop',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
		}, null, 'POST');
		return false;
	},
	searchStaff : function(){
		var staffCode = $('#staffCode').val().trim();
		var staffName = $('#staffName').val().trim();
		var shopId = $('#searchShopId').val().trim();
		var staffGroupId = $('#searchGroupId').val().trim();
		var status = $('#status').val();
		$('#searchStaffUnitGrid').datagrid('load',{staffCode: staffCode, staffName: staffName,shopId:shopId,staffGroupId:staffGroupId, status: status});
	},
	//ham load trang search danh sach nhan vien
	showStaffSearchScreen: function(){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/manage-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
		}, null, 'POST');
		return false;
	},
	
	//ham load trang search danh sach nhan vien cho NVGS
	showStaffForSuperviseSearchScreen: function(){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree-supervise/manage-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
		}, null, 'POST');
		return false;
	},
	
	//ham load trang tao moi nhan vien , 
	//tham so : 
	//staffCreateType - loai Nhan vien tao moi ,  
	//staffGroupId - nhom nhan vien dc tao moi truyen tu cay don vi
	//orgId : id cua don vi
	//orgName: ten cua don vi
	// isFromList - check tao moi nhan vien tu cay don vi hay tu trang danh sach nhan vien
	showStaffCreateScreen: function(staffType,orgId,orgName,staffGroupId){
		// lay thong tin node duoc click tren cay don vi
		var node = $('#tree').tree('getSelected');
		var orgType = null;
		//id nhan vien quan ly truc tiep - default 0
		var staffOwnerId = 0;
		if (node == null) {
			$('#errMsg').html(loithemmoinv).show();
//			Utils.showMessage(loithemmoinv);//LamNH
			return false;
		} else {
			//chi thuc hien thao tac khi click vao node la don vi
			if (node.attributes.staff == null) {
				//node don vi RITA
				if (node.id == "1") {
					orgId = node.attributes.org.id;
					orgName = node.attributes.org.orgName;
					var nodeTmp = UnitTreeCatalog._listNodeTree.valArray[2];
					staffOwnerId = nodeTmp.attributes.staff.id;
					orgType = 0;
				} 
				//group don vi RITA
				else if (node.id == "g1") {
					orgId = node.attributes.group.org.id;
					orgName = node.attributes.group.org.orgName;
					var nodeTmp = UnitTreeCatalog._listNodeTree.valArray[2];
					staffOwnerId = nodeTmp.attributes.staff.id;
					orgType = 0;
				} else {
					//neu node click vao la don vi
					if (node.attributes.org != null) {
						orgId = node.attributes.org.id;
						orgName = node.attributes.org.orgName;
						//loai don vi la Nganh
						if (node.attributes.org.type == "REGION") {
							orgType = 1;
						} else if (node.attributes.org.type == "AREA") {
							orgType = 2;
						} else if (node.attributes.org.type == "GROUP") {
							orgType = 3;
						}
					} 
					// neu node click vao la nhom
					else if (node.attributes.group != null) {
						orgId = node.attributes.group.org.id;
						orgName = node.attributes.group.org.orgName;
						if (node.attributes.group.org!= null) { 
							if (node.attributes.group.org.type == "REGION") {
								orgType = 1;
							} else if (node.attributes.group.org.type == "AREA") {
								orgType = 2;
							} else if (node.attributes.group.org.type == "GROUP") {
								orgType = 3;
							}
						}
					}
				}
				var params = new Object();
				params.staffType = staffType;
				params.orgId = orgId;
				params.orgName = orgName;
				params.orgType = orgType;
				params.staffGroupId = staffGroupId;
				Utils.getHtmlDataByAjax(params, '/unit-tree/view-staff',function(data) {
					$("#unitTreeContent").html(data).show();
					$('#errMsg').html('').hide();
					Utils.hideMessage();//LamNH
					UnitTreeCatalog.resize();
					UnitTreeCatalog._typeScreen = -3;
				}, null, 'POST');
			}
		}	
		return false;
	},
	//ham load trang xem va chinh sua thong tin nhan vien
	//tham so : 
	//staffId : id cua nhan vien
	//typeView : check xem la xem thong tin hay chinh sua thong tin, 0:xem, 1:sua, 2:tao moi
	showStaffEditScreen: function(staffId,typeView, staffType, staffGroupId){
//		var node = UnitTreeCatalog.getNodeInTree(staffId, UnitTreeCatalog._tree, 2);
		UnitTreeCatalog.expandToNode(staffId,UnitTreeCatalog.STAFF);
		var params = new Object();
		if (staffGroupId != null && staffGroupId != undefined 
				&& staffType != StaffTypeObject.KE_TOAN
				&& staffType != StaffTypeObject.KE_TOAN_CONG_TY){
			params.staffGroupId = staffGroupId;
		}
		params.staffId = staffId;
		params.staffType = staffType;
		params.typeView = typeView;
		params.shopId = $('#shopId').val().trim();
//		params.staffInUnitTree = false;
//		if (node != null)
//			params.staffInUnitTree = true;
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/view-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
			UnitTreeCatalog.insertStaffSucess = false;
		}, null, 'POST');
		return false;
	},
	showStaffEditScreenSupervise: function(staffId,typeView, staffType, staffGroupId){
//		var node = UnitTreeCatalog.getNodeInTree(staffId, UnitTreeCatalog._tree, 2);
		var params = new Object();
		if (staffGroupId != null && staffGroupId != undefined 
				&& staffType != StaffTypeObject.KE_TOAN
				&& staffType != StaffTypeObject.KE_TOAN_CONG_TY){
			params.staffGroupId = staffGroupId;
		}
		params.staffId = staffId;
		params.staffType = staffType;
		params.typeView = typeView;
		params.shopId = $('#shopId').val().trim();
//		params.staffInUnitTree = false;
//		if (node != null)
//			params.staffInUnitTree = true;
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree-supervise/view-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
			UnitTreeCatalog.insertStaffSucess = false;
		}, null, 'POST');
		return false;
	},
	showStaffEditScreen1: function(staffId,typeView){
		var rows = $('#searchStaffUnitTreeGrid').datagrid("getRows");
		var row = null;
		for (var i=0; i<rows.length; i++){
			if (rows[i].id == staffId)
				row = rows[i];
		}
		var shopId = (row.shop == null ? 0 : row.shop.id);
		var staffType = row.staffType.objectType;
		UnitTreeCatalog.showStaffEditScreen(staffId,typeView, staffType, shopId);
	},
	showStaffEditScreenSupervise1: function(staffId,typeView){
		var rows = $('#searchStaffUnitTreeGrid').datagrid("getRows");
		var row = null;
		for (var i=0; i<rows.length; i++){ 
			if (rows[i].id == staffId)
				row = rows[i];
		}
		var shopId = (row.shop == null ? 0 : row.shop.id);
		var staffType = row.staffType.objectType;
		UnitTreeCatalog.showStaffEditScreenSupervise(staffId,typeView, staffType, shopId);
	},
	getParamSearchStaff:function(){
		var param = new Object();
		var node = $('#tree').tree('getSelected');
		if($('#staffCodeSearch').val().trim()!='') param.staffCode=$('#staffCodeSearch').val().trim();
		if($('#staffNameSearch').val().trim()!='') param.staffName=$('#staffNameSearch').val().trim();
		if($('#staffInfoSearch').val().trim()!='') param.staffInfoSearch=$('#staffInfoSearch').val().trim();
		if($('#statusSearch').val() != null && $('#statusSearch').val().length > 0) 
			param.status=$('#statusSearch').val();
		var listStaffTypeId = [];
		var listStaffTypeIdStr = '';
		if ($('#staffTypeCombobox').val() != null){
			listStaffTypeId = $('#staffTypeCombobox').val();
		}
		if (listStaffTypeId != null && listStaffTypeId.length > 0){
			for (var i=0, size = listStaffTypeId.length; i< size; i++){
				if (i ==0){
					listStaffTypeIdStr += listStaffTypeId[i];
				}else{
					listStaffTypeIdStr += ',' + listStaffTypeId[i];
				}
			}
		}
		param.listStaffTypeIdStr = listStaffTypeIdStr;
		
		if (node != null) {
			
			//connv
			if ($('#searchStaffUnitTreeGrid').length == 1
					&& node != null
					&& node.attributes != null
					&& (node.attributes.staffGroupVO != null || node.attributes.shopTreeVO != null)) {
				param.childrenIdStr = '';
			} else {
				param.childrenIdStr = node.childrenId;
			}
			
			if(node.attributes != null && node.attributes.staffGroupVO!=null) {
				param.staffGroupId= node.attributes.staffGroupVO.staffGroupId;
				$('#searchGroupId').val(node.attributes.staffGroupVO.staffGroupId);
				$('#searchShopId').val(node.attributes.staffGroupVO.shopId);
			}else{
//				node.attributes = new Object();
				
				
			}
		}
		
		/**
		 * Bo sung tim kiem theo thuoc tinh dong
		 * @author haupv3
		 * @since: 19/11/2014
		 * **/
		var arr1 = new Array();
		var arr2 = new Array();
		var arrMultiSize = new Array();
		if(UnitTreeCatalog._basicMode == false){
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
		
		param.lstAttIdArray = arr1.toString();
		param.lstAttValueArray = arr2.toString();
		param.lstMultiSizeArr = arrMultiSize.toString();
		
		return param;
	},
	
	loadkendoMultiselect: function(selector, dataSource, textField, valueField, formatStrAfterSelected, callBackSelectEvent){
		$(selector).kendoMultiSelect({
			dataSource: dataSource,
			filter: "contains",
			dataTextField: textField,
			dataValueField: valueField,
			itemTemplate: function(data, e, s, h, q) {
				return Utils.XSSEncode(data.staffCode)+' - '+Utils.XSSEncode(data.staffName);
			},
			tagTemplate:  formatStrAfterSelected,
			select: function(e) {
				if (callBackSelectEvent != null){
					callBackSelectEvent.call(this, e);
				}
			},
			change: function(e){
				var value = this.value();
				var html = "";
				if (value != null && value.length > 0){
					for (var i=0, size = value.length; i< size; i++){
						var tmp = UnitTreeCatalog._mapValueOfCbx.get(value[i]);
						if (tmp != null){
							if (i == 0){
								html += tmp.staffCode + " - " +tmp.staffName;
							}else{
								html += ", " + tmp.staffCode + " - " +tmp.staffName;
							}
						}
					}
				}
				$('#choosedStaffList').html(html);
			}
		});
	},
	

	//ham search thong tin cua nhan vien
	//tham so :
	//independentSearch : check xem co search theo node tren cay don vi hay khong
	search: function(){
		$('#errMsg').html('').hide();
		$('#msgPasswordDefault').hide();
		$('#msgPasswordDefault').html('');
		UnitTreeCatalog.insertStaffSucess = false;
		Utils.hideMessage();//LamNH
		var param = UnitTreeCatalog.getParamSearchStaff();
		$('#searchStaffUnitTreeGrid').datagrid('load',param);
		return false;
	},
	createStaff: function(staffType){ 
		if (staffType == StaffTypeObject.NHAN_VIEN_QUAN_LY){/**stafftype = 6*/
			UnitTreeCatalog.showStaffEditScreen(-1, 2, staffType, null);
		}else if (staffType == StaffTypeObject.KE_TOAN || staffType == StaffTypeObject.KE_TOAN_CONG_TY){
			UnitTreeCatalog.showStaffEditScreen(-1, 2, staffType, null);
		}else{
			var node = $('#tree').tree('getSelected'); 
			UnitTreeCatalog.showStaffEditScreen(-1, 2, staffType, node.attributes.staffGroupVO.staffGroupId);
		}
	},
	dialogCreateStaffGroup: function(staffGroup){
		var dom = $('#errGroupMsg');
		if (dom != undefined && dom != null){
			dom.html('').hide();
		}
		$('#popupStaffGroup').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 600,
			/*height : 500,*/
			onOpen: function(){
				$('#staffGroupCode').val('');
				$('#staffGroupName').val('');
				$("#staffGroupCode").focus();
				$('#startTime').val('07:00');
				$('#endTime').val('08:30');
				$('#distance').val('300');
				$('#popupStaffGroup #successMsg').html('');
				$('#addressSearch').val('');
				$('#addressSearch').unbind('keyup');
				$("#addressSearch").bind("keyup", function(event) {
					if (event.keyCode == keyCodes.ENTER) {
						UnitTreeCatalog.searchLocation();
					}
				});
				var lat=null;
				var lng=null; 
				if(staffGroup!=null && staffGroup!=undefined){
					$('#btnSaveStaffGroup').html(capnhat);
					$('#staffGroupCode').val(staffGroup.staffGroupCode);
					$('#staffGroupName').val(staffGroup.staffGroupName);
					$('#startTime').val(staffGroup.startTime);
					$('#endTime').val(staffGroup.endTime);
					$('#distance').val(staffGroup.distance);
					lat=staffGroup.lat;
					lng=staffGroup.lng;
					UnitTreeCatalog._lat=lat;
	 				UnitTreeCatalog._lng=lng;
					UnitTreeCatalog._isSaveOrUpdateStaffGroup=1;
					$('#staffGroupCode').attr('disabled','disabled');
				}else{
					$('#staffGroupCode').removeAttr('disabled');
					$('#btnSaveStaffGroup').html(themmoi);
					UnitTreeCatalog._isSaveOrUpdateStaffGroup=0;
				}
				if($('#mapType').val() != null && parseInt($('#mapType').val()) == 0){
					setTimeout(function() {
						var zoom = 4;
						if(!ViettelMap.isValidLatLng(lat,lng)){
							zoom = 4;
						} else if(zoom == undefined || zoom == 0 || zoom == null){
							zoom = 4;
						} else{
							zoom = 18;
						}
						ViettelMap.loadMapResource(function(){
							ViettelMap.loadBigMap('bigMap',lat, lng, zoom,function(lat, lng){
								ViettelMap.clearOverlays();
								ViettelMap.addMarker(lat,lng);
								UnitTreeCatalog._lat=lat;
								UnitTreeCatalog._lng=lng;
							});
							$('#bigMap .olControlSelectFeatureActive').next().remove();
						});
					}, 500);      
				}else{
					setTimeout(function() {
						var zoom = 5;
						if(!ViettelMap.isValidLatLng(lat,lng)){
							zoom = 5;
						} else if(zoom == undefined || zoom == 0 || zoom == null){
							zoom = 5;
						} else{
							zoom = 18;
						}
						ViettelMap.loadBigMap('bigMap',lat, lng,zoom,function(lat, lng){
							ViettelMap.clearOverlays();
							ViettelMap.addMarker(lat,lng);
							UnitTreeCatalog._lat=lat;
							UnitTreeCatalog._lng=lng;
						});			 			
					}, 500);
				}
			},
			onClose : function(){
				ViettelMap.clearOverlays();
				$('#bigMap').html('');
			}
		});
		
	},
	changeGroupForStaff: function(){
		var params = UnitTreeCatalog._objectChangeGroup;
		if (params == null){
			params = {
					
			};
		}
		params.staffId = UnitTreeCatalog._staffTreeVO.staffId;
		var combobox = $("#chooseNewGroupCbx").data("kendoComboBox");
		if (combobox != undefined && combobox != null){
			params.staffGroupId = combobox.value();
			params.isMoveToNewRouting = $('#moveStaffCheck').is(':checked') == true? 1: 0;
			params.isKeepOldRouting = $('#keepRoutingCheck').is(':checked') == true? 1: 0;
			params.newRoutingCode = $('#newRoutingCode').val();
			params.newRoutingName = $('#newRoutingName').val();
			/**
			 * kiem tra dieu kien
			 */
			if (StringUtils.isNullOrEmpty(params.staffGroupId+'')){
				$('#errChangeGroupMsg').html(msgChonNhom).show();
				return;
			}
			if (params.isMoveToNewRouting == 1 && params.isKeepOldRouting == 0 && !$('#divMoveRouting').is(':hidden')){
				var msg = '';
				if(msg.length ==0){
					msg = Utils.getMessageOfRequireCheck('newRoutingCode',SuperviseManageRouteCreate_routingCode);
				}
				if(msg.length ==0){
					msg = Utils.getMessageOfSpecialCharactersValidate('newRoutingCode',SuperviseManageRouteCreate_routingCode, Utils._CODE);
				}
				if(msg.length ==0){
					msg = Utils.getMessageOfRequireCheck('newRoutingName',SuperviseManageRouteCreate_routingName);
				}
				if(msg.length ==0){
					msg = Utils.getMessageOfSpecialCharactersValidate('newRoutingName',SuperviseManageRouteCreate_routingName, Utils._NAME);
				}
				if (!StringUtils.isNullOrEmpty(msg)){
					$('#errChangeGroupMsg').html(msg).show();
					return;
				}
				if (StringUtils.isNullOrEmpty(params.newRoutingCode)){
					$('#errChangeGroupMsg').html(msgNhapMaTuyen).show();
					setTimeout(function(){
						$('#newRoutingCode').focus();
					}, 100);
					return;
				}
				if (StringUtils.isNullOrEmpty(params.newRoutingName)){
					$('#errChangeGroupMsg').html(msgNhapTenTuyen).show();
					setTimeout(function(){
						$('#newRoutingName').focus();
					}, 100);
					return;
				}
			}
			
			var url = '/catalog/unit-tree/changeGroupforStaff';
			Utils.addOrSaveData(params, url, UnitTreeCatalog._xhrSave, 'errChangeGroupMsg',function(data){
				if (data != null){
					if (data.error == true){
						
					}else if (data.error == false){
						setTimeout(function(){
							$('#popupChangeGroupForStaff').dialog('close');
						}, 300);
						$('#tree').tree('reload');
					}
				}
			});
		}
	},
	bindOnCheckChangeGroup: function(checkboxSelector, div, flag){
		var dom = $(checkboxSelector);
		if (dom != undefined && dom != null){
//			dom.unbind('change');
			if (flag){
				dom.live('change', function(){
					if ($(this).is(':checked')){
						$(div).show();
					}else{
						$(div).hide();
						$(div + ' input').val('');
					}
				});
			}else{
				dom.live('change', function(){
					if (!$(this).is(':checked')){
						$(div).show();
					}else{
						$(div).hide();
						$(div + ' input').val('');
					}
				});
			}
		}
	},
	openDialogChangGroup: function(){
		$('#popupChangeGroupForStaff').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 600,
			/*height : 500,*/
			onOpen: function(){
				UnitTreeCatalog._htmlPopup = $('#popupChangeGroupForStaff .PopupContentMid2').html();
				$('#divKeepRouting, #divNewCodeRouting').hide();
				$('#divMoveRouting').show();
				$('#moveStaffCheck').attr('checked', false);
				$('#keepRoutingCheck').attr('checked', true);
				$('#cStaffName').html('');
				$('#cRoutingKeeping').html('');
				$('#newRoutingCode').val('');
				if (UnitTreeCatalog._staffTreeVO != null){
					var s = UnitTreeCatalog._staffTreeVO;
					$('#cStaffName').html(s.staffName);
					var params = {
						staffId: s.staffId	
					};
					var url = '/catalog/unit-tree/loadChangeGroupPopupInfo';
					Utils.getJSONDataByAjaxNotOverlay(params, url, function(data){
						if (data != null && data.listStaffGroup != null){
							if (data.routing != null && !StringUtils.isNullOrEmpty(data.routing)){
								$('#cRoutingKeeping').html(Utils.XSSEncode(data.routing.routingCode + ' - ' +data.routing.routingName));
								UnitTreeCatalog._objectChangeGroup = {
										routingId: data.routing.id,
										routingCode: data.routing.routingCode
								};
							}else{
								$('#cRoutingKeeping').html('');
								$('#divMoveRouting').hide();
							}
							var combobox = $("#chooseNewGroupCbx").data("kendoComboBox");
							if (combobox != undefined || combobox != null){
								combobox.destroy();
								$("#chooseNewGroupCbx").val('');
							}
							$("#chooseNewGroupCbx").kendoComboBox({
								  dataSource: data.listStaffGroup,
								  dataTextField: "staffGroupCodeName",
								  dataValueField: "id",
								  autoBind: false,
							      filter: "contains"
							       
								});
						}
					});
				}
			},
			onClose : function(){
				UnitTreeCatalog._staffTreeVO = null;
				UnitTreeCatalog._objectChangeGroup = null;
				$('#popupChangeGroupForStaff .PopupContentMid2').html(UnitTreeCatalog._htmlPopup);
				UnitTreeCatalog._htmlPopup = null;
			}
		});
	},
	searchLocation: function(){
		var address = $('#addressSearch').val();
		if (!StringUtils.isNullOrEmpty(address)){  
			var url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeChar(address)+'&sensor=true';
			Utils.getJSONDataByAjaxNotOverlay({}, url, function(data){
				if (data != null && data.results != null && data.results.length > 0){
					var f = data.results[0];
					var lat = f.geometry.location.lat;
					var lng = f.geometry.location.lng;
					ViettelMap.clearOverlays();
	 				ViettelMap.addMarker(lat, lng);
	 				UnitTreeCatalog._lat=lat;
					UnitTreeCatalog._lng=lng;
					try{
						ViettelMap._map.setZoom(18);
					}catch(e){}
					var latlng = ViettelMap.createLatLng(lat, lng);
					ViettelMap._map.setCenter(latlng);
				}else{
					/**
					 * Khong search ra vi tri
					 */
					$('#errGroupMsg').html(msgKhongTimRaViTri).show();
					UnitTreeCatalog.deleteLocation();
					setTimeout(function(){
						$('#errGroupMsg').html('').hide();
					}, 10000);
				}
			});
		}
	},
	deleteLocation: function(){
		try{
			ViettelMap.clearOverlays();
			ViettelMap._marker.setMap(null);
		}catch(e){
			
		}
		/*if (ViettelMap._marker != null){
			ViettelMap.clearOverlays();
			ViettelMap._marker.setMap(null);
		}*/
		UnitTreeCatalog._lat = null;
		UnitTreeCatalog._lng = null;
	},
	deleteParamsTimekeeping: function(){
		$('#distance, #startTime, #endTime').val('');
	},
	updateOrCreateStaff: function(){
		var staffTypeId = $('#staffTypeIdHidden').val();
		var staffTypeIdChange = null;
		var staffId = $('#staffId').val();
		if (!StringUtils.isNullOrEmpty(staffTypeId) && !StringUtils.isNullOrEmpty(staffId)){
			staffTypeIdChange = $('#existedStaffOffice').combobox('getValue');
		}
		if (staffTypeIdChange != null && staffTypeId != null && staffTypeIdChange != staffTypeId && staffId != null && staffId > 0){
			var title = msgXacNhan;
			var message = msgThayDoiChucVuConfirm;
			$.messager.confirm(title, message, function(r){
				if (r != null && r == true){
					UnitTreeCatalog.excuteUpdateOrCreateStaff(true);					
				}
			});
		}else{
			 UnitTreeCatalog.excuteUpdateOrCreateStaff(false);
		}
	},
	excuteUpdateOrCreateStaff: function(isUpdateStaffType){
		setTimeout(function(){
			$('#errMsgStaff').html('').hide();
		}, 3000);
		UnitTreeCatalog.insertStaffSucess = false;
		var msg = '';
		$('#errMsg').html('').hide();
		$('#errMsgStaff').html('').hide();
		var params = ValidateUtils.validate("#errMsgStaff", "#staffUnitDetailContent");
		if (params.error) {
			return false;
		}
		var msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffCode', msgStaffCode , Utils._CODE);
		if(msg.length > 0){
			return false;
		}
		var dataModel = new Object();
		if($('#staffGroupId').val()!=null && $('#staffGroupId').val() != '' && $('#staffGroupId').val() > 0){
			dataModel.staffGroupId = $('#staffGroupId').val().trim();
		}else{
			dataModel.staffGroupId='';
		}
		var lstAttributesId = [];
		var lstAttributeValues = [];
		var i=0;
		$('.attributeCls').each(function() {
			var objectId = '#' + $(this).attr('id');
			var idx = objectId.split('_')[1];
			lstAttributesId[i] = $('#attH_' + idx).val().trim();
			lstAttributeValues[i] = $(objectId).val();
			if (lstAttributeValues[i] == null || lstAttributeValues[i] == '-1') {
				lstAttributeValues[i] = '';
			}
			i++;
		});	
		
		var stPhone = $('#staffPhone').val().trim();
		var isVnServer = $('#isVnServer').val();
		
		if(!Utils.isEmpty(stPhone)){
			if(isVnServer == true || isVnServer == 'true'){
				if(!Utils.isValidPhoneNumber(stPhone)){
					msg += msgInvalidPhoneNumber;
				}
			}
		}
		
		if(msg.length >0){
			$('#errMsgStaff').html(msg).show();
			return false;
		}
		
		var typeView = $('#typeView').val();
		dataModel.shopId = $('#shopId').val().trim();
		dataModel.staffCode = $('#staffCode').val().trim();
		dataModel.staffName = $('#staffName').val().trim();
		dataModel.gender = $('#gender').combobox('getValue');
		dataModel.staffPhone = $('#staffPhone').val().trim();
		dataModel.address = $('#address').val().trim();
		dataModel.status = $('#status').combobox('getValue').toString().trim();
		if (isUpdateStaffType != null && isUpdateStaffType){
			/**
			 * change staff type
			 */
			dataModel.newStaffTypeId = $('#existedStaffOffice').combobox('getValue');
			dataModel.isChangeStaffType = true;
		}else{
			dataModel.isChangeStaffType = false;
		}
		
		/**
		 * edit staff type
		 */
		if (UnitTreeCatalog._isCreateNewManager != null && !UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien da co sang*/
			dataModel.isCreateNewManager = false;
			dataModel.channelTypeId = $('#existedStaffOffice').combobox('getValue');
			var multiSelect = $('#chooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
		}else if (UnitTreeCatalog._isCreateNewManager != null && UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien moi*/
			dataModel.isCreateNewManager = true;
			dataModel.channelTypeId = $('#newManagedOfficeCbx').combobox('getValue');
			var multiSelect = $('#newChooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
			dataModel.newStaffTypeCode = $('#newStaffOfficeCode').val();
			dataModel.newStaffTypeName = $('#newStaffOfficeName').val();
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
				return false;
			}
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
				return false;
			}
		}
		
		dataModel.lstAttributeValues = lstAttributeValues;
		dataModel.lstAttributesId = lstAttributesId;
		dataModel.typeView = typeView; 
		var url = "/catalog/unit-tree/save-staff";
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
			Utils.updateTokenForJSON(data);
			var newStaffId = data.newStaffId;
			if (data.changeOffice != null && data.changeOffice == true){
				Utils.popupNotify(msgAfterChangeOffice, true);
			}
			UnitTreeCatalog.loadUnitTree(null, null,newStaffId, newStaffId);
			setTimeout(function(){
				$('#btnCancel').trigger("click");
			}, 1000);
			UnitTreeCatalog._isCreateNewManager = false;	
			
			//anhhpt:neu la tao moi nhan vien thi xuat hien thong bao mat khau mac dinh 
			if(!isNullOrEmpty($('#staffId').val().trim()) && $('#staffId').val().trim()=="-1"){ 
				UnitTreeCatalog.insertStaffSucess = true;
			}
			
		},null,null, null, null, function(data){
			var a=0;
			UnitTreeCatalog.insertStaffSucess = false;
		});	
	},
	createChannelType: function() {
		/**Tao loai nhan vien moi*/
		var dataModel = new Object();
		dataModel.channelTypeId = $('#newManagedOfficeCbx').combobox('getValue');
		var multiSelect = $('#newChooseStaffListCbx').data("kendoMultiSelect");
		if (multiSelect != null){
			dataModel.listStaffChildSelected = multiSelect.value();
		}
		dataModel.newStaffTypeCode = $('#newStaffOfficeCode').val();
		dataModel.newStaffTypeName = $('#newStaffOfficeName').val();
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
			//$('#errMsgStaff').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
			alert(format(msgErrIsEmpty, msgMaChucDanh));
			return false;
		}
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
			//$('#errMsgStaff').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
			alert(format(msgErrIsEmpty, msgTenChucDanh));
			return false;
		}
		var url = "/catalog/unit-tree/save-chanel";
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
			Utils.updateTokenForJSON(data);
		   if (data.success = 'SUCCESS') {
			   
			   $('#popAdd').dialog('close');
			   $('#btnCloseClick').click();
		   }
			
		},null,null, null, null, function(data){
			var a=0;
		});	
	},
	updateOrCreateStaffSup: function(){
		var staffTypeId = $('#staffTypeIdHidden').val();
		var staffTypeIdChange = null;
		var staffId = $('#staffId').val();
		if (!StringUtils.isNullOrEmpty(staffTypeId) && !StringUtils.isNullOrEmpty(staffId)){
			staffTypeIdChange = $('#existedStaffOffice').combobox('getValue');
		}
		if (staffTypeIdChange != null && staffTypeId != null && staffTypeIdChange != staffTypeId && staffId != null && staffId > 0){
			/**
			 * show dialog confirm change staff type
			 */
			var title = msgXacNhan;
			var message = msgThayDoiChucVuConfirm;
			$.messager.confirm(title, message, function(r){
				if (r != null && r == true){
					UnitTreeCatalog.excuteUpdateOrCreateStaffSup(true);					
				}
			});
		}else{
			 UnitTreeCatalog.excuteUpdateOrCreateStaffSup(false);
		}
	},
	excuteUpdateOrCreateStaffSup: function(isUpdateStaffType){
		/**giu nguyen*/
		setTimeout(function(){
			$('#errMsgStaff').html('').hide();
//			Utils.hideMessage();//LamNH
		}, 3000);
		UnitTreeCatalog.insertStaffSucess = false;
		var msg = '';
		$('#errMsg').html('').hide();
		$('#errMsgStaff').html('').hide();
//		Utils.hideMessage();//LamNH
		var params = ValidateUtils.validate("#errMsgStaff", "#staffUnitDetailContent");
		if (params.error) {
			return false;
		}
		var msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffCode', msgStaffCode , Utils._CODE);
		if(msg.length > 0){
			return false;
		}
		var dataModel = new Object();
		if($('#staffGroupId').val()!=null && $('#staffGroupId').val() != '' && $('#staffGroupId').val() > 0){
			dataModel.staffGroupId = $('#staffGroupId').val().trim();
		}else{
			dataModel.staffGroupId='';
		}
		var lstAttributesId = [];
		var lstAttributeValues = [];
		var i=0;
		$('.attributeCls').each(function() {
			var objectId = '#' + $(this).attr('id');
			var idx = objectId.split('_')[1];
			lstAttributesId[i] = $('#attH_' + idx).val().trim();
			lstAttributeValues[i] = $(objectId).val();
			if (lstAttributeValues[i] == null || lstAttributeValues[i] == '-1') {
				lstAttributeValues[i] = '';
			}
			i++;
		});	
		
		
		var stPhone = $('#staffPhone').val().trim();
		var isVnServer = $('#isVnServer').val();
		
		if(!Utils.isEmpty(stPhone)){
			if(isVnServer == true || isVnServer == 'true'){
				if(!Utils.isValidPhoneNumber(stPhone)){
					msg += msgInvalidPhoneNumber;
				}
			}
		}
		
		if(msg.length >0){
			$('#errMsgStaff').html(msg).show();
			return false;
		}
		
		var typeView = $('#typeView').val();
		dataModel.shopId = $('#shopId').val().trim();
		dataModel.staffCode = $('#staffCode').val().trim();
		dataModel.staffName = $('#staffName').val().trim();
		dataModel.gender = $('#gender').combobox('getValue');
		dataModel.staffPhone = $('#staffPhone').val().trim();
		dataModel.address = $('#address').val().trim();
		dataModel.status = $('#status').combobox('getValue').toString().trim();
		if (isUpdateStaffType != null && isUpdateStaffType){
			dataModel.newStaffTypeId = $('#existedStaffOffice').combobox('getValue');
			dataModel.isChangeStaffType = true;
		}else{
			dataModel.isChangeStaffType = false;
		}
		
		/**
		 * edit staff type
		 */
		if (UnitTreeCatalog._isCreateNewManager != null && !UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien da co sang*/
			dataModel.isCreateNewManager = false;
			dataModel.channelTypeId = $('#existedStaffOffice').combobox('getValue');
			var multiSelect = $('#chooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
		}else if (UnitTreeCatalog._isCreateNewManager != null && UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien moi*/
			dataModel.isCreateNewManager = true;
			dataModel.channelTypeId = $('#newManagedOfficeCbx').combobox('getValue');
			var multiSelect = $('#newChooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
			dataModel.newStaffTypeCode = $('#newStaffOfficeCode').val();
			dataModel.newStaffTypeName = $('#newStaffOfficeName').val();
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
				return false;
			}
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
				return false;
			}
		}
		
		dataModel.lstAttributeValues = lstAttributeValues;
		dataModel.lstAttributesId = lstAttributesId;
		dataModel.typeView = typeView; 
		var url = "/catalog/unit-tree/save-staff";
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
			Utils.updateTokenForJSON(data);
			var newStaffId = data.newStaffId;
			if (data.changeOffice != null && data.changeOffice == true){
				Utils.popupNotify(msgAfterChangeOffice, true);
			}
			UnitTreeCatalog.loadUnitTree(null, null,newStaffId, newStaffId);
			setTimeout(function(){
				$('#btnCancelSuper').trigger("click");
			}, 1000);
			UnitTreeCatalog._isCreateNewManager = false;	
			
			//anhhpt:neu la tao moi nhan vien thi xuat hien thong bao mat khau mac dinh 
			if(!isNullOrEmpty($('#staffId').val().trim()) && $('#staffId').val().trim()=="-1"){ 
				UnitTreeCatalog.insertStaffSucess = true;
			}
			
		},null,null, null, null, function(data){
			var a=0;
			UnitTreeCatalog.insertStaffSucess = false;
		});	
	},
	expandToNode: function(id,type){

		//var htmlNode = $('#tree').tree('find', id);
		if(type != null){
			var root = $('#tree').tree('getRoot');
			if(root.children != null){
				var childNodes = $('#tree').tree('getChildren',root.target);
				var childSelect = null;
				for(var i=0;i<childNodes.length;i++){
					var childNode = childNodes[i];
					if(type == UnitTreeCatalog.SHOP || type == UnitTreeCatalog.GROUP){
						if(childNode.id == id){
							if(type == UnitTreeCatalog.SHOP){
								if(childNode.attributes != null && childNode.attributes.shopTreeVO !=null){
									$('#tree').tree("expandTo", childNode.target);
									$('#tree').tree("select", childNode.target);
								}
							}
							if(type == UnitTreeCatalog.GROUP){
								if(childNode.attributes != null && childNode.attributes.staffGroupVO !=null){
									$('#tree').tree("expandTo", childNode.target);
									$('#tree').tree("select", childNode.target);
								}
							}
						}
					}else{
						if(type == UnitTreeCatalog.STAFF){
							if(childNode.attributes != null && childNode.attributes.staffTreeVO !=null){
								if (id == childNode.attributes.staffTreeVO.staffId){
									if (childSelect == null){
										childSelect = childNode.target;
										$('#tree').tree("select", childNode.target);
									}
									$('#tree').tree("expandTo", childNode.target);
								}
							}
						}
					}
				}
			}
		}
	},
	showLastView: function(){
		$("#treeUnit").show();
		var lastView = $.data(document.body, "lastView");
		UnitTreeCatalog.showSearchScreen(lastView);
	},
	createStaffGroup:function(){
		var msg = ''; 
		$('#errGroupMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		var staffGroupName = $('#staffGroupName').val().trim();
		var staffGroupCode = $('#staffGroupCode').val().trim();
		var startTime = $('#startTime').val().trim();
		var endTime = $('#endTime').val().trim();
		
		if(Utils.compareHouse(startTime,endTime) > 0){
			var msg = format(msgComapareValue,msgTuGio.toLowerCase(),msgDenGio.toLowerCase());
			$('#errGroupMsg').html(msg).show();
//			Utils.showMessage(msg);//LamNH
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return false;
		}
		
		var distance = $('#distance').val().trim();
		var params = ValidateUtils.validate("#errGroupMsg", "#popupStaffGroup");
		if (params.error) {
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return;
		}
		if (StringUtils.isNullOrEmpty(startTime)
				){
			startTime = '';
		}
		if (StringUtils.isNullOrEmpty(endTime) 
			){
			endTime = '';
		}
		if (StringUtils.isNullOrEmpty(distance)){
			distance = '';
		}
		var lat = UnitTreeCatalog._lat == null? '':UnitTreeCatalog._lat;
		var lng = UnitTreeCatalog._lng == null? '':UnitTreeCatalog._lng;
		if ((StringUtils.isNullOrEmpty(startTime)
				|| StringUtils.isNullOrEmpty(endTime) 
				|| StringUtils.isNullOrEmpty(distance))
			&& (!StringUtils.isNullOrEmpty(startTime+endTime+distance))){
			/**
			 * 1/2 trong 3 bi null 
			 */
			$('#errGroupMsg').html(msgRequireAllParam).show();
//			Utils.showMessage(msgRequireAllParam);//LamNH
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return;
		}else if ( (!StringUtils.isNullOrEmpty(startTime+endTime+distance) 
					&& (StringUtils.isNullOrEmpty(lat) || StringUtils.isNullOrEmpty(lng)))
					|| (StringUtils.isNullOrEmpty(startTime+endTime+distance) && !StringUtils.isNullOrEmpty(lng+lat))){
			/**
			 * 3 tham so co du nhung thieu lat lng
			 */
			$('#errGroupMsg').html(msgRequireAllParam).show();
//			Utils.showMessage(msgRequireAllParam);//LamNH
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return;
		}
		var nodeSelect = $('#tree').tree('getSelected');
		if (nodeSelect == null)
			return;
		var dataModel = new Object();
		dataModel.staffGroupCode=staffGroupCode;
		dataModel.staffGroupName=staffGroupName;
		dataModel.staffGroupName=staffGroupName;
		dataModel.startTime = startTime;
		dataModel.endTime = endTime;
		dataModel.distance = distance;
		dataModel.isSaveOrUpdateStaffGroup=UnitTreeCatalog._isSaveOrUpdateStaffGroup;
		if(UnitTreeCatalog._lat!=null && UnitTreeCatalog._lng!=null){
			dataModel.lat=UnitTreeCatalog._lat;
			dataModel.lng=UnitTreeCatalog._lng;
		}
		Utils.addOrSaveData(dataModel, "/catalog/unit-tree/save-staff-group", UnitTreeCatalog._xhrSave, 'errGroupMsg',function(data){
			var tm = setTimeout(function(){
				$('#popupStaffGroup').dialog('close'); 
				$('#tree').tree('reload');
				UnitTreeCatalog._lat=null;
				UnitTreeCatalog._lng=null;
				UnitTreeCatalog._isSaveOrUpdateStaffGroup=null;
				clearTimeout(tm);
			}, 1500);
			
		},null,'#popupStaffGroup');	
	},
	dialogSearchStaff: function(staffType){
		var params = new Object();
		params.staffCode=$('#seachStyle2Code').val().trim();
		params.staffName=$('#seachStyle2Name').val().trim();
		params.shopId=$('#shopId').val().trim();
		var functionSupport = null;
		var functionHideHeader = null;
		if (staffType != null && staffType == StaffTypeObject.GIAM_SAT){
			functionSupport = UnitTreeCatalog.supportFunctionForGsOnGrid;
			functionHideHeader = UnitTreeCatalog.hideHeaderCheckboxOnGrid;
		}
		CommonSearchUnitTree.searchNVBHUnitTreeDialog(function(data) {
			if (data != null && data.length > 0) {
				var lstStaff='';
				for(var i = 0; i < data.length; i++){
					lstStaff=lstStaff+data[i].id+',';
				}
				lstStaff = lstStaff.substr(0, lstStaff.length-1);	
				var node = $('#tree').tree('getSelected');
				if(node!=null && node.attributes!=null & node.attributes.staffGroupVO!=null){
					var dataModel = new Object();
					dataModel.staffGroupId = node.attributes.staffGroupVO.staffGroupId;
					dataModel.lstStaff = lstStaff;
					Utils.addOrSaveData(dataModel, "/catalog/unit-tree/add-staff-for-group", UnitTreeCatalog._xhrSave, 'errGroupMsg',function(data){
						$('#tree').tree('reload');
					});	
				};	
			};
		}, params,'/catalog/unit-tree/search-all-staff-group?staffType='+staffType, functionSupport, functionHideHeader);
	},
	hideHeaderCheckboxOnGrid: function(){
		$('[field=id] .datagrid-header-check [type=checkbox]').hide();
	},
	supportFunctionForGsOnGrid: function(rowIndex, rowData){
		/**Callback select */
		var selectedId = rowData['id'];
		if (CommonSearchUnitTree._mapMutilSelect != null){
			var arrKey = CommonSearchUnitTree._mapMutilSelect.keyArray;
			if (arrKey != null && arrKey.length > 0){
				$('td[field=id] [value=' + arrKey[0] + "]").attr('checked', false);
				$('#searchStyle2EasyUIGrid').datagrid('unselectAll');
				$('#searchStyle2EasyUIGrid').datagrid('selectRow', rowIndex);
			}
		}
		CommonSearchUnitTree._mapMutilSelect = new Map();
    	CommonSearchUnitTree._mapMutilSelect.put(selectedId, rowData);
	},
	exportExcel:function(){
		UnitTreeCatalog.insertStaffSucess = false;
		$('#msgPasswordDefault').hide();
		$('#msgPasswordDefault').html('');
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		
		$.messager.confirm(xacnhan, comuonexport, function(r){
			if (r){
				var params = UnitTreeCatalog.getParamSearchStaff();
				var url = "/catalog/unit-tree/export-excel";
				showLoadingIcon();
				ReportsUtils.exportExcel(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
 	},
 	importExcel:function(){
 		UnitTreeCatalog.insertStaffSucess = false;
 		$('#msgPasswordDefault').hide();
 		$('#msgPasswordDefault').html('');
 		
		$('#importFrm').attr("action","/catalog/unit-tree/import-excel");
		ReportsUtils.uploadExcel(function(){
			$("#searchStaffUnitTreeGrid").datagrid("reload");
			
			//anhhpt: Khi import nhan vien thanh cong, hien thi thong bao password ngay duoi datagrid
			var totalRow = Number($('#totalRow').html());
			var numFail = Number($('#numFail').html());
			
			if(totalRow > numFail){ // neu co dong import thanh cong
				$('#msgPasswordDefault').show();
				$('#msgPasswordDefault').html(msgImportStaffPass);
			}else{
				$('#msgPasswordDefault').hide();
				$('#msgPasswordDefault').html('');
			}
			
			$('#tree').tree('reload');
		}, ({token: $('#token').val().trim()}));
	},
	removeGroup:function(){
		var node = $('#tree').tree('getSelected');
		if(node!=null && node.attributes!=null & node.attributes.staffGroupVO!=null){
			var dataModel = new Object();
			dataModel.staffGroupId = node.attributes.staffGroupVO.staffGroupId;
			Utils.addOrSaveData(dataModel, "/catalog/unit-tree/remove-group", UnitTreeCatalog._xhrSave, 'errGroupMsg',function(data){
				$('#tree').tree('reload');
			});
			return false;
		}
 	},
 	removeStaff:function(){
		var node = $('#tree').tree('getSelected');
		if(node!=null && node.attributes!=null & node.attributes.staffTreeVO!=null){
			var dataModel = new Object();
			dataModel.staffId = node.attributes.staffTreeVO.staffId;
			try{
				if (node.role != "MANAGER"){
					dataModel.staffGroupId = node.attributes.staffTreeVO.staffGroupId;
				}
			}catch(e){}
			Utils.addOrSaveData(dataModel, "/catalog/unit-tree/remove-staff", null, null,function(data){
				Utils.popupNotify(msgCommon3, true);
				$('#tree').tree('reload');
				UnitTreeCatalog.showSearchScreen();
			}, null, null, null, null, function(data){
				if (data != null && data.error != null && (data.error && !StringUtils.isNullOrEmpty(data.errMsg))){
					Utils.popupNotify(data.errMsg, false);
				}
			});
			return false;
		}
 	},
 	createNewManager: function(){
 		//$('.notAddOffice').hide();
 		//$('.addOffice').show();
 		/*UnitTreeCatalog._isCreateNewManager = true;
 		UnitTreeCatalog.loadDataForCbx('#newManagedOffi
 		ceCbx', '#newChooseStaffListCbx', null, '6', true);*/
 		$('#newStaffOfficeCode').val('');
 		$('#newStaffOfficeName').val('');
 		$('#popAdd').dialog({
			closed : false,
			cache : false,
			modal : true,
			  title : '     ',
			  width : 600,
			  height : 250,
			  onOpen: function(){
				  $('#popAdd').show();
			 		UnitTreeCatalog.loadDataForCbx('#newManagedOfficeCbx', '#newChooseStaffListCbx', null, '6', true);
			  },
			  onClose : function(){
				}
 		})
 	},
 	
 	editManager : function(rowId) {
 		$('#errorOnclick').html('').hide();
 		$('#errMsgPop1').html('').hide();
 		$('#successMsg1').html('').hide();
		setTextboxValue('editStaffOfficeCode','');
		setTextboxValue('editStaffOfficeCodeOl','');
		setTextboxValue('editStaffOfficeName','');
		setTextboxValue('channelTypeId','');
		setTextboxValue('parentId','');
//		disabled('editStaffOfficeCode');
//		setSelectBoxValue('editStaffOfficePosition', '');
		
		var rows = null;
		if(rowId!=undefined && rowId!=null && rowId>=0){
			rows = $('#searchStaffUnitTreeGridPop').datagrid('getRows')[rowId];
		}
		
		$('#popEdit').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 700,
			height : 300,
			onOpen: function(){
				
				$('#popEdit').show();
				if(rows!=null){
					
					setTextboxValue('channelTypeId',rows.idChannelType);
					setTextboxValue('parentId',rows.parentId);
					setTextboxValue('editStaffOfficeCode',rows.codeChannelType);
					setTextboxValue('editStaffOfficeCodeOl',rows.codeChannelType);
					setTextboxValue('editStaffOfficeName', Utils.XSSDeEncode(rows.nameChannelType));
//					if(rows.parentId!=null){
//						setSelectBoxValue('editStaffOfficePosition', Utils.XSSDeEncode(rows.parentId));
//					}
					$('#editStaffOfficePosition').hide();
					$('#labelPosition').hide();
					
				}
				
			},
		 	onBeforeClose: function() {
//		 		$('#editStaffOfficePosition').html('');
	        },
	        onClose : function(){
//	        	$('#editStaffOfficePosition').html('');
	        	enable('editStaffOfficeCode');
	        	enable('editStaffOfficeName');
	        	enable('editStaffOfficePosition');
	        	$('#editStaffOfficePosition').show();
	        	$('#labelPosition').show();
	        	UnitTreeCatalog.getLstCombo();
	        	
	        }
		});
	},
	
	addManager : function() {
		$('#errorOnclick').html('').hide();
 		$('#errMsgPop1').html('').hide();
 		$('#successMsg1').html('').hide();
		setTextboxValue('editStaffOfficeCode','');
		setTextboxValue('editStaffOfficeName','');
		setTextboxValue('channelTypeId','');
		setTextboxValue('parentId','');
		setSelectBoxValue('editStaffOfficePosition', '');
		$('#popEdit').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 700,
			height : 300,
			onOpen: function(){
				$('#popEdit').show();
			},
		 	onBeforeClose: function() {
	        },
	        onClose : function(){
	        	enable('editStaffOfficeCode');
	        	enable('editStaffOfficeName');
	        	enable('editStaffOfficePosition');
	        	UnitTreeCatalog.getLstCombo();
	        }
		});
	},
	
	getLstCombo:function(){
		$('#editStaffOfficePosition').html('');
//		var data = new Object();
//		data.channeltypeId = id;
//		var kData = $.param(data,true);
		$.ajax({
	       type: 'POST',
	       url:'/catalog/unit-tree/get-combo',
	       dataType: 'json',
//	       data : (kData),
	       success: function(data){
	             var arrHtml = new Array();
//	             	arrHtml.push('<option value=""></option>');
					for(var i=0;i<data.lstChannelType.length;i++){
						arrHtml.push('<option value="'+ data.lstChannelType[i].id +'">'+ Utils.XSSEncode(data.lstChannelType[i].channelTypeName) +'</option>');
					}
					$('#editStaffOfficePosition').html($('#editStaffOfficePosition').html()+arrHtml.join(""));
					$('#editStaffOfficePosition').change();
					$('#editStaffOfficePosition').prop('disabled', true);
	        }});
	},
	
	editChannelType: function() {
		/**Sua chuc danh*/
		var dataModel = new Object();
		dataModel.channelTypeId = $('#channelTypeId').val();
		dataModel.parentId = $('#parentId').val();
		dataModel.newStaffTypeCode = $('#editStaffOfficeCode').val();
		dataModel.newStaffTypeCodeOl = $('#editStaffOfficeCodeOl').val();
		dataModel.newStaffTypeName = $('#editStaffOfficeName').val();
		dataModel.managerId = $('#editStaffOfficePosition').val().trim();
		
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
			$('#errMsgPop1').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
//			alert(format(msgErrIsEmpty, msgMaChucDanh));
			return false;
		}
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
			$('#errMsgPop1').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
//			alert(format(msgErrIsEmpty, msgTenChucDanh));
			return false;
		}
		
//		if (dataModel.newStaffTypeCode != null && dataModel.newStaffTypeCode != '' && dataModel.newStaffTypeCode == dataModel.managerId){
//			$('#errMsgPop1').html(format(msgMaChucDanhTonTai)).show();
////			alert(format(msgTrungChucDanh));
//			return false;
//		}
		
		var msg = '';
		if (msg.length == 0) {
			// jspCustomerAttributeCode = Mã thuộc tính
			msg = ValidateUtils.getMessageOfRequireCheck('editStaffOfficeCode', msgMaChucDanh);
		}
		if(msg.length ==0){
			// jspCustomerAttributeCode = Mã thuộc tính
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('editStaffOfficeCode', msgMaChucDanh,Utils._CODE);
		}
		if(msg.length ==0){
			if(dataModel.newStaffTypeName != null && dataModel.newStaffTypeName.length > 0){
				msg = Utils.getMessageOfSpecialCharactersValidateForValue(dataModel.newStaffTypeName, msgTenChucDanh , Utils._NAME);
			}
		}
		
		if(msg.length > 0){
			$('#errMsgPop1').html(msg).show();
//			alert(msg);
			return false;
		}
		
		
		var url = "/catalog/unit-tree/edit-chanel";
		var check = 0;
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
			Utils.updateTokenForJSON(data);
			if (data.success == 'SUCCESS') {
				check = 1;
				$('#popEdit #successMsg1').html(msgNotifySuccess).show();
				var tm = setTimeout(function(){
					$('#popEdit').dialog('close'); 
					$("#searchStaffUnitTreeGridPop").datagrid("reload");
					clearTimeout(tm);
				}, 1500);
			
			}else{
				$('#errMsgPop1').html(format(msgMaChucDanhTonTai)).show();
//				alert(format(newStaffTypeCode));
			}
			
		},null,'#popEdit',null,null,function(data){
			if(data.error != undefined  && data.error && data.errMsg != undefined){
				$('#errMsgPop1').html(data.errMsg).show();
			}
		});
		if(check = 1){
			UnitTreeCatalog.loadUnitTree();
		}
			
			
//			Utils.updateTokenForJSON(data);
//		   if (data.success = 'SUCCESS') {
//			   $('#popEdit').dialog('close');
//			   $('#btnCloseClick').click();
//		   }
//			
//		},null,null, null, null, function(data){
//			var a=0;
//		});	
	},
	
	onclickRow: function() {
		$('#errorOnclick').html(format(msgSuaChucDanh)).show();
	},
 	
 	loadDataForCbx: function(cbxSelector, multiselectSelector, textFillSelector, staffType, 
 			isCreateNewManager, isDisableCbx, staffTypeId, callBackSelect, callBackSuccess, listStaffChildId, isExistedManager){
 		$(cbxSelector).combobox({
 			url: '/catalog/unit-tree/getOfficeOfStaff',
 			valueField: "id",
 			textField: "channelTypeName",
 			panelWidth: UnitTreeCatalog._widthCbx,
 		    panelHeight: 'auto',
 		    width: UnitTreeCatalog._widthCbx,
 		   onBeforeLoad: function(params){
 			   if (params == null){
 				  params = {
 						 isCreateNewManager: isCreateNewManager,
 						objectTypeValue: staffType
 				  };
 			   }else{
 				  params.isCreateNewManager = isCreateNewManager;
 				  params.objectTypeValue = staffType;
 			   }
 			   var staffId = $('#staffId').val();
 			   var staffTypeId = $('#staffTypeIdHidden').val();
 			   if (!StringUtils.isNullOrEmpty(staffId) && !StringUtils.isNullOrEmpty(staffTypeId)){
 				   params.staffId = staffId;
 				   params.staffTypeId = staffTypeId;
 			   }
 		   },
 			onSelect: function(rec){
 				if (rec != null){
 					var params = {
 							objectTypeValue: rec.objectType,
 							channelTypeId: rec.id,
 							isCreateNewManager: isCreateNewManager
 					};
 					var staffId_ = $('#staffId').val();
 			 		if (!StringUtils.isNullOrEmpty(staffId_)){
 			 			if (parseInt(staffId_) > 0){
 			 				params.staffId = staffId_;
 			 			}
 			 		}
 					var url_ = "/catalog/unit-tree/fillInfoManagedStaff";
 					Utils.getJSONDataByAjaxNotOverlay(params, url_, function(data){
 						if (data != null){
 							if (textFillSelector != null && textFillSelector != undefined ){
 								$(textFillSelector).val(data.text);
 							}
 						}
 					});		
 					if (rec.objectType == StaffTypeObject.NHAN_VIEN_QUAN_LY || (UnitTreeCatalog._isCreateNewManager != null && UnitTreeCatalog._isCreateNewManager)){
 						$('#divChoosedStaff').show();
 						$('#backupInputChooseStaffListCbx').show();
 						var url_2 = "/catalog/unit-tree/fillStaffToCbx";
 	 					Utils.getJSONDataByAjaxNotOverlay(params, url_2, function(data){
 	 						if (data != null){
 	 							if (data.listStaff != null && data.listStaff.length > 0){
 	 								UnitTreeCatalog._mapValueOfCbx = new Map();
 	 								for (var i=0, size = data.listStaff.length; i< size; i++){
 	 									UnitTreeCatalog._mapValueOfCbx.put(data.listStaff[i].id, data.listStaff[i]);
 	 								}
 	 							}else{
 	 								UnitTreeCatalog._mapValueOfCbx = null;
 	 							}
 	 							var multiSelect = $(multiselectSelector).data("kendoMultiSelect");
 	 							if (multiSelect != undefined && multiSelect != null){
 	 								var newDataSource = new kendo.data.DataSource({
 	 									  data: data.listStaff
 	 								});
 	 								multiSelect.setDataSource(newDataSource);
 	 								multiSelect.value([]);
 	 							}else{
 	 								UnitTreeCatalog.loadkendoMultiselect(multiselectSelector, data.listStaff, "staffCode", "id", '#: data.staffName #', function(e){
 	 									var html_ = $('#choosedStaffList').html();
 	 									if (!StringUtils.isNullOrEmpty(html_)){
 	 										html_ += ", " + e.item.text();
 	 									}else{
 	 										html_ += e.item.text();
 	 									}
 	 									$('#choosedStaffList').html(html_);
 	 								});							
 	 							}
 	 							if (!StringUtils.isNullOrEmpty(listStaffChildId)){
 	 			 					var arrStaffChild = listStaffChildId.split(',');
 	 			 					setTimeout(function(){
 	 			 						var multiSelect = $(multiselectSelector).data("kendoMultiSelect");
 	 			 						if (multiSelect != undefined && multiSelect != null){
 	 										multiSelect.value(arrStaffChild);
 	 									}
 	 			 					}, 1000, arrStaffChild);
 	 			 				}
 	 						}
 	 					});	
 					}else if (rec.objectType == StaffTypeObject.GIAM_SAT){
 						$('#divChoosedStaff').hide();
 						$('#backupInputChooseStaffListCbx').hide();
 						var multiSelect = $(multiselectSelector).data("kendoMultiSelect");
 						if (multiSelect != undefined && multiSelect != null){
							var newDataSource = new kendo.data.DataSource({
								  data: []
							});
							multiSelect.setDataSource(newDataSource);
							multiSelect.value([]);
						}
 						$('#backupInputChooseStaffListCbx').hide();
 					}else{
 						$('#divChoosedStaff').hide();
 						$('#backupInputChooseStaffListCbx').hide();
 					}
 				}
 			},
 			onLoadSuccess: function(){
 				if (staffTypeId != undefined && staffTypeId != null && staffTypeId != '' && staffTypeId > 0){
 					$(cbxSelector).combobox('select', staffTypeId);
 					/**
 					 * thay doi chuc vu
 					 */
 					/***/
 					var list = $(cbxSelector).combobox('getData');
 					if (list != null && list.length > 0){
 						for (var j =0, size = list.length; j< size; j++){
 							var e = list[j];
 							if (e != null && e.id == staffTypeId && e.objectType == StaffTypeObject.ADMIN){
 								disableCombo(cbxSelector);
 								break;
 							}
 						}
 					}
 				}else if (staffType != null && staffType != undefined){
 					var list = $(cbxSelector).combobox('getData');
 					var idselect = UnitTreeCatalog.getIdByStaffType(list, staffType);
 					if (idselect != null){
 						$(cbxSelector).combobox('select', idselect);
 					}
 					if (isDisableCbx){
						disableCombo(cbxSelector);
					}
 				}
 				if (isCreateNewManager){
 					disableCombo(cbxSelector);
 				}
 				if (callBackSuccess != null){
 					callBackSuccess.call(this);
 				}
 				
 				
 				if (staffType != undefined && staffType != null && staffType == StaffTypeObject.NHAN_VIEN_QUAN_LY){
 					$('#backupInputChooseStaffListCbx').show();
 				}else {
 					$('#backupInputChooseStaffListCbx').hide();
 				}
 			}
 		});
 	},
 	getManagerLead: function(listMag){
 		/**
 		 * list chi chua NVQL & GS
 		 */
 		if (listMag != null && listMag.length > 0){
 			for (var i=0, size = listMag.length; i< size; i++){
 				if (listMag[i] != null && listMag[i].type == ChannelTypeType.STAFF
 						&& (listMag[i].objectType == StaffTypeObject.NHAN_VIEN_QUAN_LY || listMag[i].objectType == StaffTypeObject.GIAM_SAT ) 
 						&& listMag[i].parentChannelType == null){
 					return listMag[i];
 				}
 			}
 		}
 		return null;
 	},
 	getIdByStaffType: function(listStaffType, staffType){
 		if (listStaffType != null && listStaffType.length > 0){
 			if (staffType != null && staffType != StaffTypeObject.NHAN_VIEN_QUAN_LY){
 				for (var i=0, size =listStaffType.length; i< size; i++){
 	 				var dom = listStaffType[i];
 	 				if (dom != null && staffType != StaffTypeObject.NHAN_VIEN_QUAN_LY){
 	 					if (dom.objectType == staffType){
 	 						return dom.id;
 	 					}
 	 				}
 	 			}
 			}else if (staffType != null && staffType == StaffTypeObject.NHAN_VIEN_QUAN_LY){
 				var managerLead =  UnitTreeCatalog.getManagerLead(listStaffType);
 				if (managerLead != null){
 					return managerLead.id;
 				}
 			}
 		}
 		return null;
 	},
 	resetPasswordForStaff: function(staffId){
 		var params = {
 				staffId: staffId
 		};
 		var url = "/catalog/unit-tree/resetPassword";
 		var staffCodeName = "";
 		var rows = $('#searchStaffUnitTreeGrid').datagrid('getRows');
 		UnitTreeCatalog._mapStaffOfGrid = new Map();
 		if (rows != null && rows.length > 0){
 			for (var i=0, size = rows.length; i< size; i++){
 				if (staffId == rows[i].id){
 					staffCodeName = rows[i].staffCode + ' - ' + rows[i].staffName;
 					break;
 				}
 			}
 		}
 		var msage = format(msgConfirmBanMuonResetMatkhau, staffCodeName);
 		Utils.addOrSaveData(params, url, null, 'errMsgResetPassword', function(data){
 			var msg =  Utils.XSSEncode(data.notify);
 			if (!StringUtils.isNullOrEmpty(msg)){
 				Utils.showMessageAlert(null, msg);
 			}
 		}, null, null, null, msage);
 	},
 	//connv
 	editPosition: function(){
 		
 		$("#treeUnit").hide();
//		UnitTreeCatalog.expandToNode(staffId,UnitTreeCatalog.STAFF);
		var params = new Object();
		params.shopId = $('#shopId').val().trim();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/edit-position',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
			UnitTreeCatalog.insertStaffSucess = false;
		}, null, 'POST');
		return false;
	}
 	
 	
};
var StaffTypeCode = {
	ADMIN: "ADMIN",
	GIAM_SAT: "GIAM_SAT",
	NHAN_VIEN: "NHAN_VIEN"
};
