jQuery(function($){

function shicha(){

	var $ele =  $('.mouser-container');
		cx = $ele.width() / 2,
		cy = $ele.height() / 2,
		px = 30, //偏移x最大值
		py = 30; //偏移y最大值

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
		var $items = $ele.find('.float-item');

		$items.each(function(idx,item){

			var $el = $(this),
				z = $el.attr("data-ZUnit"),
				tx = ( px / z * ( cx - x ) / cx ) >> 0,
				ty = ( py / z * ( cy - y ) / cy ) >> 0,
				pz = $el.hasClass("f-item-3") ? 1 : $el.hasClass("f-item-5") ? 3 : 2;

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
				shicha();
				changeSlide();
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
		idx = $(this).attr("data-idx");
		change();
	});

	function show(){
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

		$wrapper.attr("data-step",idx);

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
			setTimeout(show,50);
		});

		idx >= 3 ? idx = 1 : idx++;

		timer = setTimeout(change,6000);
	};

	change();
};

$('.loading-container').on("mousewheel",function(e){
	e.preventDefault();
	e.stopPropagation();
	return false;
});

$('.tec-btn').on('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	$('.tec-wrapper').addClass("tec-show");
});

var $exb = $('.example-boxer'),
	$exc = $('.example-content'),
	transX = 0,
	$w = $exb.width();

$('.example-right-btn').on('click',function(e){
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

$('.example-left-btn').on('click',function(e){
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

$('.right-items').on('click','a',function(e){

	e.preventDefault();
	e.stopPropagation();

	var id = $(this).attr("href");

	$('html,body').animate({
		scrollTop:$(id).offset().top
	}, 800);

});

var $columns = $('.column-container');

$(window).on("scroll",function(e) {

	$columns.each(function(){

		var top = $(this).offset().top;

		if (top >= $(window).scrollTop() && top < ($(window).scrollTop()+$(window).height())) {
			$(this).addClass("page-active");
		}

	});
	
});

loading();

});