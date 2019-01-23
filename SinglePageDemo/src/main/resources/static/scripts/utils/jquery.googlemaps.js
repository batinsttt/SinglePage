/**
 * Google Maps APIs
 * @author tientv11
 * @sine 19/06/2014
 */
var ViettelMap = {
	_DEF_LAT: 10.79418775,
	_DEF_LNG: 106.65682978,
	_DEF_LAT_BIG:  15.744675,
	_DEF_LNG_BIG: 107.515136,
	_DEF_ALL_ZOOM: 4,
	_DEF_ZOOM: 10,
	_DEF_ZOOM_BIG: 6,
	_map: null,
	_marker: null,
	_listMarker: null,
	_indexMarker: 0,
	sellerPositionMap: null,
	visitResultMap:null,
	_currentInfoWindow:null,
	_listOverlay:null,
	loadedResources:new Array(),
	OVERLAY_ZINDEX : 9,
	OVERLAY_ZINDEX_DEFAULT : 1,
	
	getBrowserName : function() {
		var browserName = "";
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("opera") != -1)
			browserName = "opera";
		else if (ua.indexOf("msie") != -1)
			browserName = "msie";
		else if (ua.indexOf("safari") != -1)
			browserName = "safari";
		else if (ua.indexOf("mozilla") != -1) {
			if (ua.indexOf("firefox") != -1)
				browserName = "firefox";
			else
				browserName = "mozilla";
		}
	},
	loadMapForImages: function(objId, lat, lng, zoom,type, custLat, custLng, isShowCus, zoomSize){
		if(!ViettelMap.isValidLatLng(lat,lng)){
			lat = ViettelMap._DEF_LAT_BIG;
			lng = ViettelMap._DEF_LNG_BIG;
			showMarker = false;
			if(zoom == null || zoom == undefined) {
				zoom = ViettelMap._DEF_ZOOM_BIG;
			}
		} else if(zoom == undefined || zoom == 0 || zoom == null){
			zoom = ViettelMap._DEF_ZOOM_BIG;
		}
		if (zoomSize != null){
			zoom = zoomSize;
		}
		ViettelMap.clearOverlays();
		$('.fancybox-inner #bigMap').html('');
		var __object = $('.fancybox-inner #bigMap')[0];
		ViettelMap._map = new google.maps.Map(__object);
		ViettelMap._map.setOptions({
//			zoomControl : true,
//			panControl : true,
			center: new google.maps.LatLng(custLat, custLng),
			zoom: zoom,
			disableDefaultUI: true
		});
		var map = ViettelMap._map; 
		//var showMarker = true;
		if (custLat == null || custLat <= 0){
			custLat = lat;
		}
		if (custLng == null || custLng <= 0){
			custLng = lng;
		}
		if(isShowCus != null && isShowCus){
			ViettelMap.addMarkerImages(null, null, custLat, custLng);
		}
		//var pt = new google.maps.LatLng(lat, lng);
	    //map.setCenter(pt);
	    //map.setZoom(zoom);
	    if(type != undefined && type != null && type == 1){//bản đồ mở rộng
	    	var mapOptions = {
	    			zoomControl : true,
		    		zoomControlOptions : {
		    			position: google.maps.ControlPosition.RIGHT_TOP
		    		},
		    		panControl : true,
		    		panControlOptions : {
		    			position: google.maps.ControlPosition.RIGHT_TOP
		    		},
		    		disableDefaultUI: true
		    	};
	    	map.setOptions(mapOptions);
	    }
		return map;
	},	
	addMarkerImages:function(lat,lng, custLat, custLng){
		ViettelMap._listOverlay = null;
		if(ViettelMap.isValidLatLng(lat, lng)) {
			if(ViettelMap.isValidLatLng(custLat, custLng)) {
				var pt = new google.maps.LatLng(lat, lng);
				var cusPt = new google.maps.LatLng(custLat, custLng);
				var distance = ViettelMap.CalculateDistance(pt, cusPt);
				var distanceStr = '';
				if(Number(distance) < 1000) {
					distanceStr = formatCurrency(distance) + ' m';
				} else {
					distance = Number(distance) / 1000;
					distanceStr = formatCurrency(distance) + ' km';
				}
				var title = $('#titlePopup').html();
				if(title.indexOf(distanceStr) == -1) {
					$('#titlePopup').html(title + ' - ' + distanceStr);
				}
				var marker = new google.maps.Marker({
					position : pt,
					labelContent : '<span style="position: inherit; left: -31px; font-size: 12px;font-weight: bold; top: -49px; width: 121px !important; text-align: center">'+distanceStr+'</span>',
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
						size : {height : 39, width : 20},
						scaledSize : {height : 39, width : 20}
					},
					map : ViettelMap._map,
					labelClass : "MarkerLabel",
					labelVisible : true,
					draggable : false,
					labelAnchor : new google.maps.Point(25, 0)
				});
				
				if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
					ViettelMap._listOverlay = new Array();
					ViettelMap._listOverlay.push(marker);
				} else {
					ViettelMap._listOverlay.push(marker);
				}
				
				var custMarker = new google.maps.Marker({
					position : cusPt,
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
						size : {height : 39, width : 20},
						scaledSize : {height : 39, width : 20}
					},
					map : ViettelMap._map,
					labelClass : "MarkerLabel",
					labelVisible : true,
					draggable : false,
					labelAnchor : new google.maps.Point(25, 0)
				});
				
				if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
					ViettelMap._listOverlay = new Array();
					ViettelMap._listOverlay.push(custMarker);
				} else {
					ViettelMap._listOverlay.push(custMarker);
				}
			} else {
				var pt = new google.maps.LatLng(lat, lng);
				var marker = new google.maps.Marker({
					position : pt,
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
						size : {height : 39, width : 20},
						scaledSize : {height : 39, width : 20}
					},
					map : ViettelMap._map,
					labelClass : "MarkerLabel",
					labelVisible : true,
					draggable : false,
					labelAnchor : new google.maps.Point(25, 0)
				});
				
				if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
					ViettelMap._listOverlay = new Array();
					ViettelMap._listOverlay.push(marker);
				} else {
					ViettelMap._listOverlay.push(marker);
				}
			}
		} else if(ViettelMap.isValidLatLng(custLat, custLng)) {
			var cusPt = new google.maps.LatLng(custLat, custLng);
			var custMarker = new google.maps.Marker({
				position : cusPt,
				icon:{
					url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
					size : {height : 39, width : 20},
					scaledSize : {height : 39, width : 20}
				},
				map : ViettelMap._map,
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new google.maps.Point(25, 0)
			});
			
			if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
				ViettelMap._listOverlay = new Array();
				ViettelMap._listOverlay.push(custMarker);
			} else {
				ViettelMap._listOverlay.push(custMarker);
			}
		}
		ViettelMap.fitOverLay();
	},
	CalculateDistance:function(i,k){
		var n,l,h;var j;var c;var e;var a;var m;
		var d=i.lat();
		var b=i.lng();
		var g=k.lat();
		var f=k.lng();
		j=d*(Math.PI/180);
		c=b*(Math.PI/180);
		e=g*(Math.PI/180);
		a=f*(Math.PI/180);
		n=b-f;m=n*(Math.PI/180);
		h=Math.sin(j)*Math.sin(e)+Math.cos(j)*Math.cos(e)*Math.cos(m);
		h=Math.acos(h);
		l=h*180/Math.PI;
		l=l*60*1.1515;
		l=l*1.609344*1000;
		return Math.round(l);
	},
	loadMapResource:function(callback){
		ViettelMap.loadResource(vtm_url, 'js',callback);
	},
	loadResource:function(filename, filetype, callback){
		if ($.inArray(filename, ViettelMap.loadedResources) == -1){
			if (filetype=="js"){ // if filename is a external JavaScript file
				var fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
			}
			if (typeof fileref != "undefined"){
				if(callback != undefined){
					if(fileref.readyState){
						fileref.onreadystatechange = function (){
							if (fileref.readyState == 'loaded' || fileref.readyState == 'complete'){
								callback();
							}
						};
					} else {
						fileref.onload = callback;
					}
				}
				document.getElementsByTagName("head")[0].appendChild(fileref);
			}
			ViettelMap.loadedResources.push(filename);
		} else {
			if(callback != undefined){
				callback();
			}
		}
	},
	/** Kiem tra LatLng */
	isValidLatLng : function(lat,lng){
		if(lat==undefined || lng == undefined || lat== null || lng== null || lat == 0.0 || lng ==0.0 || lat<=0 || lng<=0){
			return false;
		}
		return true;
	},
	loadBigMap: function(objId, lat, lng, zoom,callback){
		ViettelMap._map = new google.maps.Map(document.getElementById(objId));
		var map = ViettelMap._map; 
		var showMarker = true;
		if(!ViettelMap.isValidLatLng(lat,lng)){
			lat = ViettelMap._DEF_LAT_BIG;
			lng = ViettelMap._DEF_LNG_BIG;
			showMarker = false;
			if(zoom == null || zoom == undefined) {
				zoom = ViettelMap._DEF_ZOOM_BIG;
			}
		} else if(zoom == undefined || zoom == 0 || zoom == null){
			zoom = ViettelMap._DEF_ZOOM_BIG;
		}
		var pt = new google.maps.LatLng(lat, lng);
	    map.setCenter(pt);
	    map.setZoom(zoom);
	    map.panTo(pt);
	    var mapOptions = {
	    		zoomControl : true,
	    		mapTypeControl: false,
	    		zoomControlOptions : {
	    			position: google.maps.ControlPosition.RIGHT_CENTER
	    		},
	    		panControl : false,
	    		panControlOptions : {
	    			position: google.maps.ControlPosition.RIGHT_CENTER
	    		}
	    	};
    	map.setOptions(mapOptions);
	    if(ViettelMap.isValidLatLng(lat,lng) && showMarker){
	    	var marker = new google.maps.Marker({
				position : pt,
				map : ViettelMap._map,				
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new google.maps.Point(25, 0)
			});			
		    if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
		    	ViettelMap._listOverlay = new Array();
		    	ViettelMap._listOverlay.push(marker);
			} else {
				ViettelMap._listOverlay.push(marker);
			}
	    }
	    google.maps.event.addListener(map, 'zoom_changed', function() {
	    	ViettelMap.hideShowTitleMarker();
	    	if (ViettelMap != null && ViettelMap._map != null && ViettelMap._map.getZoom() > 10){
	    		$('.cusNameSupMap').show();
	    	}else {
	    		$('.cusNameSupMap').hide();
	    	}
	    });
	    google.maps.event.addListener(map, "click", function(evt) {	    	
			var lat = evt.latLng.lat();
			var lng= evt.latLng.lng();
			if (callback != null)
				callback(lat, lng);
		});
		return map;	    
	},
	viewBigMap : function(arrParam, titleStr) {
		var html = $('#viewBigMap').html().trim();
		$('#viewBigMap').dialog({
			title: titleStr,
			closed: false,  
	        cache: false,
	        width: 850,
	        height: 500,
	        modal: true,
	        onOpen: function(){
	        	setTimeout(function(){
					var lat = arrParam.lat;
					var lng = arrParam.lng;
					if(Number(lat) == -1 && Number(lng) == -1){
						lat = null;
						lng = null;
					}
//					var zoom=17;
//					if(lat!='' && lng!=''){ 
//						zoom=15;
//					}
					var zoom = 10;
					if(!ViettelMap.isValidLatLng(lat,lng)){
						zoom = 10;
					} else if(zoom == undefined || zoom == 0 || zoom == null){
						zoom = 10;
					} else{
						zoom = 15;
					}
					ViettelMap._map = null;
					$('#bigMapContainer').html('');
					ViettelMap.loadBigMap('bigMapContainer',lat, lng ,zoom,function(lat, lng){
						ViettelMap.clearOverlays();
							$('#lat').val(lat);
							$('#lng').val(lng);
							var pt = new google.maps.LatLng(lat, lng);
					    	var marker = new google.maps.Marker({
								position : pt,
								map : ViettelMap._map,
								labelClass : "MarkerLabel",
								labelVisible : true,
								draggable : false,
								labelAnchor : new google.maps.Point(25, 0)
							});
							marker.lat = lat;
							marker.lng = lng;
						    if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
								ViettelMap._listOverlay = new Array();
								ViettelMap._listOverlay.push(marker);
							} else {
								ViettelMap._listOverlay.push(marker);
							}
					});
				}, 500);
	        },
	        onClose:function() {
//        		$('#bigMapChange').html("");
	        	var lat = $('#lat').val();
				var lng = $('#lng').val();
				if(Number(lat) == -1 && Number(lng) == -1){
					lat = null;
					lng = null;
				}
				var zoom = 10;
				if(!ViettelMap.isValidLatLng(lat,lng)){
					zoom = 10;
				} else if(zoom == undefined || zoom == 0 || zoom == null){
					zoom = 10;
				} else{
					zoom = 15;
				}
				ViettelMap.addMarker(lat, lng);
				ViettelMap.loadBigMap('bigMapChange',lat, lng ,zoom,function(lat, lng){
					ViettelMap.clearOverlays();
					$('#lat').val(lat);
					$('#lng').val(lng);
					var pt = new google.maps.LatLng(lat, lng);
			    	var marker = new google.maps.Marker({
						position : pt,
						map : ViettelMap._map,
						labelClass : "MarkerLabel",
						labelVisible : true,
						draggable : false,
						labelAnchor : new google.maps.Point(25, 0)
					});
					marker.lat = lat;
					marker.lng = lng;
				    if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
						ViettelMap._listOverlay = new Array();
						ViettelMap._listOverlay.push(marker);
					} else {
						ViettelMap._listOverlay.push(marker);
					}
			});
//        	$('#bigMapContainer').html(html);
	        }
		});
		
		return false;
	},
	clearOverlays: function() { 
		if(ViettelMap._listOverlay != null && ViettelMap._listOverlay != undefined) {
			if(ViettelMap._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMap._listOverlay.size(); i++) {
					var obj = ViettelMap._listOverlay.valArray[i];
					obj.setMap(null);
				}
			} else if(ViettelMap._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMap._listOverlay.length; i++) {
					var obj = ViettelMap._listOverlay[i];
					obj.setMap(null);
				}
			}
		}
		ViettelMap._listOverlay = null;
	},
	fitOverLay: function() {
		var bound = null;
		if(ViettelMap._listOverlay != null && ViettelMap._listOverlay != undefined) {
			if(ViettelMap._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMap._listOverlay.size(); i++) {
					var obj = ViettelMap._listOverlay.get(ViettelMap._listOverlay.keyArray[i]);
					if(obj instanceof google.maps.MarkerWithLabel) {
						if(ViettelMap.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
							var latlng = new google.maps.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
							bound = ViettelMap.getBound(bound, latlng);
						}
					} else {
						if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new google.maps.LatLng(obj.lat, obj.lng);
							bound = ViettelMap.getBound(bound, latlng);
						}
					}
				}
			} else if(ViettelMap._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMap._listOverlay.length; i++) {
					var obj = ViettelMap._listOverlay[i];
//					if(obj instanceof google.maps.MarkerWithLabel) {
						if(ViettelMap.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
							var latlng = new google.maps.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
							bound = ViettelMap.getBound(bound, latlng);
						}
//					} else {
//						if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
//							var latlng = new google.maps.LatLng(obj.lat, obj.lng);
//							bound = ViettelMap.getBound(bound, latlng);
//						}
//					}
				}
			}
		}
		if(bound != null) {
			ViettelMap._map.fitBounds(bound);
		}
	},
	addMarkerStaff:function(point){
		var map = ViettelMap._map;
		if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
			var pt = new google.maps.LatLng(point.lat, point.lng);
			var info="<div id='info"+point.staffId+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
			var title=point.staffCode+" - "+point.staffName;//+point.visit;
			var image=point.image;
			var accuracy = point.accuracy;
			var createTime = point.createTime;
			
			var level = ViettelMap._map.getZoom();
			var markerContent = ''; 
			var markerContent = ''; 
			var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
			if(level >= 16) {
				markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
			} else {
				markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
			}
			markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
			var marker = new google.maps.Marker({
				icon:{
					url : image,
					size : {height : 39, width : 20},
					scaledSize : {height : 39, width : 20}
				},
				position : pt,
				map : ViettelMap._map,
				title : markerContent,			
				draggable : false				
			});
			marker.staffId = point.staffId;
			marker.lat = point.lat;
			marker.lng = point.lng;
			marker.accuracy = point.accuracy;
			marker.createTime = point.createTime;
			
//			$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);			
//			$('#marker'+point.staffId).parent().prev().bind('click', point, function(e) {
//				var point = this;
//				ViettelMap.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime); 
//			});
			google.maps.event.addListener(marker, "click", function(evt) {
				var point = this;//p
				ViettelMap.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime); 
			});
			ViettelMap.pushListOverlays(marker);
