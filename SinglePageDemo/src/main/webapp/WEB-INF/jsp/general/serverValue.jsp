<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<script type="text/javascript">
/* Get current date from server */
	var sysDateFromServer = '${dates}';
	if (sysDateFromServer == null){
		sysDateFromServer = new Date();
	}
/* End */

/* Get session timeout from server */
	var countTimeout;
	var sessionTimeOut;
	function getSessionTimeOut() {
		var sessionTimeOut = '${sessionTimeOut}';
		   if (sessionTimeOut == null){
		       sessionTimeOut = 1800;
		   }
		return sessionTimeOut;
    }

	/* Check session timeout */
	function Timer(fn, t) {
	    var timerObj = setInterval(fn, t);

	    this.stop = function() {
	        if (timerObj) {
	            clearInterval(timerObj);
	            timerObj = null;
	        }
	        return this;
	    }

	    // start timer using current settings (if it's not already running)
	    this.start = function() {
	        if (!timerObj) {
	            this.stop();
	            timerObj = setInterval(fn, t);
	        }
	        return this;
	    }

	    // start with new interval, stop current interval
	    this.reset = function(newT) {
	        t = newT;
	        return this.stop().start();
	    }
	}
/* End */
</script>