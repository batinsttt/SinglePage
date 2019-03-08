
package com.sttt.ruby.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sttt.ruby.bean.ErrorResponse;
import com.sttt.ruby.config.ConfigurationPath;
import com.sttt.ruby.exception.BusinessException;
import com.sttt.ruby.service.AuthService;
import com.viettel.mve.client.constant.RoleDefine;
import com.viettel.mve.client.request.auth.ChangePasswordRequest;
import com.viettel.mve.client.request.auth.LoginRequest;
import com.viettel.mve.client.response.BaseResponse;
import com.viettel.mve.client.response.auth.LoginResponse;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class AccountResController {

	private static final String ADMIN_MASTERPAGE = "admin/adminMasterPage";
	private static final String USER_MASTERPAGE = "user/userMasterPage";
	private static final String ACCOUNT_LOGIN = "account/login";
	private static final String ERRORS_COUNT = "errorsCount";
	private static final String CAPTCHA_LOGIN_KEY = "login";
	private static final String CAPTCHA_CHANGE_PASS_KEY = "changePass";
	private static final int ERROR_CODE_CAPTCHA = 5000;

	@Autowired
	AuthService authService;

	/**
	 * Call login API for get user information and put to session
	 * @param loginRequest Login request information
	 * @param request Request
	 * @param response Response
	 * @param model Model
	 * @return Path of screens
	 * @throws Exception 
	 */
	@RequestMapping(value = "/account/login", method = RequestMethod.POST)
	public String loginAction(@RequestParam String username, @RequestParam String password,
			@RequestParam String captcha, HttpServletRequest request,
			Model model) throws Exception {

		LoginResponse loginResponse = null;
		HttpSession session = request.getSession();

		// Check input value of captcha
		String captchaSession = (String) session.getAttribute(CAPTCHA_LOGIN_KEY);
		if (captchaSession != null && !captchaSession.equals(captcha)) {
			ErrorResponse loginErrorResponse = new ErrorResponse();
			loginErrorResponse.setErrorCode(ERROR_CODE_CAPTCHA);
			loginErrorResponse.setErrorsCountOverLimit(true);
			return convertToJson(loginErrorResponse);
		}

		LoginRequest loginRequest = new LoginRequest();
		loginRequest.setUsername(username);
		loginRequest.setPassword(password);
		loginResponse = authService.login(loginRequest);

		// Check login user information
		if (loginResponse == null) {
			throw new BusinessException();
		}

		// User information is not exist
		if (loginResponse.getUser() == null) {
			// Check errors count
			boolean isErrorsCountOverLimit = getErrorsCount(request, false);
			ErrorResponse loginErrorResponse = new ErrorResponse();
			BeanUtils.copyProperties(loginErrorResponse, loginResponse);
			loginErrorResponse.setErrorsCountOverLimit(isErrorsCountOverLimit);

			return convertToJson(loginErrorResponse);
		}

		// Get roles list
		List<String> roles = loginResponse.getUser().getRoles();
		// Check roles list
		if (roles == null) {
			return convertToJson(ACCOUNT_LOGIN);
		}

		// Set login user information into session
		session.setAttribute("user",loginResponse);
		// Get token type
		String tokenType = loginResponse.getAuth().getTokenType();
		// Get token value
		String token = loginResponse.getAuth().getToken();
		// Append token type and token value
		String authorizationToken = tokenType.concat(token);
		// Set authorization token to session
		session.setAttribute(HttpHeaders.AUTHORIZATION, authorizationToken);

		// Kill error count session
		if (request.isRequestedSessionIdValid() && session != null) {
			session.removeAttribute(ERRORS_COUNT);
			session.removeAttribute(CAPTCHA_LOGIN_KEY);
		}

		// Check role of user
		if (roles.contains(RoleDefine.SystemRole.SYS_ADMIN.getCode())) {
			return convertToJson(ADMIN_MASTERPAGE);
		} else {
			return convertToJson(USER_MASTERPAGE);
		}
	}

	@RequestMapping(value = "/account/changePass", method = RequestMethod.POST)
	public String changePassAction(@RequestParam String oldPass, @RequestParam String newPass,
			@RequestParam String captchaChangePass, HttpServletRequest request) throws Exception {

		BaseResponse baseResponse = null;

		HttpSession session = request.getSession();
		// Check input value of change pass captcha
		String captchaSession = (String) session.getAttribute(CAPTCHA_CHANGE_PASS_KEY);
		if (captchaSession != null && !captchaSession.equals(captchaChangePass)) {
			ErrorResponse errorChangePassResponse = new ErrorResponse();
			errorChangePassResponse.setErrorCode(ERROR_CODE_CAPTCHA);
			session.removeAttribute(CAPTCHA_CHANGE_PASS_KEY);
			return convertToJson(errorChangePassResponse);
		}
		
		ChangePasswordRequest changePassRequest = new ChangePasswordRequest();
		changePassRequest.setOldPassword(oldPass);
		changePassRequest.setNewPassword(newPass);
		baseResponse = authService.changePass(changePassRequest, request);

		// Check login user information
		if (baseResponse == null) {
			throw new BusinessException();
		}

		return convertToJson(baseResponse);
	}

	/**
	 * Convert string to JSON
	 * @param userMasterpage user master page path
	 * @return JSON string
	 */
	private String convertToJson(Object object) {
		Gson gson = new GsonBuilder().serializeNulls().create();
		String json = gson.toJson(object);
		return json;
	}

	/**
	 * Check over errors count limit
	 * @param isLoadPage Is load page ?
	 * @param request Request
	 * @return Is over errors count limit ?
	 */
	@PostMapping("/account/countErrors")
	public boolean isErrorsCountOverLimit(@RequestParam boolean isLoadPage,HttpServletRequest request) {
		return getErrorsCount(request, isLoadPage);
	}

	/**
	 * Check errors count
	 * @param request Request
	 * @param isLoadPage Is load page ?
	 * @return Is over errors count limit ?
	 */
	private boolean getErrorsCount(HttpServletRequest request, boolean isLoadPage) {
		
		// Get session from request
		HttpSession session = request.getSession();
		Integer errorsCountSession = (Integer) session.getAttribute(ERRORS_COUNT);
		
		if (isLoadPage) {
			// Compare value of current errors count and errors count limit
			if (errorsCountSession != null
					&& errorsCountSession >= ConfigurationPath.getErrorsCountLimit()) {
				return true;
			} else {
				return false;
			}
		}

		int errorsCount;
		// Check errors count in session
		if (errorsCountSession != null) {
			errorsCount = errorsCountSession + 1;
		} else {
			errorsCount = 1;
		}
		// Set new errors count to session
		session.setAttribute(ERRORS_COUNT, errorsCount);

		// Compare value of current errors count and errors count limit
		if (errorsCount >= ConfigurationPath.getErrorsCountLimit()) {
			return true;
		}
		return false;
	}

	/**
	 * Check session to ajax
	 * @param request Request
	 * @param response Response
	 * @return true/false
	 */
	@PostMapping(value = "/checkSessionToAjax")
	public boolean checkSessionToAjax(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		if (session.getAttribute("user") == null) {
			return true;
		}
		return false;
	}

}
