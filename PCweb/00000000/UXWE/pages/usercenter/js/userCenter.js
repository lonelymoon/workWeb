jQuery(function($){

if(!document.referrer){
	window.location.href = "http://uxwetest.uxwe.org/UXWE/login/index.html?source=register";
	return false;
}

var utils = uxwe.utils,
	actvts = [];

var uid = utils.getUrlObj("uid"),
	type = utils.getUrlObj("type");

var createActv = function(selector){
	var wrapper = document.querySelector(selector),
		temp = "";

	for( var i = 0, actvt; actvt = actvts[i++]; ){
		var item = utils.crtElement("div",{
			"class" : "u-column-item"
		}), enName = utils.crtElement("div",{
			"class" : "act-title-en"
		}), cnName = utils.crtElement("div",{
			"class" : "act-title-cn"
		}), lecName = utils.crtElement("div",{
			"class" : "act-lecName"
		}), addr = utils.crtElement("div",{
			"class" : "act-address"
		}), date = utils.crtElement("div",{
			"class" : "act-date"
		}), QR = utils.crtElement("div",{
			"class" : "act-QRcode"
		}), managerStatus = utils.crtElement("div",{
			"class" : "act-manager-status"
		}), status = utils.crtElement("div",{
			"class" : "act-status"
		}), hasStarted = utils.crtElement("div",{
			"class" : "act-started",
			"data-status" : "unstarted"
		}), hasPassed = utils.crtElement("div",{
			"class" : "act-passed",
			"data-status" : "pass"
		}), started, passed;

		if(actvt.started == 0){
			started = "进行中";
		} else if(actvt.started == -1){
			started = "未开始";
		} else {
			started = "已结束";
			utils.addClass(QR,"hide");
		}

		if(actvt.passed == 0){
			passed = "审核通过";
			hasPassed.setAttribute("data-status","pass");	
		} else if (actvt.passed == 1){
			passed = "审核未通过";
			hasPassed.setAttribute("data-status","unpass");
			utils.addClass(QR,"hide");
		} else {
			passed = "审核中...";
			hasPassed.setAttribute("data-status","");
			utils.addClass(QR,"hide");
		}

		var passed = actvt.strissuccess == "0" ? "pass" : "unpass",
			signed = actvt.strsign == "0" ? "sign" : "unsign";
		managerStatus.innerHTML = '<div class="manager-status enroll-status">报名情况</div>'+
						'<div class="manager-status check-status" data-status="'+passed+'">审核情况</div>'+
						'<div class="manager-status sign-status" data-status="'+signed+'">签到情况</div>';

		enName.innerHTML = actvt.enTitle;
		cnName.innerHTML = actvt.cnTitle;
		lecName.innerHTML = actvt.lecName;
		addr.innerHTML = actvt.city;
		date.innerHTML = actvt.date;
		QR.innerHTML = "签到二维码";
		hasStarted.innerHTML = started;
		hasPassed.innerHTML = passed;
		status.appendChild(hasStarted);
		status.appendChild(hasPassed);
		item.appendChild(enName);
		item.appendChild(cnName);
		item.appendChild(lecName);
		item.appendChild(addr);
		item.appendChild(date);
		item.appendChild(QR);
		item.appendChild(managerStatus);
		item.appendChild(status);

		temp += item.outerHTML;
	}

	wrapper.innerHTML += temp;
};


uxwe.templete.loadTemplete([{
	"part" : "nav",
	"wrapper" : "#header"
}]);

function updateMsg(data){

var result= data,
	userMsg = result.jsonusermessage,
	items = result.resultarray;

$('.user-name').html(userMsg.strnickname);
$('.user-working').find("span").eq(0).html(userMsg.strjob);
$('.user-working').find("span").eq(1).html(userMsg.intworktime+"年");
$('.user-photo').html("<img src='"+userMsg.strimageurl+"' />");

for( var i = 0, item; item = items[i++]; ){
	var tempObj = {
		"enTitle" : item.strengname,
		"cnTitle" : item.stractivename,
		"lecName" : item.strteachername,
		"city" : item.strcityname,
		"date" : (item.strStartime.split(" "))[0],
		"started" : item.intshowflg,
		"passed" : item.strissuccess,
		"strissuccess" : item.strissuccess,
		"strsign" : item.strsign
	}

	actvts.push(tempObj);
}

createActv(".user-activities .u-column-content");

}

if(type!="manager"){
	utils.ajax({
		"method" : "get",
		"url" : "/weixintest/Gettuserlist.action",
		"data" : {},
		"dataType" : "json",
		"success" : function(data){
			updateMsg(data);
		}
	});
}else{
	$('#container').attr("data-mode","manager");
	utils.ajax({
		"method" : "post",
		"url" : "/Gettuserlistadmin.action",
		"data" : {intid:uid},
		"dataType" : "json",
		"success" : function(data){
			updateMsg(data);
		}
	});
}


});