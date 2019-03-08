package com.sttt.ruby.service;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.util.UriGateWay;
import com.viettel.mve.client.request.leaselineticket.SearchListTicketRequest;
import com.viettel.mve.client.request.problem.RatingTicketRequest;
import com.viettel.mve.client.response.BaseResponse;
import com.viettel.mve.client.response.leaselineticket.SearchListTicketResponse;

@Service
public class TicketService {
	
	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private CommonService commonService;
	
	
	public String getListTicket(HttpServletRequest request,Integer draw) {
		
		HttpHeaders headers = commonService.getHeaders(request);

		HttpEntity<String> entity = new HttpEntity<String>(headers);
		
		ResponseEntity<SearchListTicketResponse> searchListTicket = restTemplate.exchange(UriGateWay.LOCAL_TICKET_LISTTICKETS, HttpMethod.GET, entity, SearchListTicketResponse.class);
		
		searchListTicket.getBody().setCurrentPage(draw);
		
		JSONObject result = new JSONObject(searchListTicket.getBody());

		return result.toString();
		
	}


	public String getListTicketPaging(HttpServletRequest request, SearchListTicketRequest ticketRequest, Integer draw) {
		
		HttpHeaders headers = commonService.getHeaders(request);

		HttpEntity<SearchListTicketRequest> entity = new HttpEntity<SearchListTicketRequest>(ticketRequest, headers);
		
		ResponseEntity<SearchListTicketResponse> searchListTicket = restTemplate.exchange(UriGateWay.LOCAL_TICKET_LISTTICKETS, HttpMethod.POST, entity, SearchListTicketResponse.class);
		
		searchListTicket.getBody().setCurrentPage(draw);
		
		searchListTicket.getBody().setTotalRow(2);
		
		JSONObject result = new JSONObject(searchListTicket.getBody());

		return result.toString();
	}
	
	public String sendRatingTicket(HttpServletRequest request, RatingTicketRequest ratingTicketRequest) {
		HttpHeaders headers = commonService.getHeaders(request);

		HttpEntity<RatingTicketRequest> entity = new HttpEntity<RatingTicketRequest>(ratingTicketRequest, headers);
		
		ResponseEntity<BaseResponse> ratingTicketResponse = restTemplate.exchange(UriGateWay.TICKET_RATINGTICKET, HttpMethod.GET, entity, BaseResponse.class);
		
		JSONObject result = new JSONObject(ratingTicketResponse.getBody());

		return result.toString();
	}
	
}
