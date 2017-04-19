(function(uxwe,undefined){

var utils = uxwe.utils,
	pathUrl = "http://uxwetest.uxwe.org/UXWE/";
	//pathUrl = "http://uxwetest.uxwe.org/UXWE/";

var templete = {},
	box = utils.crtElement('div'),
	//导航
	navLists = [{
		"text" : "首页",
		"href" : pathUrl+"index.html",
		"children" : {}
	},{
		"text" : "工作坊",
		"href" : pathUrl+"pages/workshop/workshop.html",
		"children" : {}
	},{
		"text" : "公益讲师",
		"href" : pathUrl+"pages/lecturers/lecturers.html",
		"children" : {}
	},{
		"text" : "关于我们",
		"href" : pathUrl+"pages/about/about.html",
		"children" : {}
	},{
		"text" : "注册/登录",
		"href" : "http://uxwetest.uxwe.org/UXWE/login/index.html?source=register",
		"children" : {}
	}],
	//lecturers
	lecturers = [{
		"id" : "1",
		"type" : "0",
		"photo" : pathUrl+"pages/lecturers/images/01.png",
		"imgLink" : "javascript:;",
		"name" : "Billy（仇英华）",
		"job" : "现任百姓网事业部产品设计",
		"title" : "通过『故事图谱』进行复杂设计",
		"titleLink" : "javascript:;"
	},{
		"id" : "2",
		"type" : "0",
		"photo" : pathUrl+"pages/lecturers/images/02.png",
		"imgLink" : "javascript:;",
		"name" : "林长青",
		"job" : "产品经理，搜狗壁纸产品负责人",
		"title" : "将“用户走查”融入产品迭代",
		"titleLink" : "javascript:;"
	},{
		"id" : "3",
		"type" : "1",
		"photo" : pathUrl+"pages/lecturers/images/03.png",
		"imgLink" : "javascript:;",
		"name" : "陈莹",
		"job" : "Top Design创始人兼CEO",
		"title" : "设计思维可视化模型",
		"titleLink" : "javascript:;"
	},{
		"id" : "4",
		"type" : "1",
		"photo" : pathUrl+"pages/lecturers/images/04.png",
		"imgLink" : "javascript:;",
		"name" : "张湛",
		"job" : "ThoughtWorks中国首席设计师",
		"title" : "Agile UX实战",
		"titleLink" : "javascript:;"
	},{
		"id" : "5",
		"type" : "1",
		"photo" : pathUrl+"pages/lecturers/images/05.png",
		"imgLink" : "javascript:;",
		"name" : "孙博文",
		"job" : "国家数字媒体创新研究中心 研究员",
		"title" : "五感与交互",
		"titleLink" : "javascript:;"
	},{
		"id" : "6",
		"type" : "0",
		"photo" : pathUrl+"pages/lecturers/images/06.png",
		"imgLink" : "javascript:;",
		"name" : "包季真",
		"job" : "脉可寻联合创始人",
		"title" : "从Idea到卓越应用",
		"titleLink" : "javascript:;"
	},{
		"id" : "7",
		"type" : "1",
		"photo" : pathUrl+"pages/lecturers/images/07.png",
		"imgLink" : "javascript:;",
		"name" : "印隽",
		"job" : "广联达云计算平台UX高级经理",
		"title" : "UX价值观反思和重构",
		"titleLink" : "javascript:;"
	},{
		"id" : "8",
		"type" : "1",
		"photo" : pathUrl+"pages/lecturers/images/08.png",
		"imgLink" : "javascript:;",
		"name" : "胡甲超",
		"job" : "现任职于淘宝UED",
		"title" : "移动产品中的互动流设计",
		"titleLink" : "javascript:;"
	},{
		"id" : "9",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/09.png",
		"imgLink" : "javascript:;",
		"name" : "Terry （范志鹏）",
		"job" : "思科中国云协作部门体验设计经理",
		"title" : "如何设计跨设备产品的用户体验",
		"titleLink" : "javascript:;"
	},{
		"id" : "10",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/10.png",
		"imgLink" : "javascript:;",
		"name" : "Sky（贺鸣）",
		"job" : "沪江网用户体验总监",
		"title" : "信息架构与用户路径设计",
		"titleLink" : "javascript:;"
	},{
		"id" : "11",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/11.png",
		"imgLink" : "javascript:;",
		"name" : "刘柏丽",
		"job" : "博士，十年用户体验领域工作经验",
		"title" : "如何创造有说服力的设计",
		"titleLink" : "javascript:;"
	},{
		"id" : "12",
		"type" : "2",
		"photo" : pathUrl+"pages/lecturers/images/12.png",
		"imgLink" : "javascript:;",
		"name" : "JJ Ying（应骏赳）",
		"job" : "沪江网用户体验总监",
		"title" : "信息架构与用户路径设计",
		"titleLink" : "javascript:;"
	},{
		"id" : "13",
		"type" : "1",
		"photo" : pathUrl+"pages/lecturers/images/13.png",
		"imgLink" : "javascript:;",
		"name" : "Geoffrey Bell",
		"job" : "美国查普林学院新媒体科学副教授",
		"title" : "互动数字媒体设计工具探索",
		"titleLink" : "javascript:;"
	},{
		"id" : "14",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/14.png",
		"imgLink" : "javascript:;",
		"name" : "章愳",
		"job" : "现任支付宝用户体验专家",
		"title" : "游戏化体验的原则初探",
		"titleLink" : "javascript:;"
	},{
		"id" : "15",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/15.png",
		"imgLink" : "javascript:;",
		"name" : "姚昱盛",
		"job" : "红星美凯龙商城产品体验中心负责人",
		"title" : "全用户触点体验规划",
		"titleLink" : "javascript:;"
	},{
		"id" : "16",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/16.png",
		"imgLink" : "javascript:;",
		"name" : "简驾",
		"job" : "8年体验设计经验，5年团队管理",
		"title" : "记忆与非理性思维设计",
		"titleLink" : "javascript:;"
	},{
		"id" : "17",
		"type" : "3",
		"photo" : pathUrl+"pages/lecturers/images/17.png",
		"imgLink" : "javascript:;",
		"name" : "陈沁文",
		"job" : "用户体验设计师",
		"title" : "设计思维实践",
		"titleLink" : "javascript:;"
	}],
	//category
	categories = [{
		"text" : "全部",
		"type" : "all"
	}, {
		"text" : "产品",
		"type" : "0"
	}, {
		"text" : "交互",
		"type" : "1"
	}, {
		"text" : "设计",
		"type" : "2"
	}, {
		"text" : "体验",
		"type" : "3"
	}];

//////////////////////Templete//////////////////////////

templete.nav = {

	init : function(wrapElement,data){
		this.getData(wrapElement,data);
	},

	getData : function(wrapElement,data){
		this.loadNav(wrapElement);
	},

	loadNav : function(boxer){
		var _self = this,
			nav;

		if(box.innerHTML){
			nav = utils.find(box,"#top-nav");
			utils.insertBefore(boxer,nav);
			_self.createNavList('#top-nav');
			return false;
		}

		utils.ajax({
			"method" : "get",
			"url" : pathUrl + "templetes.html",
			"data" : {},
			"dataType" : "text",
			"success" : function(data){
				box.innerHTML = data;
				nav = utils.find(box,"#top-nav");
				utils.insertBefore(boxer,nav);
				_self.createNavList('#top-nav');
			},
			"fail" : function(status){
				alert(status);
			}
		});
	
	},

	createNavList : function(selector){
		var wrapper = document.querySelector(selector),
			temp = "",
			loca = window.location.href;

		for( var i = 0, list; list = navLists[i++]; ){

			var li = utils.crtElement('li',{
				"class" : "nav-list",
				"data-id" : i,
				"data-link" : list["href"]				
			}), href = new RegExp(list["href"]);

			if(href.test(loca)){
				li.className += " choose";
			}

			li.innerHTML = list["text"];

			temp += li.outerHTML;
		}

		wrapper.querySelector('.nav').innerHTML = temp;
		this.bindNavEvent();
	},

	bindNavEvent : function(){
		utils.on('.nav','click','.nav-list',function(e){
			var link = this.getAttribute('data-link');
			window.location.href = link;
		});
	}

};

templete.lecturer = {
	init : function(wrapper,options){

		options.eachRowNum = options.eachRowNum || 5;
		options.rowSpace = options.rowSpace || 45;
		options.listWidth = options.listWidth || 210;
		options.listHeight = options.listHeight || 300;

		this.options = options;
		this.reset = false;
		this.getData(wrapper);
	},

	getData : function(wrapper){
		var _self = this;
		//获取讲师信息
		utils.ajax({
			"method" : "get",
			"url" : "/weixintest/Getnear5.action",
			"data" : {userName:'userName01'},
			"dataType" : "json",
			"success" : function(res){
				var results = res.resultArray,
					temp = [],
					tempObj = null;
				for( var i = 0, resultItem; resultItem = results[i++]; ){

					tempObj = {
						"id" : resultItem.intid,
						"type" : resultItem.intcolorid ,
						"photo" : resultItem.strimgurl,
						"imgLink" : "javascript:;",
						"name" : resultItem.strname,
						"job" : resultItem.strmesssage,
						"title" : resultItem.stractivename,
						"titleLink" : "javascript:;"
					};

					temp.push(tempObj);
				}
				lecturers = temp;
				_self.createLecture(wrapper);
			}
		});
	},

	createLecture : function(boxer){
		var wrapper = utils.getElement(boxer),
			temp = "",
			options = this.options,
			row = utils.crtElement('div',{
				"class" : "row lecturer-row"
			});

		for( var i = 0, lecturer; lecturer = lecturers[i++]; ){

			if( options && options["len"] && i > options["len"]){
				break;
			}

			var list = utils.crtElement("div",{
				"class" : "lecturer-list",
				"data-id" : lecturer["id"],
				"data-type" : lecturer["type"]
			}), photoBox = utils.crtElement("div",{
				"class" : "lecturer-img"
			}), photo = utils.crtElement('img',{
				"src" : lecturer["photo"]
			}), introBox = utils.crtElement('div',{
				"class" : "lecturer-intro",
				"data-type" : lecturer["type"]
			}), lecName = utils.crtElement('div',{
				"class" : "lecturer-text lecturer-name"
			}), lecJob = utils.crtElement('div',{
				"class" : "lecturer-text lecturer-job"
			}), lecTitle = utils.crtElement('div',{
				"class" : "lecturer-text lecturer-speech-title"
			}), ia = utils.crtElement("a",{
				"href" : lecturer["imgLink"],
				"target" : "_blank"
			}), ta = utils.crtElement("a",{
				"href" : lecturer["titleLink"],
				"target" : "_blank"
			});

			lecTitle.innerHTML = lecturer["title"];
			lecJob.innerHTML = lecturer["job"];
			lecName.innerHTML = lecturer["name"];

			ia.appendChild(photo);
			photoBox.appendChild(ia);
			introBox.appendChild(lecName);
			introBox.appendChild(lecJob);
			ta.appendChild(lecTitle);
			introBox.appendChild(ta);

			list.appendChild(photoBox);
			list.appendChild(introBox);

			row.appendChild(list);
		}

		temp += row.outerHTML;

		wrapper.innerHTML = temp;

		this.resetStyle(wrapper);
	},

	resetStyle : function(wrapper){
		var options = this.options,
			space = ((wrapper.offsetWidth - options.eachRowNum * options.listWidth) / (options.eachRowNum - 1) ) << 0,
			lists = wrapper.querySelectorAll('.lecturer-list:not(.hide)'),
			nowRow = 0;

		for( var i = 0, list; list = lists[i++]; ){

			//给每个项设置位置
			nowRow = ((i - 1) / options.eachRowNum) << 0;

			var top = ( options.rowSpace + options.listHeight ) * nowRow,
				left = ( space + options.listWidth ) * ((i - 1) % 5);

			utils.css3Transform(list,"translate","("+left+"px,"+top+"px)");
			list.style.width = options.listWidth + "px";
			list.style.height = options.listHeight + "px";
		}

		wrapper.querySelector('.lecturer-row').style.height = (nowRow * ( options.rowSpace + options.listHeight )) + options.listHeight + "px";

		if(!this.reset)
		this.addTransition(lists);
	},

	addTransition : function(lists){
		setTimeout(function(){
			utils.addClass(lists,"lecturer-transition");
		},10);
		this.reset = true;
	}

};

templete.category = {
	init : function(wrapper,options){
		this.getData(wrapper,options);
	},

	getData : function(wrapper,options){
		this.createCategory(wrapper,options);
	},

	createCategory : function(boxer,options){
		var wrapper = utils.getElement(boxer),
			temp = "";

		for( var i = 0, category; category = categories[i++]; ){

			var list = utils.crtElement("span",{
				"class" : "filter-list",
				"data-type" : category["type"]
			});

			if( i == 1 ){
				utils.addClass(list,"fl-choose");
			}

			list.innerHTML = category["text"];

			temp += list.outerHTML;

		}

		wrapper.innerHTML = temp;
		this.bindCategoryEvent(wrapper,options);
	},

	bindCategoryEvent : function(wrapper,options){
		var _self = this;

		utils.on(wrapper,"click",".filter-list",function(e){
			var type = this.getAttribute("data-type"),
				fChoose = wrapper.querySelector(".fl-choose"),
				lists = utils.getElements(options["categoryTargetElement"]);

			utils.removeClass(lists,"hide");
			utils.removeAttr(lists,"style");
			utils.removeClass(fChoose,"fl-choose");
			utils.addClass(this,"fl-choose");

			if(type == "all"){
				_self.resetStyle(options["categoryTargetElement"]);
				return false;
			}

			for( var i = 0, l = lists.length; i < l; i++ ){
				var ty = lists[i].getAttribute('data-type');

				if( ty != type ){
					utils.addClass(lists[i],"hide");
				}

			}

			_self.resetStyle(options["categoryTargetElement"]);

		});
	},

	resetStyle : function(selector){

		var ele = utils.getElement(selector+":not(.hide)"),
			wrapper = utils.getTargetNode(ele,".column-content");

		if(selector == ".lecturer-list"){
			templete.lecturer.resetStyle(wrapper);
		}

	}

};

/**************function**************/

templete.loadTemplete = function(options){
	for( var i = 0, tpl; tpl = options[i++]; ){
		if(!tpl.part || !templete[tpl.part]){
			return false;
		}

		var boxer = tpl.wrapper ? tpl.wrapper : "body";

		templete[tpl.part].init.call( this[tpl.part], boxer, tpl["data"] );

	}
};
/*****************end******************/
//获取有没有登陆
if(!utils.getUrlObj("type"))
utils.ajax({
	"method" : "post",
	"url" : "/Enrollbefore.action",
	"data" : {intid:0},
	"dataType" : "json",
	"async" : false,
	"success" : function(res){
		res = JSON.parse(res);
		if(res.strflg != "1" ){
			navLists[4].text = "个人中心";
			navLists[4].href = pathUrl+"pages/usercenter/userCenter.html";
		}
		else
		{
			var reg = new RegExp("usercenter","g"),
				isUserCenter = reg.test(window.location.href);
			if(isUserCenter)
			window.location.href = pathUrl + "login/index.html?source=register";
		}
	}
});
uxwe.templete = templete;

})(uxwe);