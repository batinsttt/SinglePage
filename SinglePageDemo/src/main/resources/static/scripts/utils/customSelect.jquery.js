(function($){
 $.fn.extend({ 
 	customStyle : function(options) {
	  if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)){
	  return this.each(function() {	  
			var currentSelected = $(this).find(':selected');
			$(this).after('<span class="CustomStyleSelectBox"><span class="CustomStyleSelectBoxInner">'+currentSelected.text()+'</span></span>').css({opacity:0});
			$(this).keypress(function(e){
				  if (e.keyCode>= 37 && e.keyCode  <= 40) {
						$(this).trigger('change');
				  }
			});
			var selectBoxSpan = $(this).next();		
			var selectBoxSpanInner = selectBoxSpan.find(':first-child');
			selectBoxSpan.css({display:'inline-block'});
			selectBoxSpanInner.css({display:'inline-block'});
			var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
			$(this).height(selectBoxHeight).change(function(){
				// selectBoxSpanInner.text($(this).val()).parent().addClass('changed');   This was not ideal
			selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('Changed');
				// Thanks to Juarez Filho & PaddyMurphy
			});
			
	  	});
	  }
	}
 });
})(jQuery);
(function($) {
    $.fn.focusToEnd = function() {
        return this.each(function() {
            var v = $(this).val();
            $(this).focus().val("").val(v);
        });
    };
})(jQuery);
