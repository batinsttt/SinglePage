
package com.sttt.ruby.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.config.ConfigurationPath;
import com.sttt.ruby.service.AuthService;
import com.viettel.mve.client.constant.RoleDefine;
import com.viettel.mve.client.request.auth.LoginRequest;
import com.viettel.mve.client.response.auth.LoginResponse;

import exception.BusinessException;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MainController {

	@Autowired
	AuthService authService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String userSalesEdit(@ModelAttribute LoginRequest loginRequest,HttpServletRequest request, HttpServletResponse response,Model model) {
		LoginResponse loginResponse = null;
		try {
			loginResponse = authService.login(loginRequest);
			if(loginResponse != null) {
				List<String> roles = loginResponse.getUser().getRoles();
				HttpSession session = request.getSession();
				session.setAttribute("user",loginResponse);
				if (roles.contains(RoleDefine.SystemRole.SYS_ADMIN.getCode())) {
					return "user/adminMasterPage";
				} else if (roles.contains(RoleDefine.SystemRole.ENTERPRISE_ADMIN.getCode())) {
					return "user/userMasterPage";
				} else if (roles.contains(RoleDefine.SystemRole.ENTERPRISE_REPORT.getCode())) {
					return "login";
				} else {
					return "login";
				}
			} else {
				throw new BusinessException();
			}
			
		} catch(NullPointerException ex) {
			model.addAttribute("message", loginResponse.getMessage());
			return "login";
		}
		catch( BusinessException ex) {
			model.addAttribute("message","Loi he thong");
			return "login";
		}
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if (request.isRequestedSessionIdValid() && session != null) {
			session.invalidate();
		}
		return "login";
	}

	@RequestMapping(value = "/admin/enterpriseInfor", method = RequestMethod.GET)
	public @ResponseBody String getCustomer(HttpServletRequest request, HttpServletResponse response, Model model) {
		String uri = ConfigurationPath.getDomainAPI("/gateway/customerManager/enterpriseInfor");
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		HttpSession session = request.getSession();
		LoginResponse login = (LoginResponse) session.getAttribute("user");
		headers.set(HttpHeaders.AUTHORIZATION, login.getAuth().getTokenType()+login.getAuth().getToken());
		HttpEntity<String> entity = new HttpEntity<String>("", headers);
		ResponseEntity<String> json = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
		return json.getBody();
	}

	@RequestMapping(value = "/checksession", method = RequestMethod.GET)
	public String checkSession(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if (request.isRequestedSessionIdValid() && session != null) {
			session.invalidate();
		}
		return "login";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}
}
