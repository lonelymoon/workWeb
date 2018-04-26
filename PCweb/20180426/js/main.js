jQuery(function($){

var h = $(window).height(),
	len = $(".column").length,
	activeId = 1;

$(".column").css("height", h + "px");

check();

$("body").on("mousewheel",function(e){
	e.preventDefault();
	e.stopPropagation();

	if( scroll.scrolling ) return false;
	scroll.scrolling = true;

	var del = e.originalEvent.wheelDelta || e.originalEvent.detail;

	if( del > 0 ) scroll.up();
	if( del < 0 ) scroll.down();

});

$(window).on("scroll",function(e){
	check();
});

function check(){
	$(".column").each(function(idx,elem){
		var top = elem.getBoundingClientRect().top;

		$(elem).removeClass("column-active");

		if(top < h && top >= 0 ) {
		 	activeId = $(elem).attr("data-id") * 1;
		 	$(elem).addClass("column-active");
		}
	});
}

var scroll = {
	scrolling : false,
	up : function(){
		activeId = activeId - 1 < 1 ? 1 : activeId - 1;

		$("html,body").animate({
			scrollTop : ( activeId - 1 ) * h + "px"
		}, 600,function(){
			scroll.scrolling = false;
		});
		
	},
	down : function(){
		activeId = activeId + 1 > len ? len : activeId + 1;

		$("html,body").animate({
			scrollTop : ( activeId - 1 ) * h + "px"
		}, 600,function(){
			scroll.scrolling = false;
		});
		
	}
};

});