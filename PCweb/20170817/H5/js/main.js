jQuery(function($){

var $imgs = $('img[data-link]'),
	len = $imgs.length,
	count = 0;

if(len == 0){
	progress();
}

$imgs.each(function(){

	var link = $(this).attr("data-link");

	$(this).attr('src',link);

	if( $(this)[0].complete ){
		count++;
		progress();
	} else {
		$(this)[0].onload = function(e){
			count++;
			progress();
		};

		$(this)[0].onerror = function(e){
			count++;
			progress();
		};
	}

});

$('.menu').on('click',function(e){
	$('header').addClass('nav-active');
});

$('.nav-wrapper').on('click','.nav-item',function(e){
	$('header').removeClass('nav-active');
});

$('.c2-btn-1').on('click',function(e){
	scroll2.refresh();
	$('#column-4').addClass("course-active");
});

$('.course-btn-back').on('tap',function(e){
	$('#column-4').removeClass("course-active");
});

$('.detail-btn').on('click',function(e){
	$('.column-5').addClass("detail-active");
});

$('.back').on('tap',function(e){
	$('.column-5').removeClass("detail-active");
});

$('.code').on('click',function(e){
	$('.QRcode').show();
});

$('.Iknow').on("click",function(e){
	$('.QRcode').hide();
	$('.back').trigger("tap");
});

//progress
function loadEnd(){
	$("#content").show();
	$('.loading-container').fadeOut(300);

	createSwiper();
	createScroll();
}

function progress(){

	var p = ( count / len * 100 ) >> 0;

	$('.num').html( p * 0.2 >> 0 );
	$('.loading-logo').css({
		'left' : p + "%"
	});

	if( count == len ){
		loadEnd();
	}

}

var swiper,
	scroll,
	scroll2,
	myscroll;

function createSwiper(){
	swiper = new Swiper('.swiper-container',{
		paginationClickable :true,
		pagination : '.swiper-pagination',
		prevButton:'.swiper-button-prev',
		nextButton:'.swiper-button-next',
		autoplayDisableOnInteraction : false,
		speed : 600,
		autoplay : 5000
	});
}

function createScroll(){
	scroll = new IScroll(".detail-box",{
		tap : true
	});

	scroll2 = new IScroll(".course-1",{
		tap : true,
		click : true
	});

	myscroll = new IScroll('#mendian',{
		click : true,
		scrollbars : true,
		interactiveScrollbars : true
	});

	setTimeout(function(){
		scroll.refresh();
		scroll2.refresh();
		myscroll.refresh();
		$('.selector-wrapper').hide();
	},500);
}

//下拉
$('.selector').on("click",'.selector-val',function(e){

	onscrolling = true;

	$('.selector-wrapper').hide();
	$(this).parents(".selector").find('.selector-wrapper').slideDown(300);

});

$('.selector').on("click",'.selector-item',function(e){

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

$('.selector-btn').on("click",function(e){

	var $area = $('.area').find(".selector-val").attr("data-val"),
		$md = $('.md').find(".selector-val").attr("data-val"),
		$map = $('.md').find(".selector-val").attr("data-map"),
		$title = $('.md').find(".selector-val").attr("data-title");

	if( !$area || !$md ){
		alert("请选择地区和门店");
		return false;
	}

	$('.map-bg').show();

	baiduMap($map,$title,$md);

});

$('.map-back').on('click',function(e){
	$('.map-bg').hide();
});

$('#map-bg').on("click",function(e){
	e.stopPropagation();
});

function baiduMap($map,$title,$md){

	var map = new BMap.Map("map-set");
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


});