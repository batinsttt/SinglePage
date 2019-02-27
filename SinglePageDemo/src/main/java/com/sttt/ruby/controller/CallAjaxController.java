
package com.sttt.ruby.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.util.ItemJsonContants;


@RestController
public class CallAjaxController {

	/*
	 * Demo Post sample
	*/	
	@PostMapping("/CallAjax/page")
	public String callWebservice(@RequestBody String requestBody, HttpServletRequest request) throws Exception {
		String uri ="http://10.60.156.63:8762/invoiceManager/searchListInvoices";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(ItemJsonContants.TOKEN));
        HttpEntity<String> entity = new HttpEntity<String>(requestBody,headers);
        String json = restTemplate.postForObject(uri, entity, String.class);
        
		System.out.println(json);
		
		return json;
	}
	
	
	
}
