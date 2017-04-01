(function(window,undefined){

var utils = uxwe.utils,
	templete = uxwe.templete,
	uid = utils.getUrlObj("uid") * 1,
	subjectImgs = [{
		"img" : "images/1.png",
		"class" : ""
	}],
	subjectsMsg = {
		"speecher-name" : "Billy（仇英华）",
		"speecher-photo" : "images/01.png",
		"job" : "产品设计师",
		"experience" : "现任百姓网业务系统事业部产品设计<br/>曾经的4A广告人、创业者、<br/> 企业咨询师、<br/> 营销人协会创办人.",
		"speech-cn-title" : "通过『故事图谱』进行复杂设计",
		"speech-en-title" : "Design for complex with story mapping",
		"column-items" : [{
			"name" : "course",
			"cn-title" : "课程摘要",
			"en-title" : "COURSE",
			"class" : "subject-course",
			"text" : "通过介绍『故事图谱』方法帮助企业和产品创新团队找到打造卓越、难忘的用户体验的核心方法，以及如何将其运用到实际的工作中，提升产品用户体验和的品牌印象。"
		},{
			"name" : "language",
			"cn-title" : "课程语言",
			"en-title" : "LANGUAGE",
			"class" : "subject-language",
			"text" : "中文授课（双语讲义）"
		},{
			"name" : "background",
			"cn-title" : "背景介绍",
			"en-title" : "BACKGROUND",
			"class" : "subject-background",
			"text" : "如今产品应用场景正变得越来越复杂，如何合理设计复杂场景下的应用？学习『故事图谱』方法论，可以帮助我们去繁化简，以此来抓住影响用户体验和服务价值的最核心元素，让产品设计过程不但更有方向，并且显著提升用户的认可。"
		},{
			"name" : "gain",
			"cn-title" : "参加者获益",
			"en-title" : "GAIN",
			"class" : "subject-gain",
			"text" : "- 介绍『故事图谱』方法；<br/>- 讲解『故事图谱』法在成功品牌产品中的运用；<br/>- 详细叙述『起』『承』『转』『合』故事图谱的关键流；<br/>- 团队模拟练习；"
		}],
		"categories" : "交互设计，用户体验，品牌推广",
		"publish-time" : "2016年11月3日",
		"time" : "2016/11/27",
		"address" : "南京雨花台区"
	},
	sponsors = [];

templete.loadTemplete([{
	"part" : "nav",
	"wrapper" : "#header"
}]);

function createSubjectsImgs(selector){
	var wrapper = utils.getElement(selector),
		temp = "";

	for( var i = 0,img; img = subjectImgs[i++];){
		var slide = utils.crtElement('div',{
			"class" : "swiper-slide"
		}), sImg = utils.crtElement('img',{
			"class" : img["class"],
			"src" : img["img"]
		});

		slide.appendChild(sImg);

		temp += slide.outerHTML;
	}

	wrapper.querySelector('.swiper-wrapper').innerHTML = temp;
	createSwiper(wrapper,{
		"speed" : 800,
		"effect" : "slide",
		"class" : ".sc-1"
	});
}

function createIntroduction(selector){
	var wrapper = utils.getElement(selector),
		temp = "";

	var subTitle = utils.crtElement('div',{
		"class" : "subject-title"
	}), subEnTitle = utils.crtElement('div',{
		"class" : "subject-en-title"
	}), subCnTitle = utils.crtElement('div',{
		"class" : "subject-cn-title"
	});

	subEnTitle.innerHTML = subjectsMsg["speech-en-title"];
	subCnTitle.innerHTML = subjectsMsg["speech-cn-title"];
	subTitle.appendChild(subEnTitle);
	subTitle.appendChild(subCnTitle);

	temp += subTitle.outerHTML;

	for( var i = 0, item; item = subjectsMsg["column-items"][i++]; ){
		var itemEle = utils.crtElement('div',{
			"class" : "subject-item "+item["class"]
		}), itemTitle = utils.crtElement('div',{
			"class" : "content-title"
		}), itemCnTitle = utils.crtElement('span',{
			"class" : "content-cn-title"
		}), itemEnTitle = utils.crtElement('span',{
			"class" : "content-en-title"
		}), itemText = utils.crtElement('div',{
			"class" : "content-text"
		});

		itemCnTitle.innerHTML = item["cn-title"];
		itemEnTitle.innerHTML = item["en-title"];
		itemText.innerHTML = item["text"];

		itemTitle.appendChild(itemCnTitle);
		itemTitle.appendChild(itemEnTitle);
		itemEle.appendChild(itemTitle);
		itemEle.appendChild(itemText);

		temp += itemEle.outerHTML;
	}

	wrapper.innerHTML = temp;

}

function createLecturer(selector){
	var wrapper = utils.getElement(selector),
		temp = "";

	var item = utils.crtElement('div',{
		"class" : "lecturer-item"
	}), lecName = utils.crtElement('div',{
		"class" : "lecturer-name"
	}), lecJob = utils.crtElement('div',{
		"class" : "lecturer-job"
	}), lecPhoto = utils.crtElement('div',{
		"class" : "lecturer-photo"
	}), lecPhotoImg = utils.crtElement('img',{
		"src" : subjectsMsg["speecher-photo"]
	}), exp = utils.crtElement('div',{
		"class" : "lecturer-experience"
	}), speechTitle = utils.crtElement('div',{
		"class" : "lecturer-title"
	}), categories = utils.crtElement('div',{
		"class" : "lecturer-categories"
	}), publishTime = utils.crtElement('div',{
		"class" : "lecturer-time"
	}), speechTime = utils.crtElement('div',{
		"class" : "speech-time"
	}), address = utils.crtElement('div',{
		"class" : "speech-address"
	});

	lecName.innerHTML = subjectsMsg["speecher-name"];
	lecJob.innerHTML = subjectsMsg["job"];
	exp.innerHTML = subjectsMsg["experience"];
	speechTitle.innerHTML = subjectsMsg["speech-cn-title"];
	categories.innerHTML = subjectsMsg["categories"];
	publishTime.innerHTML = "发布于" + subjectsMsg["publish-time"];
	speechTime.innerHTML = "时间：" + subjectsMsg["time"];
	address.innerHTML = "地点：" + subjectsMsg["address"];

	lecPhoto.appendChild(lecPhotoImg);
	item.appendChild(lecName);
	item.appendChild(lecJob);
	item.appendChild(lecPhoto);
	temp += item.outerHTML;
	item.innerHTML = "";
	item.appendChild(exp);
	temp += item.outerHTML;
	item.innerHTML = "";
	item.appendChild(speechTitle);
	item.appendChild(categories);
	item.appendChild(publishTime);
	temp += item.outerHTML;
	item.innerHTML = "";
	item.appendChild(speechTime);
	item.appendChild(address);
	item.innerHTML += '<div class="enroll-box">'+
						'<div class="enroll-btn">'+
							'立即报名'+
						'</div>'+
					'</div>'+
					'<div class="enroll-tips">'+
						'报名截止日期为活动前一周。'+
					'</div>';
	temp += item.outerHTML;

	wrapper.innerHTML = temp;
}

function createSponsors(selector){
	var wrapper = utils.getElement(selector),
		temp = "";

	for( var i = 0, sponsor; sponsor = sponsors[i++]; ){
		var item = utils.crtElement('div',{
			"class" : "sponsor-item"
		}), link = utils.crtElement('a',{
			"href" : sponsor["link"],
			"title" : sponsor["name"]
		}), img = utils.crtElement('img',{
			"src" : sponsor["img"],
			"title" : sponsor["name"]
		});

		link.appendChild(img);
		item.appendChild(link);

		temp += item.outerHTML;
	}

	wrapper.innerHTML = temp;
}

///////////////////////////////////////////////////
function createSwiper(ele,options){
	var el = ele.querySelector(options["class"]),
		mySwiper = new Swiper(el,{
			autoplay : options.autoplay || 0,
			loop : options.loop || false,
			speed : options.speed || 300,
			effect : options.effect || "slide",
			autoplayDisableOnInteraction : false,
			onInit : options["callback"] || function(){},
			preventClicks : options.preventClicks,
			onSlideChangeEnd : options["changeCallback"] || function(){}
		});
};

/////////////////////////////////////////////////
console.log(uid);
utils.ajax({
	"method" : "post",
	"url" : "/weixintest/Getactivityfromid.action",
	"dataType" : "json",
	"data" : {intid:uid}, 
	"success" : function(res){
		var data = res.resultAactivity,
			time = data.strstartime.split(" "),
			date = time[0].split("-"),
			spoArr = data.resultArray,
			len = spoArr.length;
		subjectsMsg["speecher-name"] = data.strteachername;
		subjectsMsg["speecher-photo"] = data.strteacherimgurl_origin;
		subjectsMsg["job"] = data.strteacherjob;
		subjectsMsg["experience"] = data.strteachermesssage;
		subjectsMsg["speech-cn-title"] = data.strname;
		subjectsMsg["speech-en-title"] = data.strengname;
		subjectsMsg["column-items"][0].text = data.strcourse;
		subjectsMsg["column-items"][1].text = data.strlanguage;
		subjectsMsg["column-items"][2].text = data.strbackground;
		subjectsMsg["column-items"][3].text = data.strgain;
		subjectsMsg["categories"] = data.strtype;
		subjectsMsg["publish-time"] = date[0]+"年"+date[1]+"月"+date[2]+"日";
		subjectsMsg["time"] = time[0];
		subjectsMsg["address"] = data.straddress;

		subjectImgs[0].img = data.strimgurl_origin;

		for( var i = 0; i < len; i++ ){
			var spo = spoArr[i];
			sponsors.push({
				"img" : spo.strimgurl,
				"name" : spo.strname,
				"link" : spo.strhttpurl
			});
		}

		createSubjectsImgs('.details-imgs');
		createIntroduction('.details-column-content');
		createLecturer('.lecturer-box');
		createSponsors('.sponsors-content');

	}
});

})(window);

