var IssuedStockGridFormatter = {
	instockCellFormatter: function(cellvalue, rowObject,options){
		var bigUnit = 0;
		var smallUnit = 0;
		var convfact = 1;
		if(rowObject.convfact!= null && rowObject.convfact!= undefined){
			convfact = rowObject.convfact;
		}
		bigUnit = parseInt(rowObject.availableQuantity/convfact);
		smallUnit = rowObject.availableQuantity%convfact;
		return bigUnit + '/' + smallUnit;	
	},
	instockCellFormatterNew: function(cellvalue, rowObject,options){
		var bigUnit = 0;
		var smallUnit = 0;
		var convfact = 1;
		if(rowObject.convfact!= null && rowObject.convfact!= undefined){
			convfact = rowObject.convfact;
		}
		bigUnit = parseInt(rowObject.quantity/convfact);
		smallUnit = rowObject.quantity%convfact;
		return bigUnit + '/' + smallUnit;	
	},
	amountCellFormatter: function(value, row, index){		
		return '<input index='+index+' row-id="'+row.id+'" id="productRow_'+ row.id +'" size="5" type="text" maxlength="8" style="text-align:right;margin: 0;width:77px;" onkeypress="return NextAndPrevTextField(event, this,\'SelProduct\');" class="IssuedStock_AmountValue InputTextStyle InputText1Style SelProduct" onblur="StockIssued.amountBlured('+ index +');" onchange="StockIssued.amountChanged('+ index +');">';
	}
};
var UpdateStockGridFormatter = {
	amountCellFormatter: function(value, row, index){		
		return '<input index='+index+' row-id="'+row.id+'" id="productRow_'+ row.id +'" size="5" type="text" maxlength="8" style="text-align:right;margin: 0;width:77px;" onkeypress="return NextAndPrevTextField(event, this,\'SelProduct\');" class="IssuedStock_AmountValue InputTextStyle InputText1Style SelProduct" onblur="StockUpdate.qtyChanged('+ index +');" onchange="StockUpdate.qtyChanged('+ index +');">';
	},
	instockCellFormatter: function(cellvalue, rowObject,options){	
		var convfact = 1;
		if(rowObject.convfact!= null && rowObject.convfact!= undefined){
			convfact = rowObject.convfact;
		}
		var amount = formatQuantity(rowObject.availableQuantity,convfact);
		if(amount.length==0 || amount=='0/0' || amount=='0'){
			return '';
		}
		return amount;	
	}
};
var ManageTransFormatter = {
	viewDetail:function(cellValue, rowObject,options){
		var stockTransType = "";
		if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == 2){
			stockTransType =  "XUAT_KHO_NHAN_VIEN";
		}else if(rowObject.fromOwnerType == 2 && rowObject.toOwnerType == 1){
			stockTransType = "NHAP_KHO_NHAN_VIEN";
		}else if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == null){
			stockTransType =   "XUAT_KHO_DIEU_CHINH";
		}else if(rowObject.fromOwnerType == null && rowObject.toOwnerType == 1){
			stockTransType =   "NHAP_KHO_DIEU_CHINH";
		}
		return "<span style='cursor:pointer' onclick=\"return StockManageTrans.viewDetail('"+ rowObject.stockTransCode +"','"+rowObject.fromStockCode+"','"+rowObject.toStockCode+"','"+rowObject.stockTransDateStr+"','"+stockTransType+"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png'/></span>";
	},
	transTypeFormat:function(cellvalue, rowObject,options){
		if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == 2){
			return msgFormatter1;
		}else if(rowObject.fromOwnerType == 2 && rowObject.toOwnerType == 1){
			return msgFormatter2;
		}else if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == null){
			return msgFormatter3;
		}else if(rowObject.fromOwnerType == null && rowObject.toOwnerType == 1){
			return msgFormatter4;
		}else{
			return "";
		}
	},
	amountFormat:function(cellValue, options, rowObject){
		return formatCurrency(cellValue);
	}
};
var ReceivedStockFormatter = {
		amountCellFormatter: function(cellvalue, options, rowObject){		
			return '<input product-id="'+options.rowId+'" id="productRow_'+ rowObject.productId +'" size="12" type="text" style="text-align:right" onkeypress="return NextAndPrevTextField(event, this,\'SelProduct\');" class="IssuedStock_AmountValue InputTextStyle InputText1Style SelProduct" onblur="StockIssued.amountBlured('+ rowObject.productId +');" onchange="StockIssued.amountChanged('+ rowObject.productId +');">';
		}	
};
var CountingFormatter = {
	viewDetail:function(cellvalue, rowObject,options){
		return "<a href='javascript:void(0);'><span style='cursor:pointer' onclick=\"return StockCounting.viewDetail('"+ rowObject.id +"');\">"+rowObject.cycleCountCode+"</span></a>";
	},
	editFormat:function(cellvalue, rowObject,options){
		if(rowObject.status != null && rowObject.status == '1'|| rowObject.status == 1){
			return "";
		}
		if(rowObject.status != null && rowObject.status == '2'|| rowObject.status == 2){
			return "";
		}
		if(rowObject.status != null && rowObject.status == '0'|| rowObject.status == 0){
			if(rowObject.canUpdate == '1' || rowObject.canUpdate == 1){
				return '<span style="cursor:pointer" onclick="window.location.href=\' ' + WEB_CONTEXT_PATH+  '/stock/counting/changed?cycleCountId='+rowObject.id+'\'"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png"/></span>';
			}
		}
		return "";
	},
	deleteFormat:function(cellvalue, rowObject,options){
		if(rowObject.status != null && rowObject.status == '1'|| rowObject.status == 1){
			return "";
		}
		if(rowObject.status != null && rowObject.status == '2'|| rowObject.status == 2){
			return "<span style='cursor:pointer' onclick=\"return StockCounting.deleteRow('"+ rowObject.id +"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></span>";
		}
		if(rowObject.status != null && rowObject.status == '0'|| rowObject.status == 0){
			if(rowObject.canUpdate == '1' || rowObject.canUpdate == 1){
				return "<span style='cursor:pointer' onclick=\"return StockCounting.deleteRow('"+ rowObject.id +"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></span>";
			}
		}
		return "";
	},
	statusFormat:function(cellvalue, rowObject,options){		
		if(rowObject.status != null && rowObject.status == '0'|| rowObject.status == 0){
			return msgFormatter5;
		}else if(rowObject.status != null && rowObject.status == '1'|| rowObject.status == 1){
			return msgFormatter6;
		}else if(rowObject.status != null && rowObject.status == '2'|| rowObject.status == 2){
			return msgFormatter7;
		}else{
			return rowObject.status;
		}
	},
	statusFormat2:function(cellvalue, rowObject,options){		
		if(rowObject.status == 'ONGOING'){
			return msgFormatter5;
		}else if(rowObject.status == 'COMPLETED'){
			return msgFormatter6;
		}else if(rowObject.status == 'CANCELLED'){
			return msgFormatter7;
		}else{
			return rowObject.status;
		}
	},
	quantityConvert:function(cellvalue, rowObject,options ){
		return formatQuantityEx(rowObject.quantity,rowObject.convfact);
	}
};
var StockCategoryFormatter = {
	delProductFormatter: function(cellvalue, options, rowObject){
		return "<span style='cursor:pointer' onclick=\"return StockCategory.delSelectedRow('"+ rowObject.id +"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></span>";
	},
	chooseCellFormatter: function(cellvalue, options, rowObject){		
		return '<input id="productRow_'+ options.rowId +'" type="checkbox" style="text-align:right" class="InputTextStyle InputText1Style SelProduct selectProduct" value="'+options.rowId +'" >';
	}
};
var StockValidateInput = {
		getQuantity: function(amount, convfact){
			if(amount==undefined || amount==null){
				return 0;
			}
			if(convfact != undefined && convfact == 0){
				convfact = 1;
			}			
			var bigUnit = 0;
			var smallUnit = 0;	
			amount = new String(amount);
			if(amount.indexOf('/') == -1){			
				smallUnit = Number(amount);
			}else{
				var arrCount = amount.split('/');
				if(arrCount.length > 0){
					if(arrCount[0].trim().length==0){
						bigUnit = 0;
					}else{
						bigUnit = parseInt(arrCount[0].trim());
					}
					if(arrCount[1].trim().length==0){
						smallUnit = 0;
					}else{
						smallUnit = parseInt(arrCount[1].trim());
						if(smallUnit>=convfact){
							var addBig = parseInt(smallUnit/convfact,10);
							var mod = smallUnit%convfact;
							bigUnit = bigUnit + addBig;
							smallUnit = mod;
						}	
					}					
				}
			}		
			return bigUnit*convfact + smallUnit;
		},
		formatStockQuantity:function(amount,convfact){
			if(amount==null || amount==undefined || amount.toString().length==0){
				return '';
			}
			if(convfact==null || convfact==undefined || convfact.toString().length==0){
				return '';
			}
			amount = amount.toString();
			if(amount.indexOf('/')>=0){
				var arrCount = amount.split('/');
				if(arrCount.length>=3){
					return '';
				}else{
					if(amount.split('/').length <= 1){
						return parseInt(amount,10) + '/0';						
					}
					if(amount.split('/')[0].length==0 || isNaN(amount.split('/')[0])){
						return '0' + '/' + parseInt(amount.split('/')[1],10);
					}
					if(amount.split('/')[1].length==0 || isNaN(amount.split('/')[1])){
						return parseInt(amount.split('/')[0],10) + '/0';
					}
					if(isNaN(amount.split('/')[0]) || isNaN(amount.split('/')[1])){
						return '0/0';
					}
					if(amount.split('/')[1]>=convfact && parseInt(convfact) != 1){
						var amount_temp = parseInt(amount.split('/')[0],10) + parseInt(amount.split('/')[1]/convfact);
						return amount_temp + '/' + parseInt(amount.split('/')[1])%convfact;
					}					
					return parseInt(amount.split('/')[0],10) + '/' + parseInt(amount.split('/')[1],10);	
				}
			}else{	
				if(isNaN(amount)){
					return '0/0';
				}
				if(parseInt(amount)>=convfact){
					var amount_temp = parseInt(amount/convfact,10);
					var amount_mod = amount%convfact;
					amount = (parseInt(amount_temp,10)) + '/' + (parseInt(amount_mod,10));	
				}else{
					amount = '0/' + parseInt(amount,10);		
				}				
			}	
			return amount;
		},
		formatStockQuantityEx:function(amount,convfact){
			if(amount==null || amount==undefined || amount.toString().length==0){
				return '';
			}
			if(convfact==null || convfact==undefined || convfact.toString().length==0){
				return '';
			}
			amount = amount.toString();
			if(amount.indexOf('/')>=0){
				var arrCount = amount.split('/');
				if(arrCount.length>=3){
					return '';
				}else{
					if(amount.split('/').length <= 1){
						return parseInt(amount,10) + '/0';						
					}
					if(amount.split('/')[0].length==0 || isNaN(amount.split('/')[0])){
						return '0' + '/' + parseInt(amount.split('/')[1],10);
					}
					if(amount.split('/')[1].length==0 || isNaN(amount.split('/')[1])){
						return parseInt(amount.split('/')[0],10) + '/0';
					}
					if(isNaN(amount.split('/')[0]) || isNaN(amount.split('/')[1])){
						return '0/0';
					}
					if(amount.split('/')[1]>=convfact){
						var amount_temp = parseInt(amount.split('/')[0],10) + parseInt(amount.split('/')[1]/convfact);
						return amount_temp + '/' + parseInt(amount.split('/')[1])%convfact;
					}					
					return parseInt(amount.split('/')[0],10) + '/' + parseInt(amount.split('/')[1],10);	
				}
			}else{	
				if(isNaN(amount)){
					return '0/0';
				}
				if(parseInt(amount)>=convfact){
					var amount_temp = parseInt(amount/convfact,10);
					var amount_mod = amount%convfact;
					amount = parseInt(amount_temp,10) + '/' + parseInt(amount_mod,10);	
				}else{
					amount = '0/' + parseInt(amount,10);		
				}				
			}	
			return amount;
		}
};