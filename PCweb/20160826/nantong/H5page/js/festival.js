jQuery(function($){
	$('.bottom').on('click',function(){
		$('body').animate({
			scrollTop : 0
		},600);
	});
});