package com.sttt.ruby.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigurationPath {
	@Autowired
	private ConfigProperties config;
	
	public String getCssServerPath(String staticFile) {
        return config.getPathCssServer() + staticFile
                + "?v=" + "123";
    }
}
