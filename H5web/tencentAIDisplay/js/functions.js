(function(window,undefined){

var fn = {};

/********************逐字显示********************/
function showfont(arr,i,timespace,callback){

	setTimeout(function(){
		if(!arr[i]){
			callback({
				value : "",
				status : "finished"
			});
			return false;
		}

		callback({
			value : arr[i],
			status : "continue"
		});
		i++;
		showfont(arr,i,timespace,callback);
	},timespace);

}

fn.showfonts = function(str,timespace,callback){
	
	if(!str || str == "") return false;

	callback = callback || function(){};

	var strArr = str.split("");

	showfont(strArr,0,timespace,callback);

}
/********************逐字显示END********************/

/*********************滚动背景**************************/
function loopDrawImg(tcxt,scv,w,h,i){
	tcxt.clearRect(0,0,w,h);
	tcxt.save();
	tcxt.drawImage(scv,0,0,w,h-i,0,i,w,h-i);
	tcxt.drawImage(scv,0,h-i,w,i,0,0,w,i);
	tcxt.restore();

	requestAnimationFrame(function(){
		i >= h ? i = 0 : i++;
		loopDrawImg(tcxt,scv,w,h,i);
	});
}


function drawFrameImg(targetCV,sourseCV,img){
	var scxt = sourseCV.getContext("2d"),
		tcxt = targetCV.getContext("2d"),
		w = sourseCV.width,
		h = sourseCV.height;

	scxt.drawImage(img,0,0,w,h);

	requestAnimationFrame(function(){
		loopDrawImg(tcxt,sourseCV,w,h,0);
	});

}

fn.createFrameImg = function(canvas,imgUrl){
	var newCanvas = document.createElement("canvas"),
		img = document.createElement("img");

	if(!imgUrl || !canvas) return false;

	img.onload = function(){
		var w = img.naturalWidth,
			h = img.naturalHeight;

		newCanvas.width = w;
		newCanvas.height = h;
		canvas.width = w;
		canvas.height = h;

		drawFrameImg(canvas,newCanvas,img);

	};

	img.src = imgUrl;

};

/*********************滚动背景End**************************/

window.utils = fn;

})(window);