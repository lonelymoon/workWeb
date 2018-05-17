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

var img = new Image();

function showImage(url){

	img.onload = function(){
		$(".wrapper").attr("data-id","2");
		$(".img-show").html(img);
	};

	img.src = url;
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
	cv.height = 1334;

	var box = $("#box")[0],
		logo = $("#logo")[0],
		bg = $("#bg")[0];

	var iw = img.naturalWidth,
		ih = img.naturalHeight;

	var trueHeight = ( ih * 750 / iw >= 1334 ) ? ( ih * 750 / iw ) : 1334;

	cv.height = trueHeight;

	//背景
	var bgw = bg.naturalWidth,
		bgh = bg.naturalHeight;

	cxt.drawImage(bg,0,0,bgw,bgh,0,(trueHeight - 1334) / 2,cv.width,bgh * 750 / bgw);

	//人物
	var py =  ( trueHeight - ( ih * 750 / iw ) ) / 2;

	cxt.drawImage(img,0,0,iw,ih, 0, py, 750, ih * 750 / iw );

	//框
	var bw = box.naturalWidth,
		bh = box.naturalHeight;

	cxt.drawImage(box,0,0,bw,bh,0,(trueHeight - 1334) / 2,cv.width,bh * 750 / bw);

	//logo
	var lw = logo.naturalWidth,
		lh = logo.naturalHeight;

	cxt.drawImage(logo,0,0,lw,lh,0,(trueHeight - 1334) / 2,cv.width,lh * 750 / lw);

	$("#result-img").attr("src",cv.toDataURL());
}

});