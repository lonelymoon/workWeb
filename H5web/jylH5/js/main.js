jQuery(function($){

var selectData = {
	"area" : ["90平米以下","90~140平","140~180平","180平以上"],
	"type" : ["1室1厅","2室1厅","3室1厅","3室2厅","1居室","2居室","其他"],
	"finishTime" : ["1个月内","2个月","3个月","3~6个月","其他"],
	"hasFur" : ["是","否"],
	"hasBaby" : ["备孕","已孕","0~3岁","3~6岁","6岁以上"],
	"checkTime" : ["1周内","2周内","1个月内","三个月内","其他"],
	"orderTime" : ["近期周末","每天","其他"]
}, cacheEle = null,width = $(window).width(),dist = 0;

$('.slideBox').css("width",width * 3 + "px");
$('.wrapper').css("width",width+"px");

function setData(key,idx){
	var arr = selectData[key] || [],
		temp = "";
	for( var i = 0, len = arr.length; i < len; i++ ){
		var isChoosed = "false";
		if( i == idx ) isChoosed = "true";
		var tpl = '<div class="dialog-item" data-idx="'+i+'" data-choose="'+isChoosed+'">'+arr[i]+'</div>';
		temp+=tpl;
	}
	updateTpl(temp);
};

function updateTpl(tpl){
	tpl = tpl || "";
	$('.dialog-content').html(tpl);
	$('.dialog-box').show();
};

function sendData(){

};

$('.select-wrapper').on('click','.select-item',function(e){
	var key = $(this).find(".select-label").attr("data-key"),
		idx = $(this).find(".select-val").attr("data-idx");

	if(!idx) idx = 0;

	cacheEle = this;
	setData(key,idx);
});

$('.dialog-content').off("click").on('click','.dialog-item',function(e){
	var $val = $(cacheEle).find(".select-val"),
		idx = $(this).attr("data-idx"),
		text = $(this).html();

	$val.attr("data-idx",idx);
	$val.html(text);

	$('.dialog-box').hide();
});

$('.wrapper-btn').on('click',function(e){
	var ndist = dist - width;
	if( ndist / width < -2){
		sendData();
		return false;
	}
	
	$('.slideBox').css({
		"-webkit-transform" : "translateX("+ndist+"px)",
		"transform" : "translateX("+ndist+"px)"
	});
	dist = ndist;
});

$('.wrapper-back').on("click",function(e){
	if( dist / width == 0 ) return;
	var ndist = dist + width;
	$('.slideBox').css({
		"-webkit-transform" : "translateX("+ndist+"px)",
		"transform" : "translateX("+ndist+"px)"
	});
	dist = ndist;
});

$('.dialog-box').on("mousewheel",function(e){
	e.preventDefault();
});

$('.dialog-box').on("touchmove",function(e){
	e.preventDefault();
});

});