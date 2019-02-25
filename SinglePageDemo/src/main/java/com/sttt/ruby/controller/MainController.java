
package com.sttt.ruby.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.config.ConfigurationPath;
import com.sttt.ruby.util.ItemJsonContants;
import com.sttt.ruby.util.RolesContants;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MainController {

	@RequestMapping(value = "/login/auth", method = RequestMethod.POST)
	public String userSalesEdit(@RequestParam("username") String username, @RequestParam("password") String password,HttpServletRequest request,
			HttpServletResponse response,Model model) {
		log.info("Begin method login");
		String uri = ConfigurationPath.getDomainAPI("/gateway/auth/login");
		JSONObject jsonObj = null;
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		String requestBody = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";
		HttpEntity<String> entity = new HttpEntity<String>(requestBody, headers);
		try {
			String json = restTemplate.postForObject(uri, entity, String.class);
			jsonObj = new JSONObject(json);
			JSONArray role = (JSONArray) jsonObj.getJSONObject(ItemJsonContants.USER).get(ItemJsonContants.ROLES);
			List<Object> roles = role.toList();
			String token = jsonObj.getJSONObject(ItemJsonContants.AUTH).getString(ItemJsonContants.TOKEN_TYPE)
					+ jsonObj.getJSONObject(ItemJsonContants.AUTH).getString(ItemJsonContants.TOKEN);
			HttpSession session = request.getSession();
			session.setAttribute(ItemJsonContants.TOKEN, token);
			if (roles.contains(RolesContants.ROLE_LEASED_LINE_USER)) {
				return "user/userMasterPage";
			}
			return "login";
		} catch( JSONException jsonEx) {
			model.addAttribute("errorCode", jsonObj.getString(ItemJsonContants.ERRORCODE));
			model.addAttribute("message", jsonObj.getString(ItemJsonContants.MESSAGE));
			return "login";
		}
		catch(Exception rex) {
			return "login";
		}
	}

	@RequestMapping(value = "/customerManager/enterpriseInfor", method = RequestMethod.GET)
	public @ResponseBody String getCustomer(HttpServletRequest request, HttpServletResponse response, Model model) {
		String uri = ConfigurationPath.getDomainAPI("/gateway/customerManager/enterpriseInfor");
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		HttpSession session = request.getSession();
		headers.set(HttpHeaders.AUTHORIZATION, (String) session.getAttribute(ItemJsonContants.TOKEN));
		HttpEntity<String> entity = new HttpEntity<String>("", headers);
		ResponseEntity<String> json = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
		return json.getBody();
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if (request.isRequestedSessionIdValid() && session != null) {
			session.invalidate();
		}
		return "login";
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
