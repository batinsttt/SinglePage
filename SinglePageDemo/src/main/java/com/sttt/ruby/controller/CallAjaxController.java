
package com.sttt.ruby.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class CallAjaxController {

	/*
	 * Demo Post service
	*/	
	@PostMapping("/service/call")
	public String callWebservice(@RequestBody String requestBody) throws Exception {
		String uri ="http://10.30.176.198:9006/ITSolWebService/sales/edit";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(requestBody,headers);
        String json = restTemplate.postForObject(uri, entity, String.class);
        
		System.out.println(json);
		
		return json;
	}
	
}
