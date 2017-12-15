jQuery(function($){

var swiper = new Swiper('.swiper-container',{
	direction : 'vertical'
});


function loadEnd(){
	if( $i == $len ){
		$(".loading").hide();
		$(".page-1").addClass("page-active");
		utils.createFrameImg($("#canvas-loop")[0],"images/code.png");
		return false;
	}

	$(".loading-content").html( ( $i/$len ) >> 0 );
}

var $len = $("img[data-src]").length,
	$i = 0;

$("img[data-src]").each(function(){

	var img = $(this)[0],
		src = $(this).attr("data-src");

	img.onload = function(){
		$i++;
		loadEnd();
	};

	img.onerror = function(){
		$i++;
		loadEnd();
	};

	img.src = src+"?ver="+new Date().getTime();

});


});