var cnt = document.querySelector(".content"),
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

cnt.addEventListener(ev,function(e){
	if(!canclick)
	return;
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
		
},false);


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


addToReg(new RegExp(/^like$/),like);
addToReg(new RegExp("pic-items"),turnTo);
