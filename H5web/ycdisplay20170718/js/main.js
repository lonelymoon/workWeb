jQuery(function($){

var swiper = new Swiper(".swiper-container",{
	direction : "vertical",
	onTransitionEnd : function(swiper){
		
	}
});

var iscroll = new IScroll(".form-box",{
	tap : true
});

function checkNull(){
	var $name = $("#name").val(),
		$phone = $("#phone").val(),
		$email = $("#email").val();

	if( !$name ) {
		wantAlert.setValues({
			title : "提示",
			msg : "请填写姓名"
		});
		wantAlert.showAlert();	
		return false;
	}

	if( !(/^1[34578]\d{9}$/.test($phone)) ){
		wantAlert.setValues({
			title : "提示",
			msg : "请填写正确的手机号"
		});
		wantAlert.showAlert();
		return false;
	}

	if( !(/^(\-*\w)+(\.\w+)*(\-\w+)*@(\w)+((\.\w+)+)$/.test($email)) ){
		wantAlert.setValues({
			title : "提示",
			msg : "请填写正确的邮箱"
		});
		wantAlert.showAlert();
		return false;
	}

	return {
		name : $name,
		phone : $phone,
		email : $email
	};

}

$(".form-btn").on("tap",function(e){
	var result = checkNull();
	if(!result){
		return false;
	}

	$.ajax({
		"type" : "post",
		"url" : "php/save.php",
		"data" : result,
		"success" : function(res){
			if(res == 1){
				wantAlert.setValues({
					title : "提示",
					msg : "信息提交成功，感谢您的支持",
					callback : function(){
						window.location.href = "./index.html";
					}
				});
				wantAlert.showAlert();		
			} else {
				alert("信息上传失败,请刷新页面重试");
			}
		}
	});

});

setTimeout(function(){
	iscroll.refresh();
},500);

$('.music').on('click',function(e){
	var paused = $('#bgm')[0].paused;
	if(paused){
		$('.music').removeClass("music-paused");
		$('#bgm')[0].play();
	} else {
		$('.music').addClass("music-paused");
		$('#bgm')[0].pause();
	}
});

var $imgs = $('img'),
	$len = $imgs.length,
	count = 0;

function init(){
	for( var i = 0; i < $len; i++ ){
		var $img = $imgs.eq(i);
		if($img[0].complete){
			count++;
		} else {
			$img[0].onload = function(e){
				count++;
				if( count == $len ){
					reset();
				}
			};
		}

		if(count == $len) reset();

	}

}

function reset(){
	setTimeout(function(){
		
		if($('#bgm')[0].paused)
		$('.music').trigger("click");

		wx.ready(function(){
			if($('#bgm')[0].paused){
				$('.music').trigger("click");
			}
		});

	},200)
}

init();

});