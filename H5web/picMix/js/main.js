jQuery(function($){

var file = $("#file")[0];

var fd = new FileReader();

fd.onload = function(e){
	var target = e.target || e.currentTarget;
	showImage(target.result);
};

fd.onerror = function(e){
	alert("文件读取错误");
};

file.onchange = function(e){
	lrz(file.files[0],{

	}).then(function(result){
		showImage(result.base64)
    });
};

function showImage(url){

	addImg(url,function(){
		$(".wrapper").attr("data-id","2");
	});
}

$(".next").on("click",function(){
	$(".wrapper").attr("data-id","3");
	mixImg();
});

$(".prev").on("click",function(){
	$(".wrapper").attr("data-id","1");
});

function mixImg(){
	var cv = document.createElement("canvas"),
		cxt = cv.getContext("2d");

	cv.width = 750;
	cv.height = 1150;

	var box = $("#box")[0],
		logo = $("#logo")[0],
		bg = $("#bg")[0];
	

	clip(function(img){
		var iw = img.naturalWidth,
			ih = img.naturalHeight;

		//背景
		var bgw = bg.naturalWidth,
			bgh = bg.naturalHeight;

		cxt.drawImage(bg,0,0,bgw,bgh,0,0,cv.width,1334);

		//人物

		cxt.drawImage(img,0,0,iw,ih, ( 750 - iw ) / 2, 237.1, iw, ih );

		//框
		var bw = box.naturalWidth,
			bh = box.naturalHeight;

		cxt.drawImage(box,0,0,bw,bh,0,0,cv.width,1334);

		$("#result-img").attr("src",cv.toDataURL());
	});
}

});