jQuery(function($){

var	sc1 = new IScroll('.nav', {
    mouseWheel: true,
    click : true
}), OutPut = {};

$('.nav').on('click','.nlist',function(e){
	var $link = $(this).attr("data-link");
	if($link){
		window.location.href = $link + ".html";
	}
});

$('.continue-btn').on('click',function(e){
	var $link = $(this).attr("data-link");
	if($link){
		window.location.href = $link + ".html";
	}
});

$('.layer-close').on('click',function(e){
	$('.layer').fadeOut(200);
});

$('.doShow').on('click','.selectorVal',function(e){
	$('.doShow').find('.selectorLists').slideToggle(200);
});

OutPut.registerFileReader = function(){
	$('input[type="file"]').off('change').on('change',function(e){

		var reader = new FileReader(),
			$this = $(this),
			$id = $this.attr("id"),
			file = $this[0].files[0];

		reader.onprogress = function(e){
			$('label[for="'+$id+'"]').find(".label-btn").addClass("hide");
			$('label[for="'+$id+'"]').find(".img-set").removeClass("hide");
		};

		reader.onload = function(e){
			$('label[for="'+$id+'"]').find('.preview-img').attr("data-status","loaded").attr("src",reader.result);
		};

		reader.readAsDataURL(file);

	});
};

OutPut.checkLocalStorage = function(){
	try {
        localStorage.setItem("testKey", 'testValue');
        localStorage.removeItem("testKey");
        return true;
    } catch (error) {
        return false;
    }
};

OutPut.getUrlObj = function(url){
	var u = url || window.location.href,
		ulen = u.length,
		str = u.substring(u.indexOf("?")),
		reg = /([^&=?]+)=([^&=?]*)/g,
		tempObjs = {};

	str.replace(reg,function(str,$1,$2){
		var key = decodeURIComponent($1),
			value = decodeURIComponent($2);

		tempObjs[key] = value + "";
		return str;
	});

	return tempObjs;
};

OutPut.registerFileReader();

window.Output = OutPut;

});