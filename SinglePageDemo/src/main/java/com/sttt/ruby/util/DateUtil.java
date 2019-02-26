package com.sttt.ruby.util;

import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {
	public static String toDateString(Date date, String format) {
		String dateString = "";
		if (date == null)
			return dateString;
		Object[] params = new Object[] { date };

		try {
			dateString = MessageFormat.format("{0,date," + format + "}", params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dateString;
	}
}
