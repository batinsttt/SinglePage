package com.sttt.ruby.bean;

import com.viettel.mve.client.response.auth.LoginResponse;

public class ErrorResponse extends LoginResponse {

	private boolean isErrorsCountOverLimit;

	public boolean isErrorsCountOverLimit() {
		return isErrorsCountOverLimit;
	}

	public void setErrorsCountOverLimit(boolean isErrorsCountOverLimit) {
		this.isErrorsCountOverLimit = isErrorsCountOverLimit;
	}
}
