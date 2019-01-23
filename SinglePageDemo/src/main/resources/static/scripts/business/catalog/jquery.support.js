var Support = {
	xhrCreate:null,
	showTab : function(type) {
		$('#tab1').hide();
		$('#tab2').hide();
		$('#tab3').hide();
		$('#tab4').hide();
		$('#tab5').hide();
		$('#tab6').hide();
		$('#tab7').hide();
		$('#tab' + type).show();
		if(type == 1){
			$('#title').html(lbGuideline + " " + lbGuideTitle1);
		}else if(type == 2){
			$('#title').html(lbGuideline + " " + lbGuideTitle2);
		}else if(type == 3){
			$('#title').html(lbGuideline + " " + lbGuideTitle3);
		}else if(type == 4){
			$('#title').html(lbGuideline + " " + lbGuideTitle4);
		}else if(type == 5){
			$('#title').html(lbGuideline + " " + lbGuideTitle5);
		}else if(type == 6){
			$('#title').html(lbGuideline + " " + lbGuideTitle6);
		}else if(type == 7){
			$('#title').html(lbGuideline + " " + lbGuideTitle7);
		}
	}
};
