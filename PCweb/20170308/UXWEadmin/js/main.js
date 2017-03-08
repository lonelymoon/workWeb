jQuery(function($){

var sc1 = new IScroll('.nav', {
    mouseWheel: true,
    click : true
}), sc2 = new IScroll('.content-box',{
	mouseWheel : true,
	click : true
});

$("#dtBox").DateTimePicker({			
	dateFormat: "yyyy-MM-dd",
	timeFormat: "hh:mm"
});

$('.selectorVal').on('click',function(e){
	$('.selectorLists').slideToggle(200);
});

$('.sel-list').on('click',function(e){
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
$('.dateInputBox input').on('focus',function(e){
	$(this)[0].blur();
});
$('.cTime').on('change',function(e){
	var $val = $(this).val();
	$(this).val($val+":00");
});

$('.checkBox').on('click',function(e){
	var $id = $(this).attr("data-id");
	$(this).find(".checkIcon").toggleClass("checked");
	if($id =="5"){
		$('.input-box').toggleClass('hide');
	}
});

});