//			ViettelMap.pushListOverlays(marker);
		}
		ViettelMap.hideShowTitleMarker();
	},
	showInfoWindow:function(pt,html){
		if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
			ViettelMap._currentInfoWindow.close();
		}
		var infoWindow = new google.maps.InfoWindow({ 
					content: html, 
					position: pt,
					maxWidth : 550
		});
		ViettelMap._currentInfoWindow = infoWindow;
		infoWindow.open(ViettelMap._map);
		setTimeout(function(){
			//$('.gm-style-iw').parent().children().next().first().children().first().css('width','150px');
			$('.gm-style-iw').parent().children().next().first().children().first().css('width','100%');
//			$('.gm-style-iw').css('height','350');
//			$('.gm-style-iw').parent().children().first().children().last().css('height','355');
		},300);
	},
	showWindowInfo:function(objectId,lat,lng,info,cur,time){		
		var pt = new google.maps.LatLng(lat, lng);
		if(objectId>0){
			if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
				ViettelMap._currentInfoWindow.close();
			}
			ViettelMap.showInfoWindow(pt,"<div style='width:100%;text-align: center; min-width: 370px;'><img style='position: relative;top:20px;' src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>");
			var temp = SuperviseSales._lstStaffPosition.get(objectId);
			if(temp!=null){
				SuperviseSales._idStaffSelect=objectId;
				if (temp.roleType == NV){
					SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,NV);
				} else{  
					SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,GS);
				}
				//SuperviseSales.showDialogStaffInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode,temp.shopName,temp.createTime,temp.accuracy,pt);
			}
		}
	},
	/*Show staff infor when hover*/
	showStaffInfo:function(name,lat,lng,time){		
		var pt = new google.maps.LatLng(lat, lng);
		if(name.length > 0){
			if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
				ViettelMap._currentInfoWindow.close();
			}
			ViettelMap.showInfoWindow(pt,"" +
					"<div style='width:200px;text-align: left; background-color: #cecdcd; border : 1px solid #333'><p>Nhân viên : "+name+"</p><p>Đăng nhập lúc : "+time+"</p></div>");
		}
	},
	
	addMarker: function(lat,lng){
		if(!ViettelMap.isValidLatLng(lat,lng)){
			return;
		}
		var latlng = new google.maps.LatLng(lat, lng);
        if (ViettelMap._marker != null){
        	ViettelMap._marker.setMap(null);
        }
        ViettelMap._marker = new google.maps.Marker({
        	position: latlng,
        	map: ViettelMap._map,
        });
//        ViettelMap._map.setCenter(latlng);
	},
	createLatLng: function(lat, lng){
		var latlng = new google.maps.LatLng(lat, lng);
		return latlng;
	},
	/*addMarkerImages:function(lat,lng){
		if(ViettelMap.isValidLatLng(lat, lng)) {
			var pt = new google.maps.LatLng(lat, lng);			
			var marker = new google.maps.Marker({
				position : pt,
				icon:{
					url : WEB_CONTEXT_PATH + '/resources/images/Mappin/red.png',
					size : {height : 39, width : 20},
					scaledSize : {height : 39, width : 20}
				},
				map : ViettelMap._map,				
				draggable : false
			});			
			if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
				ViettelMap._listOverlay = new Array();
				ViettelMap._listOverlay.push(marker);
			} else {
				ViettelMap._listOverlay.push(marker);
			}
		}
	},*/
	
	//HÀM ADD DS NHÂN VIÊN VÀO BẢN ĐỒ => Dashboard
	addMutilMarkerStaffDashboard : function(){
		var map = ViettelMap._map;
		if(ViettelMap._listMarker!=undefined && ViettelMap._listMarker!=null){
			var flag=0;
			var index=0;
			CommonStaffMap._itv =window.setInterval(function(){
				var j=0;
				for(var i=index,j=0;i<ViettelMap._listMarker.valArray.length;i++,index++,j++){
					if(j>100) break;
					var point = ViettelMap._listMarker.valArray[i];
					if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
						var pt = new google.maps.LatLng(point.lat, point.lng);
						var info="<div id='info"+point.staffId+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
						var title='Nhân viên: '+point.staffName+'\nĐăng nhập lúc: '+point.timeHHMM;
						var image=point.image;
						var accuracy = point.accuracy;
						var createTime = point.createTime;
						var level = ViettelMap._map.getZoom();
						var markerContent = ''; 
						var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
						if(level >= 16) {
							markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
						} else {
							markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
						}
						markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
						var marker = new google.maps.Marker({
							icon:{
								url : image,
								size : {height : 39, width : 20},
								scaledSize : {height : 39, width : 20}
							},
							position : pt,
							map : ViettelMap._map,
							title : title,							
							draggable : false
						});
						marker.staffId = point.staffId;
						marker.lat = point.lat;
						marker.lng = point.lng;
						marker.staffName = point.staffName;
						marker.accuracy = point.accuracy;
						marker.timeHHMM = point.timeHHMM;
						ViettelMap._map.setZoom(12);
						
						$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
//						google.maps.event.addListener(marker, "mouseover", function(evt) {
//							var point = this;//p1							
//							ViettelMap.showStaffInfo(point.staffName, point.lat, point.lng, point.timeHHMM);
//						});
						ViettelMap.pushListOverlays(marker);
						
//						if(CommonStaffMap._lstStaffException.get(marker.staffId) != null) {
//							$('#marker'+marker.staffId).parent().parent().hide();
//						}
					}
				}
				if(index>=ViettelMap._listMarker.valArray.length){
					ViettelMap.hideShowTitleMarker();
//					SuperviseSales.showCustomer();
					if(CommonStaffMap._notFitOverlay==undefined || CommonStaffMap._notFitOverlay==null){
						ViettelMap.fitOverLays();
					}else if(CommonStaffMap._idStaffSelected!=null && CommonStaffMap._idStaffSelect==CommonStaffMap._idStaffSelected ){
						CommonStaffMap.moveToStaff(CommonStaffMap._idStaffSelect);
					}
					CommonStaffMap._notFitOverlay=null;
					window.clearInterval(CommonStaffMap._itv);
				}
				if(CommonStaffMap._idStaffSelect != null || CommonStaffMap._idStaffSelected != null) {
					
				} else {
					ViettelMap.fitOverLays();
				}
				ViettelMap.hideShowTitleMarker();
			},300); 
		}
		
	},
	
	//HÀM ADD DS NHÂN VIÊN VÀO BẢN ĐỒ => Giám sát
	addMutilMarkerStaff : function(){
		var map = ViettelMap._map;
		if(ViettelMap._listMarker!=undefined && ViettelMap._listMarker!=null){
			var flag=0;
			var index=0;
			SuperviseSales._itv =window.setInterval(function(){
				var j=0;
				for(var i=index,j=0;i<ViettelMap._listMarker.valArray.length;i++,index++,j++){
					if(j>100) break;
					var point = ViettelMap._listMarker.valArray[i];
					if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
						var pt = new google.maps.LatLng(point.lat, point.lng);
						var info="<div id='info"+point.staffId+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
						var title=point.staffName;
						var image=point.image;
						var accuracy = point.accuracy;
						var createTime = point.createTime;
						var level = ViettelMap._map.getZoom();
						var markerContent = ''; 
						var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
						if(level >= 16) {
							markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
						} else {
							markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
						}
						markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
						var marker = new google.maps.Marker({
							icon:{
								url : image,
								size : {height : 39, width : 20},
								scaledSize : {height : 39, width : 20}
							},
							position : pt,
							map : ViettelMap._map,
							title : title,							
							draggable : false
						});
						marker.staffId = point.staffId;
						marker.lat = point.lat;
						marker.lng = point.lng;
						marker.accuracy = point.accuracy;
						marker.createTime = point.createTime;
						
						$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
						google.maps.event.addListener(marker, "click", function(evt) {
							var point = this;//p1							
							ViettelMap.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime);
						});
						ViettelMap.pushListOverlays(marker);
						
						if(SuperviseSales._lstStaffException.get(marker.staffId) != null) {
							$('#marker'+marker.staffId).parent().parent().hide();
						}
					}
				}
				if(index>=ViettelMap._listMarker.valArray.length){
					ViettelMap.hideShowTitleMarker();
//					SuperviseSales.showCustomer();
					if(SuperviseSales._notFitOverlay==undefined || SuperviseSales._notFitOverlay==null){
						ViettelMap.fitOverLays();
					}else if(SuperviseSales._idStaffSelected!=null && SuperviseSales._idStaffSelect==SuperviseSales._idStaffSelected ){
						SuperviseSales.moveToStaff(SuperviseSales._idStaffSelect);
					}
					SuperviseSales._notFitOverlay=null;
					window.clearInterval(SuperviseSales._itv);
				}
				if(SuperviseSales._idStaffSelect != null || SuperviseSales._idStaffSelected != null) {
					
				} else {
					ViettelMap.fitOverLays();
				}
				ViettelMap.hideShowTitleMarker();
			},300); 
		}
		
	},
	fitOverLays: function() {
		var bound = null;
		if(ViettelMap._listOverlay != null && ViettelMap._listOverlay != undefined) {
			if(ViettelMap._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMap._listOverlay.size(); i++) {
					var obj = ViettelMap._listOverlay.get(ViettelMap._listOverlay.keyArray[i]);
					if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
						var latlng = new google.maps.LatLng(obj.lat, obj.lng);
						bound = ViettelMap.getBound(bound, latlng);
					}
				}
			} else if(ViettelMap._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMap._listOverlay.length; i++) {
					var obj = ViettelMap._listOverlay[i];
					if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
						var latlng = new google.maps.LatLng(obj.lat, obj.lng);
						bound = ViettelMap.getBound(bound, latlng);
					}
				}
			}
		}
		if(bound != null) {
			ViettelMap._map.fitBounds(bound);
		}
	},
	pushListOverlays:function(marker){
		if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
			ViettelMap._listOverlay = new Array();
			ViettelMap._listOverlay.push(marker);
		} else {
			ViettelMap._listOverlay.push(marker);
		}	
	},
	getBound: function(bound, latlng) {
		if(bound == null || bound == undefined) {
			bound = new google.maps.LatLngBounds(latlng, latlng);
		} else {
			var lat = latlng.lat();
			var lng = latlng.lng();
			
          	var swLat = bound.getSouthWest().lat();
          	var swLng = bound.getSouthWest().lng();
          	var neLat = bound.getNorthEast().lat();
          	var neLng = bound.getNorthEast().lng();
          
			if(bound.getSouthWest().lat() > lat) {
				swLat = lat;
			}
			if(bound.getSouthWest().lng() > lng) {
				swLng = lng;
			}
			if(bound.getNorthEast().lat() < lat) {
				neLat = lat;
			}
			if(bound.getNorthEast().lng() < lng) {
				neLng = lng;
			}
			
			var sw = new google.maps.LatLng(swLat, swLng);
			var ne = new google.maps.LatLng(neLat, neLng);
			
			bound = new google.maps.LatLngBounds(sw, ne);
		}
		return bound;
	},
	hideShowTitleMarker:function(){
		if(ViettelMap._map.getZoom()>=13){
    		$('.Top').show();
    		if(ViettelMap._map.getZoom()>=16){
    			$('#bigMap .Bottom').show();
	    	}else{
	    		$('#bigMap .Bottom').hide();
	    	}
    	}else{
    		$('.Top').hide();
    		$('#bigMap .Bottom').hide();
    	}
	},
	/** Giam sat */
	addMarkerCust : function(point){
		if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
			var pt = new google.maps.LatLng(point.lat, point.lng);
			var map = ViettelMap._map;
			map.setCenter(pt);
			map.setZoom(ViettelMap._DEF_ZOOM);
			map.panTo(pt);
			var myStyles =[
               {
                   featureType: "poi",
                   elementType: "labels",
                   stylers: [
                         { visibility: "off" }
                   ]
               }
            ];
			var mapOptions = {
					zoomControl : true,
					zoomControlOptions : {
						position: google.maps.ControlPosition.RIGHT_CENTER
					},
					panControl : true,
					panControlOptions : {
						position: google.maps.ControlPosition.RIGHT_CENTER
					},
					styles: myStyles
				};
			map.setOptions(mapOptions);
			var image = '';
			if(point.image == 'Customers1Status') {//co don hang
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png';
			} else if(point.image == 'Customers2Status') {//chua ghe tham
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_green.png';
			} else if(point.image == 'Customers3Status') {//dang ghe tham
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_orange.png';
			} else if(point.image == 'Customers4Status') {//Ghe tham khong co don dat hang
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_red.png';
			} else if(point.image == 'Customers5Status') {//kh ngoai tuyen
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_yellow.png';
			}		
			var marker = null;			
			var text = '';
			if(point.ordinalAndTimeVisitReal != undefined && point.ordinalAndTimeVisitReal != '' && point.ordinalAndTimeVisitReal != null){
				text = point.ordinalAndTimeVisitReal;
			}
			var title1 = '<span style="position: inherit; left: 9px; top: -24px;"><strong><p style="color: white; font-size: 14px;">'+point.ordinalVisit+'</p></strong></span>'+'<span style="position: relative; center; top: 0px;" class="CustomerTimeVisit">'+text+'</span>';
			var title2 = '<span style="position: inherit; left: 13px; top: -25px;"><strong><p style="color: white; font-size: 14px;">'+point.ordinalVisit+'</p></strong></span>'+'<span style="position: relative; center; top: 0px;" class="CustomerTimeVisit">'+text+'</span>';
			var title3 = '<span style="position: inherit; left: 15px; top: -25px;"><strong><p style="color: white; font-size: 14px;">'+point.ordinalVisit+'</p></strong></span>'+'<span style="position: relative; center; top: 0px;" class="CustomerTimeVisit">'+text+'</span>';
			if(point.ordinalVisit>9) {
				marker = new google.maps.Marker({
					   position: pt,
				       map: map,
				       title: (point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +' - ') + point.customerName,
				       icon: image//"<img src='"+image+"'/></br>"+title2
				    });
			} else if(0<=point.ordinalVisit<=9) {
				marker = new google.maps.Marker({
					   position: pt,
					   title: (point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +' - ')+ point.customerName,
				       map: map,
				       icon: image//"<img src='"+image+"'/></br>"+title2
				    });
			} else {
				marker = new google.maps.Marker({
					position: pt,
						title: (point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +' - ')+ point.customerName,
				       map: map,
				       icon: image//"<img src='"+image+"'/></br>"+title2
				    });
			}
			marker.customerId = point.id;
			marker.lat = point.lat;
			marker.lng = point.lng;
			
			google.maps.event.addListener(marker, "click", function(evt) {
				SuperviseSales.showCustomerDetail(this.customerId);
			});
			
			if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
				ViettelMap._listOverlay = new Array();
				ViettelMap._listOverlay.push(marker);
			} else {
				ViettelMap._listOverlay.push(marker);
			}
		}
	},
	calculateDistance:function(i,k){
		var n,l,h;var j;var c;var e;var a;var m;
		var d=i.latitude;
		var b=i.longitude;
		var g=k.latitude;
		var f=k.longitude;
		j=d*(Math.PI/180);
		c=b*(Math.PI/180);
		e=g*(Math.PI/180);
		a=f*(Math.PI/180);
		n=b-f;m=n*(Math.PI/180);
		h=Math.sin(j)*Math.sin(e)+Math.cos(j)*Math.cos(e)*Math.cos(m);
		h=Math.acos(h);
		l=h*180/Math.PI;
		l=l*60*1.1515;
		l=l*1.609344*1000;
		return Math.round(l);
	},
	loadMapWithMultiMarkerRouting : function(objId, lstPoint, centerPtLat, centerPtLng, zoom, callback) {
		ViettelMap.clearOverlays();
		$('#'+objId).html('');
		ViettelMap._map = new google.maps.Map(document.getElementById(objId));
		var map = ViettelMap._map;
		ViettelMap.clearOverlays();
		if(ViettelMap._currentInfoWindow != null) {
			ViettelMap._currentInfoWindow.close();
		}
		ViettelMap.fitOverLays();
		var lat=0;
		var lng=0;
	    if(!ViettelMap.isValidLatLng(centerPtLat,centerPtLng)){
	    	centerPtLat = ViettelMap._DEF_LAT;
	    	centerPtLng = ViettelMap._DEF_LNG;
		} else if(zoom == undefined || zoom == 0 || zoom == null){
			 zoom = ViettelMap._DEF_ZOOM;
		}		
	    map.setZoom(zoom);
	    var mapOptions = {
	    	zoomControl : true,
	    	zoomControlOptions : {
	    		position: google.maps.ControlPosition.RIGHT_CENTER
	    	},
	    	panControl : true,
	    	panControlOptions : {
	    		position: google.maps.ControlPosition.RIGHT_CENTER
	    	}
	    };
    	map.setOptions(mapOptions);	    
    	var center = 0;
		if(lstPoint!=undefined && lstPoint!=null){
			for(var i = 0; i < lstPoint.length; i++) {
				var point = lstPoint[i];
				if(!ViettelMap.isValidLatLng(point.lat,point.lng) && center ==0){
					lat = point.lat;
					lng = point.lng;
					center = 1;
				}
				ViettelMap.addMarkerCustomerRouting(point);
			}
		}
		if(center==0){
			lat = ViettelMap._DEF_LAT;
	    	lng = ViettelMap._DEF_LNG;
		}
		var pt = new google.maps.LatLng(lat, lng);
	    map.setCenter(pt);		
		setTimeout(function() {
			ViettelMap.fitOverLays();
		}, 10);		
		return map;
	},
	
	addMarkerCustomerRouting:function(point){
		var map = ViettelMap._map;
		if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
			var pt = new google.maps.LatLng(point.lat, point.lng);
			var marker = null;
			if (point.ordinalVisit == undefined || point.ordinalVisit == null) {
				point.ordinalVisit = 0;
			}
			if(isNaN(point.ordinalVisit) && point.ordinalVisit.length == 1) {
				marker = new google.maps.Marker({
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
						size : {height : 32, width : 32},
						scaledSize : {height : 32, width : 32}
					},
					position : pt,
					map : ViettelMap._map,
					title : point.ordinalVisit == 0 ? '' : '<span style="position: inherit; left: 47px; top: -25px;">'+point.ordinalVisit+'</span>',
					draggable : false					
				});
			} else if(!isNaN(point.ordinalVisit) && point.ordinalVisit <10) {
				marker = new google.maps.Marker({
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
						size : {height : 32, width : 32},
						scaledSize : {height : 32, width : 32}
					},
					position : pt,
					map : ViettelMap._map,
					title : point.ordinalVisit == 0 ? '' : '<span style="position: inherit; left: 45px; top: -25px;">'+point.ordinalVisit+'</span>',
					draggable : false
				});
			} else {
				marker = new google.maps.Marker({
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
						size : {height : 32, width : 32},
						scaledSize : {height : 32, width : 32}
					},
					position : pt,
					map : ViettelMap._map,
					title : point.ordinalVisit == 0 ? '' : '<span style="position: inherit; left: 41px; top: -25px;">'+point.ordinalVisit+'</span>',
					draggable : false
				});
			}
			marker.customerId = point.customerId;
			marker.lat = point.lat;
			marker.lng = point.lng;
			google.maps.event.addListener(marker, "click", function(evt) {
				SetRouting.showCustomerDetail(this.customerId);
			});
			if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
				ViettelMap._listOverlay = new Array();
				ViettelMap._listOverlay.push(marker);
			} else {
				ViettelMap._listOverlay.push(marker);
			}
		}
	}	
	
};

