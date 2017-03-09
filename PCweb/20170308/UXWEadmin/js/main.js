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
	var $val = $(this).html();
	$('.selectorLists').slideToggle(200);
	$('.selectorVal').html($val);
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

$('.selectorVal').on(click,function(e){
	if(hasGetSelector){
		$('.selectorLists').slideToggle(200);
		return;
	}
	$.ajax({
		url : "",
		data : {},
		type : "get",
		"success" : function(data){
			hasGetSelector = true;
			$('.selectorLists').slideToggle(200);
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

//添加赞助商
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
					'<div class="logo-btn">上传LOGO</div>'+
				'</label>'+
				'<input type="file" class="hide" id="slogo-1">'+
			'</div>'+
		'</div>';

$('.addNewSponsor').on(click,function(e){
    var html = $('.sponsorColumn')[0].innerHTML;
    html += tpl;
    $('.sponsorColumn')[0].innerHTML = html;
    sc2.refresh();
});

$('.checkBox').on("click",function(e){
	var $id = $(this).attr("data-val");
	$('.checkIcon').removeClass("checked");
	$(this).find(".checkIcon").toggleClass("checked");
});
//end

localStorage.inputData = {};

$('.save-btn').on(click,function(e){

var formData = new FormData(),
	$city = $('.cityChoose').find('.selectorVal').text(),
	$address = $('#address').val(),
	$pCode = $('#post-code').val(),
	$actDate = $('.activeDate').find('.startDate').val(),
	$actTime = $('.activeDate').find('.startTime').val(),
	$actEndDate = $('.activeDate').find('.endDate').val(),
	$actEndTime = $('.activeDate').find('.endTime').val(),
	$enrollDate = $('.enrollDate').find('.startDate').val(),
	$enrollTime = $('.enrollDate').find('.startTime').val(),
	$enrollEndDate = $('.enrollDate').find('.endDate').val(),
	$enrollEndTime = $('.enrollDate').find('.endTime').val(),
	$callDate = $('.callDate').find('.startDate').val(),
	$describe = $('#describe').val(),
	$gain = $('#gain').val(),
	$bg = $('#background').val(),
	$lec = $('#lecName').val(),
	$doShow = $('.doShow').find('.selectorVal').text(),
	$lang = $('.checked').parent(".checkBox").attr("data-val"),
	$postImg = $('#poster')[0].files[0];


});

});