package com.sttt.ruby.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigurationPath {
	
	private static String pathCssServer;
	private static String domainAPI;
	private static int errorsCountLimit;
	private static int requestTimeoutMax;
	private static String localAPI;
	@Value("${src.js.server}")
	private String pathJsServer;

	@Value("${src.img.server}")
	private String pathImgServer;

	@Value("${svn.revision.number}")
	private String versionServer;

	public static String getPathCssServer() {
		return pathCssServer;
	}

	@Value("${src.css.server}")
	public void setPathCssServer(String path) {
		pathCssServer = path;
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
	
	public static String getResourceServerPath(String staticFile) {
        return pathCssServer + staticFile;
    }

	public static int getErrorsCountLimit() {
		return errorsCountLimit;
	}

	@Value("${errors.count.limit}")
	public void setErrorsCountLimit(int errorsCount) {
		errorsCountLimit = errorsCount;
	}

	public static int getRequestTimeoutMax() {
		return requestTimeoutMax;
	}

	@Value("${server.servlet.request.timeout}")
	public void setRequestTimeoutMax(int timeoutMax) {
		requestTimeoutMax = timeoutMax;
	}

	public static String getDomainAPI(String url) {
		return domainAPI + url;
	}
	@Value("${vietel.api.domain}")
	public void setDomainAPI(String domain) {
		domainAPI = domain;
	}
	@Value("${local.api.domain}")
	public void setLocalAPI(String local) {
		localAPI = local;
	}
	public static String getLocalAPI(String url) {
		return localAPI + url;
	}
	
}
