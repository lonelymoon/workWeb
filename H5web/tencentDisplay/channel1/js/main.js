jQuery(function($){
	var windowWidth = $(window).width() >= 750 ? 750 : $(window).width(),
		windowHeight = $(window).height(),
		per = windowHeight / 1207,
		imgWidth = per * 750 >= windowWidth? windowWidth : per * 750,
		per2 = imgWidth / 750,
		pointWidth = 57 * per2,
		pointHeight = 57 * per2,
		left = imgWidth * 0.2359,
		top = windowHeight * 0.399,
		right = imgWidth * 0.4246,
		bottom  = windowHeight * 0.22,
		boxHeight = windowHeight - bottom - top - pointHeight * 3/2;

	$('.ani').css({
		"left" : (windowWidth - imgWidth)/2 +"px",
		"max-width" : imgWidth + "px"
	});

	$('.start-point').css({
		"max-width" : pointWidth + "px",
		"max-height" : pointHeight + "px",
		"bottom" : bottom + "px",
		"left" : left + "px"
	});

	$('.end-point').css({
		"max-width" : pointWidth + "px",
		"max-height" : pointHeight + "px",
		"top" : top + "px",
		"right" : right + "px"
	});

	$(".way").css({
		"left" : left + pointWidth / 2 - 2 + "px",
		"top" : top + pointHeight + boxHeight + "px",
		"width" : "10px",
		"height" : boxHeight+ "px"
	});

	$(".way-box").css({
		"left" : "0px",
		"top" :  - boxHeight + "px",
		"width" : imgWidth - right - left - pointWidth + "px",
		"height" : "100%"
	});

	$(".way").animate({
		top : top + pointHeight + "px"
	},1600);

	$(".way-box").animate({
		top : "0px"
	},1600,function(){
		$(".way").animate({
			width : imgWidth - right - left - pointWidth + "px"
		},800,function(){
			$('.end-point').fadeIn(200);
		});
	});

});