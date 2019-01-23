/**
 * Quan ly cay nhan vien
 * @author haupv3
 * @since 14/03/2015
 */
var staffTree = {
	isInited : false,
	inObject : null,
	isLoaded : false,
	lstId : new Map(),
	isChoseAndClose : false,
	
	initTree : function(inObject, isF9){
		if(isF9 == true){
		 	$('#'+inObject).bind('keyup',function(event){
		 		if(event.keyCode == keyCode_F9){
		 			staffTree.loadTreeData();
		 		}
		 		if(event.keyCode == keyCodes.BACK_SPACE || event.keyCode == keyCodes.DELETE || event.keyCode == 32){
		 			$('#'+outObject).val('');
		 		}
		 	});
		}else{
			staffTree.loadTreeData();
		}
		
	 	$('#dlStaffCode').bind('keyup',function(event){
	 		if(event.keyCode == keyCodes.ENTER){
	 			$('#dlBtStaffSearch').click();
	 		}
	 	});
	 	$('#dlStaffName').bind('keyup',function(event){
	 		if(event.keyCode == keyCodes.ENTER){
	 			$('#dlBtStaffSearch').click();
	 		}
	 	});
		staffTree.inObject = inObject;
	},
	loadTreeData : function(){
		$('#staffTreeEasyUIDialog').dialog('open');
		if(staffTree.isLoaded == false){
		$('#tree').tree({  
			url:'/catalog/unit-tree/staff-tree/get-list-staff' ,
		    checkbox:true,
		    lines:true,
		    singleSelect: false,
		    onBeforeLoad: function(n,p){
		    	$('#loading').show();
		    },
		    formatter:function(node){
		    	return Utils.XSSEncode(node.text);
		    },
		    onLoadSuccess:function(parent,data){
		    	staffTree.isLoaded = true;
		    	$('#loading').hide();
				$('#staffTreeEasyUIDialog').dialog({
					cache: false,
					modal: true
				});
				$('#staffTreeEasyUIDialog').dialog('open');
		    }, 
		    onCheck : function(node,checked){
		    	var isLeaf = $('#tree').tree('isLeaf', node.target);
		    	$('#'+node.id).removeClass('tree-node-selected');
		    	var nId = node.id;//.split('-')[0].trim();
		    	
		    
		    	
		    	//Neu khong phai node la duoc check/uncheck
		    	//if(isLeaf == true || isLeaf == 'true'){
		    		if(checked == true){
		    			staffTree.lstId.put(nId, nId);
		    		}else{
		    			staffTree.lstId.remove(nId);
		    		}
		    	//}
		    	
		    		//Neu node dang o trang thai close => chi lay node
		    		if(node.state == 'closed'){
		    			//Uncheck/Check toan bo con
		    			var childs = $('#tree').tree('getChildren', node.target);
		    			if(childs != null){
				    		for(var i=0; i<childs.length; i++){
				    			var chId = childs[i].id;//.split('-')[0].trim();
				    			
				    			if($('#isCheckAll').is(':checked') == false){
				    				var childText =  $('#'+childs[i].id).children('.tree-checkbox');
				    
				    				childText.removeClass("tree-checkbox1").addClass("tree-checkbox0");
				    				
				    				if(Utils.isEmpty(staffTree.lstId.get(chId))){
			    			    		if(childText.hasClass('tree-checkbox1') == true){
			    			    			staffTree.lstId.put(chId, chId);
			    			    		}else{
			    			    			staffTree.lstId.remove(chId);
			    			    		}
				    				}else{
				    					childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
				    					staffTree.lstId.put(chId, chId);
				    				}
				    			}else{
				    				if($.isNumeric(chId) == true || $.isNumeric(chId) == 'true'){
				    					staffTree.lstId.put(chId,chId);
				    				}
				    			}
				    		}
		    			}
		    			
		    		//Neu node dang o trang thai open => lay toan bo con	
		    		}else{
		    			if(isLeaf == false || isLeaf == 'false'){
			    			var childs = $('#tree').tree('getChildren', node.target);
			    			if(childs != null){
			    				for(var i=0; i<childs.length; i++){
			    					if($('#tree').tree('isLeaf', childs[i].target) == true){
			    						var chId = childs[i].id;//.split('-')[0].trim();
			    						var prNode = $('#tree').tree('getParent', childs[i].target);
			    						var prChildText = $('#'+prNode.id).children('.tree-checkbox');
			    						var childText =  $('#'+childs[i].id).children('.tree-checkbox');
			    						
			    						if(prChildText.hasClass('tree-checkbox1') == true
			    								&& prNode.state == 'open'){
				    						childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
			    						}else{
			    							childText.removeClass("tree-checkbox1").addClass("tree-checkbox0");
			    						}
			    						
			    			    		if(childText.hasClass('tree-checkbox1') == true){
			    			    			staffTree.lstId.put(chId, chId);
			    			    		}else{
			    			    			staffTree.lstId.remove(chId);
			    			    		}
			    			    		
			    					}//end if isLeaf
			    				}

			    			}
		    			}
		    		}
	
		    },
		    onClose : function(){
		    	$('#'+staffTree.inObject).val(staffTree.lstId.valArray.length);
		    }
		    	
		});
		}
	},
	changeState : function(node, isChecked, isCheckAll){
		var childs = null;
		if(node != null){
			childs = $('#tree').tree('getChildren');

				if(childs != null){
					for(var i=0; i<childs.length; i++){
	  					  var ch = childs[i];
						  var childText =  $('#'+ch.id).children('.tree-checkbox');
						  if(node.state == 'closed'){
							  if($('#isCheckAll').is(':checked') == false){//khong cho check all
								  childText.removeClass("tree-checkbox1").addClass("tree-checkbox0");
							  }else{
								  childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
							  }
						  }else{
							  childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
						  }
						  
						  if($('#tree').tree('isLeaf', ch.target) == false){
							  var childsOfChild = $('#tree').tree('getChildren', ch.target);
							  if(childsOfChild != null && childsOfChild.length >0){
								  staffTree.changeState(ch, isChecked, isCheckAll);
							  }
						  }
					}
				}
		}
	},
	searchStaff : function(){
		var params = new Object();
		var url = "/catalog/unit-tree/staff-tree/search-staff";
		params.staffCode = $('#dlStaffCode').val();
		params.staffName = $('#dlStaffName').val();
		$('.tree-node').removeClass('tree-node-selected');
		$('#loading').show();
		Utils.getJSONDataByAjaxNotOverlay(params, url, function(data){
			$('#loading').hide();
			if(Utils.isEmpty(data.errMsg) && data.errMsg != true){
				if(data.lstStaff.length > 0){
					for(var i=0; i<data.lstStaff.length; i++){
						var st = data.lstStaff[i];
						var node = $('#tree').tree('find', st.id);
						if(node != null){
							if(!Utils.isEmpty(params.staffCode) || !Utils.isEmpty(params.staffName)){
								$('#'+node.id).addClass('tree-node-selected');
							}
							
						}else{
							if(!Utils.isEmpty(params.staffCode) || !Utils.isEmpty(params.staffName)){
								$('[id^='+ st.id.split('-')[0].trim() + ']').addClass('tree-node-selected');
							}
						}
					}
					
					$('#tree').tree('expandAll');
					if(data.lstStaff.length > 0){
						var scrollStaff = $('#tree').tree('find',  data.lstStaff[0].id);
						if(data.lstStaff.length > 1){
							scrollStaff = $('#tree').tree('find',  data.lstStaff[data.lstStaff.length-1].id);
						}
						if(scrollStaff != null){
							
							$('#tree').tree('scrollTo',  scrollStaff.target);
						}
					}
					
					
					
				}
			}
		}, null, 'POST');
	},
	dialogClose : function(isSelected){
		if(isSelected == true){
			staffTree.isChoseAndClose = true;
		}else{
			staffTree.isChoseAndClose = false;
			staffTree.lstId.clear();
		}
		$('#staffTreeEasyUIDialog').dialog('close');
	}
};