jQuery(function($){

var sc1 = new Swiper('.sc-1',{
	direction: "horizontal",
	slidesPerView: 'auto',
	freeMode: true
}), sc2 = new Swiper('.sc-2',{
	direction: "horizontal",
	slidesPerView: 'auto',
	freeMode: true
}), sc3 = new Swiper('.sc-3',{
	direction: "horizontal",
	slidesPerView: 'auto',
	freeMode: true
}), sc4 = new Swiper('.sc-4',{
	direction: "horizontal",
	slidesPerView: 'auto',
	freeMode: true
});

$('.al-list').on("click",function(e){
	var $id = $(this).attr("data-id");
	$('.layer').removeClass("hide");
	$('.layer-list[data-id="'+$id+'"]').removeClass("hide");
});

$('.close').on("click",function(e){
	$('.layer').addClass("hide");
	$('.layer-list').addClass("hide");
});

});