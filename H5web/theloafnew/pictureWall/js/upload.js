var xhr = new XMLHttpRequest(),
	formData = new FormData(),
	ev = "ontouchstart" in document? "touchend" : "click",
	temp = {},
	imgIsExit = false,
	uploading = false;

var intro = document.querySelector(".introduce"),
	upl = document.querySelector(".upload-box"),
	file = document.getElementById("file"),
	select = document.querySelector(".selectImg"),
	img = document.querySelector(".img-show"),
	commentBox = document.querySelector(".comment-add"),
	header = document.querySelector("header"),
	exit = document.querySelector(".exit"),
	comfirm = document.querySelector(".comfirm"),
	comments = document.getElementById("comment-text");


file.addEventListener("change",function(e){
	var reader = new FileReader(),
		nImg = document.createElement("img");

	reader.onload = function(e){
		var e = e || event,
			tar = e.srcElement ? e.srcElement : e.target;

		nImg.src = tar.result;

		setTimeout(function(){
			img.src = nImg.src;
		},50);
		
		select.style.display = "none";
		img.style.display = "block";
		header.innerHTML = "选择这张图片上传";

		imgIsExit = true;
		temp.file = file.files[0];
	};

	reader.readAsDataURL(file.files[0]);
},false);


intro.addEventListener(ev,function(e){
	if(!imgIsExit){
	   alert("请先选择图片");
	   return;
	}
	

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

	if(!bt.getAttribute("style") || bt.getAttribute("style")=="color: rgb(255, 255, 255);"){
		intro.querySelector('.text-bt').style.color = "rgba(245,167,14,1)";
	}else{
		intro.querySelector('.text-bt').style.color = "#ffffff";
	}

	commentBox.style.display = "block";
},false);

exit.addEventListener(ev,function(e){
	commentBox.style.display = "none";
	intro.querySelector('.text-bt').innerHTML = "已添加";
},false);

comfirm.addEventListener(ev,function(e){
	temp.text = comments.value;
	commentBox.style.display = "none";
	intro.querySelector('.text-bt').innerHTML = "已添加";
},false)

img.addEventListener(ev,function(e){
	select.click();
},false);

upl.addEventListener(ev,function(e){
	if(!temp.file || uploading){
	   alert("未选择图片");
	   return;
	}
	
	if(!temp.text)
	temp.text = "我们向你推荐ZE speed运动课程";

	var upload = document.querySelector(".upload");
	upload.style.opacity = 0.8;
	upload.innerHTML = "上传中...";
	uploading = true;

	formData.append("file",temp.file);
	formData.append("text",encodeURI(temp.text));
	formData.append("openid",linkObj.openid);

	xhr.open("post","http://theloaf.aochey.com/theloafnew/upload");
	xhr.addEventListener("load",function(e){
		uploading = false;
		var res1 = xhr.responseText;
		window.location.href = "detail.html?"+res1;
	});

	xhr.send(formData);

},false);