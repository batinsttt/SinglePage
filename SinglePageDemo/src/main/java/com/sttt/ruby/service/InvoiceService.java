package com.sttt.ruby.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.exception.BusinessException;
import com.sttt.ruby.util.UriGateWay;

@Service
public class InvoiceService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private HttpHeaders headers;
	
	
}
