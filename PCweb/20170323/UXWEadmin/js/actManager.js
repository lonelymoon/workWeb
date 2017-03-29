jQuery(function($){

var sc1 = new IScroll('.content-box',{
	mouseWheel : true
});

$('.check').on('click',function(e){
	window.location.href = "enrollCheck.html";
});

$('.looking').on('click',function(e){
	window.location.href = "checkPeopleNum.html";
});

});