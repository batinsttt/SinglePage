package com.sttt.ruby.controller;

import java.security.Principal;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.security.core.Authentication;

import com.sttt.ruby.util.WebUtils;

@Controller
public class MainController {

	@RequestMapping(value ="/welcome", method = RequestMethod.GET)
	public String welcomePage(Model model) {
		model.addAttribute("title", "Welcome");
		model.addAttribute("message", "This is welcome!");
		return "welcomePage";
	}

	/*
	 * Use's master page
	*/	
	@RequestMapping(value = { "/", "/user" }, method = RequestMethod.GET)
	public String userMasterPage(Model model) {
		return "user/userMasterPage";
	}
	
	/*
	 * Use's home
	*/	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String userHome(Model model) {
		return "user/home";
	}
	
	/*
	 * Use's service channel
	*/	
	@RequestMapping(value = "/service/channel", method = RequestMethod.GET)
	public String userServiceChannel(Model model) {
		return "user/service/channel";
	}
	
	/*
	 * Use's service Tracking
	*/	
	@RequestMapping(value = "/service/tracking", method = RequestMethod.GET)
	public String userServiceTracking(Model model) {
		return "user/service/tracking";
	}
	
	/*
	 * Use's sales edit
	*/	
	@RequestMapping(value = "/sales/edit", method = RequestMethod.GET)
	public String userSalesEdit(Model model) {
		return "user/sales/edit";
	}
	
	/*
	 * Use's sales view
	*/	
	@RequestMapping(value = "/sales/view", method = RequestMethod.GET)
	public String userSalesView(Model model) {
		return "user/sales/view";
	}
	
	/*
	 * Use's sales edit
	*/	
	@RequestMapping(value = "/payment/view", method = RequestMethod.GET)
	public String userPaymentView(Model model) {
		return "user/payment/view";
	}
	
	/*
	 * Use's sales view
	*/	
	@RequestMapping(value = "/payment/eidt", method = RequestMethod.GET)
	public String userPaymentEdit(Model model) {
		return "user/payment/edit";
	}
	
	/*
	 * Use's 
	*/	
	@RequestMapping(value = "/tienDemo", method = RequestMethod.GET)
	public String userServiceError(Model model) {
		return "user/service/noticeError";
	}
	
//	/*
//	 * Use's payment
//	*/	
//	@RequestMapping(value = "/payment", method = RequestMethod.GET)
//	public String userPayment(Model model) {
//		return "user/payment/edit";
//	}
	
}
