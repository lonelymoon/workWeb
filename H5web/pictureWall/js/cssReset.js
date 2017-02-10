//获取openId
var url = window.location.href,
	linkObj;

linkObj = dealLink(url);

function dealLink(url){
	var url = url == null? window.location.href: url ;

	if(url.indexOf("?") < 0)
	return;

	var str = url.substr(url.indexOf("?")+1),
		allA = document.querySelectorAll("a"),
		alen = allA.length,
		obj = {},
		reg = /([^?&=]+)=([^?&=]*)/g;
	
	for(var i =0; i < alen;i++){
		var link = allA[i].getAttribute("href");
		allA[i].setAttribute("href",link+"?"+str);
	}

	str.replace(reg,function(string,$1,$2){
		var key = decodeURIComponent($1),
			val = decodeURIComponent($2);
		val = String(val);

		obj[key] = val;

		return string;
	});
	
	return obj;
}

//获取页面尺寸
var windowHeight = window.innerHeight || window.screen.height,
	windowWidth = window.innerWidth || window.screen.width;

//page内容实际的宽度
var trueWidth = windowWidth >= 750? 750 : windowWidth;


var hasHomepage = document.querySelector(".homepage"),
	hasPicWall = document.querySelector(".picWall"),
	hasDetailPage = document.querySelector(".detailPage"),
	hasUploadPage = document.querySelector(".uploadPage"),
	hasPrintPage = document.querySelector(".printPage");

//首页-homepage
if(!!hasHomepage){
	var initHeight = 1313, //排版高度
		per = windowHeight / initHeight;

	document.querySelector("html,body").style.fontSize = 50 * per + "px";
	if(windowWidth<=750)
	per = 1;
	document.querySelector(".homepage").style.maxWidth = trueWidth * per + "px";
}


//picWall

if(!!hasPicWall){
	document.querySelector("html,body").style.fontSize = 50 * trueWidth / 750 + "px";
	var pItem = document.querySelector(".pic-items"),
		pWidth = pItem.offsetWidth,
		pRows = document.querySelectorAll(".row"),
		len = pRows.length;

	for(var i = 0; i < len; i++){
		pRows[i].style.height = pWidth + "px";
	}
}

//detail
if(!!hasDetailPage){
	document.querySelector("html,body").style.fontSize = 50 * trueWidth / 750 + "px";
}

//uploadPage
if(!!hasUploadPage){
	var initHeight = 1206, //排版高度
		per = windowHeight / initHeight;

	document.querySelector("html,body").style.fontSize = 50 * per + "px";
	if(windowWidth<=750)
	per = 1;
	document.querySelector(".uploadPage").style.maxWidth = trueWidth * per + "px";
}

//printPage

if(!!hasPrintPage){
	document.querySelector("html,body").style.fontSize = 50 * trueWidth / 750 + "px";
	var pItem = document.querySelector(".pic-items"),
		pWidth = pItem.offsetWidth,
		pRows = document.querySelectorAll(".row"),
		len = pRows.length;

	for(var i = 0; i < len; i++){
		pRows[i].style.height = pWidth + "px";
	}
}