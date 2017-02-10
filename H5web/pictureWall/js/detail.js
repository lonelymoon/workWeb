var cnt = document.querySelector(".like"),
	ev = "ontouchstart" in document ? "touchend" : "click",
	hasMoved = false,
	canclick = true;

var intro = document.querySelector(".comment-submit"),
	commentBox = document.querySelector(".comment-add"),
	exit = document.querySelector(".exit"),
	comfirm = document.querySelector(".comfirm"),
	comments = document.getElementById("comment-text"),
	share = document.querySelector(".share"),
	layer = document.querySelector(".layer");


cnt.addEventListener("touchstart",function(e){
	hasMoved = false;
},false);

cnt.addEventListener("touchmove",function(e){
	hasMoved = true;
},false);

cnt.addEventListener(ev,function(e){
	if(!canclick)
	return;
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;

		e.stopPropagation();

		tar = matchClass(tar,new RegExp(/^like$/));

		if(!hasMoved){
			like(tar);
		}
		
},false);

intro.addEventListener(ev,function(e){
	var imgs = intro.querySelectorAll("img"),
		dis = new RegExp(/(\\b)*display(\\b)*/);

	for(var i=0,j=imgs.length;i<j;i++){
		if(dis.test(imgs[i].className)){
			imgs[i].className = imgs[i].className.replace(dis,"")
		} else {
			imgs[i].className += " display ";
		}
	}

	var bt = intro.querySelector('.text-bt');

	if(!bt.getAttribute("style") || bt.getAttribute("style")=="color: rgb(255, 255, 255);")
	intro.querySelector('.text-bt').style.color = "rgba(245,167,14,1)";
	else
	intro.querySelector('.text-bt').style.color = "#ffffff";	
	commentBox.style.display = "block";
},false);

exit.addEventListener(ev,function(e){
	commentBox.style.display = "none";
},false);

comfirm.addEventListener(ev,function(e){
	commentBox.style.display = "none";
	var fd = new FormData(),
		xhr = new XMLHttpRequest();

	fd.append("openid",linkObj.openid);
	fd.append("pid",linkObj.pid);
	fd.append("text",comments.value);

	xhr.open("post","");

	xhr.load = function(data){

	};

	xhr.send(fd);
},false)


share.addEventListener(ev,function(e){
	layer.style.display = "block";
},false);

layer.addEventListener(ev,function(e){
	layer.style.display = "none";
},false);

function matchClass(tar,reg){
	while(tar)
	if(!reg.test(tar.className)){
		tar = tar.parentNode;
	} else {
		return tar;
	}
}

function like(tar){
	var imgs = tar.querySelectorAll("img"),
		dis = new RegExp(/(\\b)*display(\\b)*/);

	canclick = false;


	for(var i=0,j = imgs.length;i<j;i++){
		if(dis.test(imgs[i].className)){
			imgs[i].className = imgs[i].className.replace(dis,"")
		} else{
			imgs[i].className += " display ";
		}
	}

	if(tar.getAttribute("data-loved")){
		tar.querySelector(".likeNum").innerHTML -= 1;
		goAjax(false,tar);
	} else {
		tar.querySelector(".likeNum").innerHTML += 1;
		goAjax(true,tar);
	}
}


function goAjax(beLoved,tar){
	var fData = new FormData(),
		xhr = new XMLHttpRequest();

	xhr.open("post","");

	fData.append("openid",linkObj.openid);
	fData.append("imgId",tar.getAttribute("data-id"));
	fData.append("loved",beLoved);

	xhr.load = function(data){
		canclick = true;
		tar.setAttribute("data-loved",!tar.getAttribute("data-loved"));
	};

	xhr.send(fData);
}
