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
	url : "",
	data : {},
	type : "get",
	dataType : "jsonp",
	success : function(res){

	},
	fail : function(status){
		
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