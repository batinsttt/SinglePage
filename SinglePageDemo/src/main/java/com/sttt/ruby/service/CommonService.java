package com.sttt.ruby.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

@Service
public class CommonService {

	/**
	 * @param request
	 * @return HttpHeaders
	 */
	public HttpHeaders getHeaders(HttpServletRequest request) {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// Add token to header
		HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(HttpHeaders.AUTHORIZATION));

		return headers;
	}
	
}
