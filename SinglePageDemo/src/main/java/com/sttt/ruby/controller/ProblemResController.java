
package com.sttt.ruby.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sttt.ruby.service.ChannelService;
import com.sttt.ruby.service.ProblemService;
import com.viettel.mve.client.request.leaseline.GetSubcriberDetailRequest;
import com.viettel.mve.client.request.problem.SearchProblemsRequest;

@RestController
public class ProblemResController {

    @Autowired
    ProblemService problemService;

    /*
     * Demo Post sample
     */
    @PostMapping("/service6/call")
    public String callWebservice(@RequestBody String requestBody) throws Exception {
        String uri = "http://10.60.156.63:8762/gateway/customerManager/enterpriseInfor";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HttpHeaders.AUTHORIZATION,
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGRzFGN19BRE1JTiIsImF1dGhzIjpbIlJPTEVfTEVBU0VEX0xJTkVfVVNFUiIsIlJPTEVfRlRUUF9VU0VSIl0sInVpZCI6IjYiLCJjaWQiOiI2IiwiaWF0IjoxNTUwNzE5MDQyLCJleHAiOjE1NTA3MjA0ODJ9.FVhVHkbjYYX0dqT07rptWngAX9IIpwpymoWxpsNf1Exy_PbCSFhygmsyTJp_YKWWvV6S1NPIP2xAodSIAQusaw");

        HttpEntity<String> entity = new HttpEntity<String>(requestBody, headers);
        String json = restTemplate.postForObject(uri, entity, String.class);

        System.out.println(json);

        return json;
    }

    /*
     * Get problem list
     */
    @PostMapping("/problem/searchProblem")
    public String getDetailChannel(@RequestBody SearchProblemsRequest searchProblemsRequest,
            @RequestParam("draw") int draw, HttpServletRequest request) throws Exception {
        
        System.out.println("getDetailChannel: " + searchProblemsRequest.toString());
        // Get json by API
        String resultJson = problemService.getProblemList(searchProblemsRequest, request, draw);

        return resultJson;
    }

}
