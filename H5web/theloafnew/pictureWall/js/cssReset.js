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
var windowHeight = window.innerHeight || document.body.clientHeight,
	windowWidth = window.innerWidth || document.body.clientWidth;

//page内容实际的宽度
var trueWidth = windowWidth >= 750? 750 : windowWidth;


var hasHomepage = document.querySelector(".homepage"),
	hasPicWall = document.querySelector(".picWall"),
	hasDetailPage = document.querySelector(".detailPage"),
	hasUploadPage = document.querySelector(".uploadPage"),
	hasPrintPage = document.querySelector(".printPage");

//首页-homepage
if(!!hasHomepage){
	var initHeight = 1203, //排版高度
		per = windowHeight / initHeight;

	document.querySelector("html,body").style.fontSize = 50 * per + "px";
	if(windowWidth<=750)
	per = 1;
	document.querySelector(".homepage").style.maxWidth = trueWidth * per + "px";

	document.querySelector("html,body").style.height = windowHeight + "px";
	if(windowHeight<=480){
		document.getElementById("content").style.backgroundPosition = "0px -48px";
		document.querySelector(".content-box").style.marginTop = "1.88rem";
	}	

	//document.querySelector(".loading").style.display = "none";
}


//picWall

if(!!hasPicWall){
	function pw(){
		document.querySelector("html,body").style.fontSize = 50 * trueWidth / 750 + "px";
		var pItems = document.querySelectorAll(".pic-items");

		for(var i=0,j=pItems.length;i<j;i++){
			pItems[i].style.maxWidth = "5rem";
		}
		
		var pItem = document.querySelector(".pic-items"),
			pRows = document.querySelectorAll(".row"),
			len = pRows.length;
			if(pItem)
		var pWidth = pItem.offsetWidth;

		for(var i = 0; i < len; i++){
			pRows[i].style.height = pWidth + "px";
		}
	}
	pw();
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
	function pw(){
		document.querySelector("html,body").style.fontSize = 50 * trueWidth / 750 + "px";
		var pItems = document.querySelectorAll(".pic-items");

		for(var i=0,j=pItems.length;i<j;i++){
			pItems[i].style.maxWidth = "5rem";
		}
		
		var pItem = document.querySelector(".pic-items"),
			pRows = document.querySelectorAll(".row"),
			len = pRows.length;
			if(pItem)
		var pWidth = pItem.offsetWidth;
			

		for(var i = 0; i < len; i++){
			pRows[i].style.height = pWidth + "px";
		}
	}
	pw();
}