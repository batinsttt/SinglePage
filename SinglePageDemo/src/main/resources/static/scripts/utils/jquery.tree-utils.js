/**
 * 
 */
var TreeUtils = {
	/*****************************	COMBO TREE ****************************************/
	/**
	 * @see COMBO CAY DON VI
	*/
		
	loadComboTreeShop: function(controlId, storeCode,defaultValue,callback,params,returnCode,isTitle){		 
		var _url= '/rest/catalog/shop/combotree/0/1/0.json';
		if(isTitle!=undefined && isTitle!=null && isTitle == true){
			_url= '/rest/catalog/shop/combotree/1/1/0.json';
		}
		$('#' + controlId).combotree({url: _url,
			onChange: function(newValue,oldValue){
				if(params != null && params.length >0){
					for(var i=0;i<params.length;i++){
						$('#'+params[i]).val('');
					}
				}
			}
		});
		var t = $('#'+ controlId).combotree('tree');
		t.tree('options').url = '';
		t.tree({			
			onSelect:function(node){
				var data = new Object();
				if(node.attributes != null) {
					data = node.attributes.shop;
				} else {
					data.id= node.id;
				}
				if(callback!=undefined && callback!=null){
					callback.call(this, data);
				}
				if(returnCode) {
					$('#'+storeCode).val(data.shopCode);
				} else {
					$('#'+storeCode).val(node.id);	
				}	
				$('#'+controlId).combotree('setValue',data.shopCode);
			},
			onBeforeExpand:function(result){	            					
				var nodes = t.tree('getChildren',result.target);
				for(var i=0;i<nodes.length;++i){
					t.tree('remove',nodes[i].target);
				}
				var ___jaxurl = '/rest/catalog/shop/combotree/0/2/';
				$.ajax({
					type : "POST",
					url : ___jaxurl + result.id +'.json',					
					dataType : "json",
					success : function(r) {						
						$(r).each(function(i,e){
							e.text = Utils.XSSEncode(e.text);
						});
						t.tree('append',{
							parent:result.target,
							data:r
						});
						var node=t.tree('getNode',result.target);
						$(node.target).next().css('display','block');
					}
				});
			},
			onExpand: function(result){	
			}
		});
		if(defaultValue == undefined || defaultValue == null){
			$('#' + controlId).combotree('setValue',activeType.ALL);
		} else {
			$('#' + controlId).combotree('setValue',defaultValue);
		}
	},
	loadComboTreeShopHasTitle: function(controlId, storeCode,callback, returnCode){
		TreeUtils.loadComboTreeShop(controlId, storeCode, null, callback, null, returnCode, true);
	},
	
	/**
	 * @see CAY DIA BAN
	*/
	loadComboTreeArea: function(controlId, storeCode,defaultValue,callback,params,isTitle){		 
		var _url= '/rest/catalog/area/combotree/0/0.json';
		if(isTitle!=undefined && isTitle!=null && isTitle == true){
			_url= '/rest/catalog/area/combotree/1/0.json';
		}
		$('#' + controlId).combotree({url: _url,
			onChange: function(newValue,oldValue){
				if(params != null && params.length >0){
					for(var i=0;i<params.length;i++){
						$('#'+params[i]).val('');
					}
				}
			}
		});
		var t = $('#'+ controlId).combotree('tree');	
		t.tree('options').url = '';
		t.tree({			
			onSelect:function(node){
				var data = new Object();
				if(node.attributes != null) {
					data = node.attributes.area;
				} else {
					data.id= node.id;
				}
				if(callback!=undefined && callback!=null){
					callback.call(this, data);
				}
				$('#'+storeCode).val(node.id);				
			},	            				
			onBeforeExpand:function(result){	            					
				var nodes = t.tree('getChildren',result.target);
				for(var i=0;i<nodes.length;++i){
					t.tree('remove',nodes[i].target);
				}
				var ___jaxurl = '/rest/catalog/area/combotree/0/';
				$.ajax({
					type : "POST",
					url : ___jaxurl + result.id +'.json',					
					dataType : "json",
					success : function(r) {						
						t.tree('append',{
							parent:result.target,
							data:r
						});
						var node=t.tree('getNode',result.target);
						$(node.target).next().css('display','block');
					}
				});
			},
			onExpand: function(result){	
			}
		});
		if(defaultValue == undefined || defaultValue == null){
			$('#' + controlId).combotree('setValue',activeType.ALL);
		} else {
			$('#' + controlId).combotree('setValue',defaultValue);
		}
	},
	loadComboTreeAreaHasTitle: function(controlId, storeCode,defaultValue,callback){
		TreeUtils.loadComboTreeArea(controlId, storeCode, defaultValue, callback, null, true);
	},
	loadComboTreeAreaForUnitTree: function(controlId, storeCode,defaultValue,callback,params,isTitle,callbackSuccess,isTreeLoading){	
		var _urlLstAreaId ='';
		if(defaultValue == undefined || defaultValue == null){
			_urlLstAreaId = '/rest/catalog/area/combotree/0/list.json';
		} else {
			_urlLstAreaId =  '/rest/catalog/area/combotree/'+ defaultValue +'/list.json';
		}
		Utils.getJSON(_urlLstAreaId, function(lstAreaId){
			TreeUtils._lstAreaId = new Array();
			if(lstAreaId.length > 0){
				for(var i = 0; i<lstAreaId.length; ++i) {
					TreeUtils._lstAreaId.push(lstAreaId[i]);
				}
			}
			var _url= '/rest/catalog/area/combotree/0/0.json';
			if(isTitle!=undefined && isTitle!=null && isTitle == true){
				_url= '/rest/catalog/area/combotree/1/0.json';
			}
			$('#' + controlId).combotree({url: _url,
				onChange: function(newValue,oldValue){
					if(params != null && params.length >0){
						for(var i=0;i<params.length;i++){
							$('#'+params[i]).val('');
						}
					}
				}
			});
			var t = $('#'+ controlId).combotree('tree');	
			t.tree('options').url = '';
			t.tree({
				onSelect:function(node){
					var data = new Object();
					if(node.attributes != null) {
						data = node.attributes.area;
					} else {
						data.id= node.id;
					}
					if(callback!=undefined && callback!=null){
						callback.call(this, data);
					}
					$('#'+storeCode).val(node.id);				
				},	            				
				onBeforeExpand:function(result){
					if(isTreeLoading != null && isTreeLoading != undefined){
						$('#treeLoading').show();
					}
					var nodes = t.tree('getChildren',result.target);
					for(var i=0;i<nodes.length;++i){
						t.tree('remove',nodes[i].target);
					}
					var ___jaxurl = '/rest/catalog/area/combotree/0/';
					$.ajax({
						type : "POST",
						url : ___jaxurl + result.id +'.json',					
						dataType : "json",
						success : function(r) {						
							t.tree('append',{
								parent:result.target,
								data:r
							});
							var node=t.tree('getNode',result.target);
							$(node.target).next().css('display','block');
						}
					});
				},
				onLoadSuccess : function(node,data) {
					if(TreeUtils._lstAreaId.length> 1) {
						var node = t.tree('find', TreeUtils._lstAreaId.pop());
			    		t.tree('expand',node.target);
					} else if (TreeUtils._lstAreaId.length== 1){
						$('#' + controlId).combotree('setValue',defaultValue);
						if(callbackSuccess!=undefined && callbackSuccess!=null){
							callbackSuccess.call(this);
						}
					} else {
						$('#' + controlId).combotree('setValue',activeType.ALL);
						if(callbackSuccess!=undefined && callbackSuccess!=null){
							callbackSuccess.call(this);
						}
					}
					$('#treeLoading').hide();
				},
				onExpand: function(result){	
					
				}
			});
			
		});
	},
	loadComboTreeAreaForUnitTreeHasTitle: function(controlId, storeCode,defaultValue,callback,callbackSuccess,isTreeLoading){
		TreeUtils.loadComboTreeAreaForUnitTree(controlId, storeCode, defaultValue, callback, null, true,callbackSuccess,isTreeLoading);
	},
	
	/**
	 * @see CAY TUYEN
	*/
	isLoad :null,
	loadRoutingTree: function(controlId,storeCode, shopId, defaultValue,callback){
		var groupId = 0;
		if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
			groupId = $('#chooseGroup').val();
		}
		var url = "";
		if(Utils.isEmpty(shopId)) {
			url = '/rest/catalog/routing-tree/supervisor/.json'; 
		} else {
			url = '/rest/catalog/routing-tree/supervisor/' + shopId + '/' + groupId + '.json'; 
		}
		$('#'+ controlId).tree({ 
			url: url,
			lines: true,
			onSelect:function(node){
				if(TreeUtils.isLoad == null) {
					if(callback!=undefined && callback!=null && node != null){
						callback.call(this, node.id);
					}
					if(storeCode != undefined  && storeCode != null && node != null) {
						$('#'+storeCode).val(node.id);				
					}
				} else {
					if(storeCode != undefined  && storeCode != null && node != null) {
						$('#'+storeCode).val(node.id);				
					}
					TreeUtils.isLoad = null;
				}
				var dom = $('#createRoutingPage');
				if (dom != undefined && dom != null && dom.val() == 1){
					SuperviseManageRouteCreate.resetCheckAll();
				}
			},	 
			onLoadSuccess:function(node,data){
				if(defaultValue != undefined  && defaultValue != null) {
					var node = $('#'+ controlId).tree('find', defaultValue);
					TreeUtils.isLoad = 1;
		    		if(node!=null){
		    			 $('#'+ controlId).tree('select', node.target);
		    		}
				}
			},
			onContextMenu:function(e, node){
				var dom = $('#createRoutingPage');
				if (dom != undefined && dom != null && dom.val() == 1){
					e.preventDefault();
//					if($('#supervisorUser').val() == 'true'){
						e.preventDefault();
						$('#routingTree').tree('select', node.target);
						$('#contextMenu').menu('show', {
							left : e.pageX-5,
							top : e.pageY-5
						});
						$('#contextMenu').css('height', 'auto');
//					}
				}
			},
			formatter: function(node){
				return Utils.XSSEncode(node.text);
			}
		}); 
	}
};