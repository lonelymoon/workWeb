jQuery(function($){

var swiper;

$(".ui-page1-btn").on("click",function(){
	swiper.slideNext();
});

$('.p-list-1,.p3t-1').on("click",function(){
	swiper.slideTo(3,1000);
});

$('.p-list-2,.p3t-2').on("click",function(){
	swiper.slideTo(7,1000);
});

$('.p-list-3,.p3t-3').on("click",function(){
	swiper.slideTo(11,1000);
});

function loadEnd(){
	if( $i == $len ){
		$("#container").show();
		swiper = new Swiper('.swiper-container',{
			direction : 'vertical',
			onSlideChangeEnd : function(swiper){
				var idx = swiper.activeIndex;

				switch(idx){
					case 1:
						enterPage2();
					break;
					case 3:
						enterPage4();
					break;
					case 7:
						enterPage8();
					break;
					case 11:
						enterPage12();
					break;
				}
			}

		});
		$(".loading-text").html("正在加载字体，请稍等");
		setTimeout(function(){
			$(".loading").fadeOut(300);
			$(".page-1").addClass("page-active");
			utils.createFrameImg($("#canvas-loop")[0],"images/code.png");
			setTimeout(function(){
				if(swiper.activeIndex == 0)
				swiper.slideNext();
			},3000);
		},2000);
		return false;
	}

	var gress = ( $i * 100 / $len ) >> 0;

	$(".loading-text").html("loading...");
	$(".loading-progress").css("width",gress+"%");
}

var $len = $("img[data-src]").length,
	$i = 0;

$("img[data-src]").each(function(){

	var img = $(this)[0],
		src = $(this).attr("data-src");

	img.onload = function(){
		setTimeout(function(){
			$i++;
			loadEnd();
		},10);
	};

	img.onerror = function(){
		setTimeout(function(){
			$i++;
			loadEnd();
		},10);
	};

	img.src = src+"?ver="+new Date().getTime();

});

var textHasShowed = false;

function enterPage2(){
	var str='腾讯优图AI实验室成立于\n201X年。实验室集结了国\n内外人工智能领域最优秀\n的科学家。\n拥有：人脸识别、图像识\n别、声音识别';

	if(textHasShowed)
	return false;

	utils.showfonts(str,150,function(data){
		$(".page2-text-box>pre").append(data.value);
	});

	$(".page-2").addClass("page-active");

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

var isPage4Showed = false;

function enterPage4(){
	var str="人脸识别技术可以包括检测图片内的人脸，返回人脸的位置和性别、年龄等属性以及精确定位，和跟踪面部的关键区域位置等功能";

	if(isPage4Showed) return false;

	$(".page-4").addClass("page-active");

	/*utils.showfonts(str,150,function(data){
		$(".page4-text").append(data.value);
	});*/

	isPage4Showed = true;

}

var isPage8Showed = false;

function enterPage8(){
	var str="图像识别技术可以准确快速地检测图像中的内容信息，囊括了社交生活、人物、风景、建筑、常见生活物品等大类的图像语义信息提取。";

	if(isPage8Showed) return false;

	$(".page-8").addClass("page-active");

	utils.showfonts(str,150,function(data){
		$(".page8-text").append(data.value);
	});

	isPage8Showed = true;

}

var isPage12Showed = false;

function enterPage12(){
	var str="声音识别技术可以将任意文本转化为语音，让机器和应用开口说话。";

	if(isPage12Showed) return false;

	$(".page-12").addClass("page-active");

	utils.showfonts(str,150,function(data){
		$(".page12-text").append(data.value);
	});

	isPage8Showed = true;

}

});