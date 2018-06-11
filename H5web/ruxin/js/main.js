jQuery(function($){

var $lists = $('.lists');

$(".list-button").on("click",function(e){
	e.preventDefault();
	e.stopPropagation();

	var i = $(this).attr("data-id"),
		create = $(this).attr("data-create");

	if(create){

		if( !file.files[0] || !file2.files[0] ){
			return false;
		}

		clip(function(img){
			clip2(function(img2){
				mixImg(img,img2);
				slide(i);
			});
		});

		return false;
	}

	slide(i);

});

$(".btn-hide").on("click",function(e){
	$(".notice").hide();
});

function mixImg(img,img2){

	var bg = $("#bg")[0],
		icon1 = $("#icon1")[0],
		icon2 = $("#icon2")[0];

	var sc = 0.875;

	var nc = document.createElement("canvas"),
		ncxt = nc.getContext("2d");

	nc.width = img.naturalWidth;
	nc.height = img.naturalHeight * 2;

	ncxt.drawImage(img,0,0,nc.width,nc.height / 2);
	ncxt.drawImage(img2,0,nc.height/2,nc.width,nc.height / 2);

	ncxt.drawImage(icon1,24,24,icon1.naturalWidth,icon1.naturalHeight);
	ncxt.drawImage(icon2,390,210 + nc.height/2, icon2.naturalWidth, icon2.naturalHeight );

	var r = 10;

	ncxt.save();
	ncxt.globalCompositeOperation = "destination-in";
	ncxt.fillStyle = "#6cf";
	ncxt.moveTo(r,0);
	ncxt.lineTo(nc.width-r,0);
	ncxt.arc( nc.width-r, r , r, Math.PI * 270 / 180, 0 , false );
	ncxt.lineTo( nc.width, nc.height-r );
	ncxt.arc( nc.width-r, nc.height-r , r, 0, Math.PI * 90 / 180 , false );
	ncxt.lineTo( r, nc.height );
	ncxt.arc( r, nc.height-r , r, Math.PI * 90 / 180 , Math.PI, false );
	ncxt.lineTo( 0, r );
	ncxt.arc( r, r , r, Math.PI , Math.PI * 270 / 180, false );
	ncxt.fill();
	ncxt.restore();

	var rnc = document.createElement("canvas"),
		rncxt = rnc.getContext("2d");

	rnc.width = bg.naturalWidth;
	rnc.height = bg.naturalHeight;

	rncxt.drawImage(bg,0,0);
	rncxt.drawImage(nc,56,182,nc.width * sc,nc.height * sc);

	$("#img-res").attr('src',rnc.toDataURL());
}

function slide(i){
	$lists.css({
		"-webkit-transform" : "translateX(-"+(25*i)+"%) translateZ(1px)",
		"transform" : "translateX(-"+(25*i)+"%) translateZ(1px)"
	});
}

var file = $("#file")[0];

file.onchange = function(e){
	lrz(file.files[0],{

	}).then(function(result){
		addImg(result.base64,function(){
			$(".float-icon").show();
		});
    });
};

var file2 = $("#file2")[0];

file2.onchange = function(e){
	lrz(file2.files[0],{

	}).then(function(result){
		addImg2(result.base64,function(){
			$(".float-icon2").show();
		});
    });
};

});