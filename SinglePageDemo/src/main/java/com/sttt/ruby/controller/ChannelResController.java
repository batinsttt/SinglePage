
package com.sttt.ruby.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sttt.ruby.service.ChannelService;
import com.viettel.mve.client.request.leaseline.GetSubcriberDetailRequest;
import com.viettel.mve.client.request.leaseline.SearchListSubcriberRequest;


@RestController
public class ChannelResController {
	
	@Autowired
	ChannelService channelService;

	/*
	 * Get list channel
	*/	
	@PostMapping("/channel/getListChannel")
	public String getListChannel(@RequestBody SearchListSubcriberRequest channelRequest, @RequestParam("draw") int draw, HttpServletRequest request) throws Exception {
		
		// Get json by API
		String resultJson = channelService.getListChannelJson(channelRequest, request, draw);
        
		return resultJson;
	}
	
	/*
	 * Get channel's detail
	*/	
	@PostMapping("/channel/detail")
	public String getDetailChannel(@RequestBody GetSubcriberDetailRequest channelRequest, HttpServletRequest request) throws Exception {
		
		// Get json by API
		String resultJson = channelService.getDetailChannelJson(channelRequest, request);
		        
		return resultJson;
	}
	
}
