jQuery(function($){

var swiper = new Swiper('.swiper-container',{
	direction : 'vertical',
	onSlideChangeEnd : function(swiper){
		var idx = swiper.activeIndex;

		if(idx == 1){
			entePage2();
		}
	}

});


function loadEnd(){
	if( $i == $len ){
		$(".loading").fadeOut(300);
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

var textHasShowed = false;

function entePage2(){
	var str='腾讯优图AI实验室成立于\n201X年。实验室集结了国\n内外人工智能领域最优秀\n的科学家。\n拥有：人脸识别、图像识\n别、声音识别';

	if(textHasShowed)
	return false;

	utils.showfonts(str,150,function(data){
		$(".page2-text-box>pre").append(data.value);
	});

	var i = 0,
		timer = null;

	if(timer) clearTimeout(timer);

	showDianliang(i,timer);

	textHasShowed = true;
}

function showDianliang(i,timer){

	$(".dian-loop").attr("data-id",i);

	timer = setTimeout(function(){
		i > 5 ? i = 0 : i++;
		showDianliang(i,timer);
	},800);
}


});