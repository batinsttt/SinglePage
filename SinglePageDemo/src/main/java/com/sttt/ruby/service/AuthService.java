package com.sttt.ruby.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.BusinessException;
import com.sttt.ruby.util.UriGateWay;
import com.viettel.mve.client.request.auth.LoginRequest;
import com.viettel.mve.client.response.auth.LoginResponse;

@Service
public class AuthService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private HttpHeaders headers;
	
	public LoginResponse login(LoginRequest loginRequest) throws BusinessException{
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<LoginRequest> entityLogin = new HttpEntity<LoginRequest>(loginRequest, headers);
		LoginResponse loginResponse = restTemplate.postForObject(UriGateWay.LOGIN, entityLogin, LoginResponse.class);
		return loginResponse;
	}
	
	
}
