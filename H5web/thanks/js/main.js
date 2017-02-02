jQuery(function($){
	var window_w = $(window).width(),
		window_h = $(window).height();

	$('#content').width(window_w>=750?750:window_w);
	
	if(window_w<750){
		$('.rank-content-box').css('padding-left',45*window_w/750 + 'px');
		$('.rank-list-box').css({
			'height': 128 * window_h/1412+'px',
			'margin-bottom': 46 * window_h/1412 + 'px'
		});
		$('.rank-list-box>div').css({
			'line-height': 128 * window_h/1412 +'px',
			'font-size': 1.8 * window_w/750 + 'em',
			'margin-right': 67 * window_w/750 + 'px'
		});
		$('.rank-index').eq(0).css('margin-left',32 * window_w/360+'px');
		$('.rank-user-img').css({
			'width': 128 * window_h/1412 + 'px',
			'margin-right': 69 * window_w/750 + 'px'
		});
		$('.user-img').css('max-width',128 * window_h/1412 + 'px');
	}
	

	$('.thanks-content').css('margin-bottom',109 * window_h/1412 + 'px');
	$('.final-thanks-content').css('margin-bottom',138 * window_h/1412 + 'px');
	$('.thanks-box').css('padding-top',113*window_h/1412 + 'px');
	$('.enroll-box').css('padding-top',106*window_h/1412 + 'px');
	$('.rank-box').css('padding-top',85 * window_h/1412 + 'px');
	$('.final-thanks-box').css('padding-top',167*window_h/1412 + 'px');
});