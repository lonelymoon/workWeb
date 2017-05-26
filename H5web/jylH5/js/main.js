jQuery(function($){

var selectData = {
	"area" : ["90平米以下","90~140平","140~180平","180平以上"],
	"type" : ["1室1厅","2室1厅","3室1厅","3室2厅","1居室","2居室","其他"],
	"finishTime" : ["1个月内","2个月","3个月","3~6个月","其他"],
	"hasFur" : ["是","否"],
	"hasBaby" : ["备孕","已孕","0~3岁","3~6岁","6岁以上","否"],
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

Function.prototype.before = function(beforeFn){
	var _self = this;
	return function(){
		if(!beforeFn.call(this,arguments)){
			return false;
		}
		return _self.call(this,arguments);
	};
};

var sendData = function(){
	var area = $('[data-key="area"]').next('.select-val').html(),
		type = $('[data-key="type"]').next('.select-val').html(),
		finishTime = $('[data-key="finishTime"]').next('.select-val').html(),
		hasFur = $('[data-key="hasFur"]').next('.select-val').html(),
		hasBaby = $('[data-key="hasBaby"]').next('.select-val').html(),
		checkTime = $('[data-key="checkTime"]').next('.select-val').html(),
		orderTime = $('[data-key="orderTime"]').next('.select-val').html(),
		describe = $('#sub-discribe').val(),
		tel = $('#tel').val(),
		name = $('#name').val(),
		address = $('#address').val(),
		mail = $('#mail').val();

	var fd = new FormData();
	fd.append('strpaperarea',area);
	fd.append('strpapersetup',type);
	fd.append('strpaperdecoration',finishTime);
	fd.append('strpaperfurniture',hasFur);
	fd.append('strpapergravida',hasBaby);
	fd.append('strpaperjoin',checkTime);
	fd.append('strpapercome',orderTime);
	fd.append('strpapermessage',describe);
	fd.append('strpaperphone',tel);
	fd.append('strpapername',name);
	fd.append('strpaperaddress',address);
	fd.append('strpaperemail',mail);

	$('.layer').show();
	$.ajax({
		url : "",
		data : fd,
		dataType : "json",
		processData: false,
    	contentType: false,
		type : "post",
		success : function(res){
			window.location.href = "end.html";
		}
	});
};

function checkForm(){
	var tel = $('#tel').val(),
		telReg = /^1(3|4|5|7|8)\d{9}$/;

	if( !telReg.test(tel) ){
		wantAlert.setValues({
			title : "提示",
			msg : "请填写正确的手机号码"
		});
		wantAlert.showAlert();
		return false;
	}

	var name = $('#name').val();
	if(!name){
		wantAlert.setValues({
			title : "提示",
			msg : "请填写正确的姓名"
		});
		wantAlert.showAlert();
		return false;
	}

	var address = $('#address').val();
	if(!address){
		wantAlert.setValues({
			title : "提示",
			msg : "请填写家庭地址"
		});
		wantAlert.showAlert();
		return false;
	}

	var mail = $('#mail').val(),
		mailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

	if(!mailReg.test(mail)){
		wantAlert.setValues({
			title : "提示",
			msg : "请填写正确的邮箱地址"
		});
		wantAlert.showAlert();
		return false;
	}

	return true;
};

sendData = sendData.before(checkForm);

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

$('.dialog-layer').on('click',function(e){
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