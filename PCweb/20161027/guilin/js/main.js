var numArr = ["二","三","四","五","六","七","八","九"];

var mySwiper = new Swiper('.swiper-container',{
	loop : true,
	onSlideChangeEnd: function(swiper){
       document.getElementById('sp-title').innerHTML = "第"+numArr[mySwiper.activeLoopIndex]+"期<div class='msg-note'></div>";
    }
});

jQuery(function($){
	var trueWidth = window.innerWidth >= 1920? 1920 : window.innerWidth,
		per = trueWidth / 1920;

	$('.gl-header').css({
		'max-width' : 1920 * per + "px",
		"height" : 978 * per + "px"
	});

	$('.gl-header img').css({
		'max-width' : 1920 * per + "px",
		'width' : 1920 * per + "px",
		"height" : 978 * per + "px"
	});

	$('.swiper-wrapper').height(525);
	$('.swiper-slide').height(525);

	$('.left-bt').on('click', function(e){
	    e.preventDefault()
	    mySwiper.swipePrev()
	});
	$('.right-bt').on('click', function(e){
	    e.preventDefault()
	    mySwiper.swipeNext()
	});

	$('.tuijian').hover(function(){
		$(this).find('img').toggleClass('hide');
		$(this).find('.link-text').removeClass('hide');
	},function(){
		$(this).find('img').toggleClass('hide');
		$(this).find('.link-text').addClass('hide');
	});

	$('body').on('mousewheel',function(){
		var st = $('body').scrollTop();
		if(st >= 2200){
			$('.kuaizi').eq(0).addClass('hide');
			$('.kuaizi').eq(1).removeClass('hide');
		} else {
			$('.kuaizi').eq(1).addClass('hide');
			$('.kuaizi').eq(0).removeClass('hide');
		}
	});
});