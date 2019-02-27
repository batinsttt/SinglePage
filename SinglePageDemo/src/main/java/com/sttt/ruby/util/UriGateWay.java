package com.sttt.ruby.util;

import com.sttt.ruby.config.ConfigurationPath;

public class UriGateWay {
	public static final String LOGIN = ConfigurationPath.getDomainAPI("/auth/login");
	
	
	public static final String CHAN_LIST = ConfigurationPath.getDomainAPI("/leasedLine/searchListSubcriber");
	public static final String CHAN_DETAIL = ConfigurationPath.getDomainAPI("/leasedLine/subcriberDetail");
	
	
	
	
}
