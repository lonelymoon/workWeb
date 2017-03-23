jQuery(function($){

var sc = new IScroll(".content-box",{
	mouseWheel : true
});

$('.content-table-body').on('click','.table-row',function(e){

	var status = $(this).attr("data-status");

	if( status != "choose" ){
		$(this).attr("data-status","choose");
	} else {
		$(this).attr("data-status","");
	}

});

//pass
$('.pass-btn').on('click',function(e){

var $checked = $('.table-row[data-status="choose"]'),
	len = $checked.length;

$checked.removeAttr("data-status").attr("data-type","pass");

});

//unpass
$('.unpass-btn').on('click',function(e){

var $checked = $('.table-row[data-status="choose"]'),
	len = $checked.length;

$checked.removeAttr("data-status").attr("data-type","unpass");

});

});