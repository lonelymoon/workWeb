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
		$('.selector-list[data-type]').show();
		$('.major-box').find(".selector-val").html("专业科目").attr("data-val","");
		if($val < 2004){
			$('.selector-list[data-type="2"]').hide();
			$('.selector-list[data-type="3"]').hide();
		} else if( $val < 2008 ){
			$('.selector-list[data-type="3"]').hide();
		}
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

	var uploading = false;

	$('.send-btn').on('click',function(e){
		var $name = $('#name').val() || "匿名",
			$year = $('.year-box .selector-val').attr("data-val"),
			$major = $('.major-box .selector-val').attr("data-val"),
			$msg = $('#input-msg').val();

		if(uploading){
			return false;
		}

		if(!$year || $year == ""){
			myPage.alert("","请选择年份","我知道了");
			return false;
		}

		if(!$major || $major == ""){
			myPage.alert("","请选择专业","我知道了");
			return false;
		}

		if(!$msg || $msg == ""){
			myPage.alert("","请填写你想说的话","我知道了");
			return false;
		}

		uploading = true;

		$.ajax({
			type : "post",
			url : "/Enroll.action",
			data : {
				strnickname:$name,
				strstartschool:$year,
				strprofession:$major,
				strmessage:$msg
			},
			dataType : 'json',
			success : function(res){
				uploading = false;
				if(!res.strflg){
					myPage.alert("","信息上传失败，请重试","我知道了");
					return false;
				}
				myPage.alert("","发送成功，正在审核...","看看大家说什么",function(e){
					myPage.toPage(2);
				});
			},
			fail : function(status){
				myPage.alert("","信息上传失败，请重试","我知道了");
				uploading = false;
			}
		});

	});

	$('#bgmIcon').on('click',function(e){
		var paused = $('#bgm')[0].paused;
		if(paused){
			$('.music').attr("data-status","play");
			$('#bgm')[0].play();
		} else {
			$('.music').attr("data-status","pause");
			$('#bgm')[0].pause();
		}
	});

	myPage.checkReady(function(){
		$('.layer').hide();
		myPage.startFlowerAnimation();
		myPage.startMusic();
		setTimeout(function(){
			myPage.startTextAnimation(1);
		},1000);
	});

});

});