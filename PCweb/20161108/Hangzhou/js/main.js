jQuery(function($){

	var trueWidth = $(window).width() >= 1920 ? 1920 : $(window).width(),
		per = trueWidth / 1920;

	$('.hz-header>img').css({
		'width' : "100%",
		'height' : 799 * per + "px"
	});

	$('.pro-item').hover(function(){
		$(this).find('.layer-box').removeClass('hide');
	},function(){
		$(this).find('.layer-box').addClass('hide');
	});

});