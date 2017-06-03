jQuery(function($){

var mainSwiper = new Swiper('.main-container',{
	direction : "vertical"
});

var imgs = document.querySelectorAll("img"),
	$em = $('.loading').find("em"),
	len = imgs.length;

var loadEnd = (function(){
	var count = 0;
	return function(){
		count++;
		if( count < len ){
			var num = ( count / len ) * 100 >> 0;
			$em.html( num + "%" );
			return false;
		}

		$('.layer').hide();
	};
})();

function loadCheck(){
	if( len == 0 ){
		loadEnd();
		return false;
	}

	for( var i = 0, img; img = imgs[i++]; ){
		if(img.complete){
			loadEnd();
		} else {
			img.onload = function(){
				loadEnd();
			};
		}
	}
};

$('.button').on('click',function(e){
	var $name = $('#name').val(),
		$tel = $('#tel').val(),
		$mail = $('#mail').val(),
		telReg = /^1(\d{10})/,
		mailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

	if( !$name ){
		$('.name-item').addClass('alert');
		return false;
	}

	$('.name-item').removeClass('alert');

	if( !telReg.test($tel) ){
		$('.tel-item').addClass('alert');
		return false;
	}

	$('.tel-item').removeClass('alert');

	var fd = new FormData();

	fd.append("name",$name);
	fd.append("tel",$tel);
	fd.append("mail",$mail);

	$.ajax({
		"url" : "",
		"type" : "post",
		"data" : fd,
		"dataType" : "jsonp",
		"success" : function(res){

		}
	});

});

loadCheck();

});