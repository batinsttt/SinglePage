
package com.sttt.ruby.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class AccountController {

	/*
	 * Demo Post sample
	*/	
	@PostMapping("/service/call")
	public String callWebservice(@RequestBody String requestBody) throws Exception {
		String uri ="http://10.60.156.63:8762/gateway/customerManager/enterpriseInfor";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGRzFGN19BRE1JTiIsImF1dGhzIjpbIlJPTEVfTEVBU0VEX0xJTkVfVVNFUiIsIlJPTEVfRlRUUF9VU0VSIl0sInVpZCI6IjYiLCJjaWQiOiI2IiwiaWF0IjoxNTUwNzE5MDQyLCJleHAiOjE1NTA3MjA0ODJ9.FVhVHkbjYYX0dqT07rptWngAX9IIpwpymoWxpsNf1Exy_PbCSFhygmsyTJp_YKWWvV6S1NPIP2xAodSIAQusaw");
        
        HttpEntity<String> entity = new HttpEntity<String>(requestBody,headers);
        String json = restTemplate.postForObject(uri, entity, String.class);
        
		System.out.println(json);
		
		return json;
	}
	
}
