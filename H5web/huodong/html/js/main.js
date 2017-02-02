jQuery(function($){

$('.page').hide();
$('#page1').show();

var window_w = ($(window).width() >= 750?750:$(window).width()),
	window_h = $(window).height();

	$('.page').width(window_w);
	$('.top').height(window_h);
	resetFootmenu(window_w);

var max_contBox_width = 614 * (window_w/750);

	$('.cont-box').width(max_contBox_width);
	$('.cont').height(window_h>=885.5?window_h:885.5);
	$('.cont2').height(window_h>=603?window_h:603);
	$('.cb2').height(501 * ((window_h>=603?window_h:603)/603));
	$('.slider-control').css({'width': window_w/2.5+'px','margin-left':-window_w/5+'px'});

if(navigator.userAgent.indexOf("iPad") != -1){  
	$('body').attr('ontouchmove','event.preventDefault()');
}

var $ev = "ontouchstart" in document? "touchstart":"click";

$('.slider-control').on($ev,function(e){
	e = e || event;
	e.stopPropagation();
});

$('.introduce').on($ev,function(e){
	window.location.href ="./";
});

$('.QRcode').on($ev,function(e){
	$('.page').hide();
	$('#page2').fadeIn(200);

	$('html,body').css('height','auto').css('overflow-y','auto');

});

$('.vote').on($ev,function(e){
	$('.page').hide();
	$('#page3').fadeIn(200);

	$('html,body').css('height','auto');
	$('body').removeAttr('ontouchmove');
});

$('.ans').on($ev,'.checkbox',function(e){
	var e = e || event;

	$(e.target).toggleClass('checked');
});

});

var swiper = new Swiper('#page1', {
    direction: 'vertical',
    onSlideChangeEnd: function(swiper){
		
	} 
});


function resetFootmenu(window_w){
	$('.foot-menu').css({'width':window_w+'px','margin-left':-window_w/2+'px'});
	$('.foot-menu>div').css('width',(window_w-2)/3+'px');
}

/*function sChange(i){
	$('.foot-menu>div').removeClass('choose').eq(i).addClass('choose');
	$('.blue').addClass('hidden').eq(i).removeClass('hidden');
	$('.grey').removeClass('hidden').eq(i).addClass('hidden');
}*/