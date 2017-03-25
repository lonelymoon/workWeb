require.config({
	urlArgs : "ver="+(new Date().getTime()),
	paths : {
		"jquery" : "plugs/jquery.min",		//jquery
		"swiper" : "plugs/swiper.min",		//swiper
		"iscroll" : "plugs/iscroll-probe",	//iscroll
		"hammer" : "plugs/hammer.min",		//hammer
		"pageScroll" : "./page.scroll", 	//整合iscroll.js
		"pageHand" : "./page.hands",		//整合hammer.js
		"page" 	: "./page" 		//main
	},
	shim : {
		"pageHand" : {
			deps : ["hammer"]
		},
		"pageScroll" : {
			deps : ["iscroll"],
			exports : "Scroll"
		},
		"page" : {
			deps : ["jquery","swiper","pageHand","pageScroll"]
		}
	}
});

require(['jquery',"page","pageScroll"],function($,Page,Scroll){

$(function(){
	var myPage = new Page(),
		now = new Date(),
		thisYear = now.getFullYear(),
		thisMonth = now.getMonth() + 1,
		prevDate = {
			year : 2000,
			month : 8
		},
		yLen = thisYear - prevDate.year,
		mLen = thisMonth - prevDate.month,
		temp = "",
		yScroll = null;

	if(mLen < 0){
		yLen--;
	}

	for( var i = 0; i <= yLen; i++ ){
		var tpl = '<li class="selector-list">'+(2000+i)+'</li>';
		temp += tpl;
	}

	$('.year-box').find('.selector-scroll').html(temp);

	$('.year-box').on('click',function(e){
		$(this).find(".selector").fadeIn(300,function(){
			if(yScroll){
				yScroll.refresh();
				return false;
			}
			yScroll = new Scroll(".year-box .selector-wrapper",{
				scrollBar : true,
				tap : true
			});
		});

	});

	$('.year-box .selector-scroll').on('tap','.selector-list',function(e){
		e.stopPropagation();
		var $val = $(this).text();
		$('.year-box').find(".selector-val").html($val).attr("data-val",$val);
		$('.year-box').find(".selector").hide();
	});

	$('.major-box').on('click',function(e){
		$(this).find(".selector").fadeIn(300);
	});

	$('.major-box .selector-scroll').on('click','.selector-list',function(e){
		e.stopPropagation();
		var $val = $(this).text();
		$('.major-box').find(".selector-val").html($val).attr("data-val",$val);
		$('.major-box').find(".selector").hide();
	});

	$('.input-box').on('click',function(e){
		$('.input-box').removeClass("focus");
		$(this).addClass('focus');
	});

	$('.send-btn').on('click',function(e){
		var $name = $('#name').val() || "匿名",
			$year = $('.year-box .selector-val').attr("data-val"),
			$major = $('.major-box .selector-val').attr("data-val"),
			$msg = $('#input-msg').val();

		if(!$year || $year == ""){
			alert("请选择年份");
			return false;
		}

		if(!$major || $major == ""){
			alert("请选择专业");
			return false;
		}

		if(!$msg || $msg == ""){
			alert("请填写你想说的话");
			return false;
		}

		$.ajax({

		});

	});

	myPage.checkReady(function(){
		$('.layer').hide();
		myPage.startFlowerAnimation();
		setTimeout(function(){
			myPage.startTextAnimation(1);
		},1000);
	});

});

});