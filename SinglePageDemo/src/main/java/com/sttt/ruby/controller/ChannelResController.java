
package com.sttt.ruby.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.config.ConfigurationPath;
import com.sttt.ruby.util.ItemJsonContants;
import com.viettel.mve.client.request.leaseline.GetSubcriberDetailRequest;
import com.viettel.mve.client.request.leaseline.SearchListSubcriberRequest;
import com.viettel.mve.client.response.leaseline.GetSubcriberDetailResponse;
import com.viettel.mve.client.response.leaseline.SearchListSubcriberResponse;


@RestController
public class ChannelResController {

	public static final String CHAN_LIST = "/leasedLine/searchListSubcriber";
	public static final String CHAN_DETAIL = "/leasedLine/subcriberDetail";
	
	/*
	 * Get list channel
	*/	
	@PostMapping("/channel/getListChannel")
	public String getListChannel(@RequestBody SearchListSubcriberRequest channelRequest, @RequestParam("draw") int draw, HttpServletRequest request) throws Exception {
		
		// Create URL API
		String url = ConfigurationPath.getDomainAPI(CHAN_LIST);
		
        RestTemplate restTemplate = new RestTemplate();
        
        //Create request header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Add token to header
        HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(ItemJsonContants.TOKEN));
    
		
        HttpEntity<SearchListSubcriberRequest> entity = new HttpEntity<SearchListSubcriberRequest>(channelRequest, headers);
        
     // Call API
        ResponseEntity<SearchListSubcriberResponse> channelResponse = restTemplate.exchange(url, HttpMethod.POST, entity, SearchListSubcriberResponse.class);
		
        channelResponse.getBody().setCurrentPage(draw);
        JSONObject result = new JSONObject(channelResponse.getBody());
        
		return result.toString();
	}
	
	/*
	 * Get channel's detail
	*/	
	@PostMapping("/channel/detail")
	public String getDetailChannel(@RequestBody GetSubcriberDetailRequest channelRequest, HttpServletRequest request) throws Exception {
		
		// Create URL API
		String url = ConfigurationPath.getDomainAPI(CHAN_DETAIL);
		
        RestTemplate restTemplate = new RestTemplate();
        
        //Create request header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Add token to header
        HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(ItemJsonContants.TOKEN));
    
        HttpEntity<GetSubcriberDetailRequest> entity = new HttpEntity<GetSubcriberDetailRequest>(channelRequest, headers);
        
        // Call API
        ResponseEntity<GetSubcriberDetailResponse> channelResponse = restTemplate.exchange(url, HttpMethod.POST, entity, GetSubcriberDetailResponse.class);
		
        JSONObject result = new JSONObject(channelResponse.getBody());
        
		return result.toString();
	}
	
}
