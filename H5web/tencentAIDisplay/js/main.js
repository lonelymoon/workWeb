jQuery(function($){

var swiper,
	u = navigator.userAgent,
	isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	iscroll = new IScroll('.layer-wrapper',{
		tap : true
	});

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
	$("#bgm")[0].play();
	$("#bgm")[0].pause();
});

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

$(".page5-like-box").on("click",function(e){
	var $id = $(this).attr("data-id");
	$(".layer-box").attr("data-id",$id).show();
	iscroll.refresh();
	iscroll.scrollTo(0,0,0);
});

$('.close').on("click",function(e){
	$(".layer-box").attr("data-id","0").hide();
});

$(".layer-btn").on("tap",function(e){
	$(".layer-box").attr("data-id","0").hide();
});

$(".music-icon").on("click",function(){
	var bgm = $("#bgm")[0];
	if(bgm.paused){
		bgm.play();
		changeIcon(true);
	} else {
		bgm.pause();
		changeIcon(false);
	}
});

var changeIcon = (function(){
	var container = $(".music-icon")[0],
		image = $(".music-icon>img")[0];

	if(isIOS){
		$(".music-icon").removeClass("pause");
		return function(type){
			if(type){
				container.classList.add('music-animate')
				return false;
			}

			var iTransform = getComputedStyle(image).transform;
			var cTransform = getComputedStyle(container).transform;
			  	image.style.transform = iTransform === 'none'
			    ? cTransform
			    : cTransform.concat(' ', iTransform);
			container.classList.remove('music-animate');
		};
	}
	
	return function(type){
		if(type){
			$(".music-icon").removeClass("pause");
			return false;
		}
		$(".music-icon").addClass("pause");
	};

})();

function loadOthers(){
	var $imgs = $("img[data-later]");
	$imgs.each(function(){
		var img = $(this)[0],
			src = $(this).attr("data-src");

		img.src = src;
	});
}

function pageStart(){

	setTimeout(function(){

		//$(".loading-text").html("点击屏幕开始预览");
		$(".notice-img").fadeIn(500);
		$('.loading').one("click",function(){
			$(".loading").fadeOut(300);
			$(".page-1").addClass("page-active");
			utils.createFrameImg($("#canvas-loop")[0],"images/code.png");
			$(".music-icon").trigger("click");
			setTimeout(function(){
				if(swiper.activeIndex == 0)
				swiper.slideNext();
				loadOthers();
			},2800);
		});

	},2000);
}

function createSwiper(){
	swiper = new Swiper('.swiper-container',{
		direction : 'vertical',
		onSlideChangeEnd : function(swiper){
			var idx = swiper.activeIndex;
			$(".page-"+(idx+1)).addClass("page-active");

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
					enterPage13();
				break;
			}
		}

	});
}

function loadEnd(){
	var gress = ( $i * 100 / $len ) >> 0;
	//$(".loading-progress").css("width",gress+"%");
	$(".loading-box").html(gress+"%");
	if( $i == $len ){
		$("#container").show();

		createSwiper();

		//$(".loading-text").html("正在加载字体和其他多媒体文件，请稍等");

		pageStart();

		return false;
	}

}

var $len = $("img[data-src]").length,
	$i = 0;

function loadimg(){
	if($(this).attr("data-later")=="true"){
		$i++;
		loadEnd();
	} else {
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

		img.src = src;
	}
}

$("img[data-src]").each(function(){
	setTimeout(loadimg.bind(this),50);
});

var textHasShowed = false;

function enterPage2(){
	var str='腾讯优图成立于2012年，\n集结了国内外人工智能领\n域最优秀的科学家。在人\n脸分析、图像识别、音频\n分析等领域均拥有业界领\n先技术能力。';

	if(textHasShowed)
	return false;

	/*utils.showfonts(str,100,function(data){
		$(".page2-text-box>pre").append(data.value);
	});*/

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

	/*utils.showfonts(str,150,function(data){
		$(".page4-text").append(data.value);
	});*/

	isPage4Showed = true;

}

var isPage8Showed = false;

function enterPage8(){
	var str="图像识别技术可以准确快速地检测图像中的内容信息，囊括了社交生活、人物、风景、建筑、常见生活物品等大类的图像语义信息提取。";

	if(isPage8Showed) return false;

	/*utils.showfonts(str,100,function(data){
		$(".page8-text").append(data.value);
	});*/

	isPage8Showed = true;

}

var isPage13Showed = false;

function enterPage13(){
	var str="腾讯优图的音频分析能力，可高精度TtoV或VtoT，通过智能学习，还能让机器模仿任意人声“说”出任意文字。";

	if(isPage13Showed) return false;

	/*utils.showfonts(str,100,function(data){
		$(".page13-text").append(data.value);
	});*/

	isPage13Showed = true;

}

});