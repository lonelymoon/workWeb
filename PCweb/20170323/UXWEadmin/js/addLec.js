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
	formData.append("strname",encodeURI(lecNameCN));
	formData.append("strengname",encodeURI(lecNameEN));
	formData.append("strcompany",encodeURI(lecCompany));
	formData.append("strjob",encodeURI(lecJob));
	formData.append("worktime",lecWorkYear);
	formData.append("strmesssage",encodeURI(lecIntro));
	formData.append("strdistinguish",encodeURI(lecShow));
	formData.append("strtype",encodeURI(lecType));
	formData.append("intid",0);

	
	var xhr = new XMLHttpRequest();
	xhr.open("post","/CreateTeacher");
	xhr.addEventListener("load",function(e){
		uploading = false;
		var res = xhr.responseText,
			res1 = JSON.parse(res);
		if(res1["strflag"] == "0"){
			alert("上传成功");
			$('.mana').find("li[data-link='lecManager']").trigger("click");
		} else if(res1["strflag"] == "1"){
			alert("数据库插入失败,请重试");
		}
	});
	xhr.send(formData); 

});

});