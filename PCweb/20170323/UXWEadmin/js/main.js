jQuery(function($){

function getUrlObj(url){
	url = url || window.location.href;
	var reg = /([^?&=]+)=([^?&=]*)/g,
		tempObj = {};
	url.replace(reg,function(url,$1,$2){
		var key = encodeURIComponent($1),
			val = encodeURIComponent($2);
		
		tempObj[key] = val;
		return url;
	});

	return tempObj;
}

//init
var isedit = getUrlObj().edit;

if(isedit){
	var intid = localStorage.actId;

	if(!intid && intid != 0){
		return false;
	}

	$.ajax({  
		type:'post',
        url:'/GetActivityFromId.action',   			
        data:{intid:intid},   
        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
        success:function(data)
        {              	  
    	 	var result = data.jsonAactivityshow;

    	 	//city
    	 	$('.cityChoose').find('.selectorVal').attr("data-id",result.intcity).html(result.strcityname);
    	 	$('#address').val(result.straddress);
    	 	$('#post-code').val(result.strpostcode || "");

    	 	//time
    	 	if(result.strstartime){
    	 		var sTime = result.strstartime.split(" ");
    	 		$('.activeDate .startDate').val(sTime[0]);
    	 		$('.activeDate .startTime').val(sTime[1]);
    	 	}
    	 	if(result.strendtime){
    	 		var eTime = result.strendtime.split(" ");
    	 		$('.activeDate .endDate').val(eTime[0]);
    	 		$('.activeDate .endTime').val(eTime[1]);
    	 	}
    	 	if(result.strenrollstarttime){
    	 		var esTime = result.strenrollstarttime.split(" ");
    	 		$('.enrollDate .startDate').val(esTime[0]);
    	 		$('.enrollDate .startTime').val(esTime[1]);
    	 	}
    	 	if(result.strenrollendtime){
    	 		var eeTime = result.strenrollendtime.split(" ");
    	 		$('.enrollDate .endDate').val(eeTime[0]);
    	 		$('.enrollDate .endTime').val(eeTime[1]);
    	 	}
    	 	if(result.strnoticetime){
    	 		$('.callDate .startDate').val(result.strnoticetime);
    	 	}

    	 	//msg
    	 	$('#describe').val(result.strmessage);
    	 	$('#gain').val(result.strgain);
    	 	$('#background').val(result.strbackground);
    	 	$('#lecName').val(result.strteachername);
    	 	$('.doShow').find(".selectorVal").html(result.strdistinguish);

    	 	$('.checkBox[data-val="'+result.strlanguage+'"]').find(".checkIcon").addClass("checked");

    	 	//imgs
    	 	var isrc = result.strimgurl_origin;
    	 	if(isrc){
    	 		$('.poster-btn').addClass("hide");
    	 		$('.poster .img-set').find("img").attr("src",isrc).attr("data-status","loaded");
    	 		$('.poster .img-set').removeClass("hide");
    	 	}

        }   
	}); 
}

//end

var click = "ontouchend" in document ? "touchend" : "click",
	sc2 = new IScroll('.content-box',{
		mouseWheel : true
	}),
	isc1 = new IScroll('.selectorLists',{
		mouseWheel : true,
		tap : true
	});

$("#dtBox").DateTimePicker({			
	dateFormat: "yyyy-MM-dd",
	timeFormat: "hh:mm"
});

$('.cityChoose').on("tap",'.sel-list',function(e){
	var $val = $(this).html(),
		$id = $(this).attr("data-id");
	$(this).parents('.selectorLists').slideToggle(200);
	$(this).parents('.selectorBox').find('.selectorVal').html($val).attr("data-id",$id);
	sc2.enable();
});

$('.doShow').on(click,'.sel-list',function(e){
	var $val = $(this).html();
	$(this).parents('.selectorLists').slideToggle(200);
	$(this).parents('.selectorBox').find('.selectorVal').html($val);
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
	sc2.disable();
	if(hasGetSelector){
		$('.cityChoose').find('.selectorLists').slideToggle(200);
		return;
	}
	$.ajax({
		url:'/weixintestadmin/GetCity.action',   	
		data:{intid:0},
		type : "post",
		"success" : function(data){
			hasGetSelector = true;
			var d = data.resultarray,
				len = d.length,
				temp = "";

			for( var i = 0; i < len; i++ ){
				var city = d[i];
				temp += '<li class="sel-list" data-id="'+city.intid+'">'+city.strname+'</li>';
			}
			$('.cse-scroll').html(temp);
			setTimeout(function(){
				isc1.refresh();
			},100);
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
		url : "/weixintestadmin/CreateCity.action",
		type : "post",
		 data:{intid:0,strname:$val,strenglishname:$val,strdistinguish:"1"},
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

$('#lecName').on("keyup",function(e){
	var $val = $(this).val();

	if(!isSearching){
		isSearching = true;
		$.ajax({
			url : "/Getfromname.action",
			type : "post",
			data : {strname : $val},
			success : function(data){
				var d = data.resultarray,
					len = d.length,
					temp = "";

				for( var i = 0; i < len; i++ ){
					var lec = d[i];
					temp += '<li class="lecList" data-id="'+lec.intid+'">'+lec.strname+'</li>';
				}
				$('.lecLists').html(temp);
				isSearching = false;
			},
			fail : function(status){
				isSearching = false;
			}
		});
	}

});

$('.lecLists').on("click",'li',function(e){
	var $val = $(this).text(),
		$id = $(this).attr("data-id");
	$('#lecName').val($val).attr("data-id",$id);
	$('.lecLists').html("");
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

    $('.sponsorColumn').append(div.innerHTML);
    sc2.refresh();
    Output.registerFileReader();
});

$('.checkBox').on("click",function(e){
	var $id = $(this).attr("data-val");
	$('.checkIcon').removeClass("checked");
	$(this).find(".checkIcon").toggleClass("checked");
});
//end

var canUpload = true,
	isUploading = false,
	tempObj = {};


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

	canUpload = true;

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

if(!$city){
	alert("请选择城市");
	return false;
}

if(!$postImg && !isedit){
	alert("请选择banner");
	return false;
}

var len = $('.sponsorName').length;

var formData1 = new FormData();
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

	formData1.append("strname"+idx,encodeURI(name));
	formData1.append("fileurlimg"+idx,file);
	formData1.append("strdistinguish"+idx,"1");
	formData1.append("intsponsorid"+idx,0);
	formData1.append("intproperty"+idx,0);
	formData1.append("strhttpurl"+idx,link);
}
formData1.append("intnumber",len);


var actId = localStorage.actId;
formData1.append("intid",actId);
formData.append("intid",actId);
formData.append("fileurlimg",$postImg);
formData.append("straddress",encodeURI($address));
formData.append("strpost_code",encodeURI($pCode));
formData.append("strstartime",$actDate+" "+$actTime);
formData.append("strendtime",$actEndDate+" "+$actEndTime);
formData.append("strenrollstarttime",$enrollDate+" "+$enrollTime);
formData.append("strenrollendtime",$enrollEndDate+" "+$enrollEndTime);
formData.append("intpeoplenumber",0);
formData.append("strmessage",encodeURI($describe));
formData.append("strnoticeTime",$callDate);
formData.append("intcity",$city * 1);
formData.append("strdistinguish",$doShow);
formData.append("intteacher_id",$lec * 1)
formData.append("strengname","0");
formData.append("strcourse",encodeURI($describe));
formData.append("strlanguage",encodeURI($lang));
formData.append("strbackground",encodeURI($bg));
formData.append("strgain",encodeURI($gain));
formData.append("strremarkmessage"," ");
formData.append("strtype","0");



isUploading = true;


var xhr = new XMLHttpRequest();

xhr.open("post","/CreateActive");
xhr.addEventListener("load",function(e){
	var res = xhr.responseText,
		res1 = JSON.parse(res);
	if(res1["strflg"] == "0"){		
		var xhr1 = new XMLHttpRequest();
		xhr1.open("post","/ActivitySponsor");
		xhr1.addEventListener("load",function(e){
			isUploading = false;
			var res2 = xhr1.responseText,
				res1 = JSON.parse(res2);
			if(res1["strflg"] == "0"){
				$('.mana').find("li[data-link='actManager']").trigger("click");
			} else if(res1["strflg"] == "1"){
				alert("数据库插入失败,请重试");
			}
		});
		xhr1.send(formData1);

	} else if(res1["strflg"] == "1"){
		alert("数据库插入失败,请重试");
	}
});
xhr.send(formData); 

});

});