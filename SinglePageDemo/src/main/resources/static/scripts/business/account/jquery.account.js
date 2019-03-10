/**
 * Processing user's service
 * @author IT_SOL
 * @sine 26/02/2019
 */
var Account = {
	_countType: null,
	_isShowDlg: false,
	_loading: true,
	isSubmitLogin : null,
	
	documentReady: function() {

		if(!$('#loginModal').is(":visible")) {
			Account.countErrorsAjax(true);
		}

		// Move to new tab
		$("#logoId").click(function(){		  
		  window.open("https://solutions.viettel.vn/", '_blank');
		});

		$("ul li a").click(function() {
			if($("ul #dangNhap").hasClass('active')){
    			$('#changeContent1').text(loginChangeBoxDN1);
    			$('#changeContent2').text(loginChangeBoxDN2);
    		}
    		if($("ul #giaiPhap").hasClass('active')){
    			$('#changeContent1').text(loginChangeBoxGP1);
    			$('#changeContent2').text(loginChangeBoxGP2);
    		}
	    });

		var e = $("#validationFormLogin"),
        r = $(".alert-danger", e),
        i = $(".alert-success", e);

        e.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: !1,
            rules: {
	            username: "required",
                password: "required",
                maXacNhan: "required"
            },
            messages: {
            	username: {
            		required: jQuery.validator.format(usernameRequired)
                },
                password: {
                	required: jQuery.validator.format(passwordRequired)
                },
                maXacNhan: {
                	required: jQuery.validator.format(captchaRequired)
                }
            },
            invalidHandler: function(event, validator) {
            	Account.countErrorsAjax(false);
            },
            submitHandler: function(form) {
            	Account.isSubmitLogin = Ladda.create(document.querySelector('#loginSubmit'));
            	Account.isSubmitLogin.start();
                Account.getAjax();
            },
            highlight: function(e) {
                $(e).closest(".form-group").addClass("has-error")
            },
            unhighlight: function(e) {
                $(e).closest(".form-group").removeClass("has-error")
            }
        });
	},

    countErrorsAjax: function(isLoadPage) {
		var url = '/account/countErrors';
		var method = "POST";
		var params = new Object();
    	params.isLoadPage = isLoadPage;
		$.ajax({
			type : method,
			url : url,
			data: (params),
			success : function(data) {
				Account.displayCaptchaBlock(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {}
		});
    },

    getAjax: function() {
    	var params = new Object();
    	params.username = $("#username").val().trim();
    	params.password = $("#password").val().trim();
    	params.captcha = $("#maXacNhan").val().trim();
		var url = '/account/login'
		var method = "POST";

		$.ajax({
			type : method,
			url : url,
			data : (params),
			dataType : "json",
			success : function(data) {
				Account.isSubmitLogin.stop();
				Account.displayCaptchaBlock(data.isErrorsCountOverLimit);

				if (typeof data.errorCode != 'undefined') {
                    if (data.errorCode == 5000) {
						var span = $('<span id="maXacNhan-error" class="help-block help-block-error">'+captchaInvalid+'</span>');
						$("#captchaBlockChild").prepend(span);
						$("#captchaBlockChild").addClass("has-error");
						$('#maXacNhan').attr('aria-describedby', 'maXacNhan-error');
						$('#maXacNhan').attr('aria-invalid', 'true');
						$("#maXacNhan").focus();
					} else if (data.errorCode != 200) {
						$("#username").focus();
						$("#loginError").css({ display: "block" }).text(data.message);
					}
					$("#maXacNhan").val("");
				} else {
					if($('#loginModal').is(":visible")) {
						$('#loginModal').modal('hide');
					} else {
						window.location.href = "../../#/" + data
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				Account.isSubmitLogin.stop();
			}
		});
    },

    displayCaptchaBlock: function(isCheck) {
    	if (isCheck === true) {
    		CommonUtils.createCaptcha("captcha", "login");
    		$("#capchaBlock").css({ display: "block" });
        }
    },

    documentReadyChangePass: function() {

    	$("#titlePage").text('Đổi mật khẩu');
    	CommonUtils.createCaptcha("captchaImgChangePass", "changePass");

		var e = $("#validationFormChangePass"),
        r = $(".alert-danger", e),
        i = $(".alert-success", e);

        e.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: !1,
            rules: {
            	oldPass: "required",
            	newPass: {
            	      required: true,
            	      minlength: 6,
            	      maxlength: 128
            	},
            	repeatPass: {
          	      required: true,
          	      equalTo: "#newPass"
        	},
            	captchaChangePass: "required"
            },
            messages: {
            	oldPass: {
            		required: jQuery.validator.format(oldPasswordRequired)
                },
                newPass: {
                	required: jQuery.validator.format(newPasswordRequired),
                	minlength: jQuery.validator.format(newPasswordLengthError),
                	maxlength: jQuery.validator.format(newPasswordLengthError)
                },
                repeatPass: {
                	required: jQuery.validator.format(repeatPasswordRequired),
                	equalTo: jQuery.validator.format(repeatPasswordNotEqual)
                },
                captchaChangePass: {
                	required: jQuery.validator.format(captchaRequired)
                }
            },
            invalidHandler: function(event, validator) {
            	
            },
            submitHandler: function(form) {
            	Account.changePassAjax();
            },
            highlight: function(e) {
                $(e).closest(".form-group").addClass("has-error")
            },
            unhighlight: function(e) {
                $(e).closest(".form-group").removeClass("has-error")
            }
        });
	},
	
	changePassAjax: function() {
		var l = Ladda.create(document.querySelector('#changePassButton'));
		l.start();
    	var params = new Object();
    	params.oldPass = $("#oldPass").val().trim();
    	params.newPass = $("#newPass").val().trim();
    	params.captchaChangePass = $("#captchaChangePass").val().trim();
		var url = '/account/changePass'
		var method = "POST";

		$.ajax({
			type : method,
			url : url,
			data : (params),
			dataType : "json",
			success : function(data) {
				
				if (data.errorCode == 200) {
					CommonUtils.resetElementsValue("validationFormChangePass");
					CommonUtils.createCaptcha("captchaImgChangePass", "changePass");
					CommonUtils.notificationModalDisplay(data.message);
				} else {
					if (data.errorCode == 5000) {
						var span = $('<span id="maXacNhan-error" class="help-block help-block-error">'+captchaInvalid+'</span>');
						$("#capchaBlockChangePassChild").prepend(span);
						$("#capchaBlockChangePassChild").addClass("has-error");
						$('#captchaChangePass').attr('aria-describedby', 'maXacNhan-error');
						$('#captchaChangePass').attr('aria-invalid', 'true');
						$('#captchaChangePass').focus();
					} else {
						$("#oldPass").focus();
						CommonUtils.showAPIErrorMessage(data.message);
					}
					CommonUtils.createCaptcha("captchaImgChangePass", "changePass");
					$('#captchaChangePass').val("");
					$('#captchaChangePass').removeClass("edited");
				}
				
				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {}
		}).always(function(dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
            setTimeout(function() {
                l.stop();
            }, 300);
        });
    },
	
};