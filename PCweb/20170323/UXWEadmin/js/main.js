jQuery(function($){

var click = "ontouchend" in document ? "touchend" : "click",
	sc2 = new IScroll('.content-box',{
		mouseWheel : true
	});

$("#dtBox").DateTimePicker({			
	dateFormat: "yyyy-MM-dd",
	timeFormat: "hh:mm"
});

$('.sel-list').on(click,function(e){
	var $val = $(this).html(),
		$id = $(this).attr("data-id");
	$(this).parents('.selectorLists').slideToggle(200);
	$(this).parents('.selectorBox').find('.selectorVal').html($val).attr("data-id",$id);
});

var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth() + 1,
	day = date.getDate(),
	hour = date.getHours(),
	min = date.getMinutes();

month = month < 10 ? "0"+""+month : month;
day = day < 10 ? "0"+""+day : day;
hour = hour < 10 ? "0" + ""+hour : hour;
min = min < 10 ? "0" + "" + min : min;

$('.cTime').val(hour+":"+min+":00");
$('.cDate').val(year+"-"+month+"-"+day);

$('.dateInputBox').on('focus','input',function(e){
	$(this)[0].blur();
});
$('.cTime').on('change',function(e){
	var $val = $(this).val();
	$(this).val($val+":00");
});


//下拉城市
var hasGetSelector = false;

$('.cityChoose').on(click,'.selectorVal',function(e){
	if(hasGetSelector){
		$('.cityChoose').find('.selectorLists').slideToggle(200);
		return;
	}
	$.ajax({
		url : "",
		data : {},
		type : "get",
		"success" : function(data){
			hasGetSelector = true;
			$('.cityChoose').find('.selectorLists').slideToggle(200);
		}
	});
});

$('.addNewCity').on(click,function(e){
	$('.layer').hide();
	$('.addCityLayer').fadeIn(200);
});

$('.confirm-btn').on(click,function(e){
	var $val = $('.cityAdd').val();
	if(!$val){
		$(".cityAdd").addClass("alertBorder");
		return;
	}
	$(".cityAdd").removeClass("alertBorder");

	$.ajax({
		url : "",
		type : "post",
		data : {},
		success : function(data){
			hasGetSelector = false;
			$('.layer').fadeOut();
		}
	});

});

//下拉城市end

//添加讲师
var isSearching = false;

$('.addNewLec').on(click,function(e){
	window.open("addLecturers.html","_blank");
});

$('#lecName').on("change",function(e){
	var $val = $(this).val();

	if(!isSearching){
		isSearching = true;
		$.ajax({
			url : "",
			type : "post",
			data : {},
			success : function(data){
				isSearching = false;
			},
			fail : function(status){
				isSearching = false;
			}
		});
	}

});
//end
var tpl = '<div class="column-item inline-item">'+
			'<div class="item-title">赞助商</div>'+
			'<div class="item-content">'+
				'<input type="type" class="sponsorName" placeholder="赞助商">'+
			'</div>'+
		'</div>'+
		'<div class="column-item inline-item">'+
			'<div class="item-title">赞助商网站</div>'+
			'<div class="item-content">'+
				'<input type="type" class="sponsorWeb" placeholder="http://">'+
			'</div>'+
		'</div>'+
		'<div class="column-item">'+
			'<div class="item-title">赞助商LOGO</div>'+
			'<div class="item-content">'+
				'<label for="slogo-1" class="logoPost">'+
					'<div class="logo-btn label-btn">上传LOGO</div>'+
					'<div class="img-set hide">'+
						'<img src="images/loading.gif" class="preview-img" data-status="loading">'+
					'</div>'+
				'</label>'+
				'<input type="file" class="hide" id="slogo-1">'+
			'</div>'+
		'</div>';

//添加赞助商
$('.addNewSponsor').on(click,function(e){
    var html = $('.sponsorColumn')[0].innerHTML,
    	len = $('.logoPost').length * 1 + 1,
    	div = document.createElement("div");

    div.innerHTML = tpl;
   	$(div).find(".logoPost").attr("for","slogo-"+len);
   	$(div).find("input[type='file']").attr('id','slogo-'+len);

    html += div.innerHTML;
    $('.sponsorColumn')[0].innerHTML = html;
    sc2.refresh();
    output.registerFileReader();
});

$('.checkBox').on("click",function(e){
	var $id = $(this).attr("data-val");
	$('.checkIcon').removeClass("checked");
	$(this).find(".checkIcon").toggleClass("checked");
});
//end

var inputData = localStorage.inputData,
	canUpload = true,
	isUploading = false,
	tempObj = {};

if(inputData){

}

function checkNull(selector){
	var val = $(selector).val();
	if(!val){
		$(selector).addClass("alertBorder");
		canUpload = false;
		return false;
	} else {
		tempObj[selector] = val;
		return val;
	}
}

$('.save-btn').on(click,function(e){

if(isUploading){
	return false;
}

var formData = new FormData(),
	$city = $('.cityChoose').find('.selectorVal').attr("data-id"),
	$address = checkNull("#address"),
	$pCode = checkNull("#post-code"),
	$actDate = checkNull(".activeDate .startDate"),
	$actTime = checkNull(".activeDate .startTime"),
	$actEndDate = checkNull(".activeDate .endDate"),
	$actEndTime = checkNull(".activeDate .endTime"),
	$enrollDate = checkNull(".enrollDate .startDate"),
	$enrollTime = checkNull(".enrollDate .startTime"),
	$enrollEndDate = checkNull(".enrollDate .endDate"),
	$enrollEndTime = checkNull(".enrollDate .endTime"),
	$callDate = checkNull(".callDate .startDate"),
	$describe = checkNull("#describe"),
	$gain = checkNull("#gain"),
	$bg = checkNull("#background"),
	$lec = $("#lecName").attr("data-id"),
	$doShow = $('.doShow').find('.selectorVal').text(),
	$lang = $('.checked').parent(".checkBox").attr("data-val"),
	$postImg = $('#poster')[0].files[0];

if(!$lec){
	alert("请点选正确的讲师或新建讲师");
	return false;
}

if(!canUpload){
	return false;
}

$('input').removeClass('alertBorder');

if(!$lang){
	alert("请选择语言");
	return false;
}

if(!$postImg){
	alert("请选择banner");
	return false;
}

var len = $('.sponsorName').length;

for( var i = 0 ; i < len; i++){
	var idx = i + 1,
		name = $('.sponsorName').eq(i).val() || "",
		file = $('#slogo-'+idx)[0].files[0],
		link = $('.sponsorWeb').eq(i).val().replace(/http\:\/\/|https\:\/\//g,"") || "";

	if(!file){
		i = i - 1 < 0 ? 0 : i - 1;
		len--;
		continue;
	}

	formData.append("strname"+idx,name);
	formData.append("fileurlimg"+idx,file);
	formData.append("strdistinguish"+idx,"1");
	formData.append("intsponsorid"+idx,0);
	formData.append("intproperty"+idx,0);
	formData.append("strhttpurl"+idx,link);
}

formData.append("intid",0);
formData.append("fileurlimg",$postImg);
formData.append("straddress",$address);
formData.append("strpost_code",$pCode);
formData.append("strstartime",$actDate+" "+$actTime);
formData.append("strendtime",$actEndDate+" "+$actEndTime);
formData.append("strenrollstarttime",$enrollDate+" "+$enrollTime);
formData.append("strenrollendtime",$enrollEndDate+" "+$enrollEndTime);
formData.append("intpeoplenumber",0);
formData.append("strmessage",$describe);
formData.append("strnoticeTime",$callDate);
formData.append("intcity",$city * 1);
formData.append("strdistinguish",$doShow);
formData.append("intteacher_id",$lec * 1)
formData.append("strengname","0");
formData.append("strcourse",$describe);
formData.append("strlanguage",$lang);
formData.append("strbackground",$bg);
formData.append("strgain",$gain);
formData.append("strremarkmessage","0");
formData.append("strtype","0");

formData.append("intnumber",len);

isUploading = true;

$.ajax({
	url : "",
	type : "post",
	contentType : false,
	processData : false,
	data : formData,
	success : function(data){
		isUploading = false;
	},
	fail : function(status){
		isUploading = false;
	}
});

});

});