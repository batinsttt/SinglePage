/**
   Quan ly danh muc nhan vien
 * @author tientv11
 * @sine 05/05/2014
 */
var Staff = {
	_xhrSave : null,
	_staffSearch:new Object(),
	searchStaff: function(){
		$('#errMsg').html('').hide();
		Staff._staffSearch.staffCode= $('#staffCode').val().trim();
		Staff._staffSearch.staffName= $('#staffName').val().trim();
		Staff._staffSearch.status= $('#status').val().trim();
		$('#gridStaff').datagrid('load',Staff._staffSearch);
		return false;
	},
	importExcel: function () {
        $('#importFrm').attr("action","/catalog/staff/import-excel?token="+$('#token').val());
        $('#importFrm').submit();
        return false;
    },
	saveOrUpdate:function(){
		var msg = '';
		$('#errMsg').hide();
		msg = ValidateUtils.getMessageOfRequireCheck('staffCode', jspKho_MaNV);
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffCode', jspKho_MaNV, Utils._CODE);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('staffName', jspKho_TenNV);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffName', jspKho_TenNV, Utils._NAME);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('gender', Staff_gender, true);
		}
		var startDate = $('#startDate').val().trim();
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfInvalidFormatDate('startDate', 'Ngày bắt đầu làm việc');
		}
		
		var s = $('#education').val().trim();
		if (msg.length == 0 && s.length > 50) {
			msg = 'Trình độ chỉ được nhập tối đa 50 ký tự';
			$('#education').focus();
		}
		
		var cmnd = $('#idNo').val().trim();
		if (cmnd.length > 0 && msg.length == 0 && !/\d/.test(cmnd)) {
			msg = 'CMND chỉ chứa các giá trị số.';
			$('#idNo').focus();
		}
		if (msg.length == 0 && cmnd.length > 40) {
			msg = 'CMND chỉ được nhập tối đa 40 ký tự';
			$('#idNo').focus();
		}
		var idNoDate = $('#idNoDate').val().trim();
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfInvalidFormatDate('idNoDate', 'Ngày cấp');
		}
		s = $('#idNoPlace').val().trim();
		if (msg.length == 0 && s.length > 250) {
			msg = 'Nơi cấp chỉ được nhập tối đa 250 ký tự';
			$('#idNoPlace').focus();
		}
		s = $('#position').val().trim();
		if (msg.length == 0 && s.length > 50) {
			msg = 'Vị trí chức danh chỉ được nhập tối đa 50 ký tự';
			$('#position').focus();
		}
		
		s = $('#houseNumber').val().trim();
		if (msg.length == 0 && s.length > 50) {
			msg = 'Số nhà chỉ được nhập tối đa 50 ký tự';
			$('#houseNumber').focus();
		}
		
		s = $('#street').val().trim();
		if (msg.length == 0 && s.length > 100) {
			msg = 'Nơi cấp chỉ được nhập tối đa 100 ký tự';
			$('#street').focus();
		}
		
		// dia ban
		var tr = $('#area').combotree('tree');
		var n = tr.tree('getSelected');
		if (msg.length == 0 && n == null) {
			msg = 'Bạn chưa chọn giá trị cho trường Địa bàn';
		}
		if (msg.length == 0 && n.attributes.area.type != 'WARD') {
			msg = 'Địa bàn phải chọn đến cấp phường/xã';
		}
		var mobi = $('#mobilePhone').val().trim();
		if (mobi.length > 0 && msg.length == 0 && !/\d/.test(mobi)) {
			msg = 'Số di động chỉ chứa các giá trị số.';
			$('#mobilePhone').focus();
		}
		if (msg.length == 0 && mobi.length > 20) {
			msg = 'Số di động chỉ được nhập tối đa 20 ký tự';
			$('#mobilePhone').focus();
		}
		var phone = $('#phone').val().trim();
		if (phone.length > 0 && msg.length == 0 && !/\d/.test(phone)) {
			msg = 'Số cố định chỉ chứa các giá trị số.';
			$('#phone').focus();
		}
		if (msg.length == 0 && phone.length > 20) {
			msg = 'Số cố định chỉ được nhập tối đa 20 ký tự';
			$('#phone').focus();
		}
		// email
		var email = $('#email').val().trim();
		if (email.length > 0 && msg.length == 0) {
			msg = ValidateUtils.getMessageOfInvalidEmailFormat('email', 'Email');
		}
		if (msg.length == 0 && email.length > 50) {
			msg = 'Số cố định chỉ được nhập tối đa 50 ký tự';
			$('#email').focus();
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('staffType', 'Chức vụ', true);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('status', msgTrangThai, true);
		}
		
		if (msg.length > 0) {
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.id = $('#staffId').val().trim();
		var staffCode = $('#staffCode').val().trim();
		dataModel.staffCode = staffCode;
		dataModel.staffName = $('#staffName').val().trim();
		dataModel.gender = $('#gender').val().trim();
		dataModel.startWorkingDate = startDate;
		dataModel.education = $('#education').val().trim();
		dataModel.idNumber = cmnd;
		dataModel.idNoDate = idNoDate;
		dataModel.idNoPlace = $('#idNoPlace').val().trim();
		dataModel.position = $('#position').val().trim();
		dataModel.houseNumber = $('#houseNumber').val().trim();
		dataModel.street = $('#street').val().trim();
		dataModel.areaId = n.id;
		dataModel.mobilePhone = mobi;
		dataModel.phone = phone;
		dataModel.email = email;
		dataModel.staffType = $('#staffType').val().trim();
		dataModel.status = $('#status').val().trim();
		$.messager.confirm(msgXacNhan, 'Bạn có muốn lưu thông tin nhân viên?', function(r){
			if (r) {
				Utils.saveData(dataModel, '/catalog/staff/save-or-update', Staff._xhrSave, 'errMsg',
					function(data) {
						if (!data.error) {
							$('#staffCode').attr('disabled', 'disabled');
							$('#staffCode').val(staffCode.toUpperCase());
							$('#staffName').focus();
							history.pushState('', '', '/catalog/distributor/staff/detail?id=' + data.id);
							$('#staffId').val(data.id);
							$('#sucMsg').html(msgCommon1).show();
							setTimeout(function() {$('#sucMsg').hide();}, 3000);
						}
				}, 'loading2', '');
			}
		});
		return false;
	}
};