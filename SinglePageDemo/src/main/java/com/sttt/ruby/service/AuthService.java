package com.sttt.ruby.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.exception.BusinessException;
import com.sttt.ruby.util.UriGateWay;
import com.viettel.mve.client.request.auth.ChangePasswordRequest;
import com.viettel.mve.client.request.auth.LoginRequest;
import com.viettel.mve.client.response.BaseResponse;
import com.viettel.mve.client.response.auth.LoginResponse;

@Service
public class AuthService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private HttpHeaders headers;

	@Autowired
	private CommonService commonService;
	
	public LoginResponse login(LoginRequest loginRequest) throws BusinessException{
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<LoginRequest> entityLogin = new HttpEntity<LoginRequest>(loginRequest, headers);
		LoginResponse loginResponse = restTemplate.postForObject(UriGateWay.LOGIN, entityLogin, LoginResponse.class);
		return loginResponse;
	}

	public BaseResponse changePass(ChangePasswordRequest changePassRequest,
			HttpServletRequest request) throws BusinessException {
		headers = commonService.getHeaders(request);
		HttpEntity<ChangePasswordRequest> entityChangePass = new HttpEntity<ChangePasswordRequest>(changePassRequest, headers);
		BaseResponse baseResponse = restTemplate.postForObject(UriGateWay.ACCOUNT_CHANGEPASS, entityChangePass, BaseResponse.class);
		return baseResponse;
	}
	
	
}
