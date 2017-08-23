jQuery(function($){

var $columns = $('.column-container'),
	idx = 0,
	onscrolling = false;

var myscroll = new IScroll('#mendian',{
	mouseWheel : true,
	click : true,
	tap : true,
	scrollbars : true,
	interactiveScrollbars : true
});

var click = "ontouchend" in document ? "touchend" : "click";

setTimeout(function(e){
	myscroll.refresh();
	$('.selector-wrapper').hide();
},100);

function init(){

	$columns.each(function(){

		var top = $(this).offset().top;
		if (top >= $(window).scrollTop() && top < ($(window).scrollTop()+$(window).height())) {
			$(this).addClass("page-active");
			idx = $(this).attr("data-idx") * 1;
		}

	});
}

function shicha(){

	var $ele =  $('.mouser-container');
		cx = $ele.width() / 2,
		cy = $ele.height() / 2,
		px = 30, //偏移x最大值
		py = 30; //偏移y最大值

	var $items = $ele.find('.float-item');

	$ele.find('.float-item').addClass('float-trans');

	$ele.on("mousemove",function(e){

		var $el = $(this);

		setTimeout(function(){
			var x = e.clientX - $el.offset().left, 
				y = e.clientY - $el.offset().top;
			setTranslate( x, y );
		},16);

	});

	function setTranslate( x, y ){

		$items.each(function(idx,item){

			var $el = $(this),
				z = $el.attr("data-ZUnit"),
				tx = ( px / z * ( cx - x ) / cx ) >> 0,
				ty = ( py / z * ( cy - y ) / cy ) >> 0,
				pz = $el.hasClass("f-item-3") ? 1 : $el.hasClass("f-item-5") ? 3 : 2;

			pz = $el.hasClass("f-item-0") ? 1 : pz;

			$(this).css({
				"-webkit-transform" : "translate3d("+tx+"px,"+ty+"px,"+pz+"px)",
				"-moz-transform" : "translate3d("+tx+"px,"+ty+"px,"+pz+"px)",
				"-o-transform" : "translate3d("+tx+"px,"+ty+"px,"+pz+"px)",
				"transform" : "translate3d("+tx+"px,"+ty+"px,"+pz+"px)"
			});

		});

	}

}

function loading(){

	var $imgs = $('.img-set'),
		count = 0,
		len = $imgs.length,
		$barEl = $('.loading-bar'),
		$loadContainer = $('.loading-container');

	if( len == 0 ){
		loadEnd();
		return false;
	}

	$imgs.each(function(idx,ele){

		var img = $(this)[0];

		if( img.complete ){
			count++;
			process(count);
		} else {
			img.onload = function(e){
				count++;
				process(count);
			};

			img.onerror = function(e){
				count++;
				process(count);
			};
		}
	});

	function process(count){
		var per = count / len * 100;
		$barEl.css('width',per.toFixed(0)+"%");
		if(per == 100){
			setTimeout(function(){
				loadEnd();
			},500);
		}
	}

	function loadEnd(){
		$barEl.attr("data-isEnd","end");
		loadHide();
	}

	function loadHide(){
		$loadContainer.delay(1500).fadeOut(500,function(e){
			$('.mouser-container').addClass('page-end');
			setTimeout(function(){
				//shicha();
				changeSlide();
				init();
			},800);
		});
	}

}

function changeSlide(){

	var idx = 1,
		timer,
		$wrapper = $('.intro-wrapper');

	$('.intro-points').on('click','.intro-point',function(e){
		clearTimeout(timer);
		idx = $(this).attr("data-idx") - 1;
		change();
	});

	function show(){

		$wrapper.attr("data-step",idx);

		$('.mark-'+idx).fadeIn(600);

		$('.text-'+idx)
		.fadeIn(600)
		.find("p")
		.animate({
			"left" : "0px"
		},600);

		$('.msg-'+idx)
		.fadeIn(600)
		.find(".msg-wrapper")
		.animate({
			"left" : "0px"
		},600);
	}

	function change(){

		$('.mark').fadeOut(500);

		$('.intro-text')
		.fadeOut(500)
		.find("p")
		.animate({
			"left" : "30px"
		},500,function(){
			$(this).css({
				"left" : "-30px"
			});
		});

		$('.bottom-msg')
		.fadeOut(500)
		.find(".msg-wrapper")
		.animate({
			"left" : "30px"
		},500,function(e){

			$(this).css({
				"left" : "-30px"
			});

			setTimeout(show,0);
		});

		idx >= 3 ? idx = 1 : idx++;

		timer = setTimeout(change,6000);
	};

	change();
};

function scrollChange(){

	onscrolling = true;
	$('html,body').animate({
		scrollTop: $('.column-container[data-idx="'+idx+'"]').offset().top
	}, 600, function(e){
		onscrolling = false;
	});	

};

function baiduMap($map,$title,$md){

	var map = new BMap.Map("map-bg");
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint($map, function(point){

		if (point) {

			map.centerAndZoom(point, 20);

			var marker = new BMap.Marker(point);

			map.addOverlay(marker);

			var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="http://qcloud.dpfile.com/pc/35BUOVDwa2ajVyFMcWSymUeMqc9dOiIr0Can7DIM2LbbO1X8lUx6XgAW5--i7MUNuoWgh6flEoCpotrIjLoTeQ.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    $title.split(";").join("<br/>")+
                  '</div>';

		    //创建检索信息窗口对象
		    var searchInfoWindow = null;
			searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
				title  : "ZE极限运动站-"+$md,      //标题
				width  : 290,             //宽度
				height : 115,              //高度
				panel  : "panel",         //检索结果面板
				enableAutoPan : true,     //自动平移
				searchTypes   :[
					BMAPLIB_TAB_SEARCH,   //周边检索
					BMAPLIB_TAB_TO_HERE,  //到这里去
					BMAPLIB_TAB_FROM_HERE //从这里出发
				]
			});

			searchInfoWindow.open(marker);

			map.setCurrentCity("上海")

		}else{
			alert("您选择地址没有解析到结果!");
		}

	}, "上海市");

	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL})); 

}


