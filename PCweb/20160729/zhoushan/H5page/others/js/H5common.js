jQuery(function($){
	var windowWidth = $(window).width(),
		trueWidth = windowWidth >= 750? 750 : windowWidth;

	$('html').css("font-size", trueWidth / 15 + "px");

});