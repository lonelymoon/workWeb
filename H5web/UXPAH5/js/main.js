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

wantAlert.setValues({
	title : "提示",
	msg : "我们已经收到您的申请，将尽快联系您。",
	callback : function(){
		window.location.reload();
	}
});

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

	fd.append("strpapername",$name);
	fd.append("strpaperphone",$tel);
	fd.append("strpaperemail",$mail);

	$.ajax({
		"url" : "/uxpa/Register.action",
		"type" : "post",
		"data" : fd,
		"contentType":false,
		"processData" : false,
		"dataType" : "json",
		"success" : function(res){
			wantAlert.showAlert();
		}
	});

});

loadCheck();

});