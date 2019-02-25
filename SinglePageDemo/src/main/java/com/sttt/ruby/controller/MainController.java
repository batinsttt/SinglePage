
package com.sttt.ruby.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.config.ConfigurationPath;


@Controller
public class MainController {

	@RequestMapping(value = "/login/auth", method = RequestMethod.POST)
	public String userSalesEdit(@RequestParam("username") String username,@RequestParam("password") String password,HttpServletResponse  response) {
//		String uri = ConfigurationPath.getDomainAPI("/gateway/auth/login");
//		RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        String requestBody = "{\"username\":\""+username+"\",\"password\":\""+password+"\"}";
//        HttpEntity<String> entity = new HttpEntity<String>(requestBody,headers);
//        String json = restTemplate.postForObject(uri, entity, String.class);
//        JSONObject jsonObj = new JSONObject(json);
//        JSONArray role = (JSONArray)jsonObj.getJSONObject("user").get("roles");
//        String token = jsonObj.getJSONObject("auth").getString("token");
//        String tokenType = jsonObj.getJSONObject("auth").getString("tokenType");
//        List<Object> roles = role.toList();
////        response.addHeader("vt.authenticate", tokenType + token);
//        Cookie newCookie = new Cookie("vt.authenticate", tokenType + token);
//        response.addCookie(newCookie);
//   
//        if(roles.contains("ROLE_LEASED_LINE_USER")) {
//        	return "user/home";
//        }
        return "admin/adminMasterPage";
	}
	@RequestMapping(value = "/customerManager/enterpriseInfor", method = RequestMethod.GET)
	public @ResponseBody String getCustomer(HttpServletRequest request, HttpServletResponse  response,Model model) {
		String uri = ConfigurationPath.getDomainAPI("/gateway/customerManager/enterpriseInfor");
		Cookie[] cookies = request.getCookies();
		String autho = null;
		for(Cookie cookie : cookies) {
			if("vt.authenticate".equals(cookie.getName())){
				autho = cookie.getValue();
				break;
			}
		}
		RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization",autho);
        HttpEntity<String> entity = new HttpEntity<String>(null,headers);
        String json = restTemplate.getForObject(uri, String.class,entity);
        return json;
	}
	
	
	@RequestMapping(value ="/login", method = RequestMethod.GET)
	public String login(Model model) {
		return "login";
	}

	
}
