jQuery(function($){

$h = $(window).height();

$("html").css("height",$h+"px");

var hasChanged = false,
swiper = new Swiper('.swiper-container',{
	effect : 'coverflow',
	onTransitionStart : function(e){
		if(swiper.activeIndex == 1 && !hasChanged){
			hasChanged = true;
			setTimeout(function(){
				swiper.lockSwipeToNext();
			},150);
		} else if(swiper.activeIndex == 0){
			hasChanged = false;
			swiper.unlockSwipeToNext();
		}
	}
});

$('.next-btn').on("tap",function(e){
	var idx = swiper.activeIndex;

	var data = getData();
	
	if(checkData(data,idx)){
		swiper.unlockSwipeToNext();
		swiper.slideNext();
		swiper.lockSwipeToNext();
	}

});

var $slides = $(".swiper-slide"),
	len = $slides.length,
	iscrollSave = {};

for( var i = 0; i < len; i++ ){

	(function(i){

		iscrollSave["iscroll_"+i] = new IScroll($slides[i],{
			tap : true,
			scrollbars : true
		});

		setTimeout(function(){
			iscrollSave["iscroll_"+i].refresh();
		},100);
		
	}(i));

}

function getText(id){

	var $target = $(id).find(".quest-item[data-status='checked']"),
		$qinput = $target.find(".quest-input");

	var $idx = $target.attr("data-idx");

	if($qinput.length > 0){
		return ($idx + "-" + $qinput.find(".textarea").val());
	}

	return ( $idx + "-" + $target.find(".quest-text").text() );
}

function getMultiText(id){
	var $targets = $(id).find(".quest-item[data-status='checked']"),
		len = $targets.length,
		temp = [];

	for( var i = 0; i < len; i++ ){

		var $item = $targets.eq(i),
			$qinput = $item.find(".quest-input"),
			str = "";

		var $idx = $item.attr("data-idx");

		if($qinput.length > 0){
			str = $qinput.find(".textarea").val();
		}

		var result = $idx + "-" + $item.find(".quest-text").text() + str;

		temp.push($.trim(result));
	}

	return temp.toString();
}

$("#prop").on("tap",function(e){
	$('.dialog').removeClass("hide");
});

$('.dialog').on("click",function(e){
	$(this).addClass("hide");
});

$('.dialog').on("click",".select-item",function(e){
	e.preventDefault();
	e.stopPropagation();
	var $val = $(this).text();
	$("#prop").text($val).attr("data-val",$val);
	$('.dialog').addClass("hide");
});

function refresh(){
	for( var key in iscrollSave ){
		iscrollSave[key].refresh();
	}
}

$(".radio").on("tap",".quest-item",function(e){
	$(this).siblings(".quest-item").attr("data-status","");
	$(this).attr("data-status","checked");
	$(this).siblings(".quest-item").find(".quest-input").addClass("hide");

	var $qinput = $(this).find('.quest-input');
	if($qinput.length > 0){
		$qinput.removeClass("hide");
	}

	refresh();

});

$(".multi").on("tap",".quest-item",function(e){

	if( e.target.tagName.toLowerCase() == "textarea" ){
		return false;
	}

	var attr = $(this).attr("data-status");
	var $qinput = $(this).find('.quest-input');

	if(!attr){
		if($qinput.length > 0){
			$qinput.removeClass("hide");
		}
		$(this).attr("data-status","checked");
	} else {
		if($qinput.length > 0){
			$qinput.addClass("hide");
		}
		$(this).attr("data-status","");
	}
	refresh();
});

function checkData(obj,point){

	if(!obj.company){
		alert("请填写公司名称");
		return false;
	}

	if(!obj.name){
		alert("请填写您的姓名");
		return false;
	}

	if(!obj.job){
		alert("请填写您的职位");
		return false;
	}

	if( !(/^1[34578]\d{9}$/.test(obj.phone)) ){
		alert("请填写正确的手机号");
		return false;
	}

	if( !(/^(\-*\w)+(\.\w+)*(\-\w+)*@(\w)+((\.\w+)+)$/.test(obj.email)) ){
		alert("请填写正确的邮箱");
		return false;
	}

	if(!obj.prop){
		alert("请填写您的客户种类");
		return false;
	}

	if(point == 1){
		return true;
	}

	if(!obj.cost){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 2){
		return true;
	}

	if(!obj.used){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 3){
		return true;
	}

	if(!obj.know){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 4){
		return true;
	}

	if(!obj.prefer){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 5){
		return true;
	}

	if(!obj.standard){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 6){
		return true;
	}

	if(!obj.problem){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 7){
		return true;
	}

	if(!obj.targets){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 8){
		return true;
	}

	if(!obj.send){
		alert("请将本页的问题填写完整");
		return false;
	}

	if(point == 9){
		return true;
	}

	if(!obj.sendTwo){
		alert("请将本页的问题填写完整");
		return false;
	}

	return true;

}

function getData(){

	return {
		company : $("#company").val(),
		name : $("#name").val(),
		job : $("#job").val(),
		phone : $("#tel").val(),
		email : $("#email").val(),
		prop : $("#prop").attr("data-val"),
		cost : getText("#cost"),
		used : getText("#usedInTencent"),
		know : getMultiText("#knowTencent"),
		prefer : getMultiText("#preference"),
		standard : getMultiText("#standard"),
		problem : getMultiText("#problem"),
		targets : getMultiText("#targets"),
		send : getMultiText("#send"),
		sendTwo : getMultiText("#sendInVideoSite")
	};
}

$('.save-btn').on("tap",function(e){

	var data = getData();

	if(!checkData(data)){
		return false;
	}

	$.ajax({
		"url" : "php/save.php",
		"type" : "post",
		"data" : data,
		"success" : function(res){
			console.log(res);
			if(res == 1){
				$('.sl_10').removeClass("swiper-no-swiping");
				swiper.unlockSwipeToNext();
				swiper.slideNext();
			} else {
				alert("信息提交失败，请稍候重试");
			}
		},
		"fail" : function(res){
			alert("信息提交失败，请稍候重试");
		}
	});
});

});