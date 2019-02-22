
package com.sttt.ruby.controller;

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


@RestController
public class CustomerResController {

	/*
	 * Demo Post sample
	*/	
	@PostMapping("/service3/call")
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
	
	/*
	 * Demo Get sample
	*/	
	@GetMapping("/service/call")
	public String callGetWebservice() throws Exception {
		String uri ="http://10.60.156.63:8762/gateway/customerManager/enterpriseInfor";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGRzFGN19BRE1JTiIsImF1dGhzIjpbIlJPTEVfTEVBU0VEX0xJTkVfVVNFUiIsIlJPTEVfRlRUUF9VU0VSIl0sInVpZCI6IjYiLCJjaWQiOiI2IiwiaWF0IjoxNTUwNzM4NjI4LCJleHAiOjE1NTA3NDIyMjh9.nHf0H-1xUZI0mrckcscdxbfvhj0b98aYHpPF_TfKOTJbTLU3mntejmHu8ps-B02gnxU56NkJffn0Q9XGKGoXRA");
        
        HttpEntity<String> entity = new HttpEntity<>("", headers);

        ResponseEntity<String> json = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
        
		System.out.println(json.getBody());
		
		return json.getBody();
	}
	
}
