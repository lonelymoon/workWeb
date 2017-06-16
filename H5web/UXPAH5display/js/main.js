require.config({
	urlArgs : "v="+(new Date().getTime()),
	paths : {
		"jquery" : "jquery.min",		//jquery
		"swiper" : "swiper.min",		//swiper
		"countUp" : "jquery.countup.min",
		"waypoints" : "jquery.waypoints.min"
	},
	map: {
        '*': {
            'css': 'css'
        }
    },
	shim : {
		"jquery" : {
			deps : [
				"css!../css/style.css",
				"css!../css/swiper.min.css",
				"css!http://cdn.webfont.youziku.com/webfonts/nomal/97183/47065/59435047f629d81aa8f59968.css",
				"css!http://cdn.webfont.youziku.com/webfonts/nomal/97183/47017/594352f6f629da1aa837fa53.css",
				"css!http://cdn.webfont.youziku.com/webfonts/nomal/97183/47100/59424f9bf629d819603f3f57.css",
				"css!http://cdn.webfont.youziku.com/webfonts/nomal/97183/47159/594362d8f629da1aa837fa64.css",
				"css!../css/main.css"
			]
		},
		"countUp" : {
			deps : ["jquery","waypoints"]
		},
		"waypoints": {
			deps : ["jquery"]
		}
	}
});

require(["jquery","swiper","countUp","waypoints"],function(jQuery,Swiper,countUp,waypoints){

jQuery(function($){

	var width = $(window).width(),
		trueWidth = width > 750 ? 750 : width,
		size = ( 0.2 * trueWidth / 750 * 120 ) >> 0,
		swiper = new Swiper('.swiper-container', {
		    slidesPerView: "auto",
		    spaceBetween: size
		});

	$('.count-num').countUp({
	    delay: 10,
	    time: 2000
	});

});

});