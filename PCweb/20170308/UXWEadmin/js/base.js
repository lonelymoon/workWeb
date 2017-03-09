jQuery(function($){

var	sc1 = new IScroll('.nav', {
    mouseWheel: true,
    click : true
});

$('.nav').on('click','.nlist',function(e){
	var $link = $(this).attr("data-link");
	if($link){
		window.location.href = $link + ".html";
	}
});

$('.continue-btn').on('click',function(e){
	var $link = $(this).attr("data-link");
	if($link){
		window.location.href = $link + ".html";
	}
});

$('.layer-close').on('click',function(e){
	$('.layer').fadeOut(200);
});

});