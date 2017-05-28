jQuery(function($){

var utils = uxwe.utils,
	path = window.location.href.substring(0,window.location.href.indexOf("/")),
	//工作坊列表
	workshopLists = [{
		"id" : "1",
		"type" : "0",
		"img" : "images/tx_1.png",
		"imgLink" : "javascript:;",
		"name" : "仇英华 Billy",
		"job" : "产品设计师，现任百姓网业务系统事业部产品设计",
		"title" : "通过『故事图谱』进行复杂设计",
		"titleLink" : "javascript:;",
		"time" : "2016/12/11  13:30",
		"address" : "南京雨花台区",
		"status" : "已结束",
		"statusType" : "0",
		"intro" : "通过介绍『故事图谱』方法帮助企业和产品创新团队找到打造卓越、难忘的用户体验的核心方法，以及如何到实际的工作中，提升产品用户体验和的品牌印象。"
	},{
		"id" : "2",
		"type" : "0",
		"img" : "images/tx_2.png",
		"imgLink" : "javascript:;",
		"name" : "林长青",
		"job" : "产品经理，搜狗桌面事业部，产品经理，搜狗壁纸产品负责人，HiUED创办人",
		"title" : "将“用户走查”融入产品迭代",
		"titleLink" : "javascript:;",
		"time" : "2014/11/30  13:30",
		"address" : "南京雨花台区",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "和用户生活在一起，你就是最好的产品经理。培养你对用户需求的灵敏度、理解他们的需求场景、知道他们的行为习惯。再通过这些用户信息获取，归类，最终转化为用户特征，清楚的知晓USER为谁，对指导我们未来的产品方向、产品设计非常有益。"
	},{
		"id" : "3",
		"type" : "1",
		"img" : "images/tx_3.png",
		"imgLink" : "javascript:;",
		"name" : "印隽",
		"job" : "广联达云计算平台UX高级经理，UCDCHINA上海区活动组织人",
		"title" : "UX价值观反思和重构",
		"titleLink" : "javascript:;",
		"time" : "2014/09/13  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "把软件工程领域统一建模的理念带入UX设计"
	},{
		"id" : "4",
		"type" : "0",
		"img" : "images/tx_4.png",
		"imgLink" : "javascript:;",
		"name" : "包季真",
		"job" : "脉可寻联合创始人，产品总监，大众点评网资深交互设计师...",
		"title" : "从Idea到卓越应用",
		"titleLink" : "javascript:;",
		"time" : "2014/08/31  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "1、用户目标：寻找目标用户：谁是我们的用户？和传统互联网时代的用户有什么不同？我们自己是用户吗？什么是NUI(自然用户界面)？2、移动场景：外部环境的变化完全改变并主导了移动应用的使用。这是移动应用与传统互联网的本质区别。移动设备与感应器：移动设备比起传统PC其实多了很多感应器。它们都有什么作用？"
	},{
		"id" : "5",
		"type" : "1",
		"img" : "images/tx_5.png",
		"imgLink" : "javascript:;",
		"name" : "陈莹",
		"job" : "elya.cc作者，Top Design创始人兼CEO，前百度云UED团队负责人...",
		"title" : "设计思维可视化模型",
		"titleLink" : "javascript:;",
		"time" : "2014/07/12  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "设计思维可视化的四类模型及对应的实践拆解"
	},{
		"id" : "6",
		"type" : "1",
		"img" : "images/tx_6.png",
		"imgLink" : "javascript:;",
		"name" : "胡甲超",
		"job" : "现任职于淘宝UED，负责平板产品的交互设计。《移动设计》《方寸指间》作者。",
		"title" : "抓住用户的注意力——移动产品中的互动流设计",
		"titleLink" : "javascript:;",
		"time" : "2014/06/07  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "介绍移动产品中的流设计方法，并以案例实践。"
	},{
		"id" : "7",
		"type" : "3",
		"img" : "images/tx_7.png",
		"imgLink" : "javascript:;",
		"name" : "Terry （范志鹏）",
		"job" : "任职思科中国云协作部门用户体验设计经理",
		"title" : "如何设计跨设备产品的用户体验",
		"titleLink" : "javascript:;",
		"time" : "2014/05/17  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "介绍跨设备产品的用户体验设计方法，案例分析并举一反三练习。"
	},{
		"id" : "8",
		"type" : "3",
		"img" : "images/tx_8.png",
		"imgLink" : "javascript:;",
		"name" : "张湛",
		"job" : "毕业于美国奥本大学工业设计系，目前任职于上海交通大学媒体与设计学院...",
		"title" : "面向产品开发的用户体验研究方法",
		"titleLink" : "javascript:;",
		"time" : "2014/03/30  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "User Center Design（UCD）已经日趋成为产品开发的重要趋势，用户体验研究也成为成功产品的重要依据。"
	},{
		"id" : "9",
		"type" : "3",
		"img" : "images/tx_9.png",
		"imgLink" : "javascript:;",
		"name" : "Sky（贺鸣）",
		"job" : "沪江网用户体验总监，UCDChina上海书友会组织者，IxDC交互设计专业委员...",
		"title" : "信息架构与用户路径设计",
		"titleLink" : "javascript:;",
		"time" : "2014/03/30  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "面对一些较为复杂的新产品的创新或者已有产品的改版，很多产品人员与设计师往往抓不住重点，本工作坊希望探索一种方法，针对不同类型的用户，设计信息入口，优化行为路径。"
	},{
		"id" : "10",
		"type" : "3",
		"img" : "images/tx_10.png",
		"imgLink" : "javascript:;",
		"name" : "李力耘",
		"job" : "前三星中国设计研究所资深用户研究员，第九城市研发中心用户体验主管，盛大...",
		"title" : "从用户研究的角度设计体验",
		"titleLink" : "javascript:;",
		"time" : "2014/01/12  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "该工作坊的目标是“抛砖引玉”，通过工作坊的方式讲解产品设计开发中用户研究的思维方法。工作坊中还会结合设计心理学的知识和应用、生活中的各种体验和背后的价值，帮助参与者了解何时使用研究，使用怎样的研究。"
	},{
		"id" : "11",
		"type" : "1",
		"img" : "images/tx_11.png",
		"imgLink" : "javascript:;",
		"name" : "孙博文",
		"job" : "韩国高等科学技术院数字媒体实验室项目负责人，现中央美术学院交互设计...",
		"title" : "五感与交互",
		"titleLink" : "javascript:;",
		"time" : "2013/12/21  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "从体验出发，而不是具体的物和事"
	},{
		"id" : "12",
		"type" : "1",
		"img" : "images/tx_12.png",
		"imgLink" : "javascript:;",
		"name" : "熊子川",
		"job" : "ThoughtWorks中国区首席设计师",
		"title" : "Agile UX实战",
		"titleLink" : "javascript:;",
		"time" : "2013/11/23  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "我关注商业价值，体验设计，咨询技巧，以及关于历史、科学、文化、设计、现代艺术、朋友的一切。"
	},{
		"id" : "13",
		"type" : "1",
		"img" : "images/tx_13.png",
		"imgLink" : "javascript:;",
		"name" : "杰弗里.贝尔",
		"job" : "美国查普林学院新媒体科学副教授",
		"title" : "互动数字媒体设计工具探索",
		"titleLink" : "javascript:;",
		"time" : "2013/07/12  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "随着互联网和移动互联网这两个最具代表性的新媒体发展，这些问题一次又一次被抛出，并通过各种形式被我们解析。随着技术的发展变革，我们已经渐渐不满足于二维的交互效果，往三维乃至更高的领域探索学习。在这些过程中，设计策略和设计工具，将随着工具和载体的发展而不断托陈出新，需要我们不断学习。"
	},{
		"id" : "14",
		"type" : "1",
		"img" : "images/tx_14.png",
		"imgLink" : "javascript:;",
		"name" : "章愳",
		"job" : "中国美术学院艺术硕士，曾就职于网易，EA，世嘉，做过老师，当过工会主席",
		"title" : "游戏化体验的原则初探",
		"titleLink" : "javascript:;",
		"time" : "2013/09/15  13:30",
		"address" : "上海市浦东新区浦电路",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "本课程将通过一些案例和原则，管窥成瘾机制和互联网会员运营的方式方法。"
	},{
		"id" : "15",
		"type" : "0",
		"img" : "images/tx_15.png",
		"imgLink" : "javascript:;",
		"name" : "陈沁文",
		"job" : "用户体验设计师",
		"title" : "设计思维实践",
		"titleLink" : "javascript:;",
		"time" : "2014/05/17  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "本课程将通过项目经验介绍与互动游戏环节，向您揭示如何利用设计思维，理解用户需求，创造解决方案的完整流程，及流程中的关键要素。此外，Leo将分享漫画如何助益实际项目的心得体会，并带领大家共同体验快捷有效的漫画技巧。"
	},{
		"id" : "16",
		"type" : "0",
		"img" : "images/tx_16.png",
		"imgLink" : "javascript:;",
		"name" : "简驾",
		"job" : "8年用户体验设计经验，5年团队管理体验设计，曾参与多项产品的用户体验设计。",
		"title" : "记忆与非理性思维设计",
		"titleLink" : "javascript:;",
		"time" : "2014/03/30  13:30",
		"address" : "浦东新区博云路2号浦软大楼2层",
		"status" : "未开始",
		"statusType" : "1",
		"intro" : "课程分为两个主要部分，其中一部分为记忆与设计的关系，如何利用大众普通存在的记忆特征进行相应设计。第二部分为非理性，简述非理性与设计之间的关联，以及如何来进行产品设计。"
	},{
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