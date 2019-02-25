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
	public static String getExpiresCookie() {
		Date expdate= new Date();
		expdate.setTime (expdate.getTime() + (3600 * 1000 * 2));
		DateFormat df = new SimpleDateFormat("EEE, dd-MMM-yyyy HH:mm:ss zzz");
		df.setTimeZone(TimeZone.getTimeZone("GMT"));
		return "Expires=" + df.format(expdate);
	}
}
