jQuery(function($){

var save = localStorage.save;

if(save){
	save = JSON.parse(save);
	for( var selector in save ){
		$(selector).val(save[selector]);
	}
}

var click = "ontouchstart" in document ? "touchend" : "click",
	sc1 = new IScroll('.content-box',{
		mouseWheel : true
	});

$('.sel-list').on(click,function(e){
	var $val = $(this).html();
	$('.selectorLists').slideToggle(200);
	$('.selectorVal').html($val);
});

$('.checkBox').on(click,function(e){
	var $id = $(this).attr("data-val");
	$('.checkIcon').removeClass("checked");
	$(this).find(".checkIcon").toggleClass("checked");
});

///////////////////////////////////////
var canUpload = true,
	tempObj = {};

function checkNull(selector,type){
	type = type || "val";
	var val = $(selector)[type]();
	if( !val ){
		$(selector).addClass("alertBorder");
		canUpload = false;
		return false;
	} else {
		tempObj[selector] = val;
		return val;
	}
}

$('.save-btn').on(click,function(e){
	var lecNameCN,lecNameEN,lecCompany,lecJob,lecWorkYear,
		lecIntro,lecShow,lecType,lecImg,
		formData = new FormData();

	canUpload = true;

	lecNameCN = checkNull('#lecNameCN');
	lecNameEN = $('#lecNameEN') || "";
	lecCompany = checkNull('#company');
	lecJob = checkNull('#job');
	lecWorkYear = checkNull('#workYear');
	lecIntro = checkNull('#introduce');
	lecShow = $('.doShow').find('.selectorVal').text();
	lecType = $('.checked').parent('.checkBox').attr('data-val');
	lecImg = $('#poster')[0].files[0];

	localStorage.save = JSON.stringify(tempObj);

	if(!canUpload){
		return false;
	}

	if(!lecType){
		alert("请选择类型");
		return;
	}

	if(!lecImg){
		alert("请上传头像");
		return;
	}

	$('input').removeClass('alertBorder');

	formData.append("fileurlimg",lecImg);
	formData.append("strname",lecNameCN);
	formData.append("strengname",lecNameEN);
	formData.append("strcompany",lecCompany);
	formData.append("strjob",lecJob);
	formData.append("worktime",lecWorkYear);
	formData.append("strmesssage",lecIntro);
	formData.append("strdistinguish",lecShow);
	formData.append("strtype",lecType);
	formData.append("intid",0);

	$.ajax({
		"url" : "",
		"type" : "post",
		"contentType" : false,
		"processData" : false,
		"data" : {},
		"success" : function(data){
			localStorage.removeItem("save");
		}
	})

});

});