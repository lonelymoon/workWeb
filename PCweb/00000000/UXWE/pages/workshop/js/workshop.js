jQuery(function($){

var utils = uxwe.utils,
	path = window.location.href.substring(0,window.location.href.indexOf("/")),
	//工作坊列表
	workshopLists = [{
		"id" : "17",
		"type" : "2",
		"img" : "images/tx_17.png",
		"imgLink" : "javascript:;",
		"name" : "JJ Ying（应骏赳）",
		"job" : "野路子 + 实战派设计师，目前是 MUX 上海部门的负责人。",
		"title" : "越来越跨界的界面设计",
		"titleLink" : "javascript:;",
		"time" : "2014/03/30  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "随着终端设备的发展，公司对界面设计师的要求越来越“跨界”，作为界面设计师的你要如何与SDSSADAS时俱进，专业又准确的完成任务？"
	}];


//////////////////////////////////////////////////////////////
	var createWorkshopItem = function(selector){
		var wrapper = utils.getElement(selector),
			temp = "";

		for (var i = 0, list; list = workshopLists[i++]; ) {
			var clBox = utils.crtElement('div',{
				"class" : "column-item-box",
				"data-id" : list["id"],
				"data-type" : list["type"]
			}), citem = utils.crtElement('div',{
				"class" : "column-item"
			}), wsBox = utils.crtElement('div',{
				"class" : "workshop-box"
			}), ltBox = utils.crtElement('div',{
				"class" : "wk-left-box"
			}), rtBox = utils.crtElement('div',{
				"class" : "wk-right-box"
			}), ltImgBox = utils.crtElement('div',{
				"class" : "left-img-box"
			}), rtMsgBox = utils.crtElement('div',{
				"class" : "right-msg-box",
				"data-type" : list["type"]
			});

			ltImgBox.innerHTML = '<a href="'+list["imgLink"]+'" target="_blank"><div class="img-list-box"><img src="'+list["img"]+'" class="msg-img"></div></a>';
			rtMsgBox.innerHTML = '<div class="msg-name lec-name">'+list["name"]+'</div>'+
									'<div class="msg-job lec-job">'+
										list["job"]+
									'</div>'+
									'<a href="'+list["titleLink"]+'" target="_blank"><div class="msg-title lec-title">'+list["title"]+'</div></a>'+
									'<div class="msg-time lec-time">时间：'+list["time"]+'</div>'+
									'<div class="msg-address lec-address">地点：'+list["address"]+'</div>'+
									'<div class="msg-status" data-type="'+list["statusType"]+'">'+list["status"]+'</div>';

			rtBox.innerHTML = '<div class="introduce-box">'+
									list["intro"]+	
								'</div>';

			ltBox.appendChild(ltImgBox);
			ltBox.appendChild(rtMsgBox);
			wsBox.appendChild(ltBox);
			wsBox.appendChild(rtBox);
			citem.appendChild(wsBox);
			clBox.appendChild(citem);

			temp += clBox.outerHTML;
		};

		wrapper.innerHTML = temp;
	};

////////////////////////////////////////////////////////////////////////////
	

////////////////////////////////////////////////////////////////////////////
uxwe.templete.loadTemplete([{
	"part" : "nav",
	"wrapper" : "#header"
},{
	"part" : "category",
	"wrapper" : ".filter-box",
	"data" : {
		"categoryTargetElement" : ".column-item-box"
	}
}]);

utils.ajax({
	"method" : "get",
	"url" : "/weixintest/Getactiveall.action",
	"data" : {userName:'userName01'},
	"dataType" : "json",
	"success" : function(res){
		var results = res.resultArray,
			temp = [],
			tempObj = null;
		for(var i = 0, resultItem; resultItem = results[i++]; ){
			var actFlag = resultItem.intshowflg;
			tempObj = {
				"id" : resultItem.intid,
				"type" : resultItem.intcolorid,
				"img" : resultItem.strteacherimgurl,
				"imgLink" : path+"/UXWE/pages/details/details.html?uid="+resultItem.intid,
				"name" : resultItem.strteacherjob,
				"job" : resultItem.strteacherjob,
				"title" : resultItem.strname,
				"titleLink" : path+"/UXWE/pages/details/details.html?uid="+resultItem.intid,
				"time" : resultItem.strstartime,
				"address" : resultItem.straddress,
				"status" : actFlag == 1 ? "已结束" : actFlag == -1 ? "未开始" : "进行中",
				"statusType" : actFlag,
				"intro" : resultItem.strmessage
			};
			temp.push(tempObj);
		}
		workshopLists = temp;
		createWorkshopItem('#workShops');
	}
});

});