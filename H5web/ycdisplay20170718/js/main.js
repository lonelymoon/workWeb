jQuery(function($){

var swiper = new Swiper(".swiper-container",{
	direction : "vertical",
	onTransitionEnd : function(swiper){
		$(".blur-img").removeClass("blur");
		if(swiper.activeIndex == 6){
			setTimeout(function(e){
				$(".blur-img").addClass("blur");
			},100);
		}

		if(swiper.activeIndex >= 7){
			swiper.destroy();
		}
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
		alert("请填写姓名");
		return false;
	}

	if( !(/^1[34578]\d{9}$/.test($phone)) ){
		alert("请填写正确的手机号");
		return false;
	}

	if( !(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($email)) ){
		alert("请填写正确的邮箱");
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
				alert("信息提交成功，感谢您的支持");
				window.location.href = "./index.html";
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

setTimeout(function(){
	
	if($('#bgm')[0].paused)
	$('.music').trigger("click");

	wx.ready(function(){
		if($('#bgm')[0].paused){
			$('.music').trigger("click");
		}
	});

},200)

});