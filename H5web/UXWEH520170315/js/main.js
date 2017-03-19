jQuery(function($){

//Page
var page = new Page();

//swiper
var sc1 = new Swiper(".sc-1",{
	speed : 800,
	autoplay : 5000,
	loop : true
}), sc2 = new Swiper(".sc-2",{
	direction : "horizontal",
	slidesPerView: 3
});

//IScroll
var myScroll = new IScroll('.home-wrapper', {
    mouseWheel: true,
    scrollbars: true
});

setTimeout(function(e){
	myScroll.refresh();
},100);

});