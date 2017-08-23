jQuery(function($){

var $imgs = $('img[data-link]'),
	len = $imgs.length,
	count = 0;

if(len == 0){
	progress();
}

$imgs.each(function(){

	var link = $(this).attr("data-link");

	$(this).attr('src',link);

	if( $(this)[0].complete ){
		count++;
		progress();
	} else {
		$(this)[0].onload = function(e){
			count++;
			progress();
		};

		$(this)[0].onerror = function(e){
			count++;
			progress();
		};
	}

});

$('.detail-btn').on('click',function(e){
	$('.detail').addClass("detail-active");
});

$('.back').on('tap',function(e){
	$('.detail').removeClass("detail-active");
});

$('.date').on('tap',function(e){
	$('.QRcode').show();
});

$('.Iknow').on("click",function(e){
	$('.QRcode').hide();
	$('.back').trigger("tap");
});

//progress
function loadEnd(){
	$("#content").show();
	$('.loading-container').fadeOut(300);

	//createSwiper();
	//createScroll();
}

function progress(){

	$('.loading-bar').css('width', ( count / len >> 0 ) + "%" );

	if( count == len ){
		loadEnd();
	}

}

var swiper,
	scroll;

function createSwiper(){
	swiper = new Swiper('.swiper-container',{
		paginationClickable :true,
		pagination : '.swiper-pagination'
	});
}

function createScroll(){
	scroll = new IScroll(".detail-box",{
		tap : true
	});

	setTimeout(function(){
		scroll.refresh();
	},500);
}


});