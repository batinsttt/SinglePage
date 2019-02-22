
package com.sttt.ruby.controller;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sttt.ruby.util.DateUtil;

@Controller
public class AdminController {

	   /* ==================================== admin page
		 * Admin's master page
		*/	
		@RequestMapping(value = "/admin", method = RequestMethod.GET)
		public String adminMasterPage(Model model) {
			model.addAttribute("dates", DateUtil.toDateString(new Date(), "MM/dd/yyyy"));
			return "admin/adminMasterPage";
		}
		
}
