/**
 * Quan ly goi cuoc
 * @author haupv3
 * @since 09/12/2014
 */

var PaymentManager = {
		
		_isCreate: false,
		_currentDate : null,
		_maxHistoryDate : null,
		_isFirstLoad : false,
		_titleRetail : null,
		 /**
		  * Khoi tao datagrid
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 InitDatagrid : function (params){
			 
			 $('#grid').datagrid({
				 url : '/payment/search',
				 queryParams: params,
				 fitColumns : true,
				 pagination : true,
				 rownumbers : true,
				 autoRowHeight : false,
				 scrollbarSize:0,
				 columns : [[
				             {field: 'payName', title :msgPaymentName, width: 150,					
				            	 formatter : function(value, row, index) {
				            		 return row.payName;
								}
				             },
				             {field: 'payExpire', title :msgExpireType, width: 100,align:'center',					
				            	 	formatter : function(value, row, index) {
				            	 		return row.payExpire + " "+msgDayExpire;
								}	 
				             },
				             {field: 'payInitPrice', title:msgInitPrice + '/user', width: 60,align:'right',
				            	 formatter : function(value, row, index){
				            		 if(!Utils.isEmpty(row.payFull)){
				            			 return formatCurrency(row.payInitPrice);
				            		 }else{
				            			 return "";
				            		 }
				            	 }
				             },
				             {field: 'payFull', title:msgPackagePrice + '/user', width: 60, align:'right',
				            	 formatter : function(value, row, index){
				            		 if(!Utils.isEmpty(row.payFull)){
				            			 return formatCurrency(row.payFull);
				            		 }else{
				            			 return "";
				            		 }
				            	 }
				             },
				             
				             {field: 'payDate', title:msgTimeAble, width: 100, align:'center',
				            	 formatter : function(value, row, index){
				            		 
				            		 var fDate = "";
				            		 var tDate = "";
				            		 if(!Utils.isEmpty(row.fromDate)){
				            			 fDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
				            		 }
				            		 if(!Utils.isEmpty(row.toDate)){
				            			 tDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.toDate)));
				            		 }
				            		 return fDate + " - " + tDate;
				            	 }
				             },
				             {field: 'id', width:30, align:'center',title:'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png" style="cursor:pointer;" onclick="PaymentManager.showDialogDetail()"/>', 
				 		    	formatter : function(value, row, index){
				 		    		var controlStr = '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" style="cursor:pointer;" onclick="PaymentManager.showDialogDetail('+ index +')"/>';
				 		    			controlStr += '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png" style="cursor:pointer;" onclick="PaymentManager.deletePayment('+ index +')"/>';
						    		return controlStr;
						    	}
				             }
				             
				           ]]
			 });
		 },
		 /**
		  * Hien thi dialog edit/tao moi
		  * @author haupv3
		  * @Since 09/12/2014
		  * **/
		 showDialogDetail : function(index){
			 
			 var row = $('#grid').datagrid('getRows')[index];
			 $('#paymentEasyUIDialog #errMsg').html('').hide();
			 $('#paymentEasyUIDialog #sucExcelMsg').html('').hide();
			 //ReportsUtils.setCurrentDateForCalendar('popToDate');
			 ReportsUtils.setCurrentDateForCalendar('popFromDate');
			 //$('#retailCover').hide();
			 
			 $('#popPayName').val('');
			 $('#popPayExpire').val('');
			 $('#popPayInit').val('');
			 $('#popPayFull').val('');
			 $('#paymentId').val('');
			 $('#popPayExpire').attr('disabled','disabled');
			 
			 $('#historyCover').hide();
			 if(row != null){//edit
				 PaymentManager._isCreate = false;
				 PaymentManager._isFirstLoad = true;
				 PaymentManager._maxHistoryDate = "";
				 PaymentManager.loadHistoryCharge(row);
				 
				 $('#popPayName').val(row.payName);
				 $('#popPayExpire').val(row.payExpire);
				 /*$('#popPayInit').val(row.payInitPrice);
				 $('#popPayFull').val(row.payFull);*/
				 
				 
				 var fDate = "";
				 var tDate = "";
        		 if(!Utils.isEmpty(row.fromDate)){
        			 fDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
        		 }
        		 if(!Utils.isEmpty(row.toDate)){
        			 tDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.toDate)));
        		 }
        		 
        		 $('#retailCover').hide();
        		 
        		 PaymentManager._titleRetail =PaymentManager._titlePhiKT;
        		 if(Number(row.payType) == 1){
        			 $('#isRetail').attr('checked',true);
        			 $('#isRetail').attr('disabled',true);
        			 $('#retailCover').show();
      		    	$('#lblKhoiTao').html(PaymentManager._titleGioiHan);
     		    	$('#lblVND').hide();
        		 }else{
      		    	$('#lblKhoiTao').html(PaymentManager._titlePhiKT);
     		    	$('#lblVND').show();
        		 }
        		 
				 $('#popToDate').val('');
				 $('#popFromDate').val('');
				 $('#paymentId').val(row.paymentId);
				 
			 }else{//create
				 $('#popLoading').hide();
				 PaymentManager._isCreate = true;
				 $('#retailCover').show();
    			 $('#isRetail').attr('checked',false);
      		     $('#lblKhoiTao').html(PaymentManager._titlePhiKT);
     		     $('#lblVND').show();
    			 $('#isRetail').removeAttr('disabled');
				 $('#popPayExpire').removeAttr('disabled');
				 $('#popToDate').val('');
				 ReportsUtils.setCurrentDateForCalendar('popFromDate');
				 
		  		 $('#paymentEasyUIDialog').dialog({
						cache: false,
						modal: true
		  		 });

		  		  $('#paymentEasyUIDialog').dialog('open');
			 }

		 },
		 /**
		  * Xoa cuoc phi
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 deletePayment : function(index){
			 var row = $('#grid').datagrid('getRows')[index];
			 if(row != null){
				 var params = new Object();
				 params.prepaidId = row.paymentId;
	
				setTimeout(function(){
						$('#successMsg').html('').hide();
						$('#errExcelMsg').html('').hide();
				}, 5000);
					
				Utils.addOrSaveData(params, '/payment/delete', null, 'errMsg',function(data1){
						if(!isNullOrEmpty(data1.errMsg)){
							$('#successMsg').html('').hide();
							$('#errExcelMsg').html(data1.errMsg).show();
							setTimeout(function(){$('#successMsg').html('').hide();}, 10);
							return false;
						}else{
							setTimeout(function(){$('#sucExcelMsg').html('').hide();}, 5000);
							$('#grid').datagrid('reload');
						}
					},null,null, true, msgCommon2, function(data2){
						if(!isNullOrEmpty(data2.errMsg)){
							$('#successMsg').html('').hide();
							$('#errExcelMsg').html(data2.errMsg).show();
							return false;
						}
				}, null, null, null);
			 }
			
		 },
		 /**
		  * Load lich su gia
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 loadHistoryCharge : function(row){

			 var titleG = "";
			 var isTrial = false;
    		 if(Number(row.payType) == 1){
    			 titleG = PaymentManager._titleGioiHan;
    			 isTrial = true;
    		 }else{
    			 titleG = PaymentManager._titlePhiKT;
    		 }
			 
			 var params = new Object();
			 params.prepaidId = row.paymentId;
			 $('#popLoading').show();
			 $('#historyGrid').datagrid({
				 url : '/payment/get-pay-history',
				 queryParams: params,
				 fitColumns : true,
				 pagination : true,
				 rownumbers : true,
				 autoRowHeight : true,
				 scrollbarSize:0,
				 columns : [[

				             {field: 'initialCost', title: titleG, width: 90,align:'right',
				            	 formatter : function(value, row, index){
				            			 if(isTrial == true){
				            				 return formatCurrency(row.numTrialUser);
				            			 }else{
				            				 return formatCurrency(row.initialCost);
				            			 }

				            			 return "";

				            	 }
				             },
				             {field: 'fullCost', title:msgPackagePrice + '/user', width: 90, align:'right',
				            	 formatter : function(value, row, index){
				            		 if(!Utils.isEmpty(row.fullCost)){
				            			 return formatCurrency(row.fullCost);
				            		 }else{
				            			 return "";
				            		 }
				            	 }
				             },
				             
				             {field: 'payDate', title:msgTimeAble, width: 200, align:'center',
				            	 formatter : function(value, row, index){
				            		 
				    				 var fDate = "";
				    				 var tDate = "";
				            		 if(!Utils.isEmpty(row.fromDate)){
				            			 fDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
				            		 }
				            		 if(!Utils.isEmpty(row.toDate)){
				            			 tDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.toDate)));
				            		 }
				            		 return fDate + " - " + tDate;
				            	 }
				             },
				             {field: 'id', align:'center',title:msgCommonThaoTac,width:50, 
				 		    	formatter : function(value, row, index){
				 		    		
				 		    		var controlStr = "";
				 		    		var rowDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
				 		    		if(Utils.compareDate(rowDate,PaymentManager._currentDate)==false){
				 		    			controlStr = '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png" style="cursor:pointer;" onclick="PaymentManager.deleteHistory('+ index +')"/>';
				 		    		}
						    		return controlStr;
						    	}
				             }
				             
				           ]],
				           onLoadSuccess: function(data){
				        	    
					  		   $('#paymentEasyUIDialog').dialog({
										cache: false,
										modal: true
							   });

							   $('#paymentEasyUIDialog').dialog('open');
							   
				        	   $('#popLoading').hide();
				        	   if(data != null){
				        		   if(data.rows.length >0){
				        			   $('#historyCover').show();
				        			   if(PaymentManager._isFirstLoad == true){
				        				  //PaymentManager._maxHistoryDate = data.curCost.fromDate + "/"+ data.curCost.toDate;
				        				   $("#historyGrid").datagrid({pageNumber:1});
				        				   PaymentManager._isFirstLoad = false;
				        			   }
				        		   }
				        	   }
				        	   
				           }
			 });
		 },
		 /**
		  * Xoa lich su thay doi gia
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 deleteHistory : function(index){
			 
			 var row = $('#historyGrid').datagrid('getRows')[index];
			 if(row != null){
				 var params = new Object();
				 params.prepaidId = row.id;
	
				setTimeout(function(){
						$('#paymentEasyUIDialog #successMsg').html('').hide();
						$('#paymentEasyUIDialog #errExcelMsg').html('').hide();
				}, 5000);
					
				Utils.addOrSaveData(params, '/payment/delete-history', null, 'errMsg',function(data1){
						if(!isNullOrEmpty(data1.errMsg)){
							$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();
							$('#paymentEasyUIDialog #errMsg').html(data1.errMsg).show();
							setTimeout(function(){$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();}, 10);
							return false;
						}else{
							setTimeout(function(){$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();}, 5000);
							$('#historyGrid').datagrid('reload');
						}
					},null,null, true, msgCommon2, function(data2){
						if(!isNullOrEmpty(data2.errMsg)){
							$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();
							$('#paymentEasyUIDialog #errMsg').html(data2.errMsg).show();
							return false;
						}
				}, null, null, null);
			 }
			
		 },
		 /**
		  * Tao moi hay cap nhat 
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 createOrUpdate : function(){
				var params = new Object();
				var msg = '';
				
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayName',msgPaymentName,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayExpire',msgExpireType,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayFull',msgPackagePrice,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayFull',popFromDate,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popFromDate',msgFromDate,false,10);
				}		
				
				if(isNullOrEmpty(msg)){
					ValidateUtils.getMessageOfInvalidFormatDate('popFromDate',msgFromDate,Utils._DATE_MM_YYYY);
				}
				
				if(isNullOrEmpty(msg)){
					ValidateUtils.getMessageOfInvalidFormatDate('popToDate',msgToDate,Utils._DATE_MM_YYYY);
				}
				
				
				var fDate = $('#popFromDate').val().trim();
				var tDate = $('#popToDate').val().trim();
				if(!isNullOrEmpty(tDate)){
					if (isNullOrEmpty(msg) && ( Utils.compareDate_V2(fDate,tDate) == 1)) {
						msg = msgCommonErr3;
						$('#popFromDate').focus();
					}
				}
				
				if (isNullOrEmpty(msg) && (Utils.compareDate_V2(PaymentManager._currentDate,fDate) == 1) ) {
					msg = msgCommonErr20;
					$('#popFromDate').focus();
				}
				
				var params = new Object();
				
				if(PaymentManager._isCreate == false || PaymentManager._isCreate == 'false'){
					
					var rows = $('#historyGrid').datagrid('getRows');

					var fromDate = $('#popFromDate').val();
					var toDate = $('#popToDate').val();

					if(rows != null && rows.length >0){
					  for(var i=0; i<rows.length; i++){
					    var row = rows[i];
					    if(row != null && isNullOrEmpty(msg)){
					      var rowF = "";
					      var rowT = "";
					      
					      if(!Utils.isEmpty(row.fromDate)){
					        rowF = $.datepicker.formatDate('dd/mm/yy', new Date(row.fromDate));
					      }
					      if(!Utils.isEmpty(row.toDate)){
					        rowT = $.datepicker.formatDate('dd/mm/yy', new Date(row.toDate));
					      }
					      

					    	  
					      if(!Utils.isEmpty(rowT)){// to date tren grid khong null
							     if( (Utils.compareDate_V2(fromDate, rowF) == 1 || Utils.compareDate_V2(fromDate, rowF) == 0)
							        && (Utils.compareDate_V2(fromDate, rowT) == -1 || Utils.compareDate_V2(fromDate, rowT) == 0) ){
							   	  	msg = msgCheckHist;
							     }
					    	 }else{//to date tren grid null
					    		 if( !Utils.isEmpty(toDate)){
								     if( (Utils.compareDate_V2(fromDate, rowF) == -1 || Utils.compareDate_V2(fromDate, rowF) == 0)
								    		 && (Utils.compareDate_V2(toDate, rowF) == 1 || Utils.compareDate_V2(toDate, rowF) == 0)){
										   msg = msgCheckHist;
									     }
					    		 }else{
								     if( (Utils.compareDate_V2(fromDate, rowF) == -1 || Utils.compareDate_V2(fromDate, rowF) == 0)){
										   msg = msgCheckHist;
									     }
					    		 }

				    	  }
						      

					      if(!Utils.isEmpty(toDate)){
					    	  if(!Utils.isEmpty(rowT)){// to date tren grid khong null
							      if( (Utils.compareDate_V2(toDate, rowF) == 1 || Utils.compareDate_V2(toDate, rowF) == 0)
									         && (Utils.compareDate_V2(toDate, rowT) == -1 || Utils.compareDate_V2(toDate, rowT) == 0) ){
									        msg = msgCheckHist;
							      }					    	  
					    	  }else{
								     if( (Utils.compareDate_V2(fromDate, rowF) == -1 || Utils.compareDate_V2(fromDate, rowF) == 0)
								    		 && (Utils.compareDate_V2(toDate, rowF) == 1 || Utils.compareDate_V2(toDate, rowF) == 0)){
										   msg = msgCheckHist;
									     }
					    	  }
					      }

					    }//end if
					    
					  }//end for
					  
					}//end if rows !null
					
				}
				
				if(!isNullOrEmpty(msg)){
					$('#paymentEasyUIDialog #errMsg').html(msg).show();
					return false;
				}
				
				
				params.isCreate = PaymentManager._isCreate;
				if(PaymentManager._isCreate == false || PaymentManager._isCreate == 'false'){
					params.prepaidId = $('#paymentId').val();
				}
				
				params.isRetail = $("#isRetail").is(':checked');
				
				
				params.prepaidName = $('#popPayName').val();
				params.usageHistory = $('#popPayExpire').val();
				params.initPrice = $('#popPayInit').val();
				params.fullPrice = $('#popPayFull').val();
				params.fromDate = $('#popFromDate').val();
				params.toDate = $('#popToDate').val();
				
				
				Utils.addOrSaveData(params, '/payment/create-or-update', null, 'errMsg',function(data1){
					if(!isNullOrEmpty(data1.errMsg)){
						$('#successMsg').html('').hide();
						$('#paymentEasyUIDialog #errMsg').html(data1.errMsg).show();
						setTimeout(function(){$('#successMsg').html('').hide();}, 10);
						return false;
					}else{
						if(PaymentManager._isCreate == true){
							$('#paymentEasyUIDialog').dialog('close');
							$('#grid').datagrid('reload');
						}else{
							$('#paymentEasyUIDialog #sucExcelMsg').html(msgCommon1).show();
							$('#historyGrid').datagrid('reload');
						}
						$('#errExcelMsg').html(msgCommon1).show();
						setTimeout(function(){$('#successMsg').html('').hide();}, 5000);
						setTimeout(function(){$('#sucExcelMsg').html('').hide();}, 5000);
					}
				},null,null, null, null, function(data2){
					if(!isNullOrEmpty(data2.errMsg)){
						$('#successMsg').html('').hide();
						$('#paymentEasyUIDialog #errMsg').html(data2.errMsg).show();
						return false;
					}
				});
		 }
};