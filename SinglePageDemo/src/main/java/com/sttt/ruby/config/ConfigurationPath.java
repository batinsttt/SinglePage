package com.sttt.ruby.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigurationPath {
	@Autowired
	private ConfigProperties config;
	
	@Value("${server.servlet.context-path}")
	private static String contextPath;
	
	public static String getCssServerPath(String staticFile) {
        return "http://10.30.176.187:8090"+ staticFile;
    }
	public ConfigurationPath() {
		
	}
}
