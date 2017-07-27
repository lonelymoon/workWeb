jQuery(function($){

$('.picture-wrapper').on("click",".picture-item",function(e){
	
	var $img = $(this).find("img"),
		idx = $img.attr("data-idx"),
		src = $img.attr("src");

	if(!idx) return false;

	wantImgWall.setValues({
		url:src,
		idx:idx,
		callback : function(e){
			wantImgWall.showWall();
		}
	});

});

/*var wrapper = $('.picture-wrapper')[0];
	imgs = wrapper.getElementsByTagName("img");

for( var i = 0,img; img= imgs[i++]; ){
	img.onclick = function(e){
		e = e || event;
		var target = e.target || e.srcElement,
			idx = target.getAttribute("data-idx"),
			src = target.src;

		if(!idx) return false;

		wantImgWall.setValues({
			url:src,
			idx:idx,
			callback : function(e){
				wantImgWall.showWall();
			}
		});
	}
}*/

});