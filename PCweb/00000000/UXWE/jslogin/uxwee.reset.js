jQuery(function($){

	var utils = uxwee.utils,
		//导航
		navLists = [{
			"text" : "首页",
			"href" : "index.html",
			"children" : {}
		},{
			"text" : "工作坊",
			"href" : "#now-activities",
			"children" : {}
		},{
			"text" : "公益讲师",
			"href" : "#lecturer",
			"children" : {}
		},{
			"text" : "关于我们",
			"href" : "#about-us",
			"children" : {}
		},{
			"text" : "注册/登录",
			"href" : "login/index.html?source=register",
			"children" : {}
		}],
		//banner
		bannerImgs = [{
			"link": "javascript:;",
			"img" : "images/banner1.jpg"
		},{
			"link": "javascript:;",
			"img" : "images/banner2.jpg"
		}],
		//now
		nowActvts = [{
			"index" : "1",
			"id" : "3",
			"intro-text" : "通过介绍『故事图谱』方法帮助企业和产品创新团队找到打造卓越、难忘的用户体验的核心方法，以及如何将其运用到实际的工作中，提升产品用户体验和的品牌印象。",
			"speecher-photo" : "images/top.png",
			"speecher-name" : "Billy （仇英华）",
			"experience" : "产品设计师，现任百姓网业务系统事业部产品设计",
			"speech-title" : "通过『故事图谱』进行复杂设计",
			"date" : "时间：2016/12/11 13:30",
			"address" : "地点：南京雨花台区",
			"left-day" : utils.getLeftDay("2016-12-11 13:30:00") < 0 ? 0 : utils.getLeftDay("2016-12-11 13:30:00"),
			"placeCn" : "南京",
			"placeEn" : "Nanjing",
			"noteMsg" : "报名成功后请通过关注微信获取审核情况",
			"btnText" : "报名已结束",
			"addLink" : false
		}],
		//past
		pastActvts = [{
			"id" : 1,
			"actsImg" : "images/13.png",
			"actsTitle" : "将“用户走查”融入产品迭代。",
			"actsSpeecher" : "林长青",
			"type" : "交互设计，用户体验，视觉设计",
			"time" : "2017.07.20",
			"cost" : "免费",
			"hasStarted" : "未开始",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 2,
			"actsImg" : "images/12.png",
			"actsTitle" : "UX真能带来本质性创新？UX价值观反思和重构。",
			"actsSpeecher" : "印隽",
			"type" : "交互设计，用户体验，视觉设计",
			"time" : "2014.09.13",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 3,
			"actsImg" : "images/11.png",
			"actsTitle" : "大脑的记忆——记忆与非理性思维设计",
			"actsSpeecher" : "简驾",
			"type" : "交互设计，用户体验",
			"time" : "2013.07.20",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 4,
			"actsImg" : "images/10.png",
			"actsTitle" : "越来越跨界的界面设计",
			"actsSpeecher" : "应骏赳 JJ Ying",
			"type" : "交互设计，视觉设计",
			"time" : "2013.06.29",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 5,
			"actsImg" : "images/9.png",
			"actsTitle" : "如何应用科学的用户研究方法创造有说服力的设计",
			"actsSpeecher" : "刘柏丽",
			"type" : "交互设计，用户体验",
			"time" : "2013.04.14",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 6,
			"actsImg" : "images/8.png",
			"actsTitle" : "全用户触点体验规划",
			"actsSpeecher" : "姚昱盛",
			"type" : "交互设计，用户体验",
			"time" : "2013.03.23",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 7,
			"actsImg" : "images/7.png",
			"actsTitle" : "如何将用户洞察转化为UX设计",
			"actsSpeecher" : "毛茸",
			"type" : "交互设计，用户体验，产品设计",
			"time" : "2013.02.20",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		},{
			"id" : 8,
			"actsImg" : "images/6.png",
			"actsTitle" : "建立优质设计师的色彩设计观",
			"actsSpeecher" : "梁景红 Relen Liang",
			"type" : "视觉设计",
			"time" : "2012.12.01",
			"cost" : "免费",
			"hasStarted" : "已结束",
			"btnLink" : "",
			"btnText" : "我要报名"
		}],
		//lecturers
		lecturers = [{
			"id" : "1",
			"photo" : "images/5.png",
			"name" : "包季真",
			"job" : "脉可寻联合创始人",
			"title" : "从Idea到卓越应用"
		},{
			"id" : "2",
			"photo" : "images/4.png",
			"name" : "林长青",
			"job" : "产品经理，搜狗壁纸产品负责人",
			"title" : "将“用户走查”融入产品迭代"
		},{
			"id" : "3",
			"photo" : "images/3.png",
			"name" : "陈莹",
			"job" : "Top Design创始人兼CEO",
			"title" : "设计思维可视化模型"
		},{
			"id" : "4",
			"photo" : "images/2.png",
			"name" : "张湛",
			"job" : "ThoughtWorks中国首席设计师",
			"title" : "Agile UX实战"
		},{
			"id" : "5",
			"photo" : "images/1.png",
			"name" : "孙博文",
			"job" : "国家数字媒体创新研究中心 研究员",
			"title" : "五感与交互"
		}];

	
	var createNav = function(selector){
		var wrapper = document.querySelector(selector),
			temp = "";

		for( var i = 0, list; list = navLists[i++]; ){

			var li = utils.crtElement('li',{
				"class" : "nav-list",
				"data-id" : i,
				"data-link" : list["href"]				
			});

			if(i == 1){
				li.className += " choose";
			}

			li.innerHTML = list["text"];

			temp += li.outerHTML;
		}

		wrapper.querySelector('.nav').innerHTML = temp;
		bindNavEvent();
	};

	var createBanner = function(selector){

		var wrapper = document.querySelector(selector),
			temp = "";

		for( var i = 0, l = bannerImgs.length; i < l; i++ ){

			var swp = utils.crtElement("div",{
				"class" : "swiper-slide"
			}), img = utils.crtElement("img",{
				"src" : bannerImgs[i].img,
				"class" : "bannerImg"
			}), a = utils.crtElement("a",{
				"href" : bannerImgs[i]["link"]
			});

			a.appendChild(img);
			swp.appendChild(a);

			temp += swp.outerHTML;

		}

		wrapper.querySelector('.swiper-wrapper').innerHTML = temp;
		createSwiper(wrapper,{
			"autoplay" : 5000,
      		"speed" : 600,
      		"effect" : "fade",
      		"class" : ".swiper-container",
		"preventClicks" : false,
      		"loop" : true
      	});
	};

	var createNowActvts = function(selector){
		var wrapper = document.querySelector(selector),
			tempSlide = "",
			tempNav = "";

		for( var i = 0, nowActvt; nowActvt = nowActvts[i++]; ){

			var slide = utils.crtElement('div',{
				"class" : "swiper-slide"
			}), introBox = utils.crtElement('div',{
				"class" : "intro-box",
				"data-id" : nowActvt["index"]
			}), leftBox = utils.crtElement('div',{
				"class" : "left-introduction"
			}), rightBox = utils.crtElement('div',{
				"class" : "right-time-left"
			}), speech = utils.crtElement('div',{
				"class" : "speech-intro"
			}), speecher = utils.crtElement('div',{
				"class" : "speecher-intro"
			}), speechNoteMsg = utils.crtElement('div',{
				"class" : "speech-note-msg"
			}), speecherPhoto = utils.crtElement('div',{
				"class" : "speecher-photo"
			}), speecherMsg = utils.crtElement('div',{
				"class" : "speecher-msg"
			}), leftTimeBox = utils.crtElement('div',{
				"class" : "left-time-box"
			}), pagination = utils.crtElement('div',{
				"class" : "swiper-pagination"
			}), paginationList = utils.crtElement('div',{
				"class" : "pagination-list-box",
				"data-idx" : i
			});

			if(i == 1){
				paginationList.className += " sChoose";
			}


			speech.innerHTML = '<div class="quote-left">'+
	      							'<img src="images/yh_01.png">'+
	      						'</div>'+
	      						nowActvt["intro-text"] + 
	      						'<div class="quote-right">'+
	      							'<img src="images/yh_02.png">'+
	      						'</div>';

	      	speecherPhoto.innerHTML = '<img src="'+nowActvt["speecher-photo"]+'" class="photo-header" width="150" height="150">';
	      	
	      	speecherMsg.innerHTML = '<h5 class="speecher-name">'+nowActvt["speecher-name"]+'</h5>'+
	      							'<div class="experience">'+
	      								nowActvt["experience"] + 
	      							'</div>' +
	      							'<div class="speech-title">'+
	      								nowActvt["speech-title"]+
	      							'</div>'+
	      							'<div class="date">'+
	      								nowActvt["date"]+
	      							'</div>'+
	      							'<div class="address">'+
	      								nowActvt["address"]+
	      							'</div>';

	      	speechNoteMsg.innerHTML = nowActvt["noteMsg"];

	      	leftTimeBox.innerHTML = '<div class="left-time">'+nowActvt["left-day"]+'<span>天</span></div>'+
		      						'<div class="left-time-note">距离活动开始还有</div>'+
		      						'<a href="'+(nowActvt["addLink"]?"enroll/index.html?source=enroll&id="+nowActvt["id"]:"javascript:;")+'">'+
		      							'<div class="left-time-register-btn'+(nowActvt["addLink"]?"":" end-time-btn")+'">'+nowActvt["btnText"]+'</div>'+
		      						'</a>';

		    paginationList.innerHTML = '<div class="pagination-list">'+
							    			nowActvt["placeCn"] + " " + nowActvt["placeEn"]+
							    		'</div>';

	      	speecher.appendChild(speecherPhoto);
	      	speecher.appendChild(speecherMsg);
	      	leftBox.appendChild(speech);
	      	leftBox.appendChild(speecher);
	      	leftBox.appendChild(speechNoteMsg);
	      	rightBox.appendChild(leftTimeBox);
	      	introBox.appendChild(leftBox);
	      	introBox.appendChild(rightBox);
	      	slide.appendChild(introBox);
	      	pagination.appendChild(paginationList);
	      	tempSlide += slide.outerHTML;
	      	tempNav += pagination.innerHTML;
		}

		wrapper.querySelector('.swiper-wrapper').innerHTML = tempSlide;
      	wrapper.querySelector('.swiper-pagination').innerHTML = tempNav;
	
      	createSwiper(wrapper,{
      		"speed" : 600,
      		"effect" : "coverflow",
      		"class" : ".swiper-container",
      		"preventClicks" : false,
      		"callback": function(swiper){
      			utils.on(selector+" .swiper-pagination","click",".pagination-list-box",function(e){
      				var idx = this.getAttribute("data-idx")
      				swiper.slideTo( idx - 1);
      			});
      		},
      		"changeCallback" : function(swiper){
      			var tar,idx,
      				lists = wrapper.querySelectorAll('.pagination-list-box');
      			for( var i = 0, l = lists.length; i < l; i++ ){
  					utils.removeClass(lists[i],"sChoose");
  					idx = lists[i].getAttribute("data-idx");
  					if( idx - 1 == swiper.activeIndex){
  						tar = lists[i];
  					}
  				}

  				utils.addClass(tar,"sChoose");
      		}
      	});
	
	};

	var createPast = function(selector){
		var wrapper = document.querySelector(selector),
			temp = "",
			row = utils.crtElement('div',{
				"class" : "row"
			});

		for( var i = 0, pastActvt; pastActvt = pastActvts[i++]; ){

			if( i > 1 && (i - 1) % 4 == 0){
				temp += row.outerHTML;
				row = utils.crtElement('div',{
					"class" : "row"
				})
			}

			var list = utils.crtElement('div',{
				"class" : "past-actvts-list",
				"data-id" : pastActvt["id"]
			}), pastImgBox = utils.crtElement('div',{
				"class" : "past-actvts-img"
			}), pastImg = utils.crtElement('img',{
				"src" : pastActvt["actsImg"]
			}), pastTitle = utils.crtElement('div',{
				"class" : "past-actvts-title"
			}), speecher = utils.crtElement('div',{
				"class" : "past-actvts-speecher"
			}), type = utils.crtElement('div',{
				"class" : "past-actvts-type"
			}), fnBox = utils.crtElement('div',{
				"class" : "past-actvts-fn"
			});

			fnBox.innerHTML = '<div class="past-actvts-time">'+
								pastActvt["time"]+'<span>'+
								pastActvt["cost"]+'</span>'+
								pastActvt["hasStarted"]+'</div>'+
							'<a href="'+pastActvt["btnLink"]+'">'+
								'<div class="past-actvts-btn">'+pastActvt["btnText"]+'</div>'+
							'</a>';

			type.innerHTML = '<div>'+pastActvt["type"]+'</div>';
			speecher.innerHTML = '<div>演讲者：<span>'+pastActvt["actsSpeecher"]+'</span></div>';
			pastTitle.innerHTML = pastActvt["actsTitle"];
			pastImgBox.appendChild(pastImg);
			list.appendChild(pastImgBox);
			list.appendChild(pastTitle);
			list.appendChild(speecher);
			list.appendChild(type);
			list.appendChild(fnBox);
			row.appendChild(list);
		}

		temp += row.outerHTML;

		wrapper.innerHTML = temp;

	};

	var createLecturer = function(selector){
		var wrapper = document.querySelector(selector),
			temp = "",
			row = utils.crtElement('div',{
				"class" : "row"
			});

		for( var i = 0, lecturer; lecturer = lecturers[i++]; ){

			var list = utils.crtElement("div",{
				"class" : "lecturer-list",
				"data-id" : lecturer["id"]
			}), photoBox = utils.crtElement("div",{
				"class" : "lecturer-img"
			}), photo = utils.crtElement('img',{
				"src" : lecturer["photo"]
			}), introBox = utils.crtElement('div',{
				"class" : "lecturer-intro"
			}), lecName = utils.crtElement('div',{
				"class" : "lecturer-text lecturer-name"
			}), lecJob = utils.crtElement('div',{
				"class" : "lecturer-text lecturer-job"
			}), lecTitle = utils.crtElement('div',{
				"class" : "lecturer-text lecturer-speech-title"
			});

			lecTitle.innerHTML = lecturer["title"];
			lecJob.innerHTML = lecturer["job"];
			lecName.innerHTML = lecturer["name"];
			photoBox.appendChild(photo);
		
			introBox.appendChild(lecName);
			introBox.appendChild(lecJob);
			introBox.appendChild(lecTitle);

			list.appendChild(photoBox);
			list.appendChild(introBox);

			row.appendChild(list);
		}

		temp += row.outerHTML;

		wrapper.innerHTML = temp;

	};


//////////////////////////////////////////////////////////////////////////
	function createSwiper(ele,options){
		var el = ele.querySelector(options["class"]),
			mySwiper = new Swiper(el,{
				autoplay : options.autoplay || 0,
				loop : options.loop || false,
				speed : options.speed || 300,
				effect : options.effect,
				autoplayDisableOnInteraction : false,
				onInit : options["callback"] || function(){},
				preventClicks : options.preventClicks,
				onSlideChangeEnd : options["changeCallback"] || function(){}
			});
	};

	function bindNavEvent(){
		utils.on('.nav','click','.nav-list',function(e){
			var link = this.getAttribute('data-link');
			window.location.href = link;
		});
	};

	function isLogin(){
		utils.ajax({
			"method" : "get",
			"url" : "/weixintest/IsLoading.action",
			"data" : {},
			"dataType" : "json",
			"success" : function(data){
				if(data.strFlg == '1')
				{
					utils.getElement('.msg-register-btn').style.display = "none";
					utils.getElements('.nav-list')[4].style.display = "none";
				}
			}
		});
	};

//////////////////////////////////////////////////////////////////////////
createNav('#top-nav');
createBanner('#top-banner');
createNowActvts('#now-activities');
createPast('#past-activities');
createLecturer('#lecturer');
isLogin();
});