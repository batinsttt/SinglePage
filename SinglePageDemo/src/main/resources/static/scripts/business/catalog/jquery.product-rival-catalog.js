var ProductRivalCatalog = {
	_xhrSave:null,
	_xhrDel:null,
	getGridUrl: function(productCode,type){
		return WEB_CONTEXT_PATH +"/catalog/product-rival/search?productCode=" + encodeChar(productCode) + "&type=" + type;
	},
	search: function(){
		$('#errMsg').html('').hide();
		var productCode = $('#productCode').val().trim();
		var type = $('#type').val();
		var url = ProductRivalCatalog.getGridUrl(productCode,type);
		$("#grid").datagrid({url:url,pageNumber:1});
		return false;
	},
	editRow:function(target){
		var indexRow = ProductRivalCatalog.getRowIndex(target);
	    $('#grid').datagrid('beginEdit', indexRow);
	},
	updateActions:function(index){  
	    $('#grid').datagrid('updateRow',{  
	        index: index,  
	        row:{}  
	    });  
	},
	getRowIndex:function(target){  
	    var tr = $(target).closest('tr.datagrid-row');  
	    return parseInt(tr.attr('datagrid-row-index'));  
	},  
	cancelRow:function (target){  
		var indexRow = ProductRivalCatalog.getRowIndex(target);
	    $('#grid').datagrid('cancelEdit', indexRow);  
	},
	deleteRow: function(productId){
		$('#errMsg').html('').hide();
		var dataModel = new Object();
		dataModel.productId = productId;	
		Utils.deleteSelectRowOnGrid(dataModel, ProductRivalCatalog_name, "/catalog/product-rival/remove", ProductRivalCatalog._xhrDel, null, null);		
		return false;		
	},
	createRow: function(){
		var msg = '';
		$('#errMsgDlg').html('').hide();
		var name = $('#productCodeDlg').val();
		var note = $('#noteDlg').val();
		msg = Utils.getMessageOfRequireCheck('productCodeDlg',msgTenSanPham);
		
		if(name.length > 250){
			msg = format( ProductRivalCatalog_lenghtName,250);
		}
		if(note.length > 100){
			msg = format(ProductRivalCatalog_lenghtNote,100);
		}
		if (msg.length == 0) {
			if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|||^|`]+$/.test(name)){
				msg = format(msgErr_invalid_format_name,msgTenSanPham);
			}
		}
		if(msg.length > 0){
			$('#errMsgDlg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.productId = $('#productId').val();
		dataModel.productCode = $('#productCodeDlg').val();
		dataModel.note = $('#noteDlg').val().trim();
		dataModel.type = $('#type').val();
		Utils.addOrSaveData(dataModel, "/catalog/product-rival/save", ProductRivalCatalog._xhrSave, 'errMsgDlg',function(data){
			ProductRivalCatalog.search();
			$('#productDialog').dialog('close');
			
		});
		return false;
	},
	updateRow: function(target){
		var indexRow = ProductRivalCatalog.getRowIndex(target);
	    ProductRivalCatalog.indexedit = indexRow;	    
	    var rows = $('#grid').datagrid('getRows');
	    var row =  rows[indexRow];
		var msg = '';
		$('#errMsg').html('').hide();

		var productName = $('td[field=apParamName] .datagrid-editable-input').val();
		if(productName == ""){
			msg = format(ProductRivalCatalog_requiredField,msgTenSanPham);
			$('#errMsg').html(msg).show();			
			$('td[field=apParamName] .datagrid-editable-input').focus();
			return false;
		}
		if(productName.length > 250 ){
			msg = format(ProductRivalCatalog_lenghtName,250);
			$('#errMsg').html(msg).show();			
			$('td[field=apParamName] .datagrid-editable-input').focus();
			return false;
		}
		var productNote = $('td[field=description] .datagrid-editable-input').val();
		if(productNote.length > 100 ){
			msg = format(ProductRivalCatalog_lenghtNote,100);
			$('#errMsg').html(msg).show();			
			$('td[field=description] .datagrid-editable-input').focus();
			return false;
		} 
		$('#productCodeHidden').val(productName);
        
		var msgProductName = Utils.getMessageOfSpecialCharactersValidate('productCodeHidden',msgTenSanPham,Utils._NAME) ;
		if(msgProductName.length > 0){
			$('#errMsg').html(msgProductName).show();			
			$('td[field=apParamName] .datagrid-editable-input').focus();
			return false;
		}
		$('#noteHidden').val(productNote);
		var msgProductNote = Utils.getMessageOfSpecialCharactersValidate('noteHidden',msgGhiChu,Utils._NAME) ;
		if(msgProductNote.length > 0)
		{
			$('#errMsg').html(msgProductNote).show();			
			$('td[field=description] .datagrid-editable-input').focus();
			return false;			
		}
		
		$('#productId').val($('#grid').datagrid('getRows')[this.indexedit].id);
		
		var dataModel = new Object();
		dataModel.productId = $('#productId').val();
		dataModel.productCode = $('#productCodeHidden').val();
		dataModel.note = $('#noteHidden').val().trim();
		dataModel.indexRow = indexRow;
		Utils.addOrSaveData(dataModel, "/catalog/product-rival/save", ProductRivalCatalog._xhrSave, null,function(data){
			ProductRivalCatalog.search();			
		});
		return false;
	},
	showDialogProduct:function(){
		$('#errMsgDlg').html('').hide();		
		$('#productId').val(0);
		$('#productCodeDlg').val('');
		$('#noteDlg').val('');
		$('#divDialog').css('visibility','visible');
		$('#productDialog').dialog({  
		    title: ProductRivalCatalog_infosRival
		});
		$('#productDialog').dialog('open');
		$('#productCodeDlg').focus();
	}
};