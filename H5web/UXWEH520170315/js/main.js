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

$.ajax({
	"type" : "get",
	"url" : "/weixintest/Getongoing.action",
	"data" : {userName:'userName01'},
	"dataType" : "json",
	"success" : function(res){
		var results = res.resultArray,
			temp = [],
			tempObj = null;
		for(var i = 0, resultItem; resultItem = results[i++]; ){
			tempObj = {
				"index" : i,
				"id" : resultItem.intid,
				"intro-text" : resultItem.strmessage ,
				"speecher-photo" : resultItem.strteacherimgurl,
				"speecher-name" : resultItem.strteachername,
				"experience" : resultItem.strteachermesssage,
				"speech-title" : resultItem.strname ,
				"date" : "时间："+resultItem.strstartime,
				"address" : "地点："+resultItem.straddress ,
				"left-day" : Math.max(utils.getLeftDay(resultItem.strstartime),0),
				"placeCn" : resultItem.strcity ,
				"placeEn" : resultItem.strcityenglish ,
				"noteMsg" : resultItem.strremarkmessage
			};
			temp.push(tempObj);
		}
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
			temp = [],
			tempObj = null;
		for( var i = 0, resultItem; resultItem = results[i++]; ){
			var actFlag = resultItem.intshowflag,
				enrollFlag = resultItem.intenrollflg;

			tempObj = {
				"id" : resultItem.intid,
				"actsImg" : resultItem.strimgurl,
				"actsTitle" : resultItem.strname,
				"actsSpeecher" : resultItem.strteachername,
				"type" : resultItem.strtype,
				"time" : resultItem.strstartime,
				"cost" : "免费",
				"hasStarted" : actFlag == 1 ? "已结束" : actFlag == -1 ? "未开始" : "进行中",
				"btnLink" : dPath+"/UXWE/pages/details/details.html?uid="+resultItem.intid,
				"btnText" : "查看详情"
			};

			temp.push(tempObj);
		}
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
			temp = [],
			tempObj = null;
		for( var i = 0, resultItem; resultItem = results[i++]; ){
			var actFlag = resultItem.intshowflag,
				enrollFlag = resultItem.intenrollflg;

			tempObj = {
				"id" : resultItem.intid,
				"name" : resultItem.strname,
				"link" : resultItem.strwwwurl,
				"logo" : resultItem.strimgurl
			};

			temp.push(tempObj);
		}
	}
});

//swiper
var sc1 = new Swiper(".sc-1",{
	speed : 800,
	autoplay : 5000,
	loop : true,
	touchMoveStopPropagation : true
}), sc2 = new Swiper(".sc-2",{
	direction : "horizontal",
	touchMoveStopPropagation : true,
	slidesPerView: 3
});

//IScroll
var myScroll = new Scroll('.home-wrapper', {
    mouseWheel: true,
    scrollbar: true
});

});

});