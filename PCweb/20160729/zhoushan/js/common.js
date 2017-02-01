//定义全局变量
var zShan = {};

//对象信息处理
(function(zShan,window,undefiend){
	var ObjEvent = {};

	//获取链接字典信息
	ObjEvent.getUrlObj = function(url){
		url = ( typeof url === "string" && typeof url !== "undefiend" )? url : window.location.href;

		var tempObj = {},
			tempStr = url.substring(url.indexOf("?")+1),
			tempReg = /([^?&=]+)=([^?&=]*)/g;

		tempStr.replace(tempReg,function(str,$1,$2){
			var key = decodeURIComponent($1),
				value = decodeURIComponent($2);

			value = "" + value;
			tempObj[key] = value;

			return str;
		});

		return tempObj;
	};

	//判断对象是否为空
	ObjEvent.isEmptyObj = function(obj){
		var key;
		for ( key in obj )
			return false;
		return true;
	};

	zShan.ObjEvent = ObjEvent;
})(zShan,window);

//Class处理
(function(zShan,window,undefiend){
	var classEvent = {};

	//addClass
	classEvent.addClass = function(ele,name){
		ele.className += " "+name;
	};

	//removeClass
	classEvent.removeClass = function(ele,name){
		var reg = new RegExp('(\\s|^)'+name+'(\\s|$)');
	 	ele.className = ele.className.replace(reg," ");
	}

	//hasClass
	classEvent.hasClass = function(ele,name){
		var reg = new RegExp('(\\s|^)'+name+'(\\s|$)');
		return ele.className.match(reg);
	}

	//toggleClass
	classEvent.toggleClass = function(ele,name){
		if ( classEvent.hasClass(ele,name) ){
			classEvent.removeClass(ele,name);
		} else {
			classEvent.addClass(ele,name);
		}
	}

	zShan.classEvent = classEvent;
})(zShan,window);


jQuery(function($){

	//初始化页面
	var initClass = function(){
		var ObjEvent = zShan.ObjEvent,
			urlObj = ObjEvent.getUrlObj();

		if ( !ObjEvent.isEmptyObj(urlObj) ){

			if(!urlObj["language"]){
				urlObj["language"] = "cn";
				urlObj["selected"] = "zs-home";
			}

			var textLanguage = $("."+urlObj["language"]+"-text"),
				navSelected = $("."+urlObj["selected"]);
			
			textLanguage.removeClass("hide");
			if(navSelected)
			navSelected.addClass("nav-selected");

		} else {

			var textLanguage = $(".cn-text"),
				navSelected = $(".zs-home");

			urlObj["language"] = "cn";
			urlObj["selected"] = "zs-home";

			textLanguage.removeClass("hide");
			if(navSelected)
			navSelected.addClass("nav-selected");

		}

		zShan.urlObj = urlObj;

	};

	//处理a标签
	var urlHandle = function(){
		$('a').on('click',function(e){

			var e = e || event,
				href = $(this).attr("href"),
				key = $(this).attr("data-key"),
				val = $(this).attr("data-val"),
				urlObj = zShan.urlObj,
				tempString = "";

			e.preventDefault();
			e.stopPropagation();

			urlObj[key] = val;

			for ( var name in urlObj ) {
				tempString += name+"="+urlObj[name]+"&";
			}

			tempString = tempString.substring(0,tempString.length-1);

			if($(this).attr("target") != "_blank")
			window.location.href = href+"?"+tempString + "&from=http://iitczs-expo.aooche.com/H5page/product_show.html";
			else
			window.open(href+"?"+tempString,"_blank");
		});
	};

	//导航下拉
	$('.nav-slide').hover(function(){
		$(this).find('ul').removeClass("hide");
	},function(){
		$(this).find('ul').addClass("hide");
	});

	initClass();
	urlHandle();
});