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
			},800);
		});
	}

}

$('.loading-container').on("mousewheel",function(e){
	e.preventDefault();
	e.stopPropagation();
	return false;
});

loading();

});