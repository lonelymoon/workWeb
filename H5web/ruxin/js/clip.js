(function(window){

function getMaxScale(img,nw,nh){
	var iw = img.naturalWidth,
		ih = img.naturalHeight;

	var scaleW = iw / nw,
		scaleH = ih / nh;

	return scaleW >= scaleH ? scaleW : scaleH;

}

function clear(){
	cxt.clearRect(0,0,canvas.width,canvas.height);
}

function drawImage(){
	cxt.drawImage(img,-nw/2,-nh/2,nw,nh);
}

function trans(x,y,rot,scale){
	clear();
	cxt.save();
	cxt.translate(x + cw/2,y + ch/2);
	cxt.rotate(Math.PI * rot / 180);
	cxt.scale(scale,scale);
	drawImage();
	cxt.restore();
}

function clip(callback){
	callback = callback || function(){};

	cxt.save();
	cxt.globalCompositeOperation = "destination-in";
	cxt.fillStyle = "#6cf";
	cxt.rect(0,0,cw,ch);
	cxt.fill();
	cxt.restore();

	mc.destroy();

	var newCanvas = document.createElement("canvas"),
		ncxt = newCanvas.getContext("2d");

	newCanvas.width = cw;
	newCanvas.height = ch;

	ncxt.drawImage(canvas,0,0);

	var img = document.createElement("img");

	img.onload = function(){
		callback(img);
	};

	img.src = newCanvas.toDataURL("image/png");
}

var img = document.createElement("img"),
	canvas = document.getElementById("canvas"),
	wrapper = document.querySelector(".box1"),
	cxt = canvas.getContext("2d"),
	nw,nh,
	cw = canvas.width,
	ch = canvas.height,
	scale = 1;

window.addImg = function(src,callback){
	callback = callback || function(){};
	img.onload = function(){
		var scale = getMaxScale(img,canvas.width,canvas.height);
		nw = img.naturalWidth/scale;
		nh = img.naturalHeight/scale;
		cxt.clearRect(0,0,cw,ch);
		cxt.drawImage(img,-nw/2 + cw/2,-nh/2 + ch/2,nw,nh);
		callback(img);
	};

	img.src= src;
};

window.clip = clip;

var mc = new Hammer.Manager(wrapper);

var pan = new Hammer.Pan(),
	pinch = new Hammer.Pinch(),
	rotate = new Hammer.Rotate();

pinch.recognizeWith(rotate);

mc.add([pan,pinch,rotate]);

var save = {
	x : 0,
	y : 0,
	rot : 0,
	scale : 1
}, current = {
	x : 0,
	y : 0,
	rot : 0,
	scale : 1
}, last = {
	x : 0,
	y : 0,
	rot : 0,
	scale : 1
};

mc.on("pinchstart",function(e){
	last.scale = current.scale;
});

mc.on("pinch",function(e){
	current.scale = Math.max(1, Math.min(last.scale * e.scale, 4));
	trans(last.x,last.y,last.rot,current.scale);
});

mc.on("pinchend",function(e){
	last.scale = current.scale;
});

mc.on("rotatestart",function(e){
	save.rot = e.rotation;
	last.rot = current.rot;
});

mc.on("rotate",function(e){
	var dis = save.rot - e.rotation;
	current.rot = last.rot - dis;

	trans(last.x,last.y,current.rot,current.scale);
});

mc.on("rotateend",function(e){
	last.rot = current.rot;
});

mc.on("panstart",function(e){
	save.x = e.deltaX;
	save.y = e.deltaY;
	last.x = current.x;
	last.y = current.y;
});

mc.on("pan",function(e){
	var x = save.x - e.deltaX,
		y = save.y - e.deltaY;

	current.x = last.x - x;
	current.y = last.y - y;

	trans(current.x,current.y,last.rot,current.scale);
});

mc.on("panend",function(e){
	last.x = current.x;
	last.y = current.y;
});

}(window))