//加载时禁止页面滚动
$('.loading-container').on("mousewheel",function(e){
	e.preventDefault();
	e.stopPropagation();
	return false;
});

//
$('.tec-btn').on(click,function(e){
	e.preventDefault();
	e.stopPropagation();
	$('.tec-wrapper').addClass("tec-show");
});

$('.close').on(click,function(e){
	e.preventDefault();
	e.stopPropagation();
	$('.tec-wrapper').removeClass("tec-show");
});

//qrcode
$('.tec-link-btn').on(click,function(e){
	$(".QRcode").fadeIn(300);
});

$(".QRcode").on(click,function(e){
	$(this).fadeOut(300);
	$('.close').trigger("click");
});

//滑动
var $exb = $('.example-boxer'),
	$exc = $('.example-content'),
	transX = 0,
	$w = $exb.width();

$('.example-right-btn').on(click,function(e){
	var tx = Math.max( $exc.width() - transX - $w, 0 );

	tx = tx >= $w ? $w : tx;

	transX += tx;

	if(transX > 0){
		$('.example-left-btn').show();
	}

	$exc.css({
		"-webkit-transform" : "translate3d(-"+transX+"px,0px,1px)",
		"-moz-transform" : "translate3d(-"+transX+"px,0px,1px)",
		"-o-transform" : "translate3d(-"+transX+"px,0px,1px)",
		"transform" : "translate3d(-"+transX+"px,0px,1px)"
	});

});

$('.example-left-btn').on(click,function(e){
	var tx = transX >= $w ? $w : transX;

	transX -= tx;

	if(transX == 0){
		$(this).hide();
	}

	$exc.css({
		"-webkit-transform" : "translate3d(-"+transX+"px,0px,1px)",
		"-moz-transform" : "translate3d(-"+transX+"px,0px,1px)",
		"-o-transform" : "translate3d(-"+transX+"px,0px,1px)",
		"transform" : "translate3d(-"+transX+"px,0px,1px)"
	});
});

//导航
$('.right-items').on('click','a',function(e){

	e.preventDefault();
	e.stopPropagation();

	var id = $(this).attr("href");

	idx = $(id).attr("data-idx");

	scrollChange();

});

//页面滑动
$(window).on("scroll",function(e) {
	init();
});

$(window).on('mousewheel DOMMouseScroll',function(e){

	if(onscrolling){
		return false;
	}

	e.preventDefault();
	e.stopPropagation();

	var direc = e.originalEvent.deltaY || e.originalEvent.detail;

	direc > 0 ? idx++ : idx--;

	idx < 0 ? idx = 0 : ( idx > 8 ? idx = 8 : idx = idx );

	scrollChange();

});

var sy = 0;

$("#content")[0].ontouchstart = function(e){

	e.preventDefault();

	sy = e.touches[0].pageY;

};

$("#content")[0].ontouchend = function(e){

	if(onscrolling){
		return false;
	}

	var direc = sy - e.changedTouches[0].pageY;

	direc > 10 ? idx++ : direc < -10 ? idx-- : idx = idx;

	idx < 0 ? idx = 0 : ( idx > 8 ? idx = 8 : idx = idx );

	scrollChange();

};

//a标签
$('#content').on(click,'a',function(e){
	e.preventDefault();
	window.open($(this).attr("href"),"_blank");
});

//下拉
$('.selector').on(click,'.selector-val',function(e){

	onscrolling = true;

	$('.selector-wrapper').hide();
	$(this).parents(".selector").find('.selector-wrapper').slideDown(300);

});

$('.selector').on(click,'.selector-item',function(e){

	e.preventDefault();
	e.stopPropagation();

	var $val = $(this).text(),
		$map = $(this).attr("data-map"),
		$title = $(this).attr("title");

	$(this).parents(".selector").find(".selector-val").html($val).attr({
		"data-val" : $val,
		"data-map" : $map,
		"data-title" : $title
	});

	$('.selector-wrapper').hide();
	onscrolling = false;

});

$('.selector-btn').on(click,function(e){

	var $area = $('.area').find(".selector-val").attr("data-val"),
		$md = $('.md').find(".selector-val").attr("data-val"),
		$map = $('.md').find(".selector-val").attr("data-map"),
		$title = $('.md').find(".selector-val").attr("data-title");

	if( !$area || !$md ){
		alert("请选择地区和门店");
		return false;
	}

	baiduMap($map,$title,$md);

});

$('#map-bg').on(click,function(e){
	e.stopPropagation();
});

$("#video").on(click,function(e){
	$(this)[0].paused ? $(this)[0].play() : $(this)[0].pause();
});

$('.playImg').on(click,function(e){
	$(this).hide();
	$('#video').trigger(click);
});

loading();

});