/**
 * Google Maps APIs for Map don hang Dashboard => Modify
 * @author Pi xa
 * @sine 14/11/2018
 */
var ViettelMapDonHang = {
		_DEF_LAT: 10.79418775,
		_DEF_LNG: 106.65682978,
		_DEF_LAT_BIG:  15.744675,
		_DEF_LNG_BIG: 107.515136,
		_DEF_ALL_ZOOM: 4,
		_DEF_ZOOM: 10,
		_DEF_ZOOM_BIG: 6,
		_map: null,
		_marker: null,
		_listMarker: null,
		_indexMarker: 0,
		sellerPositionMap: null,
		visitResultMap:null,
		_currentInfoWindow:null,
		_listOverlay:null,
		loadedResources:new Array(),
		OVERLAY_ZINDEX : 9,
		OVERLAY_ZINDEX_DEFAULT : 1,
		
		getBrowserName : function() {
			var browserName = "";
			var ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf("opera") != -1)
				browserName = "opera";
			else if (ua.indexOf("msie") != -1)
				browserName = "msie";
			else if (ua.indexOf("safari") != -1)
				browserName = "safari";
			else if (ua.indexOf("mozilla") != -1) {
				if (ua.indexOf("firefox") != -1)
					browserName = "firefox";
				else
					browserName = "mozilla";
			}
		},
		loadMapForImages: function(objId, lat, lng, zoom,type, custLat, custLng, isShowCus, zoomSize){
			if(!ViettelMapDonHang.isValidLatLng(lat,lng)){
				lat = ViettelMapDonHang._DEF_LAT_BIG;
				lng = ViettelMapDonHang._DEF_LNG_BIG;
				showMarker = false;
				if(zoom == null || zoom == undefined) {
					zoom = ViettelMapDonHang._DEF_ZOOM_BIG;
				}
			} else if(zoom == undefined || zoom == 0 || zoom == null){
				zoom = ViettelMapDonHang._DEF_ZOOM_BIG;
			}
			if (zoomSize != null){
				zoom = zoomSize;
			}
			ViettelMapDonHang.clearOverlays();
			$('.fancybox-inner #bigMap').html('');
			var __object = $('.fancybox-inner #bigMap')[0];
			ViettelMapDonHang._map = new google.maps.Map(__object);
			ViettelMapDonHang._map.setOptions({
//				zoomControl : true,
//				panControl : true,
				center: new google.maps.LatLng(custLat, custLng),
				zoom: zoom,
				disableDefaultUI: true
			});
			var map = ViettelMapDonHang._map; 
			//var showMarker = true;
			if (custLat == null || custLat <= 0){
				custLat = lat;
			}
			if (custLng == null || custLng <= 0){
				custLng = lng;
			}
			if(isShowCus != null && isShowCus){
				ViettelMapDonHang.addMarkerImages(null, null, custLat, custLng);
			}
			//var pt = new google.maps.LatLng(lat, lng);
		    //map.setCenter(pt);
		    //map.setZoom(zoom);
		    if(type != undefined && type != null && type == 1){//bản đồ mở rộng
		    	var mapOptions = {
		    			zoomControl : true,
			    		zoomControlOptions : {
			    			position: google.maps.ControlPosition.RIGHT_TOP
			    		},
			    		panControl : true,
			    		panControlOptions : {
			    			position: google.maps.ControlPosition.RIGHT_TOP
			    		},
			    		disableDefaultUI: true
			    	};
		    	map.setOptions(mapOptions);
		    }
			return map;
		},	
		addMarkerImages:function(lat,lng, custLat, custLng){
			ViettelMapDonHang._listOverlay = null;
			if(ViettelMapDonHang.isValidLatLng(lat, lng)) {
				if(ViettelMapDonHang.isValidLatLng(custLat, custLng)) {
					var pt = new google.maps.LatLng(lat, lng);
					var cusPt = new google.maps.LatLng(custLat, custLng);
					var distance = ViettelMapDonHang.CalculateDistance(pt, cusPt);
					var distanceStr = '';
					if(Number(distance) < 1000) {
						distanceStr = formatCurrency(distance) + ' m';
					} else {
						distance = Number(distance) / 1000;
						distanceStr = formatCurrency(distance) + ' km';
					}
					var title = $('#titlePopup').html();
					if(title.indexOf(distanceStr) == -1) {
						$('#titlePopup').html(title + ' - ' + distanceStr);
					}
					var marker = new google.maps.Marker({
						position : pt,
						labelContent : '<span style="position: inherit; left: -31px; font-size: 12px;font-weight: bold; top: -49px; width: 121px !important; text-align: center">'+distanceStr+'</span>',
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
							size : {height : 39, width : 20},
							scaledSize : {height : 39, width : 20}
						},
						map : ViettelMapDonHang._map,
						labelClass : "MarkerLabel",
						labelVisible : true,
						draggable : false,
						labelAnchor : new google.maps.Point(25, 0)
					});
					
					if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
						ViettelMapDonHang._listOverlay = new Array();
						ViettelMapDonHang._listOverlay.push(marker);
					} else {
						ViettelMapDonHang._listOverlay.push(marker);
					}
					
					var custMarker = new google.maps.Marker({
						position : cusPt,
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
							size : {height : 39, width : 20},
							scaledSize : {height : 39, width : 20}
						},
						map : ViettelMapDonHang._map,
						labelClass : "MarkerLabel",
						labelVisible : true,
						draggable : false,
						labelAnchor : new google.maps.Point(25, 0)
					});
					
					if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
						ViettelMapDonHang._listOverlay = new Array();
						ViettelMapDonHang._listOverlay.push(custMarker);
					} else {
						ViettelMapDonHang._listOverlay.push(custMarker);
					}
				} else {
					var pt = new google.maps.LatLng(lat, lng);
					var marker = new google.maps.Marker({
						position : pt,
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
							size : {height : 39, width : 20},
							scaledSize : {height : 39, width : 20}
						},
						map : ViettelMapDonHang._map,
						labelClass : "MarkerLabel",
						labelVisible : true,
						draggable : false,
						labelAnchor : new google.maps.Point(25, 0)
					});
					
					if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
						ViettelMapDonHang._listOverlay = new Array();
						ViettelMapDonHang._listOverlay.push(marker);
					} else {
						ViettelMapDonHang._listOverlay.push(marker);
					}
				}
			} else if(ViettelMapDonHang.isValidLatLng(custLat, custLng)) {
				var cusPt = new google.maps.LatLng(custLat, custLng);
				var custMarker = new google.maps.Marker({
					position : cusPt,
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/blue.png',
						size : {height : 39, width : 20},
						scaledSize : {height : 39, width : 20}
					},
					map : ViettelMapDonHang._map,
					labelClass : "MarkerLabel",
					labelVisible : true,
					draggable : false,
					labelAnchor : new google.maps.Point(25, 0)
				});
				
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(custMarker);
				} else {
					ViettelMapDonHang._listOverlay.push(custMarker);
				}
			}
			ViettelMapDonHang.fitOverLay();
		},
		CalculateDistance:function(i,k){
			var n,l,h;var j;var c;var e;var a;var m;
			var d=i.lat();
			var b=i.lng();
			var g=k.lat();
			var f=k.lng();
			j=d*(Math.PI/180);
			c=b*(Math.PI/180);
			e=g*(Math.PI/180);
			a=f*(Math.PI/180);
			n=b-f;m=n*(Math.PI/180);
			h=Math.sin(j)*Math.sin(e)+Math.cos(j)*Math.cos(e)*Math.cos(m);
			h=Math.acos(h);
			l=h*180/Math.PI;
			l=l*60*1.1515;
			l=l*1.609344*1000;
			return Math.round(l);
		},
		loadMapResource:function(callback){
			ViettelMapDonHang.loadResource(vtm_url, 'js',callback);
		},
		loadResource:function(filename, filetype, callback){
			if ($.inArray(filename, ViettelMapDonHang.loadedResources) == -1){
				if (filetype=="js"){ // if filename is a external JavaScript file
					var fileref=document.createElement('script');
					fileref.setAttribute("type","text/javascript");
					fileref.setAttribute("src", filename);
				}
				if (typeof fileref != "undefined"){
					if(callback != undefined){
						if(fileref.readyState){
							fileref.onreadystatechange = function (){
								if (fileref.readyState == 'loaded' || fileref.readyState == 'complete'){
									callback();
								}
							};
						} else {
							fileref.onload = callback;
						}
					}
					document.getElementsByTagName("head")[0].appendChild(fileref);
				}
				ViettelMapDonHang.loadedResources.push(filename);
			} else {
				if(callback != undefined){
					callback();
				}
			}
		},
		/** Kiem tra LatLng */
		isValidLatLng : function(lat,lng){
			if(lat==undefined || lng == undefined || lat== null || lng== null || lat == 0.0 || lng ==0.0 || lat<=0 || lng<=0){
				return false;
			}
			return true;
		},
		loadBigMap: function(objId, lat, lng, zoom,callback){
			ViettelMapDonHang._map = new google.maps.Map(document.getElementById(objId));
			var map = ViettelMapDonHang._map; 
			var showMarker = true;
			if(!ViettelMapDonHang.isValidLatLng(lat,lng)){
				lat = ViettelMapDonHang._DEF_LAT_BIG;
				lng = ViettelMapDonHang._DEF_LNG_BIG;
				showMarker = false;
				if(zoom == null || zoom == undefined) {
					zoom = ViettelMapDonHang._DEF_ZOOM_BIG;
				}
			} else if(zoom == undefined || zoom == 0 || zoom == null){
				zoom = ViettelMapDonHang._DEF_ZOOM_BIG;
			}
			var pt = new google.maps.LatLng(lat, lng);
		    map.setCenter(pt);
		    map.setZoom(zoom);
		    map.panTo(pt);
		    var mapOptions = {
		    		zoomControl : true,
		    		mapTypeControl: false,
		    		zoomControlOptions : {
		    			position: google.maps.ControlPosition.RIGHT_CENTER
		    		},
		    		panControl : false,
		    		panControlOptions : {
		    			position: google.maps.ControlPosition.RIGHT_CENTER
		    		}
		    	};
	    	map.setOptions(mapOptions);
		    if(ViettelMapDonHang.isValidLatLng(lat,lng) && showMarker){
		    	var marker = new google.maps.Marker({
					position : pt,
					map : ViettelMapDonHang._map,				
					labelClass : "MarkerLabel",
					labelVisible : true,
					draggable : false,
					labelAnchor : new google.maps.Point(25, 0)
				});			
			    if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
			    	ViettelMapDonHang._listOverlay = new Array();
			    	ViettelMapDonHang._listOverlay.push(marker);
				} else {
					ViettelMapDonHang._listOverlay.push(marker);
				}
		    }
		    google.maps.event.addListener(map, 'zoom_changed', function() {
		    	ViettelMapDonHang.hideShowTitleMarker();
		    	if (ViettelMapDonHang != null && ViettelMapDonHang._map != null && ViettelMapDonHang._map.getZoom() > 10){
		    		$('.cusNameSupMap').show();
		    	}else {
		    		$('.cusNameSupMap').hide();
		    	}
		    });
		    google.maps.event.addListener(map, "click", function(evt) {	    	
				var lat = evt.latLng.lat();
				var lng= evt.latLng.lng();
				if (callback != null)
					callback(lat, lng);
			});
			return map;	    
		},
		viewBigMap : function(arrParam, titleStr) {
			var html = $('#viewBigMap').html().trim();
			$('#viewBigMap').dialog({
				title: titleStr,
				closed: false,  
		        cache: false,
		        width: 850,
		        height: 500,
		        modal: true,
		        onOpen: function(){
		        	setTimeout(function(){
						var lat = arrParam.lat;
						var lng = arrParam.lng;
						if(Number(lat) == -1 && Number(lng) == -1){
							lat = null;
							lng = null;
						}
//						var zoom=17;
//						if(lat!='' && lng!=''){ 
//							zoom=15;
//						}
						var zoom = 10;
						if(!ViettelMapDonHang.isValidLatLng(lat,lng)){
							zoom = 10;
						} else if(zoom == undefined || zoom == 0 || zoom == null){
							zoom = 10;
						} else{
							zoom = 15;
						}
						ViettelMapDonHang._map = null;
						$('#bigMapContainer').html('');
						ViettelMapDonHang.loadBigMap('bigMapContainer',lat, lng ,zoom,function(lat, lng){
							ViettelMapDonHang.clearOverlays();
								$('#lat').val(lat);
								$('#lng').val(lng);
								var pt = new google.maps.LatLng(lat, lng);
						    	var marker = new google.maps.Marker({
									position : pt,
									map : ViettelMapDonHang._map,
									labelClass : "MarkerLabel",
									labelVisible : true,
									draggable : false,
									labelAnchor : new google.maps.Point(25, 0)
								});
								marker.lat = lat;
								marker.lng = lng;
							    if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
									ViettelMapDonHang._listOverlay = new Array();
									ViettelMapDonHang._listOverlay.push(marker);
								} else {
									ViettelMapDonHang._listOverlay.push(marker);
								}
						});
					}, 500);
		        },
		        onClose:function() {
//	        		$('#bigMapChange').html("");
		        	var lat = $('#lat').val();
					var lng = $('#lng').val();
					if(Number(lat) == -1 && Number(lng) == -1){
						lat = null;
						lng = null;
					}
					var zoom = 10;
					if(!ViettelMapDonHang.isValidLatLng(lat,lng)){
						zoom = 10;
					} else if(zoom == undefined || zoom == 0 || zoom == null){
						zoom = 10;
					} else{
						zoom = 15;
					}
					ViettelMapDonHang.addMarker(lat, lng);
					ViettelMapDonHang.loadBigMap('bigMapChange',lat, lng ,zoom,function(lat, lng){
						ViettelMapDonHang.clearOverlays();
						$('#lat').val(lat);
						$('#lng').val(lng);
						var pt = new google.maps.LatLng(lat, lng);
				    	var marker = new google.maps.Marker({
							position : pt,
							map : ViettelMapDonHang._map,
							labelClass : "MarkerLabel",
							labelVisible : true,
							draggable : false,
							labelAnchor : new google.maps.Point(25, 0)
						});
						marker.lat = lat;
						marker.lng = lng;
					    if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
							ViettelMapDonHang._listOverlay = new Array();
							ViettelMapDonHang._listOverlay.push(marker);
						} else {
							ViettelMapDonHang._listOverlay.push(marker);
						}
				});
//	        	$('#bigMapContainer').html(html);
		        }
			});
			
			return false;
		},
		clearOverlays: function() { 
			if(ViettelMapDonHang._listOverlay != null && ViettelMapDonHang._listOverlay != undefined) {
				if(ViettelMapDonHang._listOverlay instanceof Map) {
					for(var i = 0; i < ViettelMapDonHang._listOverlay.size(); i++) {
						var obj = ViettelMapDonHang._listOverlay.valArray[i];
						obj.setMap(null);
					}
				} else if(ViettelMapDonHang._listOverlay instanceof Array) {
					for(var i = 0; i < ViettelMapDonHang._listOverlay.length; i++) {
						var obj = ViettelMapDonHang._listOverlay[i];
						obj.setMap(null);
					}
				}
			}
			ViettelMapDonHang._listOverlay = null;
		},
		fitOverLay: function() {
			var bound = null;
			if(ViettelMapDonHang._listOverlay != null && ViettelMapDonHang._listOverlay != undefined) {
				if(ViettelMapDonHang._listOverlay instanceof Map) {
					for(var i = 0; i < ViettelMapDonHang._listOverlay.size(); i++) {
						var obj = ViettelMapDonHang._listOverlay.get(ViettelMapDonHang._listOverlay.keyArray[i]);
						if(obj instanceof google.maps.MarkerWithLabel) {
							if(ViettelMapDonHang.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
								var latlng = new google.maps.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
								bound = ViettelMapDonHang.getBound(bound, latlng);
							}
						} else {
							if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
								var latlng = new google.maps.LatLng(obj.lat, obj.lng);
								bound = ViettelMapDonHang.getBound(bound, latlng);
							}
						}
					}
				} else if(ViettelMapDonHang._listOverlay instanceof Array) {
					for(var i = 0; i < ViettelMapDonHang._listOverlay.length; i++) {
						var obj = ViettelMapDonHang._listOverlay[i];
//						if(obj instanceof google.maps.MarkerWithLabel) {
							if(ViettelMapDonHang.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
								var latlng = new google.maps.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
								bound = ViettelMapDonHang.getBound(bound, latlng);
							}
//						} else {
//							if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
//								var latlng = new google.maps.LatLng(obj.lat, obj.lng);
//								bound = ViettelMapDonHang.getBound(bound, latlng);
//							}
//						}
					}
				}
			}
			if(bound != null) {
				ViettelMapDonHang._map.fitBounds(bound);
			}
		},
		addMarkerStaff:function(point){
			var map = ViettelMapDonHang._map;
			if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
				var pt = new google.maps.LatLng(point.lat, point.lng);
				var info="<div id='info"+point.staffId+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
				var title=point.staffCode+" - "+point.staffName;//+point.visit;
				var image=point.image;
				var accuracy = point.accuracy;
				var createTime = point.createTime;
				
				var level = ViettelMapDonHang._map.getZoom();
				var markerContent = ''; 
				var markerContent = ''; 
				var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
				if(level >= 16) {
					markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
				} else {
					markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
				}
				markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
				var marker = new google.maps.Marker({
					icon:{
						url : image,
						size : {height : 39, width : 20},
						scaledSize : {height : 39, width : 20}
					},
					position : pt,
					map : ViettelMapDonHang._map,
					title : markerContent,			
					draggable : false				
				});
				marker.staffId = point.staffId;
				marker.lat = point.lat;
				marker.lng = point.lng;
				marker.accuracy = point.accuracy;
				marker.createTime = point.createTime;
				
//				$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);			
//				$('#marker'+point.staffId).parent().prev().bind('click', point, function(e) {
//					var point = this;
//					ViettelMapDonHang.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime); 
//				});
				google.maps.event.addListener(marker, "click", function(evt) {
					var point = this;//p
					ViettelMapDonHang.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime); 
				});
				ViettelMapDonHang.pushListOverlays(marker);
