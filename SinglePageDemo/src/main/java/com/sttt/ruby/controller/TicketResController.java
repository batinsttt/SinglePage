
package com.sttt.ruby.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sttt.ruby.service.TicketService;
import com.viettel.mve.client.request.leaselineticket.SearchListTicketRequest;
import com.viettel.mve.client.request.problem.RatingTicketRequest;


@RestController
public class TicketResController {

	@Autowired
	private TicketService ticketService;
	
	@PostMapping("ticket/listTickets")
	public String getListTichkets(HttpServletRequest request, @RequestBody SearchListTicketRequest ticketRequest,@RequestParam("draw") int draw) {
		return ticketService.getListTicketPaging(request,ticketRequest,draw);
	}
	
	@PostMapping("ticket/ratingTicket")
	public String sendRatingTicket(HttpServletRequest request, @RequestBody RatingTicketRequest ratingTicketRequest) {
		return ticketService.sendRatingTicket(request, ratingTicketRequest);
	}
	
	
}
