package com.sttt.ruby.util;

import com.sttt.ruby.config.ConfigurationPath;

public class UriGateWay {
	
	public static final String LOGIN = ConfigurationPath.getDomainAPI("/auth/login");
	
	public static final String CUSTOMER_INIT= ConfigurationPath.getDomainAPI("/customerManager/public/initEnterprise");
	public static final String ACCOUNT_LOGIN= ConfigurationPath.getDomainAPI("/gateway/auth/login");
	public static final String ACCOUNT_LOGOUT= ConfigurationPath.getDomainAPI("/auth/logout");
	public static final String ACCOUNT_CHANGEPASS= ConfigurationPath.getDomainAPI("/auth/changePassword");
	public static final String ACCOUNT_UPDATEINFOR= ConfigurationPath.getDomainAPI("/auth/updateRequiredInfor");
	public static final String ACCOUNT_GETPASSCODE= ConfigurationPath.getDomainAPI("/auth/public/getResetPassCode");
	public static final String ACCOUNT_RESETPASS= ConfigurationPath.getDomainAPI("/auth/public/resetPassword");
	public static final String ACCOUNT_FORGETACC= ConfigurationPath.getDomainAPI("/auth/public/forgetAccount");
	public static final String CUSTOMER_ENTERPRISEINFORMATION= ConfigurationPath.getDomainAPI("/customerManager/enterpriseInfor");
	public static final String ACCOUNT_SYNC= ConfigurationPath.getDomainAPI("/account/syncCustomer");
	public static final String CHANNEL_LISTCONTRACTS= ConfigurationPath.getDomainAPI("/leasedLine/getListContract");
	public static final String CHANNEL_LISTSUBCRIBERS= ConfigurationPath.getDomainAPI("/leasedLine/searchListSubcriber");
	public static final String CHANNEL_DETAIL= ConfigurationPath.getDomainAPI("/leasedLine/subcriberDetail");
	public static final String CHANNEL_SEARCHBANDWIDTH= ConfigurationPath.getDomainAPI("/leasedLine/searchBandwidth");
	public static final String CHANNEL_LISTWARNINGSBYSUBACCOUNT= ConfigurationPath.getDomainAPI("/leasedLine/getListWarningBySubAccount");
	public static final String CHANNEL_LISTALLWARNINGS= ConfigurationPath.getDomainAPI("/leasedLine/getListWarningAllWarning");
	public static final String CHANNEL_ISSUE_CHECK= ConfigurationPath.getDomainAPI("/channel/checkIssue");
	public static final String CHANNEL_ISSUE_RESULT= ConfigurationPath.getDomainAPI("/channel/issueResult");
	public static final String TICKET_LISTTICKETS= ConfigurationPath.getDomainAPI("/ticket/searchListTickets");
	public static final String TICKET_CREATEREQUESTNONMVEACCOUNT= ConfigurationPath.getDomainAPI("/ticket/requestDeploymentNonAccount");
	public static final String TICKET_CREATE= ConfigurationPath.getDomainAPI("/ticketManager/createTicket");
	public static final String TICKET_DETAIL= ConfigurationPath.getDomainAPI("/ticket/showDetail");
	public static final String TICKET_CREATEREQUESTCHANGEBANDWIDTH= ConfigurationPath.getDomainAPI("/ticket/requestChangeBandwidth");
	
	public static final String TICKET_CREATEREQUESBLOCKCHANNEL= ConfigurationPath.getDomainAPI("/ticket/requestBlockAccount");
	public static final String TICKET_CREATEREQUESTCHANGECONTRACT= ConfigurationPath.getDomainAPI("/ticket/requestChangeContract");
	public static final String TICKET_CREATEREQUESTCHANGECUSTOMERINFO= ConfigurationPath.getDomainAPI("/ticket/requestChangeCustomerInfo");
	public static final String TICKET_CREATEREQUESTCHANGEADDRESS= ConfigurationPath.getDomainAPI("/ticket/requestChangeAddress");
	public static final String TICKET_CREATEREQUESTCHANGEOTHER= ConfigurationPath.getDomainAPI("/ticket/requestChangeOther");
	public static final String TICKET_VIEWSTATUSTICKET= ConfigurationPath.getDomainAPI("/ticketManager/statusTicket");
	public static final String TICKET_CANCELREQUEST= ConfigurationPath.getDomainAPI("/ticketManager/cancelTicket");
	public static final String TICKET_DETAILNEWREQUESTFTTH= ConfigurationPath.getDomainAPI("/ticketManager/detailTicket");
	public static final String TICKET_CREATEREQUESTCHANGEPACKAGE= ConfigurationPath.getDomainAPI("/ticket/requestChangePackage");
	public static final String TICKET_RATINGTICKET= ConfigurationPath.getDomainAPI("/leasedLineTicket/ratingTicket");
	public static final String PROBLEM_LISTPROBLEMS= ConfigurationPath.getDomainAPI("/leasedLineTicket/searchListProblems");
	public static final String PROBLEM_CREATEREQUESTPROBLEM= ConfigurationPath.getDomainAPI("/problem/createProblem");
	public static final String PROBLEM_DETAILPROBLEM= ConfigurationPath.getDomainAPI("/problem/getDetailProblem");
	public static final String PROBLEM_RATEPROBLEM= ConfigurationPath.getDomainAPI("/problem/rate");
	public static final String INVOICE_LISTINVOICES= ConfigurationPath.getDomainAPI("/invoice/searchListInvoices");
	public static final String INVOICE_DETAILINVOICE= ConfigurationPath.getDomainAPI("/invoice/getDetailInvoice");
	public static final String INVOICE_DOWNLOADDECLARATIONTABLE= ConfigurationPath.getDomainAPI("/invoice/downloadInvoice");
	public static final String INVOICE_DOWNLOADINVOICEPDF= ConfigurationPath.getDomainAPI("/invoice/downloadPDF");
	
	public static final String LOCAL_TICKET_LISTTICKETS= ConfigurationPath.getLocalAPI("/ticket/searchListTickets");
	public static final String LOCAL_TICKET_INITBLOCKACCOUNT= ConfigurationPath.getLocalAPI("/ticket/blockAccountList");
	
}