//				ViettelMapDonHang.pushListOverlays(marker);
			}
			ViettelMapDonHang.hideShowTitleMarker();
		},
		showInfoWindow:function(pt,html){
			if(ViettelMapDonHang._currentInfoWindow != null && ViettelMapDonHang._currentInfoWindow != undefined) {
				ViettelMapDonHang._currentInfoWindow.close();
			}
			var infoWindow = new google.maps.InfoWindow({ 
						content: html, 
						position: pt,
						maxWidth : 550
			});
			ViettelMapDonHang._currentInfoWindow = infoWindow;
			infoWindow.open(ViettelMapDonHang._map);
			setTimeout(function(){
				//$('.gm-style-iw').parent().children().next().first().children().first().css('width','150px');
				$('.gm-style-iw').parent().children().next().first().children().first().css('width','100%');
//				$('.gm-style-iw').css('height','350');
//				$('.gm-style-iw').parent().children().first().children().last().css('height','355');
			},300);
		},
		showWindowInfo:function(objectId,lat,lng,info,cur,time){		
			var pt = new google.maps.LatLng(lat, lng);
			if(objectId>0){
				if(ViettelMapDonHang._currentInfoWindow != null && ViettelMapDonHang._currentInfoWindow != undefined) {
					ViettelMapDonHang._currentInfoWindow.close();
				}
				ViettelMapDonHang.showInfoWindow(pt,"<div style='width:100%;text-align: center; min-width: 370px;'><img style='position: relative;top:20px;' src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>");
				var temp = SuperviseSales._lstStaffPosition.get(objectId);
				if(temp!=null){
					SuperviseSales._idStaffSelect=objectId;
					if (temp.roleType == NV){
						SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,NV);
					} else{  
						SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,GS);
					}
					//SuperviseSales.showDialogStaffInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode,temp.shopName,temp.createTime,temp.accuracy,pt);
				}
			}
		},
		addMarker: function(lat,lng){
			if(!ViettelMapDonHang.isValidLatLng(lat,lng)){
				return;
			}
			var latlng = new google.maps.LatLng(lat, lng);
	        if (ViettelMapDonHang._marker != null){
	        	ViettelMapDonHang._marker.setMap(null);
	        }
	        ViettelMapDonHang._marker = new google.maps.Marker({
	        	position: latlng,
	        	map: ViettelMapDonHang._map,
	        });
//	        ViettelMapDonHang._map.setCenter(latlng);
		},
		createLatLng: function(lat, lng){
			var latlng = new google.maps.LatLng(lat, lng);
			return latlng;
		},
		/*addMarkerImages:function(lat,lng){
			if(ViettelMapDonHang.isValidLatLng(lat, lng)) {
				var pt = new google.maps.LatLng(lat, lng);			
				var marker = new google.maps.Marker({
					position : pt,
					icon:{
						url : WEB_CONTEXT_PATH + '/resources/images/Mappin/red.png',
						size : {height : 39, width : 20},
						scaledSize : {height : 39, width : 20}
					},
					map : ViettelMapDonHang._map,				
					draggable : false
				});			
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(marker);
				} else {
					ViettelMapDonHang._listOverlay.push(marker);
				}
			}
		},*/
		
		//HÀM ADD DS Khách đặt hàng VÀO BẢN ĐỒ => Dashboard
		addMutilMarkerStaffDashboard : function(){
			var map = ViettelMapDonHang._map;
			if(ViettelMapDonHang._listMarker!=undefined && ViettelMapDonHang._listMarker!=null){
				var flag=0;
				var index=0;
				CommonStaffMapDonHang._itv =window.setInterval(function(){
					var j=0;
					for(var i=index,j=0;i<ViettelMapDonHang._listMarker.valArray.length;i++,index++,j++){
						if(j>100) break;
						var point = ViettelMapDonHang._listMarker.valArray[i];
						if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
							var pt = new google.maps.LatLng(point.lat, point.lng);
							var info="<div id='info"+point.orderNumber+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
//							var title=point.staffName;
							var title='Khách hàng: '+point.customerName;
							var image=point.image;
							var accuracy = point.accuracy;
							var createTime = point.createTime;
							var level = ViettelMapDonHang._map.getZoom();
							var markerContent = ''; 
							var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
							if(level >= 16) {
								markerBotoom = "<div id='bottom"+point.orderNumber+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
							} else {
								markerBotoom = "<div id='bottom"+point.orderNumber+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
							}
							markerContent = "<div id='marker"+point.orderNumber+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
							var marker = new google.maps.Marker({
								icon:{
									url : image,
									size : {height : 39, width : 20},
									scaledSize : {height : 39, width : 20}
								},
								position : pt,
								map : ViettelMapDonHang._map,
								title : title,							
								draggable : false
							});
							marker.orderNumber = point.orderNumber;
							marker.lat = point.lat;
							marker.lng = point.lng;
							marker.customerName = point.customerName;
							marker.accuracy = point.accuracy;
							marker.timeHHMM = point.timeHHMM;
							ViettelMapDonHang._map.setZoom(12);
							
							$('#marker'+point.orderNumber).parent().prev().css('z-index', 10000000);
//							google.maps.event.addListener(marker, "mouseover", function(evt) {
//								var point = this;//p1	
//								
////								ViettelMapDonHang.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime);
//							});
							ViettelMapDonHang.pushListOverlays(marker);
							
//							if(CommonStaffMap._lstStaffException.get(marker.staffId) != null) {
//								$('#marker'+marker.staffId).parent().parent().hide();
//							}
						}
					}
					if(index>=ViettelMapDonHang._listMarker.valArray.length){
						ViettelMapDonHang.hideShowTitleMarker();
//						SuperviseSales.showCustomer();
						if(CommonStaffMapDonHang._notFitOverlay==undefined || CommonStaffMapDonHang._notFitOverlay==null){
							ViettelMapDonHang.fitOverLays();
						}else if(CommonStaffMapDonHang._idStaffSelected!=null && CommonStaffMapDonHang._idStaffSelect==CommonStaffMapDonHang._idStaffSelected ){
							CommonStaffMapDonHang.moveToStaff(CommonStaffMapDonHang._idStaffSelect);
						}
						CommonStaffMapDonHang._notFitOverlay=null;
						window.clearInterval(CommonStaffMapDonHang._itv);
					}
					if(CommonStaffMapDonHang._idStaffSelect != null || CommonStaffMapDonHang._idStaffSelected != null) {
						
					} else {
						ViettelMapDonHang.fitOverLays();
					}
					ViettelMapDonHang.hideShowTitleMarker();
				},300); 
			}
			
		},
		
		//HÀM ADD DS NHÂN VIÊN VÀO BẢN ĐỒ => Giám sát
		addMutilMarkerStaff : function(){
			var map = ViettelMapDonHang._map;
			if(ViettelMapDonHang._listMarker!=undefined && ViettelMapDonHang._listMarker!=null){
				var flag=0;
				var index=0;
				SuperviseSales._itv =window.setInterval(function(){
					var j=0;
					for(var i=index,j=0;i<ViettelMapDonHang._listMarker.valArray.length;i++,index++,j++){
						if(j>100) break;
						var point = ViettelMapDonHang._listMarker.valArray[i];
						if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
							var pt = new google.maps.LatLng(point.lat, point.lng);
							var info="<div id='info"+point.staffId+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
							var title=point.staffName;
							var image=point.image;
							var accuracy = point.accuracy;
							var createTime = point.createTime;
							var level = ViettelMapDonHang._map.getZoom();
							var markerContent = ''; 
							var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
							if(level >= 16) {
								markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
							} else {
								markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
							}
							markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
							var marker = new google.maps.Marker({
								icon:{
									url : image,
									size : {height : 39, width : 20},
									scaledSize : {height : 39, width : 20}
								},
								position : pt,
								map : ViettelMapDonHang._map,
								title : title,							
								draggable : false
							});
							marker.staffId = point.staffId;
							marker.lat = point.lat;
							marker.lng = point.lng;
							marker.accuracy = point.accuracy;
							marker.createTime = point.createTime;
							
							$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
							google.maps.event.addListener(marker, "click", function(evt) {
								var point = this;//p1							
								ViettelMapDonHang.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime);
							});
							ViettelMapDonHang.pushListOverlays(marker);
							
							if(SuperviseSales._lstStaffException.get(marker.staffId) != null) {
								$('#marker'+marker.staffId).parent().parent().hide();
							}
						}
					}
					if(index>=ViettelMapDonHang._listMarker.valArray.length){
						ViettelMapDonHang.hideShowTitleMarker();
//						SuperviseSales.showCustomer();
						if(SuperviseSales._notFitOverlay==undefined || SuperviseSales._notFitOverlay==null){
							ViettelMapDonHang.fitOverLays();
						}else if(SuperviseSales._idStaffSelected!=null && SuperviseSales._idStaffSelect==SuperviseSales._idStaffSelected ){
							SuperviseSales.moveToStaff(SuperviseSales._idStaffSelect);
						}
						SuperviseSales._notFitOverlay=null;
						window.clearInterval(SuperviseSales._itv);
					}
					if(SuperviseSales._idStaffSelect != null || SuperviseSales._idStaffSelected != null) {
						
					} else {
						ViettelMapDonHang.fitOverLays();
					}
					ViettelMapDonHang.hideShowTitleMarker();
				},300); 
			}
			
		},
		fitOverLays: function() {
			var bound = null;
			if(ViettelMapDonHang._listOverlay != null && ViettelMapDonHang._listOverlay != undefined) {
				if(ViettelMapDonHang._listOverlay instanceof Map) {
					for(var i = 0; i < ViettelMapDonHang._listOverlay.size(); i++) {
						var obj = ViettelMapDonHang._listOverlay.get(ViettelMapDonHang._listOverlay.keyArray[i]);
						if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new google.maps.LatLng(obj.lat, obj.lng);
							bound = ViettelMapDonHang.getBound(bound, latlng);
						}
					}
				} else if(ViettelMapDonHang._listOverlay instanceof Array) {
					for(var i = 0; i < ViettelMapDonHang._listOverlay.length; i++) {
						var obj = ViettelMapDonHang._listOverlay[i];
						if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new google.maps.LatLng(obj.lat, obj.lng);
							bound = ViettelMapDonHang.getBound(bound, latlng);
						}
					}
				}
			}
			if(bound != null) {
				ViettelMapDonHang._map.fitBounds(bound);
			}
		},
		pushListOverlays:function(marker){
			if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
				ViettelMapDonHang._listOverlay = new Array();
				ViettelMapDonHang._listOverlay.push(marker);
			} else {
				ViettelMapDonHang._listOverlay.push(marker);
			}	
		},
		getBound: function(bound, latlng) {
			if(bound == null || bound == undefined) {
				bound = new google.maps.LatLngBounds(latlng, latlng);
			} else {
				var lat = latlng.lat();
				var lng = latlng.lng();
				
	          	var swLat = bound.getSouthWest().lat();
	          	var swLng = bound.getSouthWest().lng();
	          	var neLat = bound.getNorthEast().lat();
	          	var neLng = bound.getNorthEast().lng();
	          
				if(bound.getSouthWest().lat() > lat) {
					swLat = lat;
				}
				if(bound.getSouthWest().lng() > lng) {
					swLng = lng;
				}
				if(bound.getNorthEast().lat() < lat) {
					neLat = lat;
				}
				if(bound.getNorthEast().lng() < lng) {
					neLng = lng;
				}
				
				var sw = new google.maps.LatLng(swLat, swLng);
				var ne = new google.maps.LatLng(neLat, neLng);
				
				bound = new google.maps.LatLngBounds(sw, ne);
			}
			return bound;
		},
		hideShowTitleMarker:function(){
			if(ViettelMapDonHang._map.getZoom()>=13){
	    		$('.Top').show();
	    		if(ViettelMapDonHang._map.getZoom()>=16){
		    		$('.Bottom').show();
		    	}else{
		    		$('.Bottom').hide();
		    	}
	    	}else{
	    		$('.Top').hide();
	    		$('.Bottom').hide();
	    	}
		},
		/** Giam sat */
		addMarkerCust : function(point){
			if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
				var pt = new google.maps.LatLng(point.lat, point.lng);
				var map = ViettelMapDonHang._map;
				map.setCenter(pt);
				map.setZoom(ViettelMapDonHang._DEF_ZOOM);
				map.panTo(pt);
				var myStyles =[
	               {
	                   featureType: "poi",
	                   elementType: "labels",
	                   stylers: [
	                         { visibility: "off" }
	                   ]
	               }
	            ];
				var mapOptions = {
						zoomControl : true,
						zoomControlOptions : {
							position: google.maps.ControlPosition.RIGHT_CENTER
						},
						panControl : true,
						panControlOptions : {
							position: google.maps.ControlPosition.RIGHT_CENTER
						},
						styles: myStyles
					};
				map.setOptions(mapOptions);
				var image = '';
				if(point.image == 'Customers1Status') {//co don hang
					image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png';
				} else if(point.image == 'Customers2Status') {//chua ghe tham
					image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_green.png';
				} else if(point.image == 'Customers3Status') {//dang ghe tham
					image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_orange.png';
				} else if(point.image == 'Customers4Status') {//Ghe tham khong co don dat hang
					image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_red.png';
				} else if(point.image == 'Customers5Status') {//kh ngoai tuyen
					image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_yellow.png';
				}		
				var marker = null;			
				var text = '';
				if(point.ordinalAndTimeVisitReal != undefined && point.ordinalAndTimeVisitReal != '' && point.ordinalAndTimeVisitReal != null){
					text = point.ordinalAndTimeVisitReal;
				}
				var title1 = '<span style="position: inherit; left: 9px; top: -24px;"><strong><p style="color: white; font-size: 14px;">'+point.ordinalVisit+'</p></strong></span>'+'<span style="position: relative; center; top: 0px;" class="CustomerTimeVisit">'+text+'</span>';
				var title2 = '<span style="position: inherit; left: 13px; top: -25px;"><strong><p style="color: white; font-size: 14px;">'+point.ordinalVisit+'</p></strong></span>'+'<span style="position: relative; center; top: 0px;" class="CustomerTimeVisit">'+text+'</span>';
				var title3 = '<span style="position: inherit; left: 15px; top: -25px;"><strong><p style="color: white; font-size: 14px;">'+point.ordinalVisit+'</p></strong></span>'+'<span style="position: relative; center; top: 0px;" class="CustomerTimeVisit">'+text+'</span>';
				if(point.ordinalVisit>9) {
					marker = new google.maps.Marker({
						   position: pt,
					       map: map,
					       title: (point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +' - ') + point.customerName,
					       icon: image//"<img src='"+image+"'/></br>"+title2
					    });
				} else if(0<=point.ordinalVisit<=9) {
					marker = new google.maps.Marker({
						   position: pt,
						   title: (point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +' - ')+ point.customerName,
					       map: map,
					       icon: image//"<img src='"+image+"'/></br>"+title2
					    });
				} else {
					marker = new google.maps.Marker({
						position: pt,
							title: (point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +' - ')+ point.customerName,
					       map: map,
					       icon: image//"<img src='"+image+"'/></br>"+title2
					    });
				}
				marker.customerId = point.id;
				marker.lat = point.lat;
				marker.lng = point.lng;
				
				google.maps.event.addListener(marker, "click", function(evt) {
					SuperviseSales.showCustomerDetail(this.customerId);
				});
				
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(marker);
				} else {
					ViettelMapDonHang._listOverlay.push(marker);
				}
			}
		},
		calculateDistance:function(i,k){
			var n,l,h;var j;var c;var e;var a;var m;
			var d=i.latitude;
			var b=i.longitude;
			var g=k.latitude;
			var f=k.longitude;
			j=d*(Math.PI/180);
			c=b*(Math.PI/180);
			e=g*(Math.PI/180);
			a=f*(Math.PI/180);
			n=b-f;m=n*(Math.PI/180);
			h=Math.sin(j)*Math.sin(e)+Math.cos(j)*Math.cos(e)*Math.cos(m);
			h=Math.acos(h);
			l=h*180/Math.PI;
			l=l*60*1.1515;
			l=l*1.609344*1000;
			return Math.round(l);
		},
		loadMapWithMultiMarkerRouting : function(objId, lstPoint, centerPtLat, centerPtLng, zoom, callback) {
			ViettelMapDonHang.clearOverlays();
			$('#'+objId).html('');
			ViettelMapDonHang._map = new google.maps.Map(document.getElementById(objId));
			var map = ViettelMapDonHang._map;
			ViettelMapDonHang.clearOverlays();
			if(ViettelMapDonHang._currentInfoWindow != null) {
				ViettelMapDonHang._currentInfoWindow.close();
			}
			ViettelMapDonHang.fitOverLays();
			var lat=0;
			var lng=0;
		    if(!ViettelMapDonHang.isValidLatLng(centerPtLat,centerPtLng)){
		    	centerPtLat = ViettelMapDonHang._DEF_LAT;
		    	centerPtLng = ViettelMapDonHang._DEF_LNG;
			} else if(zoom == undefined || zoom == 0 || zoom == null){
				 zoom = ViettelMapDonHang._DEF_ZOOM;
			}		
		    map.setZoom(zoom);
		    var mapOptions = {
		    	zoomControl : true,
		    	zoomControlOptions : {
		    		position: google.maps.ControlPosition.RIGHT_CENTER
		    	},
		    	panControl : true,
		    	panControlOptions : {
		    		position: google.maps.ControlPosition.RIGHT_CENTER
		    	}
		    };
	    	map.setOptions(mapOptions);	    
	    	var center = 0;
			if(lstPoint!=undefined && lstPoint!=null){
				for(var i = 0; i < lstPoint.length; i++) {
					var point = lstPoint[i];
					if(!ViettelMapDonHang.isValidLatLng(point.lat,point.lng) && center ==0){
						lat = point.lat;
						lng = point.lng;
						center = 1;
					}
					ViettelMapDonHang.addMarkerCustomerRouting(point);
				}
			}
			if(center==0){
				lat = ViettelMapDonHang._DEF_LAT;
		    	lng = ViettelMapDonHang._DEF_LNG;
			}
			var pt = new google.maps.LatLng(lat, lng);
		    map.setCenter(pt);		
			setTimeout(function() {
				ViettelMapDonHang.fitOverLays();
			}, 10);		
			return map;
		},
		
		addMarkerCustomerRouting:function(point){
			var map = ViettelMapDonHang._map;
			if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
				var pt = new google.maps.LatLng(point.lat, point.lng);
				var marker = null;
				if (point.ordinalVisit == undefined || point.ordinalVisit == null) {
					point.ordinalVisit = 0;
				}
				if(isNaN(point.ordinalVisit) && point.ordinalVisit.length == 1) {
					marker = new google.maps.Marker({
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
							size : {height : 32, width : 32},
							scaledSize : {height : 32, width : 32}
						},
						position : pt,
						map : ViettelMapDonHang._map,
						title : point.ordinalVisit == 0 ? '' : '<span style="position: inherit; left: 47px; top: -25px;">'+point.ordinalVisit+'</span>',
						draggable : false					
					});
				} else if(!isNaN(point.ordinalVisit) && point.ordinalVisit <10) {
					marker = new google.maps.Marker({
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
							size : {height : 32, width : 32},
							scaledSize : {height : 32, width : 32}
						},
						position : pt,
						map : ViettelMapDonHang._map,
						title : point.ordinalVisit == 0 ? '' : '<span style="position: inherit; left: 45px; top: -25px;">'+point.ordinalVisit+'</span>',
						draggable : false
					});
				} else {
					marker = new google.maps.Marker({
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
							size : {height : 32, width : 32},
							scaledSize : {height : 32, width : 32}
						},
						position : pt,
						map : ViettelMapDonHang._map,
						title : point.ordinalVisit == 0 ? '' : '<span style="position: inherit; left: 41px; top: -25px;">'+point.ordinalVisit+'</span>',
						draggable : false
					});
				}
				marker.customerId = point.customerId;
				marker.lat = point.lat;
				marker.lng = point.lng;
				google.maps.event.addListener(marker, "click", function(evt) {
					SetRouting.showCustomerDetail(this.customerId);
				});
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(marker);
				} else {
					ViettelMapDonHang._listOverlay.push(marker);
				}
			}
		}	
		
	};

