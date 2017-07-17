jQuery(function($){

var swiper = new Swiper('.swiper-container',{
	effect : 'coverflow'
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
	return $(id).find(".quest-item[data-status='checked']").find(".quest-text").text();
}

function getMultiText(id){
	var $targets = $(id).children(".quest-item[data-status='checked']"),
		len = $targets.length,
		temp = [];

	for( var i = 0; i < len; i++ ){
		temp.push($targets[i].find(".quest-text").text());
	}

	return temp;
}

function getData(){

	return {
		company : $("#company").value,
		name : $("#name").value,
		job : $("#job").value,
		phone : $("#tel").value,
		email : $("#email").value,
		prop : $("#prop").value,
		cost : getText("#cost"),
		used : getText("#usedInTencent"),
		know : getText("#knowTencent")
	};
}

$(".radio").on("tap",".quest-item",function(e){
	$(this).siblings(".quest-item").attr("data-status","");
	$(this).attr("data-status","checked");
});

$(".multi").on("tap",".quest-item",function(e){
	var attr = $(this).attr("data-status");
	if(!attr)
	$(this).attr("data-status","checked");
	else
	$(this).attr("data-status","");
});

});