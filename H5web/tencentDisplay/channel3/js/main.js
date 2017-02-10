jQuery(function($){
	var per = 0.70423,
		wWidth = $(window).width() >= 750 ? 750 : $(window).width();


	$(".sub").css({
		"top" : per * 100 +"%"
	});

	$('.left-arrow,.right-arrow').css({
		"width" : wWidth * 0.067 + "px",
		"height": wWidth * 0.067 + "px"
	});

	$('.swiper-wrapper').css({
		"height" : $('.img-box').height()+"px" 
	});
});