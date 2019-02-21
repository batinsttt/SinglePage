
package com.sttt.ruby.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CallAjaxController {

	/*
	 * Demo web service
	*/	
	@PostMapping("/service/call")
	public String callWebservice(@RequestBody String address) throws Exception {
		String uri ="http://10.30.176.198:9006/ITSolWebService/sales/edit";
		Map<String, String> variables = new HashMap<String, String>(3);
        variables.put("address", address);
        variables.put("id", "10000009");
        RestTemplate restTemplate = new RestTemplate();
        String json =  restTemplate.getForObject(uri, String.class, variables);
		System.out.println(json);
		
		return json;
	}
	
}
