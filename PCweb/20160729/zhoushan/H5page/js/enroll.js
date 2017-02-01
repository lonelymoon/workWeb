jQuery(function($){
	var windowWidth = $(window).width(),
		ObjEvent = zShan.ObjEvent;
	
	if ( windowWidth <= 515 && ObjEvent.getUrlObj().language == "en" ) {
		$('.company-address').find(".zs-form-label").addClass("noLineHeight");
	}


});