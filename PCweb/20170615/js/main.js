jQuery(function($){

var top,
	obj = $('.intro-count')[0],
	se = document.documentElement.clientHeight,
	show = false;

$("body").on('mousewheel',function(e){
	
	top = obj.getBoundingClientRect().top;

	if(top <= se - 50 && !show ) {
		show = true;
 		$('.count-num').countUp({
		    delay: 10,
		    time: 2000
		});
	}
});

});