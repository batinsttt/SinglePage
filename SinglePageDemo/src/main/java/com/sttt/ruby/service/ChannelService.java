package com.sttt.ruby.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.util.ItemJsonContants;
import com.sttt.ruby.util.UriGateWay;
import com.viettel.mve.client.request.leaseline.GetSubcriberDetailRequest;
import com.viettel.mve.client.request.leaseline.SearchListSubcriberRequest;
import com.viettel.mve.client.response.leaseline.GetSubcriberDetailResponse;
import com.viettel.mve.client.response.leaseline.SearchListSubcriberResponse;

import exception.BusinessException;

@Service
public class ChannelService {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private HttpHeaders headers;

	/**
	 * @param channelRequest
	 * @param request
	 * @param draw
	 * @return json
	 * @throws BusinessException
	 */
	public String getListChannelJson(SearchListSubcriberRequest channelRequest, HttpServletRequest request, int draw)
			throws BusinessException {

		headers.setContentType(MediaType.APPLICATION_JSON);

		// Add token to header
		HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(ItemJsonContants.TOKEN));

		HttpEntity<SearchListSubcriberRequest> entity = new HttpEntity<SearchListSubcriberRequest>(channelRequest, headers);

		// Call API
		ResponseEntity<SearchListSubcriberResponse> channelResponse = restTemplate.exchange(UriGateWay.CHAN_LIST,
				HttpMethod.POST, entity, SearchListSubcriberResponse.class);

		channelResponse.getBody().setCurrentPage(draw);
		JSONObject result = new JSONObject(channelResponse.getBody());

		return result.toString();
	}
	
	public String getDetailChannelJson(GetSubcriberDetailRequest channelRequest, HttpServletRequest request)
			throws BusinessException {

		headers.setContentType(MediaType.APPLICATION_JSON);

		// Add token to header
		HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(ItemJsonContants.TOKEN));

		HttpEntity<GetSubcriberDetailRequest> entity = new HttpEntity<GetSubcriberDetailRequest>(channelRequest, headers);

		// Call API
		ResponseEntity<GetSubcriberDetailResponse> channelResponse = restTemplate.exchange(UriGateWay.CHAN_LIST,
				HttpMethod.POST, entity, GetSubcriberDetailResponse.class);

		JSONObject result = new JSONObject(channelResponse.getBody());

		return result.toString();
	}

}
