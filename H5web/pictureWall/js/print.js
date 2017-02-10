var cnt = document.getElementById("content"),
	choose = document.querySelector(".choose"),
	ev = "ontouchstart" in document ? "touchend" : "click",
	hasMoved = false,
	canclick = true,
	regArr = [];


cnt.addEventListener("touchstart",function(e){
	hasMoved = false;
},false);

cnt.addEventListener("touchmove",function(e){
	hasMoved = true;
},false);

cnt.addEventListener(ev,def,false);

function def(e){
	if(!canclick){
		alert("请勿操作太快");
		return;
	}
	
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;

	e.stopPropagation();

	if(!hasMoved){
		while(tar){
			for(var i=0,j=regArr.length;i<j;i++){
				if(!regArr[i][0].test(tar.className))
				continue;
				else{
					regArr[i][1](tar);
					return;
				}
			}

			tar = getParent(tar);
		}
	}
}

function chooseMode(e){	
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;

	e.stopPropagation();

	tar = matchClass(tar,new RegExp("pic-items"));

	var gt = tar.querySelector(".getThis");
	if(!gt.style.display || gt.style.display == "none")
	gt.style.display = "block";
	else
	gt.style.display = "none";
}

function turnTo(tar){
	var dId = tar.getAttribute("data-id");
		window.location.href = "detail.html?openid="+linkObj["openid"]+"&pid="+tar.getAttribute("data-id");
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

function matchClass(tar,reg){
	while(tar)
	if(!reg.test(tar.className)){
		tar = tar.parentNode;
	} else {
		return tar;
	}
}

function getParent(tar){
	return tar.parentNode;
}

function addToReg(exp,fn){
	var temp = [];
		temp.push(exp);
		temp.push(fn);
	regArr.push(temp);
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
	};

	xhr.send(fData);
}

choose.addEventListener(ev,function(){
	var imgs = choose.querySelectorAll("img"),
		dis = new RegExp(/(\\b)*display(\\b)*/);

	for(var i=0,j=imgs.length;i<j;i++){
		if(dis.test(imgs[i].className)){
			imgs[i].className = imgs[i].className.replace(dis,"")
		} else {
			imgs[i].className += " display ";
		}
	}

	var bt = choose.querySelector('.text-bt');

	if(!bt.getAttribute("style") || bt.getAttribute("style")=="color: rgb(255, 255, 255);"){
		choose.querySelector('.text-bt').style.color = "rgba(245,167,14,1)";
		cnt.removeEventListener(ev,def,false);
		cnt.addEventListener(ev,chooseMode,false);
	}else{
		choose.querySelector('.text-bt').style.color = "#ffffff";

		var gt = document.querySelectorAll(".getThis");
		for(var i = 0, j = gt.length; i < j; i++){
			gt[i].style.display = "none";
		}
		
		cnt.removeEventListener(ev,chooseMode,false);
		cnt.addEventListener(ev,def,false);
	}
	
},false);


addToReg(new RegExp(/^like$/),like);
addToReg(new RegExp("pic-items"),turnTo);
