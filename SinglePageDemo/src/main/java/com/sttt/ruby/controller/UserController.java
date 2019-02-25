package com.sttt.ruby.controller;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sttt.ruby.util.DateUtil;

@Controller
public class UserController {
	/*
	 * Use's master page
	*/	
	@RequestMapping(value = { "/", "/user" }, method = RequestMethod.GET)
	public String userMasterPage(Model model) {
		model.addAttribute("dates", DateUtil.toDateString(new Date(), "MM/dd/yyyy"));
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
	@RequestMapping(value = "/ticket/create", method = RequestMethod.GET)
	public String userCreateTicket() {
		return "user/ticket/createTicket";
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
		model.addAttribute("dates", DateUtil.toDateString(new Date(), "MM/dd/yyyy"));
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
	 * Notice error
	*/	
	@RequestMapping(value = "/service/noticeError", method = RequestMethod.GET)
	public String userServiceError(Model model) {
		return "user/service/noticeError";
	}

	/*
	 * Add new row
	*/	
	@RequestMapping(value = "/service/addNewUser", method = RequestMethod.GET)
	public String addNewUser(Model model) {
		return "user/service/addNewUser";
	}
	/*
     * Validate form
    */  
   @RequestMapping(value = "/quocDemo", method = RequestMethod.GET)
    public String userValidate(Model model) {
        return "user/service/validateTemplate";
    }
}
