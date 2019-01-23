/**
   APIs Viettel Maps
 * @author tientv11, tulv2
 * @sine 05/05/2014
 */
var ViettelMap = {
	_map: null,
	//_listOverlay: null,
	/** Tai du lieu ban do nen luc load trang */
	loadedResources:new Array(),
	OVERLAY_ZINDEX : 9,
	OVERLAY_ZINDEX_DEFAULT : 1,
	_DEF_LAT: 10.79418775,
	_DEF_LNG: 106.65682978,
	_DEF_LAT_BIG: 15.744675,
	_DEF_LNG_BIG: 107.515136,
	_DEF_ALL_ZOOM: 4,
	_DEF_ZOOM: 10,
	_DEF_ZOOM_BIG: 6, 
	_listMarker: null,//DANH SÁCH TỌA ĐỘ NHÂN VIÊN
	_listOverlay:null,//Danh sach marker cần xóa
	_currentInfoWindow:null,//pop thông tin
	getBrowserName : function() {			
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
		ViettelMap._map = new viettel.Map(__object);
		ViettelMap._map.setOptions({
//			overviewMapControl : false,
			center: new viettel.LatLng(lat, lng),
			zoom: zoom,
			disableDefaultUI: true
		});
		var map = ViettelMap._map; 
		map.setZoom(zoom);
		//var showMarker = true;
		if (custLat == null || custLat <= 0 ){
			custLat = lat;
		}
		if (custLng == null || custLng <= 0){
			custLng = lng;
		}
		if(isShowCus != null && isShowCus){
			ViettelMap.addMarkerImages(null, null, custLat, custLng);
		}
		var pt = new viettel.LatLng(lat, lng);
	    map.setCenter(pt);
	    map.setZoom(zoom);
	    if(type != undefined && type != null && type == 1){//bản đồ mở rộng
	    	var mapOptions = {
		    		panZoomControl: enable,
		    		panZoomControlOptions : {
		    			position: viettel.ControlPosition.RIGHT_TOP
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
				var pt = new viettel.LatLng(lat, lng);
				var cusPt = new viettel.LatLng(custLat, custLng);
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
				var marker = new viettel.LabelMarker({
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
					labelAnchor : new viettel.Point(25, 0)
				});
				
				if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
					ViettelMap._listOverlay = new Array();
					ViettelMap._listOverlay.push(marker);
				} else {
					ViettelMap._listOverlay.push(marker);
				}
				
				var custMarker = new viettel.LabelMarker({
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
					labelAnchor : new viettel.Point(25, 0)
				});
				
				if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
					ViettelMap._listOverlay = new Array();
					ViettelMap._listOverlay.push(custMarker);
				} else {
					ViettelMap._listOverlay.push(custMarker);
				}
			} else {
				var pt = new viettel.LatLng(lat, lng);
				var marker = new viettel.LabelMarker({
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
					labelAnchor : new viettel.Point(25, 0)
				});
				
				if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
					ViettelMap._listOverlay = new Array();
					ViettelMap._listOverlay.push(marker);
				} else {
					ViettelMap._listOverlay.push(marker);
				}
			}
		} else if(ViettelMap.isValidLatLng(custLat, custLng)) {
			var cusPt = new viettel.LatLng(custLat, custLng);
			var custMarker = new viettel.LabelMarker({
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
				labelAnchor : new viettel.Point(25, 0)
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
			var fileref = null;
			if (filetype=="js"){ 
				fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
			}
			if (fileref != null && fileref !=undefined){
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
	isValidLatLng: function(lat,lng){
		if(lat==undefined || lng == undefined || lat== null || lng== null || lat <= 0.0 || lng <= 0.0){
			return false;
		}
		return true;
	},
	loadBigMap: function(objId, lat, lng, zoom,callback){			
		ViettelMap._map = new viettel.Map(document.getElementById(objId));
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
		var pt = new viettel.LatLng(lat, lng);
	    map.setCenter(pt);
	    map.setZoom(zoom);
	    var mapOptions = {
		    	panZoomControl: enable,
	    		panZoomControlOptions : {
	    			position: viettel.ControlPosition.RIGHT_BOTTOM
	    		}
	    	};
    	map.setOptions(mapOptions);
    	if(lat!='' && lat!=null && lng!='' && lng!=null && showMarker){
	    	var marker = new viettel.LabelMarker({
				position : pt,
				map : ViettelMap._map,
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new viettel.Point(25, 0)
			});
			marker.lat = lat;
			marker.lng = lng;
		    if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
				ViettelMap._listOverlay = new Array();
				ViettelMap._listOverlay.push(marker);
			} else {
				ViettelMap._listOverlay.push(marker);
			}
	    }
	    viettel.Events.addListener(map, 'zoom_changed', function() {
	    	ViettelMap.hideShowTitleMarker();
	    	if (ViettelMap != null && ViettelMap._map != null && ViettelMap._map.getZoom() > 8){
	    		$('.staffPosMarker').show();
	    	}else {
	    		$('.staffPosMarker').hide();
	    	}
	    });
	    viettel.Events.addListener(map, "click", function(evt) {
			var lat=evt.latLng.lat();
			var lng=evt.latLng.lng();
			if (callback != null)
				callback(lat, lng);
		});
		return map;
	},
	// Load map VTNV for dashboard
	loadBigMap_VTNV: function(objId, lat, lng, zoom,callback){			
		ViettelMap._map = new viettel.Map(document.getElementById(objId));
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
		var pt = new viettel.LatLng(lat, lng);
	    map.setCenter(pt);
	    map.setZoom(zoom);
	    var mapOptions = {
		    	panZoomControl: enable,
	    		panZoomControlOptions : {
	    			position: viettel.ControlPosition.RIGHT_BOTTOM
	    		}
	    	};
    	map.setOptions(mapOptions);
    	if(lat!='' && lat!=null && lng!='' && lng!=null && showMarker){
	    	var marker = new viettel.LabelMarker({
				position : pt,
				map : ViettelMap._map,
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new viettel.Point(25, 0)
			});
			marker.lat = lat;
			marker.lng = lng;
		    if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
				ViettelMap._listOverlay = new Array();
				ViettelMap._listOverlay.push(marker);
			} else {
				ViettelMap._listOverlay.push(marker);
			}
	    }
	    viettel.Events.addListener(map, 'zoom_changed', function() {
	    	ViettelMap.hideShowTitleMarker();
	    	if (ViettelMap != null && ViettelMap._map != null && ViettelMap._map.getZoom() > 8){
	    		$('.staffPosMarker').show();
	    	}else {
//	    		$('.staffPosMarker').hide();
	    	}
	    });
	    viettel.Events.addListener(map, "click", function(evt) {
			var lat=evt.latLng.lat();
			var lng=evt.latLng.lng();
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
					var zoom=17;
					if(lat!='' && lng!=''){ 
						zoom=10;
					}
					ViettelMap._map = null;
					$('#bigMapContainer').html('');
					ViettelMap.loadBigMap('bigMapContainer',lat, lng ,zoom,function(lat, lng){
						ViettelMap.clearOverlays();
							$('#lat').val(lat);
							$('#lng').val(lng);
							var pt = new viettel.LatLng(lat, lng);
					    	var marker = new viettel.LabelMarker({
								position : pt,
								map : ViettelMap._map,
								labelClass : "MarkerLabel",
								labelVisible : true,
								draggable : false,
								labelAnchor : new viettel.Point(25, 0)
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
        		$('#bigMapChange').html("");
	        	var lat = $('#lat').val();
				var lng = $('#lng').val();
				if(Number(lat) == -1 && Number(lng) == -1){
					lat = null;
					lng = null;
				}
				ViettelMap.addMarker(lat, lng);
				ViettelMap.loadBigMap('bigMapChange',lat, lng ,14,function(lat, lng){
					ViettelMap.clearOverlays();
					$('#lat').val(lat);
					$('#lng').val(lng);
					var pt = new viettel.LatLng(lat, lng);
			    	var marker = new viettel.LabelMarker({
						position : pt,
						map : ViettelMap._map,
						labelClass : "MarkerLabel",
						labelVisible : true,
						draggable : false,
						labelAnchor : new viettel.Point(25, 0)
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
        	$('#bigMapContainer').html(html);
	        }
		});
		
		return false;
	},
	addMarker: function(lat,lng){
		if(!ViettelMap.isValidLatLng(lat,lng)){
			return;
		}
		var latlng = new viettel.LatLng(lat, lng);
        if (ViettelMap._marker != null){
        	ViettelMap._marker.setMap(null);
        }
        ViettelMap._marker = new viettel.Marker({
        	position: latlng,
        	map: ViettelMap._map
        });
//        ViettelMap._map.setCenter(latlng);
	},
	createLatLng: function(lat, lng){
		var latlng = new viettel.LatLng(lat, lng);
		return latlng;
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
	
	//HÀM ADD DS NHÂN VIÊN VÀO BẢN ĐỒ => Dashboard
	addMutilMarkerStaffDashboard:function(){
		if(ViettelMap._listMarker!=undefined && ViettelMap._listMarker!=null){
			CommonStaffMap._itv =window.setInterval(function(){
				var j=0;
				var index=0;
				for(var i=index,j=0;i<ViettelMap._listMarker.valArray.length;i++,index++,j++){
//					if(j>100) break;
					var point = ViettelMap._listMarker.valArray[i];
					if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
						var pt = new viettel.LatLng(point.lat, point.lng);
						var info="<div id='info"+point.staffId+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
//						var title=point.staffName;
						var title='Nhân viên: '+point.staffName+'\nĐăng nhập lúc: '+point.timeHHMM;
//						var title=point.staffName;
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
						
						
						var marker = new viettel.LabelMarker({
							icon:{
								url : image,
								size : {height : 39, width : 20},
								scaledSize : {height : 39, width : 20}
							},
							position : pt,
							map : ViettelMap._map,
//							labelContent : markerContent,
							labelContent: '<div title="'+title+'" style="left: 34px;width: 25px;position: absolute;height: 40px; display: inline;" class="staffPosMarker"></div>',
							labelClass : "MarkerLabel",
							title : title,
							labelVisible : true,
							draggable : false,
							labelAnchor : new viettel.Point(40, 40)
						});
						marker.staffId = point.staffId;
						marker.lat = point.lat;
						marker.lng = point.lng;
						marker.accuracy = point.accuracy;
						marker.createTime = point.createTime;
						ViettelMap._map.setZoom(8);
						$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
//						viettel.Events.addListener(marker, "zoom_changed", function() {
//							if (ViettelMap != null && ViettelMap._map != null && ViettelMap._map.getZoom() > 8){
//					    		$('.staffPosMarker').show();
//					    	}
//						});
						
						ViettelMap.pushListOverlays(marker);
						
//						if(CommonStaffMap._lstStaffException.get(marker.staffId) != null) {
//							$('#marker'+marker.staffId).parent().parent().hide();
//						}
					}
				}
				if(index>=ViettelMap._listMarker.valArray.length){
					ViettelMap.hideShowTitleMarker();
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
		
		/*setTimeout(function(){
			if ($('.olLayerDiv[dir=ltr]').children().find('div').length > 0){
				$('.olLayerDiv[dir=ltr]').children().find('div').css('width', 102);
			}
		}, 100);*/
	},
	
	//HÀM ADD DS NHÂN VIÊN VÀO BẢN ĐỒ
	addMutilMarkerStaff:function(){
		if(ViettelMap._listMarker!=undefined && ViettelMap._listMarker!=null){
			SuperviseSales._itv =window.setInterval(function(){
				var j=0;
				var index=0;
				for(var i=index,j=0;i<ViettelMap._listMarker.valArray.length;i++,index++,j++){
//					if(j>100) break;
					var point = ViettelMap._listMarker.valArray[i];
					if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
						var pt = new viettel.LatLng(point.lat, point.lng);
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
						
						
						var marker = new viettel.LabelMarker({
							icon:{
								url : image,
								size : {height : 39, width : 20},
								scaledSize : {height : 39, width : 20}
							},
							position : pt,
							map : ViettelMap._map,
//							labelContent : markerContent,
							labelContent: '<span style="color: blue;font-size:12px;" class="staffPosMarker" >'+title+'</span>',
							labelClass : "MarkerLabel",
							labelVisible : true,
							draggable : false,
							labelAnchor : new viettel.Point(80, 0)
						});
						marker.staffId = point.staffId;
						marker.lat = point.lat;
						marker.lng = point.lng;
						marker.accuracy = point.accuracy;
						marker.createTime = point.createTime;
						$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
						viettel.Events.addListener(marker, "click", function(evt) {
							var point=evt.object;
							SuperviseSales.resetPathViewer();	// clear path
							if($('.StaffSelectBtmSection .OffStyle').length==1){// show (display:block) danh sách đơn vị quản lý để load lại cây
								$('#titleStaff').addClass('OnStyle');
								$('#titleStaff').removeClass('OffStyle');
								$('#listStaff').toggle();
							}
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
		
		/*setTimeout(function(){
			if ($('.olLayerDiv[dir=ltr]').children().find('div').length > 0){
				$('.olLayerDiv[dir=ltr]').children().find('div').css('width', 102);
			}
		}, 100);*/
	},
	fitOverLay: function() {
		var bound = null;
		if(ViettelMap._listOverlay != null && ViettelMap._listOverlay != undefined) {
			if(ViettelMap._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMap._listOverlay.size(); i++) {
					var obj = ViettelMap._listOverlay.get(ViettelMap._listOverlay.keyArray[i]);
					if(obj instanceof viettel.LabelMarker) {
						if(ViettelMap.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
							var latlng = new viettel.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
							bound = ViettelMap.getBound(bound, latlng);
						}
					} else {
						if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new viettel.LatLng(obj.lat, obj.lng);
							bound = ViettelMap.getBound(bound, latlng);
						}
					}
				}
			} else if(ViettelMap._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMap._listOverlay.length; i++) {
					var obj = ViettelMap._listOverlay[i];
					if(obj instanceof viettel.LabelMarker) {
						if(ViettelMap.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
							var latlng = new viettel.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
							bound = ViettelMap.getBound(bound, latlng);
						}
					} else {
						if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new viettel.LatLng(obj.lat, obj.lng);
							bound = ViettelMap.getBound(bound, latlng);
						}
					}
				}
			}
		}
		if(bound != null) {
			ViettelMap._map.fitBounds(bound);
		}
	},
	fitOverLays: function() {
		var bound = null;
		if(ViettelMap._listOverlay != null && ViettelMap._listOverlay != undefined) {
			if(ViettelMap._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMap._listOverlay.size(); i++) {
					var obj = ViettelMap._listOverlay.get(ViettelMap._listOverlay.keyArray[i]);
					if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
						var latlng = new viettel.LatLng(obj.lat, obj.lng);
						bound = ViettelMap.getBound(bound, latlng);
					}
				}
			} else if(ViettelMap._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMap._listOverlay.length; i++) {
					var obj = ViettelMap._listOverlay[i];
					if(ViettelMap.isValidLatLng(obj.lat, obj.lng)) {
						var latlng = new viettel.LatLng(obj.lat, obj.lng);
						bound = ViettelMap.getBound(bound, latlng);
					}
				}
			}
		}
		if(bound != null) {
			ViettelMap._map.fitBounds(bound);
		}
	},
	//HAM ADD TOA DO NHAN VIEN VAO _listOverlay DE XOA DANH SACH MARKER TREN BANG DO
	pushListOverlays:function(marker){
		if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
			ViettelMap._listOverlay = new Array();
			ViettelMap._listOverlay.push(marker);
		} else {
			ViettelMap._listOverlay.push(marker);
		}	
	},
	//HÀM SET LẠI BẢN ĐỒ ĐỂ THẤY TOÀN BỘ CÁC MARKER
	getBound: function(bound, latlng) {
		if(bound == null || bound == undefined) {
			bound = new viettel.LatLngBounds(latlng, latlng);
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
			
			var sw = new viettel.LatLng(swLat, swLng);
			var ne = new viettel.LatLng(neLat, neLng);
			
			bound = new viettel.LatLngBounds(sw, ne);
		}
		return bound;
	},
	//HAM SHOW THONG TIN NHAN VIEN TREN BAN DO
	showInfoWindow:function(pt,html, width){
		if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
			ViettelMap._currentInfoWindow.close();
		}
		if (width == null || width == undefined){
			if($('#language').val() == 'en'){
				width = 450;
			}else{
				width = 370;
			}
		}
		var infoWindow = new viettel.InfoWindow({ content: html, position: pt, maxWidth: width, zIndex: 1000000 });
		ViettelMap._currentInfoWindow = infoWindow;
		infoWindow.open(ViettelMap._map);
		setTimeout(function(){
			SuperviseSales.resizeInfoWindow();
		}, 500);
		setTimeout(function(){
			if ($('a.close').length > 0){
				var html = $('a.close')[0].outerHTML;
				$('a.close').remove();			
				$('div.olPopup').append($($(html).attr("onclick", "ViettelMap.closeInfoWindow();"))[0].outerHTML);
				
				$('a.close').attr('title',msgToolTipClose); //anhhpt: sua lai tooltip cho nut close
			}
		}, 2000);
	},
	//HAM CLOSE THONG TIN NHAN VIEN TREN BAN DO
	closeInfoWindow: function(){
		SuperviseSales._tkStaffId=null;
		SuperviseSales._isFromMarker = false;
		SuperviseSales._isFromTree = false;
		if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
			ViettelMap._currentInfoWindow.close();
		}
	},
	showWindowInfo:function(objectId,lat,lng,info,cur,time){
		var pt = new viettel.LatLng(lat, lng);
		if(objectId>0){
			if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
				ViettelMap._currentInfoWindow.close();
			}
			ViettelMap.showInfoWindow(pt,"<div style='width:100%;text-align: center;'><img style='position: relative;top:20px;' src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>");
			var temp = SuperviseSales._lstStaffPosition.get(objectId);
			if(temp!=null){
				SuperviseSales._idStaffSelect=objectId;
				if (temp.roleType == NV){
					SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,NV);
				}else{
					SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,GS);
				}
			}
		}
	},
	addMarkerStaff:function(point){
		if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
			var pt = new viettel.LatLng(point.lat, point.lng);
			var title=point.staffName;//+point.visit;
			var image=point.image;
			
			var level = ViettelMap._map.getZoom();
			var markerContent = ''; 
			var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
			if(level >= 16) {
				markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
			} else {
				markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
			}
			markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
			
			var marker = new viettel.LabelMarker({
				icon:{
					url : image,
					size : {height : 39, width : 20},
					scaledSize : {height : 39, width : 20}
				},
				position : pt,
				map : ViettelMap._map,
				labelContent : markerContent,
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new viettel.Point(20, 0)
			});
			//Vi tri xuat hien cua pop up
			marker.staffId = point.staffId;
			marker.lat = point.lat;
			marker.lng = point.lng;
			marker.accuracy = point.accuracy;
			marker.createTime = point.createTime;
			
			$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
			
			$('#marker'+point.staffId).parent().prev().bind('click', point, function(e) {
				var point = e.data;
				SuperviseSales.resetPathViewer();	// clear path
//				$('#listStaff').toggle(false);
				//Fix bug hide button show liststaff
				$('#listStaff #LoadWidget').removeClass("in"); 
				
				ViettelMap.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime); 
			});
			ViettelMap.pushListOverlays(marker);//Add vao ListOverlays để xóa khi load lại marker
		}
		ViettelMap.hideShowTitleMarker();
	},
	/*isValidLatLng: function(lat,lng){
		if(lat==undefined || lng == undefined || lat== null || lng== null || lat == 0.0 || lng ==0.0){
			return false;
		}
		return true;
	},*/
	//HÀM LOAD MARKER KHÁCH HÀNG CÓ TUYẾN GHÉ THĂM TRONG NGÀY
	addMarkerCust:function(point){
		var map = ViettelMap._map;
		if(ViettelMap.isValidLatLng(point.lat, point.lng)) {
			var pt = new viettel.LatLng(point.lat, point.lng);
			
			var image = '';
			if(point.image == 'Customers1Status') {//co don hang
//				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_red.png';
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png';
			} else if(point.image == 'Customers2Status') {//chua ghe tham
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_green.png';
			} else if(point.image == 'Customers3Status') {//dang ghe tham
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_orange.png';
			} else if(point.image == 'Customers4Status') {//Ghe tham khong co don dat hang
//				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png';
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_red.png';
			} else if(point.image == 'Customers5Status') {//kh ngoai tuyen
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_yellow.png';
			}
			var marker = null;
			
			if(point.ordinalVisit>9) {
				marker = new viettel.LabelMarker({
					icon:{
						url : image,
						size : {height : 28, width : 28},
						scaledSize : {height : 28, width : 28}
					},
					position : pt,
					map : ViettelMap._map,
					labelContent : '<span style="position: inherit; left: 41px; top: -24px;">'+'<b>'+point.ordinalVisit+'</b>'+'</span>'+'<span style="position: relative; left: 25px; top: -7px;" class="CustomerTimeVisit">'+'<b>'+(point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +'<br />') +'</b>'/*+ '<span class="cusNameSupMap" style="color:green;">' +point.customerName +'</span>'*/ +'</span>',
					labelClass : "CustomersStatus",
					labelVisible : true,
					draggable : false,
					labelAnchor : new viettel.Point(50, 0)
				});
			} else if(0<=point.ordinalVisit<=9) {
				marker = new viettel.LabelMarker({
					icon:{
						url : image,
						size : {height : 28, width : 28},
						scaledSize : {height : 28, width : 28}
					},
					position : pt,
					map : ViettelMap._map,
					labelContent : '<span style="position: inherit; left: 45px; top: -25px; ">'+'<b>'+point.ordinalVisit+'</b>'+'</span>'+'<span style="position: relative; left: 25px; top: -7px;" class="CustomerTimeVisit">'+'<b>'+(point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal+'<br />') +'</b>'/*+ '<span class="cusNameSupMap" style="color:green;">' +point.customerName+'</span>'*/+'</span>',
					labelClass : "CustomersStatus",
					labelVisible : true,
					draggable : false,
					labelAnchor : new viettel.Point(50, 0)
				});
			} else {
				marker = new viettel.LabelMarker({
					icon:{
						url : image,
						size : {height : 28, width : 28},
						scaledSize : {height : 28, width : 28}
					},
					position : pt,
					map : ViettelMap._map,
					labelContent : '<span style="position: inherit; left: 47px; top: -25px;">'+'<b>'+point.ordinalVisit+'</b>'+'</span>'+'<span style="position: relative; left: 25px; top: -7px;" class="CustomerTimeVisit">'+'<b>'+(point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal+'<br />') +'</b>' /*+ '<span class="cusNameSupMap" style="color:green;">' +point.customerName*/+'</span>' +'</span>',
					labelClass : "CustomersStatus", 
					labelVisible : true,
					draggable : false,
					labelAnchor : new viettel.Point(50, 0)
				});
			}
			
			
			marker.customerId = point.id;
			marker.lat = point.lat;
			marker.lng = point.lng;
			
			viettel.Events.addListener(marker, "click", function(evt) {
//				$('#listStaff').toggle(false);
				$('#listStaff #LoadWidget').removeClass("in");
				SuperviseSales.showCustomerDetail(this.customerId);
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
APIs Viettel Maps for Map don hang Dashboard => Modify
 * @author Pi xa
 * @sine 14/11/2018
*/
var ViettelMapDonHang = {
	_map: null,
	//_listOverlay: null,
	/** Tai du lieu ban do nen luc load trang */
	loadedResources:new Array(),
	OVERLAY_ZINDEX : 9,
	OVERLAY_ZINDEX_DEFAULT : 1,
	_DEF_LAT: 10.79418775,
	_DEF_LNG: 106.65682978,
	_DEF_LAT_BIG: 15.744675,
	_DEF_LNG_BIG: 107.515136,
	_DEF_ALL_ZOOM: 4,
	_DEF_ZOOM: 10,
	_DEF_ZOOM_BIG: 6, 
	_listMarker: null,//DANH SÁCH TỌA ĐỘ NHÂN VIÊN
	_listOverlay:null,//Danh sach marker cần xóa
	_currentInfoWindow:null,//pop thông tin
	getBrowserName : function() {			
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
		ViettelMapDonHang._map = new viettel.Map(__object);
		ViettelMapDonHang._map.setOptions({
//			overviewMapControl : false,
			center: new viettel.LatLng(lat, lng),
			zoom: zoom,
			disableDefaultUI: true
		});
		var map = ViettelMapDonHang._map; 
		map.setZoom(zoom);
		//var showMarker = true;
		if (custLat == null || custLat <= 0 ){
			custLat = lat;
		}
		if (custLng == null || custLng <= 0){
			custLng = lng;
		}
		if(isShowCus != null && isShowCus){
			ViettelMapDonHang.addMarkerImages(null, null, custLat, custLng);
		}
		var pt = new viettel.LatLng(lat, lng);
	    map.setCenter(pt);
	    map.setZoom(zoom);
	    if(type != undefined && type != null && type == 1){//bản đồ mở rộng
	    	var mapOptions = {
		    		panZoomControl: enable,
		    		panZoomControlOptions : {
		    			position: viettel.ControlPosition.RIGHT_TOP
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
				var pt = new viettel.LatLng(lat, lng);
				var cusPt = new viettel.LatLng(custLat, custLng);
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
				var marker = new viettel.LabelMarker({
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
					labelAnchor : new viettel.Point(25, 0)
				});
				
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(marker);
				} else {
					ViettelMapDonHang._listOverlay.push(marker);
				}
				
				var custMarker = new viettel.LabelMarker({
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
					labelAnchor : new viettel.Point(25, 0)
				});
				
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(custMarker);
				} else {
					ViettelMapDonHang._listOverlay.push(custMarker);
				}
			} else {
				var pt = new viettel.LatLng(lat, lng);
				var marker = new viettel.LabelMarker({
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
					labelAnchor : new viettel.Point(25, 0)
				});
				
				if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
					ViettelMapDonHang._listOverlay = new Array();
					ViettelMapDonHang._listOverlay.push(marker);
				} else {
					ViettelMapDonHang._listOverlay.push(marker);
				}
			}
		} else if(ViettelMapDonHang.isValidLatLng(custLat, custLng)) {
			var cusPt = new viettel.LatLng(custLat, custLng);
			var custMarker = new viettel.LabelMarker({
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
				labelAnchor : new viettel.Point(25, 0)
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
			var fileref = null;
			if (filetype=="js"){ 
				fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
			}
			if (fileref != null && fileref !=undefined){
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
	isValidLatLng: function(lat,lng){
		if(lat==undefined || lng == undefined || lat== null || lng== null || lat <= 0.0 || lng <= 0.0){
			return false;
		}
		return true;
	},
	loadBigMap: function(objId, lat, lng, zoom,callback){			
		ViettelMapDonHang._map = new viettel.Map(document.getElementById(objId));
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
		var pt = new viettel.LatLng(lat, lng);
	    map.setCenter(pt);
	    map.setZoom(zoom);
	    var mapOptions = {
		    	panZoomControl: enable,
	    		panZoomControlOptions : {
	    			position: viettel.ControlPosition.RIGHT_BOTTOM
	    		}
	    	};
 	map.setOptions(mapOptions);
 	if(lat!='' && lat!=null && lng!='' && lng!=null && showMarker){
	    	var marker = new viettel.LabelMarker({
				position : pt,
				map : ViettelMapDonHang._map,
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new viettel.Point(25, 0)
			});
			marker.lat = lat;
			marker.lng = lng;
		    if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
				ViettelMapDonHang._listOverlay = new Array();
				ViettelMapDonHang._listOverlay.push(marker);
			} else {
				ViettelMapDonHang._listOverlay.push(marker);
			}
	    }
	    viettel.Events.addListener(map, 'zoom_changed', function() {
	    	ViettelMapDonHang.hideShowTitleMarker();
	    	if (ViettelMapDonHang != null && ViettelMapDonHang._map != null && ViettelMapDonHang._map.getZoom() > 8){
	    		$('.staffPosMarker').show();
	    	}else {
//	    		$('.staffPosMarker').hide();
	    	}
	    });
	    viettel.Events.addListener(map, "click", function(evt) {
			var lat=evt.latLng.lat();
			var lng=evt.latLng.lng();
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
					var zoom=17;
					if(lat!='' && lng!=''){ 
						zoom=10;
					}
					ViettelMapDonHang._map = null;
					$('#bigMapContainer').html('');
					ViettelMapDonHang.loadBigMap('bigMapContainer',lat, lng ,zoom,function(lat, lng){
						ViettelMapDonHang.clearOverlays();
							$('#lat').val(lat);
							$('#lng').val(lng);
							var pt = new viettel.LatLng(lat, lng);
					    	var marker = new viettel.LabelMarker({
								position : pt,
								map : ViettelMapDonHang._map,
								labelClass : "MarkerLabel",
								labelVisible : true,
								draggable : false,
								labelAnchor : new viettel.Point(25, 0)
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
     		$('#bigMapChange').html("");
	        	var lat = $('#lat').val();
				var lng = $('#lng').val();
				if(Number(lat) == -1 && Number(lng) == -1){
					lat = null;
					lng = null;
				}
				ViettelMapDonHang.addMarker(lat, lng);
				ViettelMapDonHang.loadBigMap('bigMapChange',lat, lng ,14,function(lat, lng){
					ViettelMapDonHang.clearOverlays();
					$('#lat').val(lat);
					$('#lng').val(lng);
					var pt = new viettel.LatLng(lat, lng);
			    	var marker = new viettel.LabelMarker({
						position : pt,
						map : ViettelMapDonHang._map,
						labelClass : "MarkerLabel",
						labelVisible : true,
						draggable : false,
						labelAnchor : new viettel.Point(25, 0)
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
     	$('#bigMapContainer').html(html);
	        }
		});
		
		return false;
	},
	addMarker: function(lat,lng){
		if(!ViettelMapDonHang.isValidLatLng(lat,lng)){
			return;
		}
		var latlng = new viettel.LatLng(lat, lng);
     if (ViettelMapDonHang._marker != null){
     	ViettelMapDonHang._marker.setMap(null);
     }
     ViettelMapDonHang._marker = new viettel.Marker({
     	position: latlng,
     	map: ViettelMapDonHang._map
     });
//     ViettelMapDonHang._map.setCenter(latlng);
	},
	createLatLng: function(lat, lng){
		var latlng = new viettel.LatLng(lat, lng);
		return latlng;
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
	
	//HÀM ADD DS ĐƠN HÀNG VÀO BẢN ĐỒ => Dashboard
	addMutilMarkerStaffDashboard:function(){
		if(ViettelMapDonHang._listMarker!=undefined && ViettelMapDonHang._listMarker!=null){
			CommonStaffMapDonHang._itv =window.setInterval(function(){
				var j=0;
				var index=0;
				for(var i=index,j=0;i<ViettelMapDonHang._listMarker.valArray.length;i++,index++,j++){
//					if(j>100) break;
					var point = ViettelMapDonHang._listMarker.valArray[i];
					if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
						var pt = new viettel.LatLng(point.lat, point.lng);
						var info="<div id='info"+point.orderNumber+"'><img  src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>";
						var title='Khách hàng: '+point.customerName;
						var image=point.image;
						var accuracy = point.accuracy;
						var createTime = point.createTime;
						
						var level = ViettelMapDonHang._map.getZoom();
						var markerContent = ''; 
						var markerBotoom = "<div id='bottom' title='"+title+"' style='position: relative; bottom: -39px;text-align:center;'></div>";
						if(level >= 16) {
							markerBotoom = "<div id='bottom"+point.orderNumber+"' title='"+title+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
						} else {
							markerBotoom = "<div id='bottom"+point.orderNumber+"' title='"+title+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
						}
						markerContent = "<div id='marker"+point.orderNumber+"'  style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
						
						
						var marker = new viettel.LabelMarker({
							icon:{
								url : image,
								size : {height : 39, width : 20},
								scaledSize : {height : 39, width : 20},
								title : title
							},
							position : pt,
							map : ViettelMapDonHang._map,
//							labelContent : markerContent,
							labelContent: '<div title="'+title+'" style="left: 34px;width: 25px;position: absolute;height: 40px; display: inline;" class="staffPosMarker"></div>',
							labelClass : "MarkerLabel",
//							title : title,
							labelVisible : true,
							draggable : false,
							labelAnchor : new viettel.Point(40, 40)
						});
						marker.staffId = point.orderNumber;
						marker.lat = point.lat;
						marker.lng = point.lng;
						marker.accuracy = point.accuracy;
						marker.createTime = point.createTime;
						ViettelMapDonHang._map.setZoom(12);
						$('#marker'+point.orderNumber).parent().prev().css('z-index', 10000000);
//						viettel.Events.addListener(marker, "mouseover", function(evt) {
//							var point=evt.object;
//							'<span style="color: blue;font-size:12px;" class="staffPosMarker" >'+title+'</span>';
////							ViettelMapDonHang.showWindowInfo(point.orderNumber, point.lat, point.lng, point.accuracy, point.createTime);
//						});
						ViettelMapDonHang.pushListOverlays(marker);
						
//						if(CommonStaffMap._lstStaffException.get(marker.staffId) != null) {
//							$('#marker'+marker.staffId).parent().parent().hide();
//						}
					}
				}
				if(index>=ViettelMapDonHang._listMarker.valArray.length){
					ViettelMapDonHang.hideShowTitleMarker();
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
		
		/*setTimeout(function(){
			if ($('.olLayerDiv[dir=ltr]').children().find('div').length > 0){
				$('.olLayerDiv[dir=ltr]').children().find('div').css('width', 102);
			}
		}, 100);*/
	},
	
	//HÀM ADD DS NHÂN VIÊN VÀO BẢN ĐỒ
	addMutilMarkerStaff:function(){
		if(ViettelMapDonHang._listMarker!=undefined && ViettelMapDonHang._listMarker!=null){
			SuperviseSales._itv =window.setInterval(function(){
				var j=0;
				var index=0;
				for(var i=index,j=0;i<ViettelMapDonHang._listMarker.valArray.length;i++,index++,j++){
//					if(j>100) break;
					var point = ViettelMapDonHang._listMarker.valArray[i];
					if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
						var pt = new viettel.LatLng(point.lat, point.lng);
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
						
						
						var marker = new viettel.LabelMarker({
							icon:{
								url : image,
								size : {height : 39, width : 20},
								scaledSize : {height : 39, width : 20}
							},
							position : pt,
							map : ViettelMapDonHang._map,
//							labelContent : markerContent,
							labelContent: '<span style="color: blue;font-size:12px;" class="staffPosMarker" >'+title+'</span>',
							labelClass : "MarkerLabel",
							labelVisible : true,
							draggable : false,
							labelAnchor : new viettel.Point(80, 0)
						});
						marker.staffId = point.staffId;
						marker.lat = point.lat;
						marker.lng = point.lng;
						marker.accuracy = point.accuracy;
						marker.createTime = point.createTime;
						$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
						viettel.Events.addListener(marker, "click", function(evt) {
							var point=evt.object;
							SuperviseSales.resetPathViewer();	// clear path
							if($('.StaffSelectBtmSection .OffStyle').length==1){// show (display:block) danh sách đơn vị quản lý để load lại cây
								$('#titleStaff').addClass('OnStyle');
								$('#titleStaff').removeClass('OffStyle');
								$('#listStaff').toggle();
							}
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
		
		/*setTimeout(function(){
			if ($('.olLayerDiv[dir=ltr]').children().find('div').length > 0){
				$('.olLayerDiv[dir=ltr]').children().find('div').css('width', 102);
			}
		}, 100);*/
	},
	fitOverLay: function() {
		var bound = null;
		if(ViettelMapDonHang._listOverlay != null && ViettelMapDonHang._listOverlay != undefined) {
			if(ViettelMapDonHang._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMapDonHang._listOverlay.size(); i++) {
					var obj = ViettelMapDonHang._listOverlay.get(ViettelMapDonHang._listOverlay.keyArray[i]);
					if(obj instanceof viettel.LabelMarker) {
						if(ViettelMapDonHang.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
							var latlng = new viettel.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
							bound = ViettelMapDonHang.getBound(bound, latlng);
						}
					} else {
						if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new viettel.LatLng(obj.lat, obj.lng);
							bound = ViettelMapDonHang.getBound(bound, latlng);
						}
					}
				}
			} else if(ViettelMapDonHang._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMapDonHang._listOverlay.length; i++) {
					var obj = ViettelMapDonHang._listOverlay[i];
					if(obj instanceof viettel.LabelMarker) {
						if(ViettelMapDonHang.isValidLatLng(obj.getPosition().lat(), obj.getPosition().lng())) {
							var latlng = new viettel.LatLng(obj.getPosition().lat(), obj.getPosition().lng());
							bound = ViettelMapDonHang.getBound(bound, latlng);
						}
					} else {
						if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
							var latlng = new viettel.LatLng(obj.lat, obj.lng);
							bound = ViettelMapDonHang.getBound(bound, latlng);
						}
					}
				}
			}
		}
		if(bound != null) {
			ViettelMapDonHang._map.fitBounds(bound);
		}
	},
	fitOverLays: function() {
		var bound = null;
		if(ViettelMapDonHang._listOverlay != null && ViettelMapDonHang._listOverlay != undefined) {
			if(ViettelMapDonHang._listOverlay instanceof Map) {
				for(var i = 0; i < ViettelMapDonHang._listOverlay.size(); i++) {
					var obj = ViettelMapDonHang._listOverlay.get(ViettelMapDonHang._listOverlay.keyArray[i]);
					if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
						var latlng = new viettel.LatLng(obj.lat, obj.lng);
						bound = ViettelMapDonHang.getBound(bound, latlng);
					}
				}
			} else if(ViettelMapDonHang._listOverlay instanceof Array) {
				for(var i = 0; i < ViettelMapDonHang._listOverlay.length; i++) {
					var obj = ViettelMapDonHang._listOverlay[i];
					if(ViettelMapDonHang.isValidLatLng(obj.lat, obj.lng)) {
						var latlng = new viettel.LatLng(obj.lat, obj.lng);
						bound = ViettelMapDonHang.getBound(bound, latlng);
					}
				}
			}
		}
		if(bound != null) {
			ViettelMapDonHang._map.fitBounds(bound);
		}
	},
	//HAM ADD TOA DO NHAN VIEN VAO _listOverlay DE XOA DANH SACH MARKER TREN BANG DO
	pushListOverlays:function(marker){
		if(ViettelMapDonHang._listOverlay == null || ViettelMapDonHang._listOverlay == undefined) {
			ViettelMapDonHang._listOverlay = new Array();
			ViettelMapDonHang._listOverlay.push(marker);
		} else {
			ViettelMapDonHang._listOverlay.push(marker);
		}	
	},
	//HÀM SET LẠI BẢN ĐỒ ĐỂ THẤY TOÀN BỘ CÁC MARKER
	getBound: function(bound, latlng) {
		if(bound == null || bound == undefined) {
			bound = new viettel.LatLngBounds(latlng, latlng);
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
			
			var sw = new viettel.LatLng(swLat, swLng);
			var ne = new viettel.LatLng(neLat, neLng);
			
			bound = new viettel.LatLngBounds(sw, ne);
		}
		return bound;
	},
	//HAM SHOW THONG TIN NHAN VIEN TREN BAN DO
	showInfoWindow:function(pt,html, width){
		if(ViettelMapDonHang._currentInfoWindow != null && ViettelMapDonHang._currentInfoWindow != undefined) {
			ViettelMapDonHang._currentInfoWindow.close();
		}
		if (width == null || width == undefined){
			if($('#language').val() == 'en'){
				width = 450;
			}else{
				width = 370;
			}
		}
		var infoWindow = new viettel.InfoWindow({ content: html, position: pt, maxWidth: width, zIndex: 1000000 });
		ViettelMapDonHang._currentInfoWindow = infoWindow;
		infoWindow.open(ViettelMapDonHang._map);
		setTimeout(function(){
			SuperviseSales.resizeInfoWindow();
		}, 500);
		setTimeout(function(){
			if ($('a.close').length > 0){
				var html = $('a.close')[0].outerHTML;
				$('a.close').remove();			
				$('div.olPopup').append($($(html).attr("onclick", "ViettelMapDonHang.closeInfoWindow();"))[0].outerHTML);
				
				$('a.close').attr('title',msgToolTipClose); //anhhpt: sua lai tooltip cho nut close
			}
		}, 2000);
	},
	//HAM CLOSE THONG TIN NHAN VIEN TREN BAN DO
	closeInfoWindow: function(){
		SuperviseSales._tkStaffId=null;
		SuperviseSales._isFromMarker = false;
		SuperviseSales._isFromTree = false;
		if(ViettelMapDonHang._currentInfoWindow != null && ViettelMapDonHang._currentInfoWindow != undefined) {
			ViettelMapDonHang._currentInfoWindow.close();
		}
	},
	showWindowInfo:function(objectId,lat,lng,info,cur,time){
		var pt = new viettel.LatLng(lat, lng);
		if(objectId>0){
			if(ViettelMapDonHang._currentInfoWindow != null && ViettelMapDonHang._currentInfoWindow != undefined) {
				ViettelMapDonHang._currentInfoWindow.close();
			}
			ViettelMapDonHang.showInfoWindow(pt,"<div style='width:100%;text-align: center;'><img style='position: relative;top:20px;' src='" + WEB_CONTEXT_PATH + "/resources/images/loading-small.gif'/></div><br/>");
			var temp = SuperviseSales._lstStaffPosition.get(objectId);
			if(temp!=null){
				SuperviseSales._idStaffSelect=objectId;
				if (temp.roleType == NV){
					SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,NV);
				}else{
					SuperviseSales.showDialogInfo(temp.staffId,temp.staffCode,temp.staffName, temp.shopCode, temp.shopName, temp.createTime,temp.accuracy,pt,GS);
				}
			}
		}
	},
	addMarkerStaff:function(point){
		if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
			var pt = new viettel.LatLng(point.lat, point.lng);
			var title=point.staffName;//+point.visit;
			var image=point.image;
			
			var level = ViettelMapDonHang._map.getZoom();
			var markerContent = ''; 
			var markerBotoom = "<div id='bottom' style='position: relative; bottom: -39px;text-align:center;'></div>";
			if(level >= 16) {
				markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
			} else {
				markerBotoom = "<div id='bottom"+point.staffId+"' class='Bottom' style='position: relative; bottom: -39px; display:none;text-align:center;'><strong style='color:red;font-size: 12px;' class='titleMarker'>" + title + "</strong></div>";
			}
			markerContent = "<div id='marker"+point.staffId+"' style='height: 70px; width: 100px; left:-28px; position: relative; text-align: center; top: -41px;'>"+markerBotoom+"</div>";
			
			var marker = new viettel.LabelMarker({
				icon:{
					url : image,
					size : {height : 39, width : 20},
					scaledSize : {height : 39, width : 20}
				},
				position : pt,
				map : ViettelMapDonHang._map,
				labelContent : markerContent,
				labelClass : "MarkerLabel",
				labelVisible : true,
				draggable : false,
				labelAnchor : new viettel.Point(20, 0)
			});
			//Vi tri xuat hien cua pop up
			marker.staffId = point.staffId;
			marker.lat = point.lat;
			marker.lng = point.lng;
			marker.accuracy = point.accuracy;
			marker.createTime = point.createTime;
			
			$('#marker'+point.staffId).parent().prev().css('z-index', 10000000);
			
			$('#marker'+point.staffId).parent().prev().bind('click', point, function(e) {
				var point = e.data;
				SuperviseSales.resetPathViewer();	// clear path
				$('#listStaff').toggle(false);
				
				ViettelMapDonHang.showWindowInfo(point.staffId, point.lat, point.lng, point.accuracy, point.createTime); 
			});
			ViettelMapDonHang.pushListOverlays(marker);//Add vao ListOverlays để xóa khi load lại marker
		}
		ViettelMapDonHang.hideShowTitleMarker();
	},
	/*isValidLatLng: function(lat,lng){
		if(lat==undefined || lng == undefined || lat== null || lng== null || lat == 0.0 || lng ==0.0){
			return false;
		}
		return true;
	},*/
	//HÀM LOAD MARKER KHÁCH HÀNG CÓ TUYẾN GHÉ THĂM TRONG NGÀY
	addMarkerCust:function(point){
		var map = ViettelMapDonHang._map;
		if(ViettelMapDonHang.isValidLatLng(point.lat, point.lng)) {
			var pt = new viettel.LatLng(point.lat, point.lng);
			
			var image = '';
			if(point.image == 'Customers1Status') {//co don hang
//				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_red.png';
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png';
			} else if(point.image == 'Customers2Status') {//chua ghe tham
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_green.png';
			} else if(point.image == 'Customers3Status') {//dang ghe tham
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_orange.png';
			} else if(point.image == 'Customers4Status') {//Ghe tham khong co don dat hang
//				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png';
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_red.png';
			} else if(point.image == 'Customers5Status') {//kh ngoai tuyen
				image = WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_yellow.png';
			}
			var marker = null;
			
			if(point.ordinalVisit>9) {
				marker = new viettel.LabelMarker({
					icon:{
						url : image,
						size : {height : 28, width : 28},
						scaledSize : {height : 28, width : 28}
					},
					position : pt,
					map : ViettelMapDonHang._map,
					labelContent : '<span style="position: inherit; left: 41px; top: -24px;">'+'<b>'+point.ordinalVisit+'</b>'+'</span>'+'<span style="position: relative; left: 25px; top: -7px;" class="CustomerTimeVisit">'+'<b>'+(point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal +'<br />') +'</b>'/*+ '<span class="cusNameSupMap" style="color:green;">' +point.customerName +'</span>'*/ +'</span>',
					labelClass : "CustomersStatus",
					labelVisible : true,
					draggable : false,
					labelAnchor : new viettel.Point(50, 0)
				});
			} else if(0<=point.ordinalVisit<=9) {
				marker = new viettel.LabelMarker({
					icon:{
						url : image,
						size : {height : 28, width : 28},
						scaledSize : {height : 28, width : 28}
					},
					position : pt,
					map : ViettelMapDonHang._map,
					labelContent : '<span style="position: inherit; left: 45px; top: -25px; ">'+'<b>'+point.ordinalVisit+'</b>'+'</span>'+'<span style="position: relative; left: 25px; top: -7px;" class="CustomerTimeVisit">'+'<b>'+(point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal+'<br />') +'</b>'/*+ '<span class="cusNameSupMap" style="color:green;">' +point.customerName+'</span>'*/+'</span>',
					labelClass : "CustomersStatus",
					labelVisible : true,
					draggable : false,
					labelAnchor : new viettel.Point(50, 0)
				});
			} else {
				marker = new viettel.LabelMarker({
					icon:{
						url : image,
						size : {height : 28, width : 28},
						scaledSize : {height : 28, width : 28}
					},
					position : pt,
					map : ViettelMapDonHang._map,
					labelContent : '<span style="position: inherit; left: 47px; top: -25px;">'+'<b>'+point.ordinalVisit+'</b>'+'</span>'+'<span style="position: relative; left: 25px; top: -7px;" class="CustomerTimeVisit">'+'<b>'+(point.ordinalAndTimeVisitReal == undefined ? '' : point.ordinalAndTimeVisitReal+'<br />') +'</b>' /*+ '<span class="cusNameSupMap" style="color:green;">' +point.customerName*/+'</span>' +'</span>',
					labelClass : "CustomersStatus", 
					labelVisible : true,
					draggable : false,
					labelAnchor : new viettel.Point(50, 0)
				});
			}
			
			
			marker.customerId = point.id;
			marker.lat = point.lat;
			marker.lng = point.lng;
			
			viettel.Events.addListener(marker, "click", function(evt) {
//				$('#listStaff').toggle(false);
				$('#listStaff #LoadWidget').removeClass("in");
				SuperviseSales.showCustomerDetail(this.customerId);
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
