jQuery(function($){
	$(".add").on("click",function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).siblings(".sub").removeAttr("style");
		var $num = $(this).siblings(".num");
		var $val = parseInt($num.html()) + 1;
		$num.html($val);
	});

	$(".sub").on("click",function(e){
		e.stopPropagation();
		e.preventDefault();
		var $num = $(this).siblings(".num");
		if(parseInt($num.html())==0)
		return false;
		var $val = parseInt($num.html()) - 1;
		if($val==0)
		$(this).css({"background":"#fff","color":"#fc6023"});
	
		$num.html($val);
	});
});