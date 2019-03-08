package com.sttt.ruby.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sttt.ruby.config.ConfigurationPath;
import com.sttt.ruby.util.DateUtil;
import com.viettel.mve.client.response.auth.LoginResponse;

@Controller
public class UserController {
	/*
	 * Use's master page
	*/	
	@RequestMapping(value = { "/", "/user" }, method = RequestMethod.GET)
	public String userMasterPage(Model model) {
		model.addAttribute("dates", DateUtil.toDateString(new Date(), "MM/dd/yyyy"));
		model.addAttribute("sessionTimeOut", ConfigurationPath.getRequestTimeoutMax());
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
	 * Use's home
	*/	
	@RequestMapping(value = "/channelManager", method = RequestMethod.GET)
	public String channelManager() {
		return "user/channel/channelManager";
	}
	/*
     * Service error report
    */  
    @RequestMapping(value = "/problem", method = RequestMethod.GET)
    public String initServiceErroReport() {
        return "user/problem/serviceErrorReportList";
    }
	/*
	 * Use's service channel
	*/	
	@RequestMapping(value = "/ticket/create", method = RequestMethod.GET)
	public String userCreateTicket() {
		return "user/ticket/createTicket";
	}
	@RequestMapping(value = "/ticket/blockOpenChannel", method = RequestMethod.GET)
    public String blockOpenChannel() {
        return "user/ticket/blockOpenChannel";
    }
	@RequestMapping(value = "/ticket/createRequestChangeOther", method = RequestMethod.GET)
	public String userRequestChangeOther() {
		return "user/ticket/requestChangeOther";
	}
	@RequestMapping(value = "/ticket/createRequestChangeOtherDetail", method = RequestMethod.GET)
	public String userRequestChangeOtherDetail() {
		return "user/ticket/requestChangeOtherDetail";
	}
	@RequestMapping(value = "/ticket/tickets", method = RequestMethod.GET)
	public String userGetTicket() {
		return "user/ticket/requestTickets";
	}
	/*
	 * Use's service channel
	*/	
	@RequestMapping(value = "/account/login", method = RequestMethod.GET)
	public String login() {
		return "account/login";
	}
	
	/*
	 * Account reload
	*/	
	@RequestMapping(value = "/reload/login", method = RequestMethod.GET)
	public String reloadLogin() {
		return "account/reloadLogin";
	}

	/*
	 * Change password
	*/	
	@RequestMapping(value = "/account/changePass", method = RequestMethod.GET)
	public String changePass() {
		return "account/changePass";
	}
	
//	======================================== demo ===============
	/*
	 * Use's service channel
	*/	
	@RequestMapping(value = "/service/channel", method = RequestMethod.GET)
	public String userServiceChannel(Model model) {
		return "user/service/channel";
	}
	
	@RequestMapping(value = "/service/createservicehandl", method = RequestMethod.GET)
	public String userCreateServiceHandl(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		LoginResponse loginResponse = (LoginResponse)session.getAttribute("user");
		model.addAttribute("fullName", loginResponse.getUser().getFullName());
		model.addAttribute("phone", loginResponse.getUser().getPhone());
		return "user/service/createServiceHandl";
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
    @RequestMapping(value = "/demo/validate", method = RequestMethod.GET)
    public String demoValidate(Model model) {
        return "user/service/validateTemplate";
    }

    /*
     * Validate form version 2
     */
    @RequestMapping(value = "/demo/form", method = RequestMethod.GET)
    public String demoForm(Model model) {
        return "user/service/formTemplate";
    }
}
