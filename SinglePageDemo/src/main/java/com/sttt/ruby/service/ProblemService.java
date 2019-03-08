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

import com.sttt.ruby.exception.BusinessException;
import com.sttt.ruby.util.UriGateWay;
import com.viettel.mve.client.response.problem.SearchProblemResponse;
import com.viettel.mve.client.request.problem.SearchProblemsRequest;

@Service
public class ProblemService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CommonService commonService;

    /**
     * Get Problem List
     * 
     * @param searchProblemsRequest
     * @param request
     * @param draw
     * @return json
     * @throws BusinessException
     */
    public String getProblemList(SearchProblemsRequest searchProblemsRequest, HttpServletRequest request, int draw)
            throws Exception {

        HttpHeaders headers = commonService.getHeaders(request);

        HttpEntity<SearchProblemsRequest> entity = new HttpEntity<SearchProblemsRequest>(searchProblemsRequest,
                headers);
        // Call API
            ResponseEntity<SearchProblemResponse> searchProblemResponse = restTemplate
                    .exchange(UriGateWay.PROBLEM_LISTPROBLEMS, HttpMethod.POST, entity, SearchProblemResponse.class);
            searchProblemResponse.getBody().setCurrentPage(draw);
            JSONObject result = new JSONObject(searchProblemResponse.getBody());
            System.out.println("response: " + result.toString());

        return result.toString();
    }
}
