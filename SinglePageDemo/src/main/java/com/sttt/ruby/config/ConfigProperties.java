package com.sttt.ruby.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:/config/environment-dev.properties")
public class ConfigProperties {
	@Value("${src.css.server}")
	private String pathCssServer;
	@Value("${src.js.server}")
	private String pathJsServer;
	@Value("${src.img.server}")
	private String pathImgServer;
	@Value("${svn-revision-number}")
	private String versionServer;

	public String getPathCssServer() {
		return pathCssServer;
	}

	public void setPathCssServer(String pathCssServer) {
		this.pathCssServer = pathCssServer;
	}

	public String getPathJsServer() {
		return pathJsServer;
	}

	public void setPathJsServer(String pathJsServer) {
		this.pathJsServer = pathJsServer;
	}

	public String getPathImgServer() {
		return pathImgServer;
	}

	public void setPathImgServer(String pathImgServer) {
		this.pathImgServer = pathImgServer;
	}

	public String getVersionServer() {
		return versionServer;
	}

	public void setVersionServer(String versionServer) {
		this.versionServer = versionServer;
	}

}
