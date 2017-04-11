require.config({
	urlArgs : "v="+(new Date().getTime()),
	paths : {
		"jquery" : "plugs/jquery.min",		//jquery
		"swiper" : "plugs/swiper.min",		//swiper
		"iscroll" : "plugs/iscroll-probe",	//iscroll
		"hammer" : "plugs/hammer.min",		//hammer
		"pageConfig" : "./page.config", 	//页面配置代码
		"pageScroll" : "./page.scroll", 	//整合iscroll.js
		"pageHand" : "./page.hands",		//整合hammer.js
		"page" : "./page.proto"				//主代码
	},
	shim : {
		"pageConfig" : {
			deps : ["jquery"]
		},
		"pageHand" : {
			deps : ["hammer"]
		},
		"pageScroll" : {
			deps : ["iscroll"],
			exports : "Scroll"
		},
		"page" : {
			deps : ["jquery","pageScroll","pageHand","pageConfig"],
			exports : "Page"
		}
	}
});

require(['jquery','page','swiper','pageScroll'],function($,Page,Swiper,Scroll){

$(function(){

//Page
var page = new Page();

//获取有没有登陆
$.ajax({
	"type" : "post",
	"url" : "/weixintest/Gettuserlist.action",
	"data" : {},
	"dataType" : "json",
	"async" : false,
	"success" : function(res){
		var userMsg = res.jsonusermessage;
		$('.user-photo').find("img").attr("src",userMsg.strimageurl);
		$('.user-status').html(userMsg.strnickname);
	}
});

$.ajax({
	"type" : "get",
	"url" : "/weixintest/Getongoing.action",
	"data" : {userName:'userName01'},
	"dataType" : "json",
	"success" : function(res){
		var results = res.resultArray,
			temp = [],
			tempObj = null,
			resultItem = results[0],
			time = resultItem.strstartime.replace(/-|,/g,"/"),
			leftTime = new Date().getTime() - new Date(time.strstartime),
			status = leftTime < 0 ? "未开始" : "已结束";

		$('.actv-item-image').html('<img src="'+resultItem.strteacherimgurl+'">');
		$('.actv-item-enTitle').html(resultItem.strengname);
		$('.actv-item-cnTitle').html(resultItem.strname);
		$('.actv-item-lecName').html("主讲人："+resultItem.strteachername);
		$('.actv-item-lecJob').html(resultItem.strteachermesssage);
		$('.actv-item-city').html(resultItem.strcity);
		$('.actv-item-date').html(resultItem.strstartime);
		$('.actv-item-hasStarted').html(status);
		$('.actv-item').attr("data-id",resultItem.intid);
		myScroll.refresh();
	}
});
//获取往期活动
$.ajax({
	"type" : "get",
	"url" : "/weixintest/Getpast.action",
	"data" : {userName:'userName01'},
	"dataType" : "json",
	"success" : function(res){
		var results = res.resultArray,
			temp = "",
			tempObj = null;
		for( var i = 0, resultItem; resultItem = results[i++]; ){
			var actFlag = resultItem.intshowflag,
				enrollFlag = resultItem.intenrollflg;

			var tpl = '<div class="past-item detail-link" data-id="'+resultItem.intid+'" data-link="detail">'+
						'<div class="past-item-msg">'+
							'<div class="past-item-cnTitle">'+resultItem.strname+'</div>'+
							'<div class="past-item-enTitle">'+resultItem.strengname+'</div>'+
							'<div class="past-item-lecName">作者 '+resultItem.strteachername+'</div>'+
						'</div>'+
						'<div class="past-item-image">'+
							'<img src="'+resultItem.strimgurl+'">'+
						'</div>'+
					'</div>';

			temp += tpl;
			if(i >= 4){
				break;
			}
		}

		$('.past-workshop-box').html(temp).find('.past-item').eq(0).attr("data-type","1");
		myScroll.refresh();
	}
});
//获取讲师
$.ajax({
	"type" : "get",
	"url" : "/weixintest/Getnear5.action",
	"data" : {userName:'userName01'},
	"dataType" : "json",
	"success" : function(res){
		var results = res.resultArray,
			temp = ""
			tempObj = null;
		for( var i = 0, resultItem; resultItem = results[i++]; ){

			var tpl = '<div class="swiper-slide">'+
						'<div class="lec-item" data-id="'+resultItem.intid+'">'+
							'<div class="lec-item-image">'+
								'<img src="'+resultItem.strimgurl+'">'+
							'</div>'+
							'<div class="lec-item-job">'+resultItem.strmesssage+'</div>'+
							'<div class="lec-item-lecName">'+resultItem.strname+'</div>'+
						'</div>'+
					'</div>';

			temp += tpl;
			if(i >= 6){
				break;
			}
		}

		$('.sc-2').find(".swiper-wrapper").html(temp).find('.lec-item').eq(0).attr("data-type","1");
		var sc2 = new Swiper(".sc-2",{
			direction : "horizontal",
			touchMoveStopPropagation : true,
			slidesPerView: 3
		});
		myScroll.refresh();
	}
});
//获取赞助商
$.ajax({
	"type" : "get",
	"url" : "/weixintest/Getsponsor.action",
	"data" : {userName:'userName01'},
	"dataType" : "json",
	"success" : function(res){
		var results = res.resultArray,
			temp = "",
			tempObj = null;
		for( var i = 0, resultItem; resultItem = results[i++]; ){
			var actFlag = resultItem.intshowflag,
				enrollFlag = resultItem.intenrollflg;

			var tpl = '<a href="'+resultItem.strwwwurl+'">'+
						'<div class="partner-item" data-id="'+resultItem.intid+'">'+
							'<div class="partner-item-image">'+
								'<img src="'+resultItem.strimgurl+'">'+
							'</div>'+
							'<div class="partner-item-name">'+
								resultItem.strname+
							'</div>'+
						'</div>'+
					'</a>';

			temp += tpl;
		}
		$('.partner-box').html(temp);
		myScroll.refresh();
	}
});

//swiper
var sc1 = new Swiper(".sc-1",{
	speed : 800,
	autoplay : 5000,
	loop : true,
	touchMoveStopPropagation : true
});

//IScroll
var myScroll = new Scroll('.home-wrapper', {
    mouseWheel: true,
    scrollbar: true
});

});

});