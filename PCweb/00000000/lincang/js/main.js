jQuery(function($){
	$('.bcontent').hide().eq(0).show();


	$('.view').on('click',function(e){
		e = e || event;
		e.preventDefault();
		var eid = $(e.target).attr("data-view-id");
		var $id = eid?eid:$(e.target).parents('.view').attr("data-view-id");

		$('.bcontent').hide();
		$('.bcontent[data-content-id="'+$id+'"]').fadeIn(200);
	});
});