var VTMapUtil = {
	loadedResources:new Array(),
	OVERLAY_ZINDEX : 9,
	OVERLAY_ZINDEX_DEFAULT : 1,
	getBrowserName : function() {
		var browserName = "";
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("opera") != -1)
			browserName = "opera";
		else if (ua.indexOf("msie") != -1)
			browserName = "msie";
		else if (ua.indexOf("safari") != -1)
			browserName = "safari";
		else if (ua.indexOf("mozilla") != -1) {
			if (ua.indexOf("firefox") != -1)
				browserName = "firefox";
			else
				browserName = "mozilla";
		}
	},
	loadMapResource:function(callback){
		VTMapUtil.loadResource(vtm_url, 'js',callback);
	},
	loadResource:function(filename, filetype, callback){
		if ($.inArray(filename, VTMapUtil.loadedResources) == -1){
			if (filetype=="js"){ // if filename is a external JavaScript file
				var fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
			}
			if (typeof fileref != "undefined"){
				if(callback != undefined){
					if(fileref.readyState){
						fileref.onreadystatechange = function (){
							if (fileref.readyState == 'loaded' || fileref.readyState == 'complete'){
								callback();
							}
						};
					} else {
						fileref.onload = callback;
					}
				}
				document.getElementsByTagName("head")[0].appendChild(fileref);
			}
			VTMapUtil.loadedResources.push(filename);
		} else {
			if(callback != undefined){
				callback();
			}
		}
	}
};