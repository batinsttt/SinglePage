var PromotionCatalog = {//Lam
	_xhrSave : null,
	_xhrDel: null,
	_xhrReport: null,
	_mapShop:null,
	_listShopId:null,
	_listQuantity:null,
	_mapCheckCustomer: new Map(),
	_listCustomer:null,
	_listSize:null,
	_listCustomerSize:null,
	_flagAjaxTabAttribute:null,
	_listCustomerDialogSize:null,
	_hasCustomerType:false,
	_hasSaleLevel:false,
	lstType:new Array(),
	zvMap :new Map(),
	_isPromotionPage: null,
	
	//haupv add xu ly dialog
	_isCloseDialogWithoutChange : false,
	_mapProductCodeStr1 : new Map(),
	_mapProductCodeStr2 : new Map(),
	_mapNewDataSubGrid1 : new Map(),
	_mapNewDataSubGrid2 : new Map(),
	//end xu ly dialog
	getTrue_DataOrFalse_MessageOfAutoAttribute: function(objectId, nameAttribute,valueType){
		if(valueType=="CHARACTER"){
			var msg = '';
			var dataOfAutoAttribute = $('#'+objectId+'_CHARACTER').val();
			if(dataOfAutoAttribute==''){
				msg = PromotionCatalog_valueAttribute+nameAttribute;
				$('#'+objectId+'_CHARACTER').focus();
				return 'false_'+msg;
			}
			if(Utils.isEmpty($('#'+objectId+'_CHARACTER').val())){
				msg =   PromotionCatalog_Attribute+' ' + nameAttribute + ':' +PromotionCatalog_invalideEspace;
				$('#'+objectId+'_CHARACTER').focus();
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfSpecialCharactersValidate(objectId+'_CHARACTER','',Utils._NAME);
			if(msg.length > 0){
				msg = PromotionCatalog_Attribute+nameAttribute+': '+ PromotionCatalog_specialCharacte +' [<>\~#&$%@*()^`\'"'; 
				return 'false_'+msg;
			}
			
			return 'true_'+dataOfAutoAttribute;
		}else if(valueType=="NUMBER"){
			var msg = '';
			var NUMBER_from = $('#'+objectId+'_NUMBER_from').val();
			var NUMBER_to = $('#'+objectId+'_NUMBER_to').val();
			if(NUMBER_from == ''){
				msg =  PromotionCatalog_valueAttribute+' '+nameAttribute;
				$('#'+objectId+'_NUMBER_from').focus();
				return 'false_'+msg;
			}
			if(NUMBER_to == ''){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute;
				$('#'+objectId+'_NUMBER_to').focus();
				return 'false_'+msg;
			}
			NUMBER_from = parseInt(Utils.returnMoneyValue(NUMBER_from.trim()));
			NUMBER_to = parseInt(Utils.returnMoneyValue(NUMBER_to.trim()));
			var dataOfAutoAttribute = NUMBER_from +','+NUMBER_to;//Nếu ở trên không cắt dấu phẩy đi thì sẽ ảnh hưởng!
			
			/*msg = Utils.getMessageOfSpecialCharactersValidateEx(objectId+'_NUMBER_from','',Utils._TF_NUMBER_DOT);
			if(msg.length > 0){
				msg = 'Thuộc tính '+nameAttribute+': Giá trị "Từ" chỉ nằm trong các ký tự [0-9.].'; 
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfSpecialCharactersValidateEx(objectId+'_NUMBER_to','',Utils._TF_NUMBER_DOT);
			if(msg.length > 0){
				msg = 'Thuộc tính '+nameAttribute+': Giá trị "Đến" chỉ nằm trong các ký tự [0-9.].'; 
				return 'false_'+msg;
			}*/
			if(NUMBER_from!='' &&  NUMBER_to!='' &&  NUMBER_from > NUMBER_to){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+PromotionCatalog_valueFromTo;
				return 'false_'+msg;
			}
			return 'true_'+dataOfAutoAttribute;
		}else if(valueType=="DATE_TIME"){
			var msg = '';
			var DATETIME_from = $('#'+objectId+'_DATETIME_from').val();
			var DATETIME_to = $('#'+objectId+'_DATETIME_to').val();
			var dataOfAutoAttribute = DATETIME_from +','+DATETIME_to;
			if(DATETIME_from == '' && DATETIME_to == ''){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute;
				$('#'+objectId+'_DATETIME_from').focus();
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfInvalidFormatDate(objectId+'_DATETIME_from');
			if(msg.length > 0){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+PromotionCatalog_invaliteValueFrom +'dd/mm/yyyy.'; 
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfInvalidFormatDate(objectId+'_DATETIME_to');
			if(msg.length > 0){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+ PromotionCatalog_invaliteValueTo+'dd/mm/yyyy.'; 
				return 'false_'+msg;
			}
			if(!Utils.compareDate(DATETIME_from, DATETIME_to)){
				msg = msgErr_fromdate_greater_todate;
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+msg;
				return 'false_'+msg;
			}
			return 'true_'+dataOfAutoAttribute;
		}
	},
	saveCustomerAttribute: function(){
		var message = '';
		var messageSaleLevel = '';
		var messageCustomerType = '';
		$('#errMsgSave').html('').hide();
		var data = new Object();
		var listCustomerType= new Array();
		var listSaleLevelCatId= new Array();
		var listAttribute= new Array();
		var listAttributeDataInField=new Array();
		var nameAttr = '';
		$('.checkBoxAttribute').each(function(){
			var objectType = $(this).attr('objectType');
			var objectId = $(this).attr('objectId');
			var name = $(this).attr('name');
			
			if(objectType == 2){
				listAttribute.push(-2);//Loai kh cho id = -2 di. De ti nua if else tren action.
				listAttributeDataInField.push('CustomerType');
				messageCustomerType = 'noCheckCustomerType';
				listCustomerType= new Array();
				$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
					if($(this).attr('checked')=='checked'){
						listCustomerType.push($(this).val());
						messageCustomerType = 'haveCheckCustomerType';
					}
				});
			}else if(objectType == 3){
				listAttribute.push(-3);//Muc doanh so cho id = -3 di. De ti nua if else tren action.
				listAttributeDataInField.push('SaleLevel');
				messageSaleLevel = 'noCheckSaleLevel';
				listSaleLevelCatId= new Array();
				$('#saleLevel input[type=checkbox]').each(function(){
					if($(this).attr('checked')=='checked'){
						listSaleLevelCatId.push(this.value);
//						listSaleLevelCatId.push($(this).attr('objectid'));
						//vào được đây tức là mức doanh số có ít nhất 1 combox được check.
						messageSaleLevel = 'haveCheckSaleLevel';
					}
				});
			}else if(objectType == 1){ 
				listAttribute.push(objectId);
				var valueType = $(this).attr('valueType');
				if(valueType=="CHARACTER" || valueType=="NUMBER" || valueType=="DATE_TIME"){
					var boolean = PromotionCatalog.getTrue_DataOrFalse_MessageOfAutoAttribute(objectId, name, valueType);
					var arr = boolean.split('_');
					if(arr[0]=='false'){
						message = arr[1];
						return false;
					}else{
						listAttributeDataInField.push(arr[1]);
					}
				}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
					messageSaleLevel = 'noCheckOther';
					var dataOfAutoAttribute = '';
					$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
						if($(this).attr('checked')=='checked'){
							dataOfAutoAttribute += $(this).val() +',';//Nhớ chú ý dấu phẩy cuối cùng
							messageSaleLevel = 'haveCheckOther';
						}
					});
					nameAttr = name;
					listAttributeDataInField.push(dataOfAutoAttribute);
				}
				
			}
			
		});
		if(messageSaleLevel == 'noCheckSaleLevel'){
			message = PromotionCatalog_valueAtt1+' '+ PromotionCatalog_doanhSo;
		}
		if(messageCustomerType == 'noCheckCustomerType'){
			message = PromotionCatalog_valueAtt1+' ' +PromotionCatalog_typeClient;
		}
		if(messageSaleLevel == 'noCheckOther'){
			message = PromotionCatalog_valueAtt1+' '+nameAttr;
		}
		if(message.length > 0){
			$('#errMsgSave').html(message).show();
			return false;
		}
		data.listCustomerType = listCustomerType;
		data.listSaleLevelCatId = listSaleLevelCatId;
		data.listAttribute = listAttribute;
		data.listAttributeDataInField = listAttributeDataInField;
		data.promotionId=$('#promotionId').val();
		Utils.addOrSaveData(data, '/catalog/promotion/save-promotion-customer-attribute', PromotionCatalog._xhrSave, 'errMsgSave', null, 'loading2',
				'#customerAttributeMsg ');//Prefix để selector jquery mà truyền thiếu "khoảng trắng" 
		//là có thể lỗi, không xuất ra câu thông báo lỗi, hay câu thông báo thành công đâu.
		return false;
		},
		
		/**
		 * Tai mau file import
		 * @author connv
		 * @since 13 June 2017
		 * **/
		downloadImportTemplate:function(){
			var url='/catalog/promotion/export-template-for-import';
			if(CommonSearch._xhrReport != null){
				CommonSearch._xhrReport.abort();
				CommonSearch._xhrReport = null;
			}
			
			var data = new Object();
			data.checkInOut = '1';
			var kData = $.param(data,true);
			
			CommonSearch._xhrReport = $.ajax({
				type : "POST",
				url : url,
				dataType: "json",
				data : (kData),
				success : function(data) {
					hideLoadingIcon();	
					if(data.error && data.errMsg!= undefined){
						$('#'+ errMsg).html(Warehouse._xuatfileloi + escapeSpecialChar(data.errMsg)).show();
					} else{
						if(data.hasData!= undefined && !data.hasData) {
							$('#'+ errMsg).html(Warehouse._khongcodulieu).show();
						} else{
//							window.location.href = data.view;
							//Begin anhdt10 - fix attt - dua ra acoutn dowload
							window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
							//End anhdt10
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
		
		
		
	checkSaleLevelCatIdInList: function(idSaleCatLevel,listData3){
		if(listData3!=null && listData3.length > 0){
			for(var j=0;j<listData3.length;++j){
				if(listData3[j].idSaleCatLevel == idSaleCatLevel){
					return true;
				}
			}
		}else{
			return false;
		}
	},
	loadAppliedAttribute: function(promotionId){/*
		if(PromotionCatalog._flagAjaxTabAttribute == true){
			PromotionCatalog._flagAjaxTabAttribute = false;
			Utils.getJSON("/catalog/promotion/applied-attributes?promotionId="+promotionId,function(result){
				PromotionCatalog._flagAjaxTabAttribute = true;
				var promotionStatus = $('#promotionStatus').val();
				var list = result.list;	
				if(list!=null){
					for(var k=0;k<list.length;++k){
						//đoạn này viết chung cho 1 attribute
						var objectType = list[k].objectType;
						var objectId = list[k].objectId;
						var name = Utils.XSSEncode(list[k].name);
						var html = '';
						//end đoạn viết chung.
						if(objectType==2){
							html+= '<div>';
							html+= '<div class="Clear"></div>';
							html+= '<li>';
							html+= '<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
							html+= '</li>';
							html+= '<div class="BoxSelect BoxSelect2">';
							html+= '<select id="customerType" style="width: 275px;" class="form-control" multiple="multiple">';
							var listData2 = list[k].listData;	
							var arrHtml = new Array();
							if(listData2 != null){
								for(var i=0;i<listData2.length;++i){
									if(listData2[i].checked == 'true'){
										arrHtml.push('<option value="'+ listData2[i].idChannelType +'" selected="selected">'+Utils.XSSEncode(listData2[i].codeChannelType) +'-'+Utils.XSSEncode(listData2[i].nameChannelType)+'</option>');
									}else{
										arrHtml.push('<option value="'+ listData2[i].idChannelType +'">'+Utils.XSSEncode(listData2[i].codeChannelType) +'-'+Utils.XSSEncode(listData2[i].nameChannelType)+'</option>');
									}
								}
							}
							html+= arrHtml.join("");
							html+= '</select>';
							html+= '</div>';
							html+= '<div class="Clear"></div>';
							html+= '</div>';
							$('#right').append(html);
							$('#customerType').dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
								var text = '';
								$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
									if($(this).attr('checked')=='checked'){
										text += $(this).next().text().split('-')[0] + ', ';
									}
								});
								if(text != ''){
									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
								}
								return text;
							} }); 
//							$("#customerType").dropdownchecklist("disabled");
						}else if(objectType == 3){
							var listData3 = list[k].listData;	
							var objectType = 3;
							var objectId = 0;
							var name = Utils.XSSEncode(PromotionCatalog_doanhSo);
							var html = '';
							//đoạn này hình như là giống nhau trong các trường hợp của objectType:
							html+= '<div id="saleLevel">';//Nhớ đặt id chỗ này để phân biệt, Ví dụ phân biệt: combobox(select)của mức doanh số, của loại khách hàng. 
							//phân biệt checkbox của mức doanh số, hay checkbox của loại khách hàng. Sau này bên hàm loadAppliedAttribute mình cũng đặt id 
							//chỗ objectType=3 giống thế này mới chạy được.
							html+= '<div class="Clear"></div>';
							html+= 	'<li>';
							html+=	'<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
							html+=	'</li>';
							//end đoạn giống nhau
							for qua cái list, add những label ngành hàng vào. Các lable Ngành hàng thì mình đặt chung 1 class "cat", để sau này mình lặp each 
							qua mỗi label, lấy catId(idProductInfoVO)của label đó, và lấy tất cả các mức mà người ta chọn, vậy cái combobox mức nên đặt id theo
							id của ngành hàng.
							var listProductInfoVO = list[k].listProductInfoVO;	
							if(listProductInfoVO!=null){
								for(var i=0;i<listProductInfoVO.length;++i){
									if(i==0){// if else để canh chỉnh html cho thẳng hàng đó mà.
										//label ngành hàng nên đặt 1 thuộc tính là catId
										html+= '<label catId="'+listProductInfoVO[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label5Style cat">'+Utils.Utils.XSSEncode(listProductInfoVO[i].codeProductInfoVO)+'</label>';
										//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+listProductInfoVO[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = listProductInfoVO[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var t=0;t<listSaleLevelCat.length;++t){
												var checked = PromotionCatalog.checkSaleLevelCatIdInList(listSaleLevelCat[t].idSaleCatLevel,listData3);
												if(checked == true){
													arrHtml.push('<option value="'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}else{
													arrHtml.push('<option value="'+ listSaleLevelCat[t].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}else{
										html+= '<div class="Clear"></div>';
										html+= '<label catId="'+listProductInfoVO[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label6Style">'+Utils.XSSEncode(listProductInfoVO[i].codeProductInfoVO)+'</label>';
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+listProductInfoVO[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = listProductInfoVO[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var t=0;t<listSaleLevelCat.length;++t){
												var checked = PromotionCatalog.checkSaleLevelCatIdInList(listSaleLevelCat[t].idSaleCatLevel,listData3);
												if(checked == true){
													arrHtml.push('<option value="'+ listSaleLevelCat[t].idSaleCatLevel +'" selected="selected">'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}else{
													arrHtml.push('<option value="'+ listSaleLevelCat[t].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}
								}
							}
							html+= '<div class="Clear"></div>';
							html+= '</div>';
							$('#right').append(html);
							$('.saleLevelCat').each(function(){
								var id = $(this).attr('id'); 
								$('#'+id).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
									var text = '';
									$('#ddcl-'+id+'-ddw input[type=checkbox]').each(function(){
										if($(this).attr('checked')=='checked'){
											text += $(this).next().text().split('-')[0] + ', ';
										}
									});
									if(text != ''){
										text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
									}
									return text;
								} }); 
							});
							
						}else if(objectType == 1){
							var valueType = list[k].valueType;
							var listData1 = list[k].listData;
							
							html+= '<div>';
							html+= '<div class="Clear"></div>';
							html+= '<li>';
							//thằng input của thuộc tính động cần bỏ valueType vào để sau này xử lý khi lưu.
							html+= '<input valueType="'+valueType+'"  name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
							html+= '</li>';
								
							if(listData1!=null){
								if(valueType=="CHARACTER"){
									//Nên đặt id html của text CHARACTER này theo attributeId cộng chuỗi CHARACTER  thì sẽ không bị conflict trong danh sách. Sau này muốn lưu thì
									//select theo attributeId để lấy ra dữ liệu.
									html+= '<input id="'+objectId+'_CHARACTER" type="text" style="width: 377px;" maxlength="250" value="'+Utils.XSSEncode(listData1[0])+'" class="InputTextStyle InputText1Style"/>';
								}else if(valueType=="NUMBER"){
									//Đặt id theo: attributeId_NUMBER_from và attributeId_NUMBER_to:
									var from = '';
									var to = '';
									if(listData1[0]!=null){
										from = listData1[0];
									}
									if(listData1[1]!=null){
										to = listData1[1];
									}
									html+= '<input id="'+objectId+'_NUMBER_from" style="width: 170px;" maxlength="11" type="text" value="'+formatCurrency(from)+'" class="InputTextStyle InputText5Style"/>';
									html+= '<label class="LabelStyle Label7Style">-</label>';
									html+= '<input id="'+objectId+'_NUMBER_to" style="width: 170px;" maxlength="11" type="text" value="'+formatCurrency(to)+'" class="InputTextStyle InputText5Style"/>';
								}else if(valueType=="DATE_TIME"){
									//Đặt id theo: attributeId_DATETIME_from và attributeId_DATETIME_to. Nhớ applyDateTimePicker applyDateTimePicker("#endDate");
									//Mình đặt chung bọn chúng 1 class rồi,applyDateTimePicker cho class đó được không nhỉ. Tí thử. 
									var from = '';
									var to = '';
									if(listData1[0]!=null){
										from = listData1[0];
									}
									if(listData1[1]!=null){
										to = listData1[1];
									}
									html+= '<input id="'+objectId+'_DATETIME_from"  style="width: 146px;"  type="text" value="'+from+'" class="InputTextStyle InputText6Style"/>';
									html+= '<label class="LabelStyle Label7Style">-</label>';
									html+= '<input id="'+objectId+'_DATETIME_to" style="width: 146px;"  type="text" value="'+to+'" class="InputTextStyle InputText6Style"/>';
								}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
									var arrHtml = new Array();
									html+= '<div class="BoxSelect BoxSelect2">';
									html+= '<select id="'+objectId+'" class="MySelectBoxClass" multiple="multiple">';
									for(var i=0;i<listData1.length;++i){
										if(listData1[i].checked == true){
											arrHtml.push('<option value="'+ listData1[i].attributeId +'" selected="selected">'+Utils.XSSEncode(listData1[i].code)+'-'+Utils.XSSEncode(listData1[i].name) +'</option>');
										}else{
											arrHtml.push('<option value="'+ listData1[i].attributeId +'">'+Utils.XSSEncode(listData1[i].code)+'-'+Utils.XSSEncode(listData1[i].name)+'</option>');
										}
									}
									html+= arrHtml.join("");
									html+= '</select>';
									html+= '</div>';
								}
							}
							html+= '<div class="Clear"></div>';
							html+= '</div>';
							$('#right').append(html);
							$('#'+objectId).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
								var text = '';
								$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
									if($(this).attr('checked')=='checked'){
										text += $(this).next().text().split('-')[0] + ', ';
									}
								});
								if(text != ''){
									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
								}
								return text;
							} }); 
							//dự thảo thì ko disable
							applyDateTimePicker('#'+objectId+'_DATETIME_from');
							applyDateTimePicker('#'+objectId+'_DATETIME_to');
							Utils.bindFormatOnTextfield(objectId+'_NUMBER_from',Utils._TF_NUMBER);
							Utils.formatCurrencyFor(objectId+'_NUMBER_from');
							Utils.bindFormatOnTextfield(objectId+'_NUMBER_to',Utils._TF_NUMBER);
							Utils.formatCurrencyFor(objectId+'_NUMBER_to');
						}
					}
				}
				//ko dự thảo thì disable.
				if(!AllowEditProPgram.isEditProPgramPer() || promotionStatus != 2){
					$("#right .MySelectBoxClass").dropdownchecklist("disable");
					$("#right :input").attr('disabled',true);
					$("#left :input").attr('disabled',true);
					$('#updateCustomerAttribute').hide();
					$('#right .CalendarLink').hide();
				}
			});	
		}
	*/},
	toSelectAttributes: function(){/*
		var listObjectType= new Array();
		var listObjectId= new Array();
		$('#left :checkbox').each(function(){	
			if($(this).is(':checked')){
				//remove ben left, show ben right
				$(this).parent().remove(); 
				var objectType = $(this).attr('objectType');
				var objectId = $(this).attr('objectId');
				listObjectType.push(objectType);
				if(objectType == 2 || objectType == 3){
					listObjectId.push(0);
				}else{
					listObjectId.push(objectId);
				}
			}
		});	
		var data = new Object();
		data.listObjectType = listObjectType;
		data.listObjectId = listObjectId;
		var kData = $.param(data, true);
		Utils.getJSON("/catalog/promotion/all-data-attributes",kData,function(result){
			var listOut = result.list;	
			if(listOut!=null){
				for(var h=0;h<listOut.length;++h){
					var objectType = listOut[h].objectType;
					var objectId = listOut[h].objectId;
					var html = '';
					if(objectType == 2){
						var name = Utils.XSSEncode(PromotionCatalog_typeClient);
						html+= '<div>';
						html+= '<div class="Clear"></div>';
						html+= '<li>';
						html+= '<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
						html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
						html+= '</li>';
						html+= '<div class="BoxSelect BoxSelect2">';
						html+= '<select id="customerType" style="width: 275px;" class="MySelectBoxClass" multiple="multiple">';
						var list = listOut[h].listData;	
						var arrHtml = new Array();
						if(list!=null){
							for(var i=0;i<list.length;++i){
								arrHtml.push('<option value="'+ list[i].idChannelType +'">'+Utils.XSSEncode(list[i].codeChannelType)  +'-'+Utils.XSSEncode(list[i].nameChannelType)+'</option>');
							}
						}
						html+= arrHtml.join("");
						html+= '</select>';
						html+= '</div>';
						html+= '<div class="Clear"></div>';
						html+= '</div>';
						$('#right').append(html);
						$('#customerType').dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
							var text = '';
							$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
								if($(this).attr('checked')=='checked'){
									text += $(this).next().text().split('-')[0] + ', ';
								}
							});
							if(text != ''){
								text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
							}
							return text;
						} }); 
					}else if(objectType == 3){
						var name = Utils.XSSEncode(PromotionCatalog_doanhSo);
						html+= '<div id="saleLevel">';
						html+= '<div class="Clear"></div>';
						html+= 	'<li>';
						html+=	'<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
						html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
						html+=	'</li>';
						var list = listOut[h].listProductInfoVO;//result.list;	
						if(list!=null){
							for(var i=0;i<list.length;++i){
								if(i==0){// if else để canh chỉnh html cho thẳng hàng đó mà.
									//label ngành hàng nên đặt 1 thuộc tính là catId
									html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label5Style cat">'+Utils.XSSEncode(list[i].codeProductInfoVO)+'</label>';
									//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
									html+= '<div class="BoxSelect BoxSelect2">';
									html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
									var listSaleLevelCat = list[i].listSaleCatLevelVO;
									var arrHtml = new Array();
									if(listSaleLevelCat!=null){
										for(var k=0;k<listSaleLevelCat.length;++k){
											arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[k].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[k].nameSaleCatLevel) +'</option>');
										}
									}
									html+= arrHtml.join("");
									html+= '</select>';
									html+= '</div>';
								}else{
									html+= '<div class="Clear"></div>';
									html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label6Style" >'+Utils.XSSEncode(list[i].codeProductInfoVO)+'</label>';
									//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
									html+= '<div class="BoxSelect BoxSelect2">';
									html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
									var listSaleLevelCat = list[i].listSaleCatLevelVO;
									var arrHtml = new Array();
									if(listSaleLevelCat!=null){
										for(var k=0;k<listSaleLevelCat.length;++k){
											arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[k].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[k].nameSaleCatLevel) +'</option>');
										}
									}
									html+= arrHtml.join("");
									html+= '</select>';
									html+= '</div>';
								}
							}
						}
						html+= '<div class="Clear"></div>';
						html+= '</div>';
						$('#right').append(html);
						$('.saleLevelCat').each(function(){
							var id = $(this).attr('id'); 
							$('#'+id).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
								var text = '';
								$('#ddcl-'+id+'-ddw input[type=checkbox]').each(function(){
									if($(this).attr('checked')=='checked'){
										text += $(this).next().text().split('-')[0] + ', ';
									}
								});
								if(text != ''){
									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
								}
								return text;
							} }); 
						});
					
					}else if(objectType == 1){
						var name = Utils.XSSEncode(listOut[h].name);
						var valueType = listOut[h].valueType;
						html+= '<div>';
						html+= '<div class="Clear"></div>';
						html+= 	'<li>';
						//thằng input của thuộc tính động cần bỏ valueType vào để sau này xử lý khi lưu.
						html+=	'<input valueType="'+valueType+'" name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
						html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
						html+=  '</li>';
						//Chia các trường hợp theo valueType của attributeId
						if(valueType=="CHARACTER"){
							//Nên đặt id html của text CHARACTER này theo attributeId cộng chuỗi CHARACTER  thì sẽ không bị conflict trong danh sách. Sau này muốn lưu thì
							//select theo attributeId để lấy ra dữ liệu.
							
							html+= '<input id="'+objectId+'_CHARACTER" type="text" style="width: 377px;" maxlength="250" class="InputTextStyle InputText1Style"/>';
						}else if(valueType=="NUMBER"){
							html+= '<input id="'+objectId+'_NUMBER_from" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
							html+= '<label class="LabelStyle Label7Style">-</label>';
							html+= '<input id="'+objectId+'_NUMBER_to" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
						}else if(valueType=="DATE_TIME"){
							html+= '<input id="'+objectId+'_DATETIME_from" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
							html+= '<label class="LabelStyle Label7Style">-</label>';
							html+= '<input id="'+objectId+'_DATETIME_to" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
						}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
							var list = listOut[h].listData;	
							var arrHtml = new Array();
							html+= '<div class="BoxSelect BoxSelect2">';
							html+= '<select id="'+objectId+'" class="MySelectBoxClass" multiple="multiple">';
							if(list!=null){
								for(var i=0;i<list.length;++i){
									arrHtml.push('<option value="'+ list[i].attributeId +'">'+Utils.XSSEncode(list[i].code)+'-'+Utils.XSSEncode(list[i].name)+'</option>');
								}
							}
							html+= arrHtml.join("");
							html+= '</select>';
							html+= '</div>';
						}
						html+= '<div class="Clear"></div>';
						html+= '</div>';
						$('#right').append(html);
						$('#'+objectId).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
							var text = '';
							$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
								if($(this).attr('checked')=='checked'){
									text += $(this).next().text().split('-')[0] + ', ';
								}
							});
							if(text != ''){
								text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
							}
							return text;
						} }); 
						applyDateTimePicker('#'+objectId+'_DATETIME_from');
						applyDateTimePicker('#'+objectId+'_DATETIME_to');
						Utils.bindFormatOnTextfield(objectId+'_NUMBER_from',Utils._TF_NUMBER);
						Utils.formatCurrencyFor(objectId+'_NUMBER_from');
						Utils.bindFormatOnTextfield(objectId+'_NUMBER_to',Utils._TF_NUMBER);
						Utils.formatCurrencyFor(objectId+'_NUMBER_to');
//						Utils.bindFormatOnTextfield('valuePay',Utils._TF_NUMBER);
//						Utils.formatCurrencyFor('valuePay');
					}
				}
			}
		});	
	*/},
	toSelectAttribute: function(){
		$('#left :checkbox').each(function(){
			if($(this).is(':checked')){
				//remove ben left, show ben right
				$(this).parent().remove(); 
				var objectType = $(this).attr('objectType');
				var objectId = $(this).attr('objectId');
				var name = $(this).attr('name');
				var html = '';
				if(objectType == 2){
					
					Utils.getJSON("/catalog/promotion/all-data-attribute?objectTypeOfAttribute="+objectType,function(result){
						if(result.error == false){
							/*
							Khi chọn 1 thuộc tính từ trái qua phải, ta sẽ add thêm vào container right 1 cấu trúc html như sau:
							<div>
								<div class="Clear"></div>
								<li><input name=name objectType=objectType objectId=objectId type="checkbox" class="InputCbxStyle checkBoxAttribute"/>
								<label class="LabelStyle Label3Style">name</label></li>
								<select class="MySelectBoxClass">
									<option value ...
									<option value ...
								</select>	
								<div class="Clear"></div>
							</div>
							*/
							html+= '<div>';
							html+= '<div class="Clear"></div>';
							html+= '<li>';
							html+= '<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
							html+= '</li>';
							//Ứng với mỗi cái được check, mình load dữ liệu cho nó, 
							//Nếu objectType=2 thì load danh sách cho combobox.
							html+= '<div class="BoxSelect BoxSelect2">';
							html+= '<select id="customerType" style="width: 275px;" class="MySelectBoxClass" multiple="multiple">';
							var list = result.list;	
							var arrHtml = new Array();
							/*arrHtml.push('<option value="-2" selected="selected">---Chọn loại khách hàng---</option>');*/
							if(list!=null){
								for(var i=0;i<list.length;++i){
									arrHtml.push('<option value="'+ list[i].idChannelType +'">'+Utils.XSSEncode(list[i].codeChannelType)  +'-'+Utils.XSSEncode(list[i].nameChannelType)+'</option>');
								}
							}
							html+= arrHtml.join("");
							html+= '</select>';
							html+= '</div>';
							html+= '<div class="Clear"></div>';
							html+= '</div>';
							/*ta cần đặt id chỗ combobox để customStyle:
							Nếu objectType=2(loại khách hàng) thì nó tĩnh nên ta đặt id là customerType
							Nếu objectType=3(mức doanh số)thì nó có các combobox mức theo ngành, khi đó nên đặt bọn chúng chung 1 class là 'saleLevelCat'
							để customerStyle 1 lượt, và các combobox này ta nên đặt id theo ngành hàng để sau này biết đường lưu các mức theo ngành.
							Nếu objectType=1, valueType>3 thì mình cũng cần customeStyle, khi đó nên đặt id của combobox đó theo attributeId nhé.*/
							$('#right').append(html);
							$('#customerType').dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
								var text = '';
								$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
									if($(this).attr('checked')=='checked'){
										text += $(this).next().text().split('-')[0] + ', ';
									}
								});
								if(text != ''){
									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
								}
								return text;
							} }); 
							
						}
					});	
				}else if(objectType == 3){
					Utils.getJSON("/catalog/promotion/all-data-attribute?objectTypeOfAttribute="+objectType,function(result){
						if(result.error == false){
							//đoạn này hình như là giống nhau trong các trường hợp của objectType:
							html+= '<div id="saleLevel">';//Nhớ đặt id chỗ này để phân biệt, Ví dụ phân biệt: combobox(select)của mức doanh số, của loại khách hàng. 
							//phân biệt checkbox của mức doanh số, hay checkbox của loại khách hàng. Sau này bên hàm loadAppliedAttribute mình cũng đặt id 
							//chỗ objectType=3 giống thế này mới chạy được.
							html+= '<div class="Clear"></div>';
							html+= 	'<li>';
							html+=	'<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
							html+=	'</li>';
							//end đoạn giống nhau
							var list = result.list;	
							if(list!=null){
								for(var i=0;i<list.length;++i){
									if(i==0){// if else để canh chỉnh html cho thẳng hàng đó mà.
										//label ngành hàng nên đặt 1 thuộc tính là catId
										html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label5Style cat">'+list[i].codeProductInfoVO+'</label>';
										//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = result.list[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var k=0;k<listSaleLevelCat.length;++k){
												arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ listSaleLevelCat[k].codeSaleCatLevel +'-'+listSaleLevelCat[k].nameSaleCatLevel +'</option>');
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}else{
										html+= '<div class="Clear"></div>';
										html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label6Style" >'+list[i].codeProductInfoVO+'</label>';
										//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = result.list[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var k=0;k<listSaleLevelCat.length;++k){
												arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ listSaleLevelCat[k].codeSaleCatLevel +'-'+listSaleLevelCat[k].nameSaleCatLevel +'</option>');
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}
								}
							}
							html+= '<div class="Clear"></div>';
							html+= '</div>';
							$('#right').append(html);
							$('.saleLevelCat').each(function(){
								var id = $(this).attr('id'); 
								$('#'+id).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
									var text = '';
									$('#ddcl-'+id+'-ddw input[type=checkbox]').each(function(){
										if($(this).attr('checked')=='checked'){
											text += $(this).next().text().split('-')[0] + ', ';
										}
									});
									if(text != ''){
										text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
									}
									return text;
								} }); 
							});
						}
					});	
				}else if(objectType == 1){
					Utils.getJSON("/catalog/promotion/all-data-attribute?objectTypeOfAttribute="+objectType+"&attributeId=" +objectId,function(result){
						if(result.error == false){
							var valueType = result.valueType;
							//đoạn này hình như là giống nhau trong các trường hợp của objectType:
							html+= '<div>';
							html+= '<div class="Clear"></div>';
							html+= 	'<li>';
							//thằng input của thuộc tính động cần bỏ valueType vào để sau này xử lý khi lưu.
							html+=	'<input valueType="'+valueType+'" name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
							html+=  '</li>';
							//end đoạn giống nhau
							//Chia các trường hợp theo valueType của attributeId
							if(valueType=="CHARACTER"){
								//Nên đặt id html của text CHARACTER này theo attributeId cộng chuỗi CHARACTER  thì sẽ không bị conflict trong danh sách. Sau này muốn lưu thì
								//select theo attributeId để lấy ra dữ liệu.
								html+= '<input id="'+objectId+'_CHARACTER" type="text" style="width: 377px;" maxlength="250" class="InputTextStyle InputText1Style"/>';
							}else if(valueType=="NUMBER"){
								html+= '<input id="'+objectId+'_NUMBER_from" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
								html+= '<label class="LabelStyle Label7Style">-</label>';
								html+= '<input id="'+objectId+'_NUMBER_to" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
							}else if(valueType=="DATE_TIME"){
								html+= '<input id="'+objectId+'_DATETIME_from" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
								html+= '<label class="LabelStyle Label7Style">-</label>';
								html+= '<input id="'+objectId+'_DATETIME_to" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
							}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
								var list = result.list;	
								var arrHtml = new Array();
								html+= '<div class="BoxSelect BoxSelect2">';
								html+= '<select id="'+objectId+'" class="MySelectBoxClass" multiple="multiple">';
								if(list!=null){
									for(var i=0;i<list.length;++i){
										arrHtml.push('<option value="'+ list[i].attributeId +'">'+Utils.XSSEncode(list[i].code)+'-'+Utils.XSSEncode(list[i].name) +'</option>');
									}
								}
								html+= arrHtml.join("");
								html+= '</select>';
								html+= '</div>';
							}
							html+= '<div class="Clear"></div>';
							html+= '</div>';
							$('#right').append(html);
							$('#'+objectId).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
								var text = '';
								$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
									if($(this).attr('checked')=='checked'){
										text += $(this).next().text().split('-')[0] + ', ';
									}
								});
								if(text != ''){
									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
								}
								return text;
							} }); 
							applyDateTimePicker('#'+objectId+'_DATETIME_from');
							applyDateTimePicker('#'+objectId+'_DATETIME_to');
						}
					});	
				}
			}
		});	
		
	},
	toRemoveAttribute: function(){
		var html = '';//để bên ngoài vòng for là đúng. Còn bên hàm toSelectAttribute thì phải để bên trong do cuộc gọi bất đồng bộ
		$('#right .checkBoxAttribute').each(function(){
			if($(this).is(':checked')){
				//remove ben right, show ben left
				$(this).parent().parent().remove(); 
				var objectType = $(this).attr('objectType');
				var objectId = $(this).attr('objectId');
				var name = $(this).attr('name');
				html+= '<li> <input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle"/><label style="width:150px" class="LabelStyle Label3Style">'+name+'</label></li>';
			}
		});	
		$('#left').append(html);//để bên ngoài vòng for là đúng. Còn bên hàm toSelectAttribute thì phải để bên trong do cuộc gọi bất đồng bộ
	},		
	//end me
	getGridUrl: function(promotionCode,typeCode,shopCode,promotionName,startDate,endDate,status,proType,expiry){
		if (status == undefined || status == null){
			status = 1;
		}
		return WEB_CONTEXT_PATH +"/catalog/promotion/search?promotionCode=" + encodeChar(promotionCode) + "&lstApParamId=" + typeCode + "&shopCode=" + encodeChar(shopCode) + "&promotionName=" + encodeChar(promotionName) + "&startDate=" + encodeChar(startDate) + "&endDate=" + encodeChar(endDate) + "&status=" + encodeChar(status) + "&proType=" + encodeChar(proType)+ "&expiry=" + encodeChar(expiry);
	},
	getProductGridUrl: function(promotionId,productCode,isCompel,amountBuy,totalBuyMoney,totalDiscountMoney,percentDiscountMoney,discountProduct,discountAmount){
		var param = '';
		if(isCompel != null && isCompel != undefined){
			param = "&isCompel=" + encodeChar(isCompel);
		}
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchproduct?promotionId="+ encodeChar(promotionId) + "&productCode=" + encodeChar(productCode) + param + "&amountBuy=" + encodeChar(amountBuy) + "&totalBuyMoney=" + encodeChar(totalBuyMoney) + "&totalDiscountMoney=" + encodeChar(totalDiscountMoney) + "&percentDiscountMoney=" + encodeChar(percentDiscountMoney) + "&discountProduct=" + encodeChar(discountProduct) + "&discountAmount=" + encodeChar(discountAmount);
	},
	getGridZV01Url: function(promotionId,apParamCode){//01-02-04-05
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV01?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV03Url: function(promotionId,apParamCode){//03-06
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV03?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV03DetailUrl: function(promotionId,productId,quantity,apParamCode){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV03Detail?promotionId="+ encodeChar(promotionId)+"&productId="+ encodeChar(productId)+"&quantityMax="+ encodeChar(quantity)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV07Url: function(promotionId,apParamCode){//07-08-10-11
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV07?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV07DetailUrl: function(promotionId,quantity,discountAmount,apParamCode){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV07Detail?promotionId="+ encodeChar(promotionId)+"&quantityMax="+ encodeChar(quantity)+"&discountAmount="+ encodeChar(discountAmount)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV09Url: function(promotionId,apParamCode){//09-12-15-18
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV09?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV09SaleDetailUrl: function(promotionId,quantity,apParamCode,codeString){
		var param = '';
		if(codeString != '' && codeString != null){
			param = "&productCode="+ encodeChar(codeString);
		}
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV09SaleDetail?promotionId="+ encodeChar(promotionId)+"&quantityMax="+ encodeChar(quantity)+"&apParamCode="+ encodeChar(apParamCode)+param;
	},
	getGridZV09FreeDetailUrl: function(promotionId,quantity,apParamCode,codeString){
		var param = '';
		if(codeString != '' && codeString != null){
			param = "&productCode="+ encodeChar(codeString);
		}
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV09FreeDetail?promotionId="+ encodeChar(promotionId)+"&quantityMax="+ encodeChar(quantity)+"&apParamCode="+ encodeChar(apParamCode)+param;
	},
	getGridZV13Url: function(promotionId,apParamCode){//13-14-16-17
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV13?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV13DetailUrl: function(promotionId,discountAmount,apParamCode){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV13Detail?promotionId="+ encodeChar(promotionId)+"&discountAmount="+ encodeChar(discountAmount)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV19Url: function(promotionId,apParamCode){//19-20
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV19?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV21Url: function(promotionId,apParamCode){//21
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV21?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV21DetailUrl: function(promotionId,discountAmount,apParamCode){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV21Detail?promotionId="+ encodeChar(promotionId)+"&discountAmount="+ encodeChar(discountAmount)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV22Url: function(promotionId,apParamCode){//22
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchZV22?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getSearchProductGridUrl: function(promotionId,productCode,isCompel,amountBuy,totalBuyMoney,totalDiscountMoney,percentDiscountMoney,discountProduct,discountAmount){
		var param = '';
		if(isCompel != null && isCompel != undefined){
			param = "&isCompel=" + encodeChar(isCompel);
		}
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchproduct?promotionId="+ encodeChar(promotionId) + "&productCode=" + encodeChar(productCode) + param + "&amountBuyS=" + encodeChar(amountBuy) + "&totalBuyMoneyS=" + encodeChar(totalBuyMoney) + "&totalDiscountMoneyS=" + encodeChar(totalDiscountMoney) + "&percentDiscountMoneyS=" + encodeChar(percentDiscountMoney) + "&discountProductS=" + encodeChar(discountProduct) + "&discountAmountS=" + encodeChar(discountAmount);
	},
	getShopGridUrl: function(promotionId,shopCode,shopName,quantityMax,status){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchshop?promotionId="+ encodeChar(promotionId) + "&shopCode=" + encodeChar(shopCode) + "&shopName=" + encodeChar(shopName) + "&quantityMax=" + encodeChar(quantityMax) + "&status=" + status;
	},
	getSearchShopGridUrl: function(promotionId,shopCode,shopName,quantityMax){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchshop?promotionId="+ encodeChar(promotionId) + "&shopCode=" + encodeChar(shopCode) + "&shopName=" + encodeChar(shopName) + "&quantityMaxS=" + encodeChar(quantityMax);
	},
	getCustomerGridUrlDialog: function(promotionId,shopId,customerCode,customerName){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomerdialog?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName);
	},
	getCustomerGridUrl: function(promotionId,shopId,customerCode,customerName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId)+ "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName)+ "&quantityMax=" + encodeChar(quantityMax) + "&quantityReceive=" + encodeChar(quantityReceive) + "&status=" + status;
	},
	getSearchCustomerGridUrl: function(promotionId,shopId,customerCode,customerName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId)+ "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName)+ "&quantityMaxS=" + encodeChar(quantityMax) + "&quantityReceiveS=" + encodeChar(quantityReceive) + "&statusS=" + status;
	},
	getCustomerTypeGridUrl: function(promotionId,shopId,customerTypeCode,customerTypeName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerTypeCode=" + encodeChar(customerTypeCode) + "&customerTypeName=" + encodeChar(customerTypeName)+ "&quantityMax=" + encodeChar(quantityMax)+ "&quantityReceive=" + encodeChar(quantityReceive) + "&status=" + status;
	},
	getSearchCustomerTypeGridUrl: function(promotionId,shopId,customerTypeCode,customerTypeName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerTypeCode=" + encodeChar(customerTypeCode) + "&customerTypeName=" + encodeChar(customerTypeName)+ "&quantityMaxS=" + encodeChar(quantityMax)+ "&quantityReceiveS=" + encodeChar(quantityReceive) + "&statusS=" + status;
	},
	getSearchChangeInfoGridUrl: function(promotionId,fromDate,toDate){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchchangeinfo?promotionId="+ encodeChar(promotionId) + "&fromDate=" + encodeChar(fromDate) + "&toDate=" + encodeChar(toDate);
	},
	getSearchActionGridUrl: function(actionId){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchaction?actionId="+ encodeChar(actionId);
	},
	search: function(){
		$('#errMsg').html('').hide();
		$('#errExcelMsg').html('').hide();
		$('#fakefilepc').val('');
		$('#excelFile').val('');
		var promotionCode = $('#promotionCode').val().trim();
		var lstApParamId = [];
		if($('#typeCode').val() == '' || $('#typeCode').val() == null){
			lstApParamId.push(-1);
		}else{
			var size = $('#typeCode').val().length;
			for(var i = 0;i<size;i++){
				lstApParamId.push($('#typeCode').val()[i]);
			}
		}
		var shopCode = '';
		var promotionName = $('#promotionName').val().trim();
		var startDate = $('#startDate').val().trim();
		var endDate = $('#endDate').val().trim();
		var status = 1;
		var expiry = 1;
		if($('#isAllowEditProPgram').val() == 'true' ){
			status = $('#status').val().trim();
			if(status == 3){
				status = 1;
				expiry = 0;
			}
		}
		var proType = $("#proType").val();
		var msg = '';
		if (startDate != '' && !Utils.isDate(startDate)) {
			msg = msgCommonErr1;
			$('#startDate').focus();
		}
		if(msg.length == 0){
			if(endDate != '' && !Utils.isDate(endDate)){
				msg = msgCommonErr2;
				$('#endDate').focus();
			}
		}
		if(msg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					msg = msgCommonErr3;				
				}
			}
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var tm = setTimeout(function() {
			$('#promotionCode').focus();
		}, 500);
		var url = PromotionCatalog.getGridUrl(promotionCode,lstApParamId,shopCode,promotionName,startDate,endDate,status,proType,expiry);
		$('#grid').datagrid({url: url,pageNumber : 1} );
		if($('#proType').val() == 1){
			$('.datagrid-header-row td[field="promotionProgramCode"] .datagrid-cell span').html(msgMaCKTM);
			$('.datagrid-header-row td[field="promotionProgramName"] .datagrid-cell span').html(msgTenCKTM);
			$('.datagrid-header-row td[field="type"] .datagrid-cell span').html(msgLoaiCKTM);
		}else{
			$('.datagrid-header-row td[field="promotionProgramCode"] .datagrid-cell span').html(msgMaCKHTTM);
			$('.datagrid-header-row td[field="promotionProgramName"] .datagrid-cell span').html(msgTenCKHTTM);
			$('.datagrid-header-row td[field="type"] .datagrid-cell span').html(msgLoaiCKHTTM);
		}
		$('.datagrid-header-row td[field="promotionProgramCode"] .datagrid-cell .datagrid-sort-icon').html('');
		$('.datagrid-header-row td[field="promotionProgramName"] .datagrid-cell .datagrid-sort-icon').html('');
		$('.datagrid-header-row td[field="type"] .datagrid-cell .datagrid-sort-icon').html('');
//		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	searchProduct: function(){
		$('#errMsg').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var productCode = $('#productCode').val().trim();
		var isCompel = $('#isCompel').is(':checked');
		var amountBuy = $('#amountBuy').val().trim().replace(/,/g,'');
		var totalBuyMoney = $('#totalBuyMoney').val().trim().replace(/,/g,'');
		var totalDiscountMoney = $('#totalDiscountMoney').val().trim().replace(/,/g,'');
		var percentDiscountMoney = $('#percentDiscountMoney').val().trim();
		var discountProduct = $('#discountProduct').val().trim();
		var discountAmount = $('#discountAmount').val().trim().replace(/,/g,'');
		var url = PromotionCatalog.getSearchProductGridUrl(promotionId,productCode,isCompel,amountBuy,totalBuyMoney,totalDiscountMoney,percentDiscountMoney,discountProduct,discountAmount);
		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		var isCheck = false;
		$('.InputTextStyle').each(function(){
		    if(!$(this).is(':hidden') && !$(this).is(':disabled') && !isCheck){
		        isCheck = true;
		        $(this).focus();
		    }
		});
		return false;
	},
	searchShop: function(){
		$('#errMsg').html('').hide();
		$('#errMsgShop').html("").hide();
		$('#errExcelMsg').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var shopCode = $('#shopCode').val().trim();
		var shopName = $('#shopName').val().trim();
		var quantityMax = $('#quantityMax').val().trim();
		var url = PromotionCatalog.getSearchShopGridUrl(promotionId,shopCode,shopName,quantityMax);
		$("#exGrid").treegrid({url:url});
		var isCheck = false;
		$('.InputTextStyle').each(function(){
		    if(!$(this).is(':hidden') && !$(this).is(':disabled') && !isCheck){
		        isCheck = true;
		        $(this).focus();
		    }
		});
		var textForcus = $('#shopCode').val();
		if(textForcus!=undefined && textForcus!= null && textForcus.trim().length > 0){
			$('#shopCode').focus();
		}else if(textForcus!=undefined){
			$('#shopCode').focus();
		}
		textForcus = $('#shopName').val();
		if(textForcus!=undefined && textForcus!= null && textForcus.trim().length > 0){
			$('#shopName').focus();
		}
		return false;
	},
	searchChangeInfo: function(){
		$('#errMsg').html('').hide();
		$('#errMsgSearch').html('').hide();
		var msg = Utils.getMessageOfInvalidFormatDate('fromDate',msgTuNgay);
		if(msg.length==0){
			msg = Utils.getMessageOfInvalidFormatDate('toDate',msgDenNgay);
		}
		if(msg.length==0 && !Utils.compareDate($('#fromDate').val(),$('#toDate').val())){
			msg = manageRouteAssignDetail_fromdate_is_not_greater_todate;
			$('#fromDate').focus();
		}
		if(msg.length>0){
			$('#errMsgSearch').html(msg).show();
			return;
		}
		var promotionId = $('#promotionId').val().trim();
		var fromDate = $('#fromDate').val().trim();
		var toDate = $('#toDate').val().trim();
		var url = PromotionCatalog.getSearchChangeInfoGridUrl(promotionId,fromDate,toDate);
		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		var url = PromotionCatalog.getSearchActionGridUrl(0);
 		$("#gridAction").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	searchCustomer: function(){
		$('#errMsg').html('').hide();
		$('#errMsgQuantity').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var shopId = $('#shopId').val().trim();
		var customerName = $('#customerNameSearch').val().trim();
		var customerCode = $('#customerCodeSearch').val().trim();
		var quantityMax = $('#quantityMaxSearch').val().trim();
		var quantityReceive = $('#quantityReceiveSearch').val().trim();
		if(parseInt(quantityMax) > 2147483647){
			$('#errMsgQuantity').html(format(PromotionCatalog_overPass,2)).show();
			return false;
		}
		if(parseInt(quantityReceive) > 2147483647){
			$('#errMsgQuantity').html(format(PromotionCatalog_overPass1,2)).show();
			return false;
		}
		var status = $('#statusSearch').val().trim();
		var url = PromotionCatalog.getSearchCustomerGridUrl(promotionId,shopId,customerCode,customerName,quantityMax,quantityReceive,status);
		$("#detailGrid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	searchCustomerType: function(){
		$('#errMsg').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var shopId = $('#shopId').val().trim();
		var customerTypeName = $('#customerNameTypeSearch').val().trim();
		var customerTypeCode = $('#customerCodeTypeSearch').val().trim();
		var quantityMax = $('#quantityMaxTypeSearch').val().trim();
		var quantityReceive = $('#quantityReceiveTypeSearch').val().trim();
		var status = $('#statusTypeSearch').val().trim();
		var url = PromotionCatalog.getSearchCustomerTypeGridUrl(promotionId,shopId,customerTypeCode,customerTypeName,quantityMax,quantityReceive,status);
		$("#detailGridType").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	loadInfo:function(){
		var proType = $("#proType").val();
		if(proType != '' && proType == 1){
			$('#tabTitle').html(msgThongTinCTKM);
		}else{
			$('#tabTitle').html(msgThongTinCTHTTM);
		}
		PromotionCatalog.removeAllAndActiveClass('infoTab');
		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		data.proType = proType;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divGeneral','/catalog/promotion/info',kData,0);
	},
	loadProduct:function(){
		$('#divDialogSearch').hide();
		PromotionCatalog.removeAllAndActiveClass('productTab');
		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divDetailCommon','/catalog/promotion/product',kData,1);
	},
	loadShop:function(){
		$('#divDialogSearch').hide();
		PromotionCatalog.removeAllAndActiveClass('shopTab');
		var promotionId = $("#promotionId").val();
		$('#errExcelMsg').html('').hide();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divDetailCommon','/catalog/promotion/distribution',kData,2);
	},
	loadCustomerAttributeTab:function(){
 		$('#divDialogSearch').hide();
 		PromotionCatalog.removeAllAndActiveClass('customerAttributeTab');
 		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divDetailCommon','/catalog/promotion/customerattribute',kData,3);
 		return false;
 	},
	loadCustomer:function(){
		PromotionCatalog.removeAllAndActiveClass('');
		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		$.ajax({
			type : "POST",
			url : "/catalog/promotion/customer",
			data : (kData),
			dataType: "html",
			success : function(data) {
				$("#divGeneral").html(data).show();
				if($('#obType').val()  != '' && $('#obType').val() == 0){
					$('#divR').hide();
					$('#divB').show();
					$('#bR').attr('checked','checked');
					$('#customerTypeDiv').show();
					$('#customerInfoDiv').hide();
				}else{
					$('#divR').show();
					$('#divB').show();
					$('#aR').attr('checked','checked');
					$('#customerTypeDiv').hide();
					$('#customerInfoDiv').show();
				}
				$('#shopCode').focus();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH + '/home' ;
					}
				});
			}
		});
		return false;
	},
	changePromotionInfo: function(){
		var msg = '';
		$('#errMsg').html('').hide();
		msg = Utils.getMessageOfRequireCheck('promotionCode',msgMaChuongTrinh);
		if(msg.length == 0){
			msg = Utils.getMessageOfSpecialCharactersValidate('promotionCode',msgMaChuongTrinh,Utils._CODE);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('promotionName',msgTenChuongTrinh);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfSpecialCharactersValidate('promotionName',msgTenChuongTrinh);
		}
		if(msg.length == 0){
			var proType = $('#proType').val();
			if(proType != null && proType == 1){
				msg = Utils.getMessageOfRequireCheck('typeCode',msgLoaiCKTM,true);
			}
			if(proType != null && proType == 2){
				msg = Utils.getMessageOfRequireCheck('typeCode',msgLoaiCKHTTM,true);
			}
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('startDate',msgTuNgay);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('status',msgTrangThai,true);
		}
		var startDate = $('#startDate').val().trim();
		var endDate = $('#endDate').val().trim();
		if($('#status').val().trim() == activeType.WAITING){
			if(msg.length == 0){
				if (startDate != '' && !Utils.isDate(startDate)) {
					msg = msgCommonErr1;
					$('#startDate').focus();
				}
			}
		}
		if(msg.length == 0){
			if(($('#stableToDate').val() != '') && ($('#stableToDate').val().trim() != $('#endDate').val().trim())){
				if(endDate != '' && !Utils.isDate(endDate)){
					msg = msgCommonErr2;
					$('#endDate').focus();
				}
			}
		}
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(msg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					msg = msgCommonErr7;	
					$('#startDate').focus();
				}
			}
		}
		var promotionStatus = $('#promotionStatus').val();
		var status = $('#status').val();
		if(msg.length == 0){
			if(startDate != ''){
				if(promotionStatus == activeType.WAITING && status == activeType.WAITING){
					if(!Utils.compareDate(day + '/' + month + '/' + year,startDate)){
						msg = msgCommonErr20;	
						$('#startDate').focus();
					}
				}
			}
		}
		if(msg.length == 0){
			if(($('#stableToDate').val() != '') && ($('#stableToDate').val().trim() != $('#endDate').val().trim())){
				if(endDate != ''){
					if(!Utils.compareDate(day + '/' + month + '/' + year,endDate)){
						msg = msgCommonErr6;	
						$('#endDate').focus();
					}
				}
			}
		}
		var proType =$("#proType").val().trim();
		if($('#isAllowEditProPgram').val() == 'false'){
			if($('#status').val().trim() != '' && parseInt($('#status').val().trim()) != 2){
				msg = msgLoi31;
			}
		}
		
		var descrip = $("#description").val().trim();
		if(msg.length == 0){
			if(descrip != ''){
				msg = Utils.getMessageOfSpecialCharactersValidate('description', msgNoiDungCTKM , Utils._DEFAULT);
				$("#description").focus();
			}
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.promotionId = $('#promotionId').val();
		dataModel.promotionCode = $('#promotionCode').val().trim();
		dataModel.promotionName = $('#promotionName').val().trim();
		if($('#promotionId').val() == '' || parseInt($('#promotionId').val()) == 0){
			dataModel.typeCode = $('#typeCode').val().trim();
		}
		dataModel.startDate = $('#startDate').val().trim();
		dataModel.endDate = $('#endDate').val().trim();
		dataModel.status = $('#status').val().trim();
		if(proType != '' && proType == 1){
			dataModel.isMulti = $('#multi').is(':checked');
			dataModel.isRecursive = $('#recursive').is(':checked');
			dataModel.related = $('input[name=related]:checked').val();
		}
		dataModel.proType = proType;
		dataModel.description = Utils.XSSEncode($('#description').val().trim());
//		if(!Utils.validateAttributeData(dataModel, '#errMsg')){
//			return false;
//		}
		Utils.addOrSaveData(dataModel, "/catalog/promotion/changepromotioninfo", PromotionCatalog._xhrSave, 'errMsg',function(data){
			$('#tabSectionDiv').show();
			$('#promotionId').val(data.promotionId);
			$('#apParamCode').val(data.apParamCode);
			$('#promotionStatus').val(data.promotionStatus);
			$('#successMsg1').html(msgCommon1).show();
			var tm = setTimeout(function(){
				$('#successMsg1').html('').hide();
				clearTimeout(tm); 
			}, 3000);
			window.location.href =WEB_CONTEXT_PATH + '/catalog/promotion/viewdetail?promotionId='+data.promotionId+'&proType='+proType;
			if(proType != '' && proType == 1){
				PromotionCatalog.loadProduct();
			}else if(proType != '' && proType == 2){
				PromotionCatalog.loadShop();
			}
		});
		return false;
	},
	getPromotionType:function(typeCode,obj){
		Utils.getJSON('/rest/catalog/promotion/name/' + typeCode + ".json",function(data){
			$(obj).val(data.name);
		});
	},
	getPromotionName:function(typeCode,obj){
		Utils.getJSON('/rest/catalog/promotion/code/' + typeCode + ".json",function(data){
			$(obj).val(data.name);
		});
	},
	getProductName:function(typeCode,obj){
		Utils.getJSON('/rest/catalog/product/getname/' + typeCode + ".json",function(data){
			$(obj).val(data.name);
		});
	},
	getShopName:function(typeCode,obj){
		if(typeCode == ""){
			typeCode = 'abcdefghijklmnopq';
		}
		Utils.getJSON('/rest/catalog/delivery-group/shop/' + typeCode + "/name.json",function(data){
			if(data != null && data.name != undefined){
				$(obj).val(data.name);
			}
		});
	},
	getCustomerName:function(typeCode,shopCode,obj){
		Utils.getJSON('/rest/catalog/delivery-group/customer/' + typeCode + '/'+ shopCode + "/name.json",function(data){
			$(obj).val(data.name);
		});
	},
	getSelectedProduct: function(id,productCode,productName,saleQty,saleAmt,discPer,discAmt,freeProductCode,freeQty,isCompel){
		PromotionCatalog.getChangedForm();
		if(id!= null && id!= 0 && id!=undefined){
			$('#productId').val(id);
		} else {
			$('#productId').val(0);
		}
		setTextboxValue('productCode',productCode);
		$('#productCode').attr('disabled','disabled');
		setTextboxValue('productName',productName);
		setTextboxValue('amountBuy',formatCurrency(saleQty));
		setTextboxValue('totalBuyMoney',formatCurrency(saleAmt));
		setTextboxValue('totalDiscountMoney',formatCurrency(discAmt));
		setTextboxValue('percentDiscountMoney',discPer);
		setTextboxValue('discountProduct',freeProductCode);
		setTextboxValue('discountAmount',formatCurrency(freeQty));
		if(isCompel == 1){
			$('#isCompel').attr('checked',true);
		}else{
			$('#isCompel').removeAttr('checked');
		}
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
	},
	getSelectedShop: function(id,shopCode,shopName,quantityMax,status,objectValue){
		$('.RequireStyle').show();
		if(id!= null && id!= 0 && id!=undefined){
			$('#shopEditId').val(id);
		} else {
			$('#shopEditId').val(0);
		}
		setTextboxValue('shopCode',shopCode);
		setTextboxValue('shopName',shopName);
		setTextboxValue('quantityMax',quantityMax);
		setSelectBoxValue('status', status);
		setSelectBoxValue('objectApplyHidden', objectValue);
		$('#shopCodeLabel').html(msgMaDoiTuong);
		$('#shopCode').attr('disabled','disabled');
		$('#shopName').attr('disabled','disabled');
		$('#divObjectApply').show();
		setTitleUpdate();
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
	},
	getSelectedCustomer: function(id,shopCode,shopName,customerCode,customerName,quantityMax,status){
		if(id!= null && id!= 0 && id!=undefined){
			$('#customerId').val(id);
		} else {
			$('#customerId').val(0);
		}
		setTextboxValue('shopCode',shopCode);
		$('#shopCode').attr('disabled','disabled');
		setTextboxValue('shopName',shopName);
		setTextboxValue('customerCode',customerCode);
		$('#customerCode').attr('disabled','disabled');
		setTextboxValue('customerName',customerName);
		setTextboxValue('quantityMax',quantityMax);
		setSelectBoxValue('status', status);
		$('#divR').hide();
		$('#divB').hide();
		$('#customerInfoDiv').show();
		$('#customerTypeDiv').hide();
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
	},
	deleteProduct: function(productId){
		var dataModel = new Object();
		dataModel.productId = productId;	
		Utils.deleteSelectRowOnGrid(dataModel, CreateSalePlan_lblProductNameGrid, "/catalog/promotion/removeproduct", PromotionCatalog._xhrDel, null,null, function(){
			PromotionCatalog.resetFormProduct();
		});		
		return false;		
	},
	deleteShop: function(shopId){
		var dataModel = new Object();
		dataModel.shopId = shopId;	
		Utils.deleteSelectRowOnGrid(dataModel, msgDoiTuong , "/catalog/promotion/removeshop", PromotionCatalog._xhrDel, null,null, function(){
			PromotionCatalog.resetFormShop();
		});		
		return false;		
	},
	deleteCustomerType: function(customerTypeId){
		var dataModel = new Object();
		dataModel.customerId = customerTypeId;	
		Utils.deleteSelectRowOnGrid(dataModel, PromotionCatalog_typeClientPromotion, "/catalog/promotion/removecustomer", PromotionCatalog._xhrDel, null,null, function(){
			PromotionCatalog.searchCustomerType();
		});		
		return false;		
	},
	changePromotionShop: function(){
		var msg = '';
		$('#errMsg').html('').hide();
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('quantityMax',msgSoSuatKM);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('status',msgTrangThai,true);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('objectApplyHidden',PromotionCatalog_htap,true);
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.promotionId = $('#promotionId').val();
		dataModel.shopId = $('#shopEditId').val();
		dataModel.status = $('#status').val().trim();
		dataModel.quantityMax = $('#quantityMax').val().trim();
		dataModel.objectApply = $('#objectApplyHidden').val().trim();
		if(dataModel.quantityMax != null && dataModel.quantityMax.length > 0){
			Utils.addOrSaveRowOnGrid(dataModel, "/catalog/promotion/changepromotionshop", PromotionCatalog._xhrSave, null,null, function(){
				PromotionCatalog.loadShop();
				PromotionCatalog.resetFormShop();
			});
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuatDonVi+','+SuperviseManageRouteCreate_confirmContinute+'? ', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/changepromotionshop", PromotionCatalog._xhrSave, null, function(){
							PromotionCatalog.loadShop();
							PromotionCatalog.resetFormShop();
						});
					}
				});
			}else{
				Utils.addOrSaveRowOnGrid(dataModel, "/catalog/promotion/changepromotionshop", PromotionCatalog._xhrSave, null,null, function(){
					PromotionCatalog.loadShop();
					PromotionCatalog.resetFormShop();
				});
			}
		}
		return false;
	},
	changePromotionCustomer: function(){
		var msg = '';
		$('#errMsg').html('').hide();
		msg = Utils.getMessageOfRequireCheck('shopCode',jsp_sale_product_shop_code);
		if(msg.length == 0){
			msg = Utils.getMessageOfSpecialCharactersValidate('shopCode',jsp_sale_product_shop_code,Utils._CODE);
		}
		if($('input[name=customerRadio]:checked').val() == 0){
			if(msg.length == 0){
				msg = Utils.getMessageOfRequireCheck('customerCode',catalog_customer_code);
			}
			if(msg.length == 0){
				msg = Utils.getMessageOfSpecialCharactersValidate('customerCode',catalog_customer_code,Utils._CODE);
			}
		}else if($('input[name=customerRadio]:checked').val() == 1){
			if(msg.length == 0){
				msg = Utils.getMessageOfRequireCheck('customerType',PromotionCatalog_selectTypeCus);
			}
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('quantityMax',PromotionCatalog_selectTypeCus);
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.promotionId = $('#promotionId').val();
		dataModel.customerId = $('#customerId').val().trim();
		dataModel.shopCode = $('#shopCode').val().trim();
		dataModel.status = $('#status').val().trim();
		if($('input[name=customerRadio]:checked').val() == 0){
			dataModel.customerCode = $('#customerCode').val().trim();
		}else if($('input[name=customerRadio]:checked').val() == 1){
			dataModel.typeCode = $('#customerType').val();
		}
		dataModel.customerRadio = $('input[name=customerRadio]:checked').val();
		dataModel.quantityMax = $('#quantityMax').val().trim();
		Utils.addOrSaveRowOnGrid(dataModel, "/catalog/promotion/changepromotioncustomer", PromotionCatalog._xhrSave, null,null, function(){
			PromotionCatalog.resetFormCustomer();
		});
		return false;
	},
	resetFormProduct: function(){
		$('#btnUpdate,#btnDismiss').hide();
		$('#btnCreate,#btnSearch').show();
		$('#productCode').val('');
		if($('#productBuyDisable').val() == 'true'){
			$('#productCode').removeAttr('disabled');
		}
		$('#productName').val('');
		$('#amountBuy').val('');
		$('#totalBuyMoney').val('');
		$('#totalDiscountMoney').val('');
		$('#percentDiscountMoney').val('');
		$('#discountProduct').val('');
		$('#discountAmount').val('');
		$('#isCompel').removeAttr('checked');
		$('#productId').val(0);
		$("#grid").trigger("reloadGrid");
		$('.RequireStyle').hide();
		return false;
	},
	resetFormShop: function(){
		$('#btnUpdate,#btnDismiss').hide();
		$('#btnCreate,#btnSearch').show();
		$('#shopCodeLabel').html('Mã đơn vị(F9)');
		$('#shopCode').removeAttr('disabled');
		$('#shopCode').val('');
		$('#shopName').removeAttr('disabled');
		$('#shopName').val('');
		$('#quantityMax').val('');
		$('#status').val(1);
		$('#status').change();
		$('#shopEditId').val(0);
		$('#divObjectApply').hide();
		$('.RequireStyle').hide();
		var url = PromotionCatalog.getShopGridUrl($('#promotionId').val(),'','','',1);
		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		$('#title').html('Tìm kiếm đơn vị');
		return false;
	},
	resetFormCustomer: function(){
		$('#customerNameSearch').val('');
		$('#customerCodeSearch').val('');
		$('#quantityMaxSearch').val('');
		$('#quantityReceiveSearch').val('');
		$('#statusSearch').val(1);
		$('#statusSearch').change();
		var url = PromotionCatalog.getCustomerGridUrl($('#promotionId').val(),$('#shopId').val(),'','','','',1);
		$("#detailGrid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	resetFormCustomerType: function(){
		$('#customerNameTypeSearch').val('');
		$('#customerCodeTypeSearch').val('');
		$('#quantityMaxTypeSearch').val('');
		$('#quantityReceiveTypeSearch').val('');
		$('#statusTypeSearch').val(1);
		$('#statusTypeSearch').change();
		var url = PromotionCatalog.getCustomerTypeGridUrl($('#promotionId').val(),$('#shopId').val(),'','','','',1);
		$("#detailGridType").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	getDetailGridUrl: function(shopId,objectValue,shopName,status){
		$('#objectApplyValue').val(objectValue);
		$('#shopNameHidden').val(shopName);
		$('#shopId').val(shopId);
		var promotionId = $('#promotionId').val().trim();
		$('#divDetail').show();
		if(objectValue == 3){
			if(status != '' && status == 1){
				$('#divBtnCreate').show();
				$('#btnCreateCustomer').bind('click',function(){
					PromotionCatalog.showDialogCustomer();
				});
			}else{
				$('#divBtnCreate').hide();
			}
			$('#titleCustomer').text(PromotionCatalog_infosCustomerKM+':'+shopName);
			$('#divCustomer').show();
			$('#divCustomerType').hide();
			$('#customerCodeSearch').focus();
			if($('#gbox_detailGrid').html() == null || $('#gbox_detailGrid').html() == ''){
				if(status != '' && status == 1){
					$("#detailGrid").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[		
						          {name:'customer.customerCode', label: catalog_customer_code, width: 100, sortable:false,resizable:false , align: 'left'},
						          {name:'customer.customerName', label: catalog_customer_name, width: 150, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          {name:'edit', label: PromotionCatalog_update, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.editCustomerFormatter},
						          {name:'delete', label: msgText4, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.delCustomerFormatter},
						          ],	  
						          pager : '#detailPager',
						          height: 'auto',
						          rownumbers: true,	  
						          width: ($('#detailChangedGrid').width())	  
					})
					.navGrid('#detailPager', {edit:false,add:false,del:false, search: false});
				}else{
					$("#detailGrid").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[		
						          {name:'customer.customerCode', label: catalog_customer_code, width: 100, sortable:false,resizable:false , align: 'left'},
						          {name:'customer.customerName', label: catalog_customer_name, width: 150, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          ],	  
						          pager : '#detailPager',
						          height: 'auto',
						          rownumbers: true,	  
						          width: ($('#detailChangedGrid').width())	  
					})
					.navGrid('#detailPager', {edit:false,add:false,del:false, search: false});
				}
				$('#jqgh_detailGrid_rn').prepend(stt_label);
			}else{
				var url = PromotionCatalog.viewDetailChanged(shopId);
				$("#detailGrid").setGridParam({url:url,page:1}).trigger("reloadGrid");	
			}
		}else{
			if(status != '' && status == 1){
				$('#divBtnCreate1').show();
				$('#btnCreateCustomerType').bind('click',function(){
					PromotionCatalog.showDialogCustomerType();
				});
			}else{
				$('#divBtnCreate1').hide();
			}
			$('#titleCustomer').text(PromotionCatalog_infosTypePromotion+':'+shopName);
			$('#divCustomer').hide();
			$('#divCustomerType').show();
			$('#customerCodeTypeSearch').focus();
			$('#customerCodeTypeSearch,#customerNameTypeSearch,#quantityMaxTypeSearch,#quantityReceiveTypeSearch').bind('keyup',function(event){
				if(event.keyCode == keyCodes.ENTER){
					PromotionCatalog.searchCustomerType();
				}
			});
			if($('#gbox_detailGridType').html() == null || $('#gbox_detailGridType').html() == ''){
				if(status != '' && status == 1){
					$("#detailGridType").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[		
						          {name:'customerType.channelTypeCode', label: PromotionCatalog_codePromotion, width: 50, sortable:false,resizable:false , align: 'left'},
						          {name:'customerType.channelTypeName', label: PromotionCatalog_namePromotion, width: 200, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          {name:'edit', label: PromotionCatalog_update, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.editCustomerFormatter},
						          {name:'delete', label: msgText4, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.delCustomerTypeFormatter},
						          ],	  
						          pager : '#detailPagerType',
						          height: 'auto',
						          rownumbers: true,	  
						          width: ($('#detailChangedGridType').width())	  
					})
					.navGrid('#detailPagerType', {edit:false,add:false,del:false, search: false});
				}else{
					$("#detailGridType").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[		
						          {name:'customerType.channelTypeCode', label: PromotionCatalog_codePromotion, width: 100, sortable:false,resizable:false , align: 'left'},
						          {name:'customerType.channelTypeName', label: PromotionCatalog_namePromotion, width: 150, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          ],	  
						          pager : '#detailPagerType',
						          height: 'auto',
						          rownumbers: true,	  
						          width: ($('#detailChangedGridType').width())	  
					})
					.navGrid('#detailPagerType', {edit:false,add:false,del:false, search: false});
				}
				$('#jqgh_detailGridType_rn').prepend(stt_label);
			}else{
				var url = PromotionCatalog.viewDetailChanged(shopId);
				$("#detailGridType").setGridParam({url:url,page:1}).trigger("reloadGrid");	
			}
		}
	},
	viewDetailChanged:function(shopId){
		var promotionId = $('#promotionId').val().trim();
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1";
	},
	showDialogShop: function(){
		$('#requiredId').show();
		var html = $('#shopTreeDialog').html();
		$.fancybox(html,
				{
					modal: true,
					title: PromotionCatalog_infosDV,
					afterShow: function(){
						Utils.bindAutoSearch();	
						$('#shopTreeDialog').html('');
						$('#shopCodeDlg').focus();
						Utils.bindFormatOnTextfield('numberOfShop', Utils._TF_NUMBER);
						var promotionId = $('#promotionId').val().trim();
						var shopCodeHidden = $('#shopCodeHidden').val().trim();
						var shopCode = encodeURI('');
						var shopName = encodeURI('');
						PromotionCatalog.loadShopTreeOnDialog('/rest/catalog/promotion-program/shop/list.json?promotionId='+ promotionId +'&code='+shopCodeHidden+'&shopCode='+ shopCode +'&shopName='+ shopName,'shopTree');
						PromotionCatalog._mapShop = new Map();
						$('#shopTree').bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
							if($('#shopTreeContent').data('jsp') != undefined || $('#shopTreeContent').data('jsp') != null) {
								$('#shopTreeContent').data('jsp').destroy();
								setTimeout(function(){
									$('#shopTreeContent').jScrollPane();
								},500);	
							} else {
								setTimeout(function(){
									$('#shopTreeContent').jScrollPane();
								},500);	
							}						
		    			});
						$.ajax({
							type : "POST",
							url : "/catalog/promotion/getobjecttypedialog",
							data : ({promotionId:promotionId}),
							dataType: "json",
							success : function(data) {
								var html = new Array();
				    			if(data!= null && data!= undefined && data.lstPromotionType!= null && data.lstPromotionType.length > 0){
				    				html.push("<option value='-1'>"+PromotionCatalog_selectApply+"</option>");
				    				for(var i=0;i<data.lstPromotionType.length;i++){
				    					var j = i+1;
				    					html.push("<option value='"+ j +"'>"+ Utils.XSSEncode(data.lstPromotionType[i].apParamName) +"</option>");
				    				}
				    			}else{
				    				html.push("<option value='-1'>"+PromotionCatalog_selectApply+"</option>");
				    			}	        			        	
				    			$('#objectType').html(html.join(""));
				    			$('#objectType').addClass('MySelectBoxClass');
				    			$('#objectType').customStyle();
				    			$(window).resize();
				    			var tm = setTimeout(function(){
				    				$('#shopTreeContent').jScrollPane();
				    				$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
				    				window.scrollTo(0,0);
								}, 500);
							},
							error:function(XMLHttpRequest, textStatus, errorThrown) {
								$.ajax({
									type : "POST",
									url : WEB_CONTEXT_PATH + '/check-session',
									dataType : "json",
									success : function(data) {
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										window.location.href = WEB_CONTEXT_PATH + '/home' ;
									}
								});
							}
						});
					},
					afterClose: function(){
						$('#shopTreeDialog').html(html);						
					}
				}
			);
		return false;
	},
	getCheckboxStateOfTreeEx:function(treeId,MAP,selector){
		for(var i=0;i<MAP.size();++i){
			var _obj = MAP.get(MAP.keyArray[i]);					
			$('#' + selector).each(function(){
				var _id = $(this).attr('id');				
				if(_id==_obj){
					$(this).removeClass('jstree-unchecked');
					$(this).addClass('jstree-checked');
				}
			});
		}
	},
	searchShopOnTree: function(){
		$('#shopTree li').each(function(){
			var _id = $(this).attr('id');			
			if($(this).hasClass('jstree-checked')){
				PromotionCatalog._mapShop.put(_id,_id);		
			}else {
				PromotionCatalog._mapShop.remove(_id);
			}
		});
		var promotionId = $('#promotionId').val().trim();
		var shopCodeHidden = $('#shopCodeHidden').val().trim();
		var shopCode = encodeChar($('#shopCodeDlg').val().trim());
		var shopName = encodeChar($('#shopNameDlg').val().trim());
		$('#shopTreeContent').data('jsp').destroy();
		PromotionCatalog.loadShopTreeOnDialog('/rest/catalog/promotion-program/shop/list.json?promotionId='+ promotionId +'&code='+shopCodeHidden+'&shopCode='+ shopCode +'&shopName='+ shopName,'shopTree');
	},
	selectListShop: function(){
		$('#errMsgProductDlg').html('').hide();
		var arrId = new Array();
		$('.jstree-checked').each(function(){
		    var _id= $(this).attr('id');
		    if($('#' + _id + ' ul li').length >0 && (!$(this).parent().parent().hasClass('jstree-checked'))){
		    	PromotionCatalog._mapShop.put(_id,_id);
		    }else if($('#' + _id ).length >0 && (!$(this).parent().parent().hasClass('jstree-checked'))){
		    	PromotionCatalog._mapShop.put(_id,_id);
			}else{
				PromotionCatalog._mapShop.remove(_id);
			}	
		});
		for(var i=0;i<PromotionCatalog._mapShop.size();++i){
			var _obj = PromotionCatalog._mapShop.get(PromotionCatalog._mapShop.keyArray[i]);
			arrId.push(_obj);
		}
		var msg = '';
		if(arrId.length == 0){
			msg = format(msgErr_required_choose_format,PromotionCatalog_donvithamgia);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('numberOfShop', PromotionCatalog_soSuatDonVi);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('objectType', PromotionCatalog_htap,true);
		}
		if(msg.length > 0){
			$('#errMsgProductDlg').html(msg).show();
			$.fancybox.update();
			return false;
		}
		var quantityMax = $('#numberOfShop').val().trim();
		var promotionId = $('#promotionId').val();
		var objectApply = $('#objectType').val().trim();
		var dataModel = new Object();		
		dataModel.lstShopId = arrId;
		dataModel.quantityMax = quantityMax;
		dataModel.promotionId = promotionId;
		dataModel.objectApply = objectApply;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/selectlistshop', PromotionCatalog._xhrSave, 'errMsgProductDlg', function(data){
				$('#successMsgProductDlg').html(msgCommon1).show();
				$('#shopCodeDlg').val('');
				$('#shopNameDlg').val('');
				$('#numberOfShop').val('');
				$('.RequireStyle').hide();
				PromotionCatalog.resetFormShop();
				$.fancybox.update();
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuatDonVi+', '+SuperviseManageRouteCreate_confirmContinute+'?', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/selectlistshop", PromotionCatalog._xhrSave, 'errMsgProductDlg', function(){
							$('#successMsgProductDlg').html(msgCommon1).show();
							$('#shopCodeDlg').val('');
							$('#shopNameDlg').val('');
							$('#numberOfShop').val('');
							$('.RequireStyle').hide();
							PromotionCatalog.resetFormShop();
							$.fancybox.update();
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});	
			}else{
				Utils.saveData(dataModel, "/catalog/promotion/selectlistshop", PromotionCatalog._xhrSave, 'errMsgProductDlg', function(){
					$('#successMsgProductDlg').html(msgCommon1).show();
					$('#shopCodeDlg').val('');
					$('#shopNameDlg').val('');
					$('#numberOfShop').val('');
					$('.RequireStyle').hide();
					PromotionCatalog.resetFormShop();
					$.fancybox.update();
					setTimeout(function(){$.fancybox.close();}, 1000);
				},null,null,null,null,true);
			}
		}
		return false;
	},
	getChangedForm:function(){
		var amountDisable = $('#amountDisable').val().trim();
		var moneyDisable = $('#moneyDisable').val().trim();
		var moneyDiscountDisable = $('#moneyDiscountDisable').val().trim();
		var percentDisable = $('#percentDisable').val().trim();
		var productDisable = $('#productDisable').val().trim();
		var productBuyDisable = $('#productBuyDisable').val().trim();
		if(amountDisable == "true"){
			$('#amountBuyRequire').hide();
		}else{
			$('#amountBuyRequire').show();
		}
		if(moneyDisable == "true"){
			$('#totalBuyMoneyRequire').hide();
		}else{
			$('#totalBuyMoneyRequire').show();
		}
		if(moneyDiscountDisable == "true"){
			$('#totalDiscountMoneyRequire').hide();
		}else{
			$('#totalDiscountMoneyRequire').show();
		}
		if(percentDisable == "true"){
			$('#percentDiscountMoneyRequire').hide();
		}else{
			$('#percentDiscountMoneyRequire').show();
		}
		if(productDisable == "true"){
			$('#discountAmountRequire').hide();
			$('#discountProductRequire').hide();
		}else{
			$('#discountAmountRequire').show();
			$('#discountProductRequire').show();
		}
		if(productBuyDisable == "false"){
			$('#productBuyRequire').hide();
		}else{
			$('#productBuyRequire').show();
		}
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
		$('#productCode').focus();
	},
	showDialogCustomer: function(){
		//$('.RequireStyle').show();
		var html = $('#customerDialog').html();
		var shopId = $('#shopId').val();
		var promotionId = $('#promotionId').val();
		PromotionCatalog._mapCheckCustomer = new Map();
		$.fancybox(html,
				{
					modal: true,
					title: PromotionCatalog_labelCustumer,
					afterShow: function(){
						$('#customerDialog').html('');
						$('#customerCodeDlg').focus();
						$("#gridCustomer").jqGrid({
							  url:PromotionCatalog.getCustomerGridUrlDialog(promotionId,shopId,'',''),
							  colModel:[		
					            {name:'customerCode', label: catalog_customer_code, sortable:false,resizable:false , align: 'left'},
					    	    {name:'customerName', label: catalog_customer_name, width: 300, align: 'left', sortable:false,resizable:false },
					    	    {name: 'id',index:'id', hidden:true },
							  ],	  
							  pager : $('#pagerCustomer'),
							  height: 'auto',
							  multiselect: true,
							  recordpos: 'right',
							  rowNum: 10,	
							  width: ($('#promotionCustomerGrid').width()),
							  beforeSelectRow: function (id, e) {
								  var _id = 'jqg_gridCustomer_' + id;
								  var isCheck = PromotionCatalog._mapCheckCustomer.get(_id);
								  if(isCheck || isCheck == 'true') {
									  //da co trong map roi->remove no di
									  PromotionCatalog._mapCheckCustomer.remove(_id);
									  var tm = setTimeout(function(){
										  $('#'+_id).removeAttr('checked');
										  $('#'+id).removeClass('ui-state-highlight');
									  }, 100);
								  } else {
									  //chua co trong map -> put vao
									  PromotionCatalog._mapCheckCustomer.put(_id, id);
									  var tm = setTimeout(function(){
										  $('#'+_id).attr('checked', 'checked');
										  $('#'+id).addClass('ui-state-highlight');
									  }, 100);
								  }
								  return true;
							  },
							  onSelectAll: function(aRowids, status) {
								  for(var i = 0; i < aRowids.length; i++) {
									  if(status) {
										  var _id = 'jqg_gridCustomer_' + aRowids[i];
										  //put vao map
										  PromotionCatalog._mapCheckCustomer.put(_id, aRowids[i]);
									  } else {
										  var _id = 'jqg_gridCustomer_' + aRowids[i];
										  PromotionCatalog._mapCheckCustomer.remove(_id);
									  }
								  }
							  },
							  gridComplete: function(){
								  $('.cbox').each(function() {
									 var isCheck = PromotionCatalog._mapCheckCustomer.get(this.id);
									 if(isCheck || isCheck == 'true') {
										 customerId = $('#gridCustomer').jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
										 $(this).attr('checked', 'checked');
										 $('#'+customerId).addClass('ui-state-highlight');
									 }
								  });
								  $('#jqgh_gridCustomer_rn').html(stt_label);
								  $(window).resize();
								  var tm = setTimeout(function(){
										$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop);
									  //$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
									  //window.scrollTo(0,0);
									}, 500);
								  updateRownumWidthForJqGrid('.fancybox-inner');
							  }
							})
							.navGrid($('#pagerCustomer'), {edit:false,add:false,del:false, search: false});
						Utils.bindFormatOnTextfield('numberOfCustomer',Utils._TF_NUMBER);
						$('#objectTypeCustomer').addClass('MySelectBoxClass');
		    			$('#objectTypeCustomer').customStyle();
		    			Utils.bindAutoSearch();
						$('#btnDlgCustomer').bind('click',function(event){
							var code = $('#customerCodeDlg').val().trim();
							var name = $('#customerNameDlg').val().trim();
							var url = PromotionCatalog.getCustomerGridUrlDialog(promotionId,shopId,code,name);
							$("#gridCustomer").setGridParam({url:url,page:1}).trigger("reloadGrid");
						});
						
					},
					afterClose: function(){
						$('#customerDialog').html(html);
						PromotionCatalog._mapCheckCustomer = new Map();
					}
				}
			);
		return false;
	},
	selectListCustomer: function(){
		$('#errMsgCustomerDlg').html('').hide();
		var arrId = new Array();
		var shopId = $('#shopId').val();
		var customerId = '';
		var objectType = $('#objectTypeCustomer').val();
		var msg = '';
		if(objectType !=null && objectType == 1){
//			$('.fancybox-inner .ui-jqgrid-bdiv .cbox').each(function(){
//				if($(this).is(':checked')){
//					customerId = $("#gridCustomer").jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
//					arrId.push(customerId);
//				}
//			});
			for(var i = 0; i < PromotionCatalog._mapCheckCustomer.keyArray.length; i++) {
				arrId.push(PromotionCatalog._mapCheckCustomer.get(PromotionCatalog._mapCheckCustomer.keyArray[i]));
			}
			if(arrId.length == 0){
				//msg = format(msgErr_required_field,'Thông tin khách hàng');
				msg = msgTuyenErr2;
			}
		}else{
			$('.fancybox-inner .ui-jqgrid-bdiv .cbox').each(function(){
				customerId = $("#gridCustomer").jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
				arrId.push(customerId);
			});
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('numberOfCustomer', PromotionCatalog_soSuatClient);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('objectTypeCustomer', PromotionCatalog_typeApply,true);
		}
		if(msg.length > 0){
			$('#errMsgCustomerDlg').html(msg).show();
			return false;
		}
		var quantityMax = $('#numberOfCustomer').val().trim();
		var promotionId = $('#promotionId').val();
		var shopId = $('#shopId').val();
		var dataModel = new Object();		
		dataModel.lstCustomerId = arrId;
		dataModel.quantityMax = quantityMax;
		dataModel.promotionId = promotionId;
		dataModel.shopId = shopId;
		dataModel.objectTypeValue = objectType;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/changepromotioncustomer', PromotionCatalog._xhrSave, 'errMsgCustomerDlg', function(data){
				$('#successMsgCustomerDlg').html(msgCommon1).show();
				$('#customerCodeDlg').val('');
				$('#customerNameDlg').val('');
				$('#numberOfCustomer').val('');
				$('.RequireStyle').hide();
				PromotionCatalog.resetFormCustomer();
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_soSuatKhachHang+','+SuperviseManageRouteCreate_confirmContinute+' ?', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomer", PromotionCatalog._xhrSave, null, function(){
							$('#successMsgCustomerDlg').html(msgCommon1).show();
							$('#customerCodeDlg').val('');
							$('#customerNameDlg').val('');
							$('#numberOfCustomer').val('');
							$('.RequireStyle').hide();
							PromotionCatalog.resetFormCustomer();
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});	
			}else{
				Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomer", PromotionCatalog._xhrSave, null, function(){
					$('#successMsgCustomerDlg').html(msgCommon1).show();
					$('#customerCodeDlg').val('');
					$('#customerNameDlg').val('');
					$('#numberOfCustomer').val('');
					$('.RequireStyle').hide();
					PromotionCatalog.resetFormCustomer();
					setTimeout(function(){$.fancybox.close();}, 1000);
				},null,null,null,null,true);
			}
		}
		return false;
	},
	showDialogCustomerType: function(){
		//$('.RequireStyle').show();
		var html = $('#customerTypeDialog').html();
		var promotionId = $('#promotionId').val();
		var shopId = $('#shopId').val();
		$.fancybox(html,
				{
					modal: true,
					title: PromotionCatalog_infosClient,
					afterShow: function(){
						$('#customerTypeDialog').html('');
						$('#numberOfCustomerType').focus();
						$.ajax({
							type : "POST",
							url : "/catalog/promotion/getcustomertypedialog",
							data : ({promotionId:promotionId,shopId:shopId}),
							dataType: "html",
							success : function(data) {
								$('#customerTypeContent').html(data).show();
								$('#subCategory_0').focus();
								$(window).resize();
								var tm = setTimeout(function(){
									$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
									window.scrollTo(0,0);
								}, 500);
							},
							error:function(XMLHttpRequest, textStatus, errorThrown) {
								$.ajax({
									type : "POST",
									url : WEB_CONTEXT_PATH + '/check-session',
									dataType : "json",
									success : function(data) {
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										window.location.href = WEB_CONTEXT_PATH + '/home' ;
									}
								});
							}
						});						
					},
					afterClose: function(){
						
						$.ajax({
							type : "POST",
							url : WEB_CONTEXT_PATH + '/check-session',
							dataType : "json",
							success : function(data) {
								$('#customerTypeDialog').html(html);
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								window.location.href = WEB_CONTEXT_PATH + '/home' ;
							}
						});
					}
				}
			);
		return false;
	},
	showDialogCustomerUpdate: function(customerId){
//		$('.RequireStyle').show();
		var title = '';
		if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
			title = PromotionCatalog_updateTypeClient+':'+$('#shopNameHidden').val().trim();
		}else{
			title = PromotionCatalog_updateTypeClient+':'+$('#shopNameHidden').val().trim();
		}
		var html = $('#updateCustomerDialog').html();
		$.fancybox(html,
				{
					modal: true,
					title: title,
					afterShow: function(){
						$('#updateCustomerDialog').html('');
						$.ajax({
							type : "POST",
							url : "/catalog/promotion/getcustomerupdatedialog",
							data : ({customerId:customerId}),
							dataType: "html",
							success : function(data) {
								$('#updateCustomerContent').html(data).show();								
							},
							error:function(XMLHttpRequest, textStatus, errorThrown) {
								$.ajax({
									type : "POST",
									url : WEB_CONTEXT_PATH + '/check-session',
									dataType : "json",
									success : function(data) {
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										window.location.href = WEB_CONTEXT_PATH + '/home' ;
									}
								});
							}
						});	
						$(window).resize();
						var tm = setTimeout(function(){
							$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);							
							window.scrollTo(0,0);
						}, 500);
					},
					afterClose: function(){
						$.ajax({
							type : "POST",
							url : WEB_CONTEXT_PATH + '/check-session',
							dataType : "json",
							success : function(data) {
								$('#updateCustomerDialog').html(html);
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								window.location.href = WEB_CONTEXT_PATH + '/home' ;
							}
						});
					}
				}
			);
		return false;
	},
	selectListCustomerType: function(){
		$('#errMsgCustomerTypeDlg').html('').hide();
		var arrId = new Array();
		var lstSize = $('#lstSize').val();
		for(var i=0;i<lstSize;i++){
			if($('#isCheck_'+i).is(':checked')){
				arrId.push($('#channelTypeId_'+i).val());
			}
		}
		var msg = '';
		if(arrId.length == 0){
			msg = PromotionCatalog_selectTypeClient;
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('numberOfCustomerType', PromotionCatalog_soSuatLoaiKH);
		}
		if(msg.length > 0){
			$('#errMsgCustomerTypeDlg').html(msg).show();
			return false;
		}
		var quantityMax = $('#numberOfCustomerType').val().trim();
		var promotionId = $('#promotionId').val();
		var shopId = $('#shopId').val();
		var dataModel = new Object();		
		dataModel.lstCustomerTypeId = arrId;
		dataModel.quantityMax = quantityMax;
		dataModel.promotionId = promotionId;
		dataModel.shopId = shopId;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/changepromotioncustomertype', PromotionCatalog._xhrSave, 'errMsgCustomerTypeDlg', function(data){
				$('#successMsgCustomerTypeDlg').html(msgCommon1).show();
				PromotionCatalog.resetFormCustomerType();
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuatTypeClient+','+SuperviseManageRouteCreate_confirmContinute+'? ', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomertype", PromotionCatalog._xhrSave, null, function(){
							$('#successMsgCustomerTypeDlg').html(msgCommon1).show();
							PromotionCatalog.resetFormCustomerType();
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});	
			}else{
				Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomertype", PromotionCatalog._xhrSave, null, function(){
					$('#successMsgCustomerTypeDlg').html(msgCommon1).show();
					PromotionCatalog.resetFormCustomerType();
					setTimeout(function(){$.fancybox.close();}, 1000);
				},null,null,null,null,true);
			}
		}
		return false;
	},
	updateCustomerInfo:function(customerId){
		$('#errMsgUpdateDlg').html('').hide();
		var msg = '';
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('statusUpdate', msgTrangThai,true);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('quantityMaxUpdate', PromotionCatalog_SoSuat);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfMaxlengthValidate('quantityMaxUpdate', PromotionCatalog_SoSuat,10);
		}
		if(msg.length > 0){
			$('#errMsgUpdateDlg').html(msg).show();
			return false;
		}
		var quantityMax = $('#quantityMaxUpdate').val().trim();
		var status = $('#statusUpdate').val();
		var dataModel = new Object();		
		dataModel.quantityMax = quantityMax;
		dataModel.status = status;
		dataModel.customerId = customerId;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/updatecustomerinfo', PromotionCatalog._xhrSave, 'errMsgUpdateDlg', function(data){
				$('#successMsgUpdateDlg').html(msgCommon1).show();
				if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
					PromotionCatalog.resetFormCustomerType();
				}else{
					PromotionCatalog.resetFormCustomer();
				}
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#statusUpdate').val() != '' && $('#statusUpdate').val() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuat+','+SuperviseManageRouteCreate_confirmContinute+'? ', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/updatecustomerinfo", PromotionCatalog._xhrSave, null, function(){
							$('#successMsgUpdateDlg').html(msgCommon1).show();
							if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
								PromotionCatalog.resetFormCustomerType();
							}else{
								PromotionCatalog.resetFormCustomer();
							}
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});	
			}else{
				Utils.addOrSaveData(dataModel, '/catalog/promotion/updatecustomerinfo', PromotionCatalog._xhrSave, 'errMsgUpdateDlg', function(data){
					$('#successMsgUpdateDlg').html(msgCommon1).show();
					if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
						PromotionCatalog.resetFormCustomerType();
					}else{
						PromotionCatalog.resetFormCustomer();
					}
					setTimeout(function(){$.fancybox.close();}, 1000);
				}, null, '.fancybox-inner', null, null);
			}
		}
		return false;
	},
	loadShopTreeOnDialog: function(url){
		Utils.getJSON(url, function(data){
			$('#shopTree').jstree({
		        "plugins": ["themes", "json_data","ui","checkbox"],
		        "themes": {
		            "theme": "classic",
		            "icons": false,
		            "dots": true
		        },
		        "json_data": {
		        	"data": data,
		        	"ajax" : {
		        		"method": "GET",
		                "url" : '/rest/catalog/promotion-program/sub-shop/list.json?promotionId=' +$('#promotionId').val(),
		                "data" : function (n) {
		                        return { id : n.attr ? n.attr("id") : 0 };
		                    }
		            },
		            'complete':function(){
		            	setTimeout(function(){
		    				$('#shopTreeContent').jScrollPane(); 
		    			},500);
		    			$('#shopTree').bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
		    				setTimeout(function(){
		    					$('#shopTreeContent').jScrollPane(); 
		    				},500);							
		    			});
		            }
		        }
			});
			$('#shopTree').bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
				if($('#shopTreeContent').data('jsp') != undefined || $('#shopTreeContent').data('jsp') != null) {
					$('#shopTreeContent').data('jsp').destroy();
					setTimeout(function(){
						$('#shopTreeContent').jScrollPane();
					},500);	
				} else {
					setTimeout(function(){
						$('#shopTreeContent').jScrollPane();
					},500);	
				}
				PromotionCatalog.getCheckboxStateOfTreeEx('shopTree',PromotionCatalog._mapShop,'shopTree li');
			});
		});
	},
	exportPromotionProduct:function(){
		$('#divOverlay').addClass('Overlay');
		$('#imgOverlay').show();
		$('#errExcelMsg').html('').hide();
	    var promotionId = $('#promotionId').val().trim();
		var productCode = $('#productCode').val().trim();
		var isCompel = $('#isCompel').is(':checked');
		var amountBuy = $('#amountBuy').val().trim().replace(/,/g,'');
		var totalBuyMoney = $('#totalBuyMoney').val().trim().replace(/,/g,'');
		var totalDiscountMoney = $('#totalDiscountMoney').val().trim().replace(/,/g,'');
		var percentDiscountMoney = $('#percentDiscountMoney').val().trim();
		var discountProduct = $('#discountProduct').val().trim();
		var discountAmount = $('#discountAmount').val().trim().replace(/,/g,'');
		var data = new Object();
		data.promotionId = promotionId;
		data.productCode = productCode;
		data.amountBuy = amountBuy;
		data.totalBuyMoney = totalBuyMoney;
		data.totalDiscountMoney = totalDiscountMoney;
		data.percentDiscountMoney = percentDiscountMoney;
		data.discountProduct = discountProduct;
		data.discountAmount = discountAmount;
		data.isCompel = isCompel;
		var url = "/catalog/promotion/getlistproducttoexport";
		CommonSearch.exportExcelData(data,url);
     },
     exportPromotionProductExcel:function(){   
  		$.messager.confirm(msgXacNhan,SuperviseManageRouteCreate_exportExcel,function(r){
			if(r){	
				$('#divOverlay').addClass('Overlay');
    	 		$('#imgOverlay').show();
    	 		$('#errExcelMsg').html('').hide();
    	 		var promotionId = $('#promotionId').val().trim();
    	 	    
    	 		var data = new Object();
    	 		data.promotionId = promotionId;		 		
    	 		var url = "/catalog/promotion/exportProductPromotionExcel";
    	 		CommonSearch.exportExcelData(data,url);										
				}			
		});	
 		return false;
     },
    /* importExcel:function(){
 		$('#isView').val(0);
 		var options = { 
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,   
		 		success:      ProductLevelCatalog.afterImportExcelUpdate, 
		 		type: "POST",
		 		dataType: 'html',
		 		data:({excelType:$('#excelType').val(),proType:$('#proType').val()})
		 	}; 
		$('#importFrm').ajaxForm(options);
 		$('#importFrm').submit();
 		return false;
 	},	*/
 	viewExcel:function(){
 		$('#isView').val(1);
 		var options = { 
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,   
		 		success:      ProductLevelCatalog.afterImportExcelUpdate, 
		 		type: "POST",
		 		dataType: 'html',
		 		data:({excelType:$('#excelType').val(),proType:$('#proType').val()})
		 	}; 
		$('#importFrm').ajaxForm(options);
		$('#importFrm').submit();
 		return false;
 	},
 	importExcelProduct:function(){
 		if(parseInt($('#excelType').val()) == -1){
 			$('#errExcelMsg').html(PromotionCatalog_selectTypeImport).show();
 		}else{
 			$('#isView').val(0);
 			var options = { 
 					beforeSubmit: ProductLevelCatalog.beforeImportExcel,   
 					success:      PromotionCatalog.afterImportExcelUpdate, 
 					type: "POST",
 					dataType: 'html',
 					data:({excelType:$('#excelType').val(),promotionId:$('#promotionId').val(),token:$('#token').val().trim()})
 			}; 
 			$('#importFrm').ajaxForm(options);
 			$('#importFrm').submit();
 		}
 		return false;
 	},	
 	viewExcelProduct:function(){
 		if(parseInt($('#excelType').val()) == -1){
 			$('#errExcelMsg').html(PromotionCatalog_selectTypeImport).show();
 		}else{
	 		$('#isView').val(1);
	 		var options = { 
					beforeSubmit: ProductLevelCatalog.beforeImportExcel,   
			 		success:      ProductLevelCatalog.afterImportExcelUpdate, 
			 		type: "POST",
			 		dataType: 'html',
			 		data:({excelType:$('#excelType').val(),promotionId:$('#promotionId').val()})
			 	}; 
			$('#importFrm').ajaxForm(options);
			$('#importFrm').submit();
 		}
 		return false;
 	},
 	getParams:function(){
 		var promotionCode = $('#promotionCode').val().trim();
		var typeCode = $('#typeCode').val().trim();
		var shopCode = $('#shopCode').val().trim();
		var customerType = $('#customerType').val().trim();
		var startDate = $('#startDate').val().trim();
		var endDate = $('#endDate').val().trim();
		var status = $('#status').val().trim();
		var proType = $("#proType").val();
		var excelType = $('#excelType').val();
		var msg = '';
		var data = new Object();
		if (startDate != '' && !Utils.isDate(startDate)) {
			msg = msgCommonErr1;
			$('#startDate').focus();
		}
		if(msg.length == 0){
			if(endDate != '' && !Utils.isDate(endDate)){
				msg = msgCommonErr2;
				$('#endDate').focus();
			}
		}
		if(msg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					msg = msgCommonErr3;				
				}
			}
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			data.error = true;
			return data;
		}else{
			data.error = false;
		}
		var tm = setTimeout(function() {
			$('#promotionCode').focus();
		}, 500);
		if(promotionCode != ''){
			data.promotionCode = promotionCode;
		}
		if(typeCode != ''){
			data.typeCode = typeCode;
		}
		if(shopCode != ''){
			data.shopCode = shopCode;
		}
		if(customerType != ''){
			data.customerType = customerType;
		}
		if(startDate != ''){
			data.startDate = startDate;
		}
		if(endDate != ''){
			data.endDate = endDate;
		}
		if(status != ''){
			data.status = status;
		}
		if(proType != ''){
			data.proType = proType;
		}
		if(excelType != ''){
			data.excelType = excelType;
		}
		return data;
 	},
 	exportExcel:function(){
		var params = PromotionCatalog.getParams();
		if(params.error != undefined && params.error) return; 			
		Utils.addOrSaveData(params, '/catalog/promotion/getexport', null, 'errMsg', function(data) {
			window.location.href=data.view;
			setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
                CommonSearch.deleteFileExcelExport(data.view);
          },300000);
		}, 'loading', null, null, SuperviseManageRouteCreate_exportExcel);
		return false;
 	},
 	exportProductPromotionExcel:function(){
		var params = PromotionCatalog.getParams();
		if(params.error != undefined && params.error) return; 			
		Utils.addOrSaveData(params, '/catalog/promotion/exportProductPromotion', null, 'errMsg', function(data) {
			window.location.href=data.view;
			setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
                CommonSearch.deleteFileExcelExport(data.view);
          },300000);
		}, 'loading', null, null, SuperviseManageRouteCreate_exportExcel);
		return false;
 	},
 	excelTypeChanged:function(){
 		if($('#excelType').val() == 1){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_thongtinchung.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_thongtinchung.xls');
 			}
 		} 
 		else if($('#excelType').val() == 3){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_Donvi.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_Donvi.xls');
 			}
 		}else if($('#excelType').val() == 4){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_KH.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_KH.xls');
 			}
 		}else if($('#excelType').val() == 5){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_Loai_KH.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_Loai_KH.xls');
 			}
 		}
 		$('#excelFile').val('');
 		$('#fakefilepc').val('');
 	},
 	removeAllAndActiveClass:function(str){
 		$("#productTab").removeClass("Active");
		$("#infoTab").removeClass("Active");
		$("#shopTab").removeClass("Active");
		$("#customerAttributeTab").removeClass("Active");
		if(str!=undefined && str!=null && str!=''){
			$("#"+str).addClass("Active");
		}
 	},
 	viewActionAudit:function(actionId){
 		if(actionId== undefined || actionId==null){
 			var actionId=0;
 		}
 		var url = PromotionCatalog.getSearchActionGridUrl(actionId);
 		$("#gridAction").setGridParam({url:url,page:1}).trigger("reloadGrid");
 	},
 	exportActionLog: function(){
		var id = $('#promotionId').val();
		var fromDate = $('#fromDate').val().trim();
		var toDate = $('#toDate').val().trim();
		ExportActionLog.exportActionLog(id, ExportActionLog.PROMOTION_PROGRAM, fromDate, toDate,'errMsg');
	},
 	gotoTab: function(tabIndex){
		PromotionCatalog.deactiveAllMainTab();
		switch (tabIndex) {
		case 0:
			$('#tabContent1').show();
			$('#tab1 a').addClass('Active');
			break;
		case 1:
			$('#tabContent2').show();
			$('#tab2 a').addClass('Active');
			AttributesManager.getAttributesForm('tabContent2',AttributesManager.PROMOTION_PROGRAM);
			$('#typeAttribute').val(AttributesManager.PROMOTION_PROGRAM);
			break;
		default:
			$('#tabContent1').show();
			break;
		}
	},	
	deactiveAllMainTab: function(){
		$('#tab1 a').removeClass('Active');
		$('#tab2 a').removeClass('Active');
		$('#tabContent1').hide();
		$('#tabContent2').hide();
	},
	loadCommonPage:function(divId,url,kData,type){
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){		    		
	   		 if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
	   			 url = WEB_CONTEXT_PATH  + url;
			     }   	
			}
		
		$.ajax({
			type : "POST",
			url : url,
			data : (kData),
			dataType: "html",
			success : function(data) {
				$('#'+divId).html(data).show();
				if(type == 0){
					Utils.bindAutoSave();
					if($('#promotionId').val().trim() > 0) {
						$('#promotionName').focus();
					} else {
						$('#promotionCode').focus();
					}
					$('.InputTextStyle , button').each(function(){
						$(this).bind('focus',function(){
							$('#cur_focus').val($(this).attr('id'));
						});
					});
				}else if(type == 1){
//					$('#productCode').focus();
//					Utils.bindAutoSearch();
				}else if(type == 2){
					$('#shopCode').focus();
					Utils.bindAutoSearch();
					var permissionUser = $('#permissionUser').val();
					if(permissionUser != 'true'){
						$('#promotionCustomerGrid').removeAttr('style'); 
						$('#promotionCustomerExGrid').removeAttr('style'); 
					}
					$('.InputTextStyle , button').each(function(){
						$(this).bind('focus',function(){
							$('#cur_focus').val($(this).attr('id'));
						});
					});
				}else if(type == 3){
					
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						$('#divOverlay').removeClass('Overlay');
						hideLoading(loading);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH + '/home' ;
					}
				});
			}
		});
		return false;
	},
	openShopQuantityDialog:function(id){
		PromotionCatalog._isPromotionPage = true;
		$('#errExcelMsg').html('').hide();
		var promotionId = $('#promotionId').val();
		var quantity = $('#quantityMax').val();
		var arrParam = new Array();
 		var param = new Object();
 		param.name = 'shopId';
 		if(id != null && id != undefined){
 	 		param.value = id;
 		}
 		var param1 = new Object();
 		param1.name = 'promotionId';
 		param1.value = promotionId;
 		arrParam.push(param);
 		arrParam.push(param1);
 			CommonSearch.searchShopPromotionProgram(function(data){
 				//$('#promotionProgramCode').val(data.code);
 			},arrParam, function(data){
 				
 			});
 			PromotionCatalog.bindFormat();
	},
	updateQuantity:function(shopId,promotionId,quantity,quantityKM){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.shopId = shopId;
		params.promotionId = promotionId;
		params.quantityMax = quantity;
 		if(Number(quantityKM) > Number(quantity)){
 			setTimeout(function(){
					$('#errMsgShop').html(PromotionCatalog_rangeSoSuat).show();
    		},1000);
 			return false;
 		}
		Utils.addOrSaveData(params, '/catalog/promotion/updatequantity', null, 'errMsgShop', function(data){
			if(data.error == null || data.error == undefined){
				$('#errMsgSearchShop').html("").hide();
				PromotionCatalog.searchShop();
				$('#errMsgShop').html("").hide();
			 	$('#txt'+shopId).attr('disabled','disabled');
			 	$('#successMsgShop').html(msgCommon1).show();
				var tm = setTimeout(function(){
					$('#successMsgShop').html('').hide();
					clearTimeout(tm); 
				}, 3000);
			 	//$('#link'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return edit('+shopId+',\''+data.shopCode+'\','+quantity+');">');
				//$('#linkesc'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg" onclick="return PromotionCatalog.searchCustomerShopMap('+$('#promotionId').val()+','+shopId+',\''+data.shopCode+'\');">');
			
				$('#link'+shopId).attr('onclick','return edit('+shopId+',\''+data.shopCode+'\','+quantity+');');
				$('#linkesc'+shopId).attr('onclick','return PromotionCatalog.searchCustomerShopMap('+$('#promotionId').val()+','+shopId+',\''+data.shopCode+'\');').html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg"/>');
			}
		}, null, null, null, PromotionCatalog_confirmUpdateSoSuatKM+" ?", null);
	},
	deletePromotionShopMap:function(groupId,promotionGroupMapId){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.shopId = groupId;
		params.promotionGroupMapId = promotionGroupMapId;
		params.promotionId = $('#promotionId').val();
		Utils.addOrSaveData(params, '/catalog/promotion/deleteshopmap', null, 'errMsgShop', function(data){
			if(data.error == null || data.error == undefined){
				PromotionCatalog.searchShop();
				$('#labelListCustomer').attr('style','display:none;');
				$('#promotionCustomerGrid').attr('style','display:none;');
				$('#boxSearch1').attr('style','display:none;');
				$('#errMsgShop').html('').hide();
				$('#successMsgShop').html(man_cus_msg_del_suc).show();
				var tm = setTimeout(function(){
					$('#successMsgShop').html('').hide();
					clearTimeout(tm); 
				}, 3000);
			}
		}, null, null, null, PromotionCatalog_confirmDeleteUnit+"?", null);
	},
	onCheckShop:function(id,type){
		 var isCheck = $('.easyui-dialog #check_'+id).is(':checked');
		    if(isCheck){
		    	/*var value = $('.easyui-dialog #txtQuantity_'+id).val();
				PromotionCatalog._listQuantity.push(value);*/
				PromotionCatalog._listShopId.push(id);
				PromotionCatalog.lstType.push(type);
				var classParent = $('.easyui-dialog #check_'+id).attr('class');
				var flag = true;
				var count = 0;
				$('.'+classParent).each(function(){
					if($(this).is(':checked')){
						flag = false;
						count++;
					}
				});
				if(type != 1){
					if(flag || count == 1){
						CommonSearch.recursionFindParentShopCheck(id,type);
					}
				}
			}else{
		    	/*var value = $('.easyui-dialog #txtQuantity'+id).val();*/
				var index = PromotionCatalog.removeArrayByValue(PromotionCatalog._listShopId,id, type);
				/*PromotionCatalog.removeArrayByValue(PromotionCatalog._listQuantity,value);*/
				if (index != -1){
//					PromotionCatalog.removeArrayByValue(PromotionCatalog.lstType,type);
					PromotionCatalog.lstType.splice(index,1);
				}
				var classParent = $('.easyui-dialog #check_'+id).attr('class');
				var flag = true;
				var count = 0;
				$('.'+classParent).each(function(){
					if($(this).is(':checked')){
						flag = false;
					}
				});
				if(flag || count == 1){
					CommonSearch.recursionFindParentShopUnCheck(id,type);
				}
				//CommonSearch.recursionFindParentShopUnCheck(id);
			}
	},
	removeArrayByValue:function(arr,val, type){
		for(var i=0; i<arr.length; i++) {
	        if(arr[i] == val){
	        	if (PromotionCatalog.lstType[i] == type){
	        		arr.splice(i, 1);
			        return i;
	        	}
	        }
	    }
		return -1;
	},
	bindFormat:function(){
			$('#searchStyleShopContainerGrid input[type=text]').each(function(){
 				Utils.bindFormatOnTextfieldEx1($(this).attr('id'),Utils._TF_NUMBER,null,'#errMsgDialog',msgLoi3);
 			}); 
	},
	createPromotionShopMap:function(){
		var params = new Object();
		params.listShopId = PromotionCatalog._listShopId;
		params.lstType = PromotionCatalog.lstType;
		/*var flag = true;*/
		/*if(PromotionCatalog._listShopId.length > 0){
			var listSize = PromotionCatalog._listShopId.length;
			var s = $('#errMsgDialog').html();
			for(var i=0;i<listSize;i++){
				var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
				if(s.length > 0){
					if(value != null && value != undefined){
						value = value.replace(',','').replace(',','');
						value = value * 1;
						if(isNaN(value)){
							$('#errMsgDialog').html(msgLoi3).show();
							flag = false;
							break;
						}
					}
				}else{
					if(value != null && value != undefined){
						value = value.replace(',','').replace(',','');
						value = value * 1;
						if(isNaN(value)){
							$('#errMsgDialog').html(msgLoi3).show();
							flag = false;
							break;
						}
					}
				}
			}
			if(flag == false){
				return false;
			}
			
			for(var i=0;i<listSize;i++){
				var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
				if(value != null && value != undefined){
					PromotionCatalog._listQuantity[i] = value;
				}
			}
		}*/
		
//		params.listQuantity = PromotionCatalog._listQuantity;
		params.promotionId = $('#promotionId').val();
		if(PromotionCatalog._listShopId.length<=0 
//			|| PromotionCatalog._listQuantity.length <= 0
			){
			$('.easyui-dialog #errMsgDialog').html(PromotionCatalog_noSelectUnit).show();
			return false;
		}
		Utils.addOrSaveData(params, '/catalog/promotion/createshopmap', null, 'errMsgDialog', function(data){
			if(data.error == undefined && data.errMsg == undefined){
				PromotionCatalog.searchShop();
				PromotionCatalog._listShopId = new Array();
				PromotionCatalog._listQuantity = new Array();
				$('#searchStyleShop1').dialog('close');
				$('#errMsgDialog').html('').hide();
				$('#errMsgShop').html('').hide();
				$('#errExcelMsg').html('').hide();
				//$('#successMsg').html('').hide();
				$('#successMsgShop').html(msgCommon1).show();
				var tm = setTimeout(function(){
					$('#successMsgShop').html('').hide();
					clearTimeout(tm); 
				}, 3000);
			} 
		}, null, null, null, PromotionCatalog_confirmAddObject, null);
	},
	copyPromotionProgram:function(){
		var promotionId = $('#promotionId').val();
		var params = new Object();
		params.promotionId = promotionId;
		var title = PromotionCatalog_confirmSaveCTKM;
		var promotionType = $('#promotionType').val();
		if(promotionType == "CTKM"){
			title = PromotionCatalog_confirmSaveCTKM;
			params.proType = 1;
		}
		if(promotionType == "CTHTTM"){
			title = PromotionCatalog_confirmSaveCTHTTM;
			params.proType = 2;
		}
		Utils.addOrSaveData(params, '/catalog/promotion/copypromotionprogram', null, 'errMsg', function(data){
			//PromotionCatalog.loadShop();
			$('.easyui-dialog').dialog('close'); 
		}, null, null, null, title, null);
	},
	openCopyPromotionProgram:function(){
		var arrParams = new Array();
		arrParams.push("promotion");
		CommonSearch.openSearchStyle1EasyUICopyPromotionShop(PromotionCatalog_promotionCode+'<span class="RequireStyle" style="color:red">*</span>',
				PromotionCatalog_promotionName+'<span class="RequireStyle" style="color:red">*</span>', PromotionCatalog_saveCTKM,"promotionProgramCode",
				"promotionProgramName",'searchStyle1EasyUIDialogDiv',arrParams);
	},
	openCopyPromotionManualProgram:function(){
		var arrParams = new Array();
		arrParams.push("promotionManual");
		CommonSearch.openSearchStyle1EasyUICopyPromotionShop(msgMaCKHTTM+'<span class="RequireStyle" style="color:red">*</span>',
				msgTenCKHTTM+'<span class="RequireStyle" style="color:red">*</span>', PromotionCatalog_saveCTHTTM,"promotionProgramCode",
				"promotionProgramName",'searchStyle1EasyUIDialogDiv',arrParams);
	},
	getPopupCustomerShopMapGridUrl: function(promotionId,shopId,customerCode,customerName,address){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomershoppopup?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName) + "&address=" + encodeChar(address);
	},
	getCustomerShopMapGridUrl: function(promotionId,shopId,customerCode,customerName,customerAddress){
		return WEB_CONTEXT_PATH +"/catalog/promotion/searchcustomershop?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerCode="+encodeChar(customerCode)+"&customerName="+encodeChar(customerName)+"&address="+encodeChar(customerAddress);
	},
	searchCustomerShopMap:function(promotionId,shopId,shopCode){
		$('#promotionShopMap').val(promotionId);
		$('#errExcelMsg').html('').hide();
		var statusPermission = $('#statusPermission').val();
		$('#shopMapId').val(shopId);
		$('#labelShop').html("("+shopCode+")");
		var value = $('#shopCodeHidden').val();
		if(value != null && value != undefined && shopCode != null && shopCode != undefined && value != shopCode){
			$('#customerCodeSearch').val('');
			$('#customerNameSearch').val('');
			$('#customerAddressSearch').val('');
		}
		$('#shopCodeHidden').val(shopCode);
		$('#errMsgCustomer').html("").hide();
		$('#promotionCustomerGrid').removeAttr('style');
		$('#promotionCustomerExGrid').show();
		$('#labelListCustomer').removeAttr('style');
		var customerCode = $('#customerCodeSearch').val().trim();
		var customerName = $('#customerNameSearch').val().trim();
		var customerAddress = $('#customerAddressSearch').val().trim();
		var value = $('#divWidth').width()-40;
		var shortCodeWidth = (value * 10)/100;
		var customerNameWidth = (value * 30)/100;
		var addressWidth = (value * 40)/100 -4;
		var quantityMaxWidth = (value * 15)/100;
		var deleteWidth = (value * 10)/100;
		var permissionUser = $('#permissionUser').val();
		var titleOpenDialogCustomer = "";
		if(statusPermission == 2 && $('#isAllowEditProPgram').val() == 'true'){
			titleOpenDialogCustomer = '<a href="javascript:void(0);" onclick="return PromotionCatalog.openCustomerShopQuantityDialog(\''+shopCode+'\');"><img src="' + WEB_CONTEXT_PATH + '/resources/images/plus.svg"></a>';
		}
		
		$("#promotionCustomerExGrid").datagrid({
			  url:PromotionCatalog.getCustomerShopMapGridUrl(promotionId,shopId,customerCode,customerName,customerAddress),
			  columns:[[		
			    {field:'shortCodeShopMap', title: catalog_customer_code, width: shortCodeWidth, sortable:false,resizable:false , align: 'left',formatter:function(value,row,index){
			    	return Utils.XSSEncode(row.customer.customerCode);
			    }},
			    {field:'customerNameShopMap', title: catalog_customer_name, width:customerNameWidth, sortable:false,resizable:false , align: 'left',formatter:function(value,row,index){
			    	return Utils.XSSEncode(row.customer.customerName);
			    }},
			    {field:'addressShopMap', title: SuperviseManageRouteCreate_customerAddress, width: addressWidth, sortable:false,resizable:false , align: 'left',formatter:function(value,row,index){
			    	return Utils.XSSEncode(row.customer.address);
			    }},
			    {field:'quantityMax', title: PromotionCatalog_SoSuat, width: quantityMaxWidth,sortable:false,resizable:false , align: 'center',formatter:function(value,row,index){
			    	var value="";
			    	if((row.quantityMax != null && row.quantityMax != undefined && row.quantityMax != "" && row.quantityMax != "null") || row.quantityMax == 0){
		    			value = formatCurrency(row.quantityMax);
		    		}
			    	if(statusPermission == 1 || statusPermission == 2){
			    		
			    		return '<input type="text" id="txt_'+row.id+'" value="'+value+'" style="text-align:center;width='+(quantityMaxWidth-4)+'px;" class="soSuatKMCustomer" disabled="disabled" maxlength="9"/>';
			    	}else{
			    		return value;
			    	}
			    }},
			    {field:'quantityReceived', title: PromotionCatalog_soSuatDaKM, width: quantityMaxWidth,sortable:false,resizable:false , align: 'center',formatter:function(value,row,index){ 
			    	if(row.quantityReceived != null && row.quantityReceived != undefined && row.quantityReceived != "" && row.quantityReceived != 0){
		        		return formatCurrency(row.quantityReceived) + '<input type="hidden" id="txtqr_'+row.id+ '" value="'+row.quantityReceived+'"/>';
		        	}
			    	else{
		        		return '0' + '<input type="hidden" id="txtqr_'+row.id+ '" value="'+row.quantityReceived+'"/>';;
		        	}
//			    	return row.quantityReceived + '<input type="hidden" id="txtqr_'+row.id+ '" value="'+row.quantityReceived+'"/>';
			    }},
			    {field:'edit', title: msgCommonThaoTac, width: deleteWidth, align: 'center',sortable:false,resizable:false, formatter: 
			    function(value,row,index){
			    	if($('#isAllowEditProPgram').val() == 'true'){
			    		if(statusPermission == 1 || statusPermission == 2){
				    		return '<a href="javascript:void(0);" id="link_'+row.id+'"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+row.id+','+row.shop.id+','+row.promotionShopMap.promotionProgram.id+','+row.quantityMax+');"></a>';
				    	}
			    	}else{
			    		return '';
			    	}
			    	
			    	
			    }},
			    {field:'delete', title: msgCommonThaoTac, width: deleteWidth, align: 'center',sortable:false,resizable:false, formatter: function(value,row,index){
			    	if($('#isAllowEditProPgram').val() == 'true'){
			    		if(statusPermission == 2){
				    		return '<a href="javascript:void(0);" id="linkdelete_'+row.id+'" ><img src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg" onclick="return PromotionCatalog.deleteCustomer('+row.id+','+row.shop.id+','+row.promotionShopMap.promotionProgram.id+');"></a>';
				    	}
				    	if(statusPermission == 1){
				    		return '<a href="javascript:void(0);" id="linkdelete_'+row.id+'" ></a>';
				    	}
			    	}else{
			    		return '';
			    	}
			    }},
			    {field:'id', hidden:true}
			  ]],
			  height: 'auto',
			  rownumbers: true,
			  pagination:true,
			  width: ($('#divWidth').width()-40),
			  onLoadSuccess :function(data){
			    	$('.datagrid-header-rownumber').html(stt_label);
			    	var originalSize = $('.datagrid-header-row td[field=shortCodeShopMap] div').width();
			    	if(originalSize != null && originalSize != undefined){
			    		PromotionCatalog._listCustomerSize.push(originalSize);
			    	}
			    	Utils.updateRownumWidthForJqGridEX1(null,'shortCodeShopMap',PromotionCatalog._listCustomerSize);
			    	$('.soSuatKMCustomer').each(function(){
			    		Utils.formatCurrencyFor($(this).attr('id'));
			    	});
			  }
			});
	},
	edit:function(id,shopId,promotionId,quantityMax){
		$('#errMsgCustomer').html("").hide();
		var statusPermission = $('#statusPermission').val();
		$('#txt_'+id).removeAttr('disabled');
		Utils.bindFormatOnTextfieldEx1('txt_'+id,Utils._TF_NUMBER,null,'#errMsgCustomer',msgLoi3);
		if(statusPermission == 2 || statusPermission ==1){
			$('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.save('+id+','+shopId+','+promotionId+','+quantityMax+');">');
			$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_esc.png" onclick="return PromotionCatalog.esc('+id+','+shopId+','+promotionId+','+quantityMax+');">');
		}
	},
	save:function(id,shopId,promotionId,quantityMax){
		var statusPermission = $('#statusPermission').val();
//		Utils.bindFormatOnTextfield('txt_'+id,Utils._TF_NUMBER,null);
//		if(statusPermission == 2 || statusPermission == 1){
//			$('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantityMax+');">');
//		}
		if(statusPermission == 2 || statusPermission == 1){
			var s = $('#errMsgCustomer').html();
			var s1 = $('#txtqr_'+id).val();
			if(s1 != null && s1 != undefined){
				s1 = s1.replace(',','').replace(',','');
			}
			if(s.length > 0){
				var value = $('#txt_'+id).val();
				if(value != null && value != undefined){
					value = value.replace(',',''.replace(',',''));
					value = value * 1;
					if(isNaN(value)){
						$('#errMsgCustomer').show();
						$('#txt_'+id).focus();
					}else{
						PromotionCatalog.updateCustomerQuantity(id,shopId,promotionId,$('#txt_'+id).val().replace(',','').replace(',',''),s1);
					}
				}
			}else{
				var value = $('#txt_'+id).val();
				if(value != null && value != undefined){
					value = value.replace(',','').replace(',','');
					value = value * 1;
					if(isNaN(value)){
						$('#errMsgCustomer').html(msgLoi3).show();
						$('#txt_'+id).focus();
					}else{
						PromotionCatalog.updateCustomerQuantity(id,shopId,promotionId,$('#txt_'+id).val().replace(',','').replace(',',''),s1);
					}
				}
				//PromotionCatalog.updateCustomerQuantity(id,shopId,promotionId,$('#txt_'+id).val(),s1);
				//$('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantityMax+');">');
				//$('#linkesc'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg" onclick="return PromotionCatalog.searchCustomerShopMap('+$('#promotionId').val()+','+id+',\''+shopCode+'\');">');
//				if(statusPermission == 2){
//					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png" onclick="return PromotionCatalog.deleteCustomer('+id+','+shopId+','+promotionId+');">');
//				}
//				if(statusPermission == 1){
//					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png">');
//				}
			}
		}
	},
	esc:function(id,shopId,promotionId,quantityMax){
		$('#errMsgCustomer').html("").hide();
		var row = $('#promotionCustomerExGrid').datagrid('getSelected'); 
		var statusPermission = $('#statusPermission').val();
//		   if (row){   
			   $('#txt_'+id).val(formatCurrency(quantityMax));
			   if(statusPermission == 2 || statusPermission == 1){
				   $('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantityMax+');">');
			   }
			   if(statusPermission == 2){
				   $('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png" onclick="return PromotionCatalog.deleteCustomer('+id+','+shopId+','+promotionId+');">');  
			   }
			   if(statusPermission == 1){
				   $('#linkdelete_'+id).html('');
			   }
			   Utils.bindFormatOnTextfield('txt_'+id,Utils._TF_NUMBER,null);
			   $('#txt_'+id).attr('disabled','disabled'); 
//		   }
	},
	openCustomerShopQuantityDialog:function(shopCode){
		$('#errExcelMsg').html('').hide();
		var promotionShopMap = $('#promotionShopMap').val();
		var shopId = $('#shopMapId').val();
		var arrayParam = new Array();
		var param = new Object();
		param.name = 'promotionShopMapId';
		param.value = promotionShopMap;
		arrayParam.push(param);
		
		param = new Object();
		param.name = 'shopId';
		param.value = shopId;
		arrayParam.push(param);
		CommonSearch.openSearchStyleCustomerShopEasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label+"("+shopCode+")", "/catalog/promotion/searchcustomershoppopup", null,
				"customerCode", "customerName", arrayParam, null,SuperviseManageRouteCreate_customerAddress, 'address');
		return false;
	},
	updateCustomerQuantity:function(id,shopId,promotionId,quantity,quantityKM){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.id = id;
		params.quantityMax = quantity;
		var statusPermission = $('#statusPermission').val();
		if(quantity != null && quantity != undefined && quantity != ""){
			if(quantityKM > quantity){
	 			setTimeout(function(){
						$('#errMsgCustomer').html(PromotionCatalog_rangeSoSuat).show();
	    		},1000);
	 			return false;
	 		}
		}
		Utils.addOrSaveData(params, '/catalog/promotion/updatecustomershop', null, 'errMsgCustomer', function(data){
			if(data.error == null || data.error == undefined){
				PromotionCatalog.searchCustomerShopMap(promotionId,shopId,data.shopCode);
				$('#successMsg').html('').hide();
				$('#successMsgCustomer').html(msgCommon1).show();
				var tm = setTimeout(function(){
					$('#successMsgCustomer').html('').hide();
					clearTimeout(tm); 
				}, 3000);
				$('#txt_'+shopId).attr('disabled','disabled');
				$('#link_'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantity+');">');
				//$('#linkesc'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg" onclick="return PromotionCatalog.searchCustomerShopMap('+promotionId+','+shopId+',\''+data.shopCode+'\');">');
				if(statusPermission == 2){
					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png" onclick="return PromotionCatalog.deleteCustomer('+id+','+shopId+','+promotionId+');">');
				}
				if(statusPermission == 1){
					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png">');
				}
				$('#errMsgCustomer').html("").hide();
			}
		}, null, null, null, PromotionCatalog_confirmUpdateClient+" ?", null);
	},
	deleteCustomer:function(id,shopId,promotionId){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.id = id;
		Utils.addOrSaveData(params, '/catalog/promotion/deletecustomershop', null, 'errMsgCustomer', function(data){
			PromotionCatalog.searchCustomerShopMap(promotionId,shopId,data.shopCode);
			$('#errMsgCustomer').html("").hide();
			$('#successMsg').html('').hide();
			$('#successMsgCustomer').html(man_cus_msg_del_suc).show();
			var tm = setTimeout(function(){
				$('#successMsgCustomer').html('').hide();
				clearTimeout(tm); 
			}, 3000);
		}, null, null, null, PromotionCatalog_confirmDeleteClient+" ?", null);
	},
	bindFormatQuantityCustomer:function(id){
		Utils.bindFormatOnTextfieldEx1($(id).attr('id'),Utils._TF_NUMBER,null,'#errMsgSearchCustomer',msgLoi3);
	},
	/*importExcel:function(){
		$('#isView').val(0);
		var options = { 
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,   
		 		success:      ProductLevelCatalog.afterImportExcelUpdate, 
		 		type: "POST",
		 		dataType: 'html',
		 		data:({importExcelType:$('#excelType').val(),id:$('#promotionId').val(),token:$('#token').val().trim()})
		 	}; 
		$('#importFrm').ajaxForm(options);
 		$('#importFrm').submit();
 		return false;
	},	*/
	exportPromotionShopMap:function(){
		$('#divOverlay').show();
		$('#errMsg').html('').hide();
		$('#errExcelMsg').html('').hide();
		var data = new Object();
		var code = $('#shopCode').val();
		var name = $('#shopName').val();
		var quantityMax = $('#quantityMax').val();
		
		data.id =$('#promotionId').val();
		data.shopCode = code;
		data.shopName = name;
		data.quantityMax = quantityMax;
		var url = "/catalog/promotion/exportPromotionShopMap";
		CommonSearch.exportExcelData(data,url);
	},
	importPromotionShopMap:function(){
 		$('#isView').val(0);
 		var options = { 
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,   
		 		success:      ProductLevelCatalog.afterImportExcelUpdate, 
		 		type: "POST",
		 		dataType: 'html',
		 		data:({excelType:2,proType:$('#proType').val(),id:$('#promotionId').val(),token:$('#token').val().trim()})
		 	}; 
		$('#importFrm').ajaxForm(options);
 		$('#importFrm').submit();
 		return false;
 	},
 	//promotioncatalog_Huy
 	afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
		hideLoadingIcon();
		if (statusText == 'success') {				
	    	$("#responseDiv").html(responseText);	
	    	if ($('#responseToken').html().trim() != undefined && $('#responseToken').html().trim() != null && $('#responseToken').html().trim() != ''){
	    		$('#token').val($('#responseToken').html().trim());
	    	}
	    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
	    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
	    	} else {
	    		if($('#typeView').html().trim() == 'false'){
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var mes = format(msgErr_result_import_excel,(totalRow - numFail),numFail);	
	    			//TODO
	    			if(numFail > 0){
//	    				mes+= ' <a href="'+ fileNameFail +'">Xem chi tiết lỗi</a>';
	    				mes=SuperviseManageRouteCreate_duplicateRows+'.'+ ' <a href="'+ fileNameFail +'">'+msgCommon5+'</a>';
	    			}
	    			if($('#excelFileBonus').length!=0 && $('#fakefilepcBonus').length!=0){//xóa link khi import
	    				try{$('#excelFileBonus').val('');$('#fakefilepcBonus').val('');}catch(err){}
	    			}
	    			$('#errExcelMsg').html(mes).show();
	    			if(ProductLevelCatalog._callBackAfterImport != null){
		    			ProductLevelCatalog._callBackAfterImport.call(this);
		    		}
	    		}
	    	}
	    }	
	},
 	exportExcelTTCTKM:function(){
		$.messager.confirm(xacnhan, comuonexport, function(r){
			
			if (r){
				var promotionId = $('#promotionId').val();
//				var params = PromotionCatalog.getParams();
				var params = new Object();
				params.promotionId = promotionId;
				params.checkInOut = '2';
				var url = "/catalog/promotion/export-excel";
				showLoadingIcon();
				ReportsUtils.exportExcel(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
 	},
	
	importExcel: function() {
		ReportsUtils.uploadExcel(function(){
			$('#searchStyleShopGrid').datagrid('reload');
		});
	}
 	
};


