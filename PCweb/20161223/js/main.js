var sc = {};
sc.sc1 = new Swiper('.sc-1',{
	speed : 600,
	autoplay : 3000,
	loop : true,
	pagination : '.pagination',
	paginationClickable :true
});
sc.sc2 = new Swiper('.sc-2',{
	slidesPerView : 4
});
sc.sc3 = new Swiper('.sc-3',{
	slidesPerView : 4
});
sc.sc4 = new Swiper('.sc-4',{
	slidesPerView : 4
});

setTimeout(function(){
	sc.sc2.reInit();
},10);

jQuery(function($){

var ctxAct = function(){
	var $ev = "ontouchstart" in document? "touchstart" : "click";

	this.change = function(evElWrap,actionElWrap,evEl,actionEl,replaceBgImg,address,extre){

		for(var i=0,len=actionElWrap.length;i<len;i++){
			$(actionElWrap[i]).find(actionEl[i]).hide().eq(0).show();
		}
		
		if(replaceBgImg && replaceBgImg!="")
		$(evElWrap).find(evEl).removeAttr('style').eq(0).css('background-image','url('+replaceBgImg+')');

		$(evElWrap).on($ev,evEl,function(e){
			e = e || event;

			if($(e.target)[0].tagName.toLowerCase()!=evEl){
				$tar = $(e.target).parent(evEl);
			} else {
				$tar = $(e.target);
			}

			var $id = $tar.attr('data-id');

			if(!$id || $id==""){
				if(address)
				window.open(address);
				return false;
			}

			for(var i=0,len=actionElWrap.length;i<len;i++){
				$(actionElWrap[i]).find(actionEl[i]).hide();
				$(actionElWrap[i]).find(actionEl[i]+'[data-id='+$id+']').fadeIn(200);	
			}
			
			if(replaceBgImg && replaceBgImg!="")
			{
				$(evElWrap).find(evEl).removeAttr('style')
				$(evElWrap).find(evEl+'[data-id='+$id+']').css('background-image','url('+replaceBgImg+')');	
			}


			//extend
			if(extre){
				//user defined
				if(evElWrap==".dri-left-point"){
					$('.choose').find('img').toggleClass("hide");
					$(evElWrap).find(".point-item").removeClass('choose');
					$tar.addClass('choose');
					$tar.find('img').toggleClass("hide");
				}

				if(evElWrap==".hot-nav"){
					$('.nav-list').removeClass("hChoose");
					$tar.addClass("hChoose");
					$(".hot-items").eq($tar.attr("data-id")-1).find(".hit").eq(0).trigger($ev);
				}

				if(evElWrap==".hot-items"){
					if($tar.hasClass("hot-item")){
						$('.hiChoose').find("img").toggleClass("hide");
						$('.hot-item').removeClass("hiChoose");
						$tar.addClass("hiChoose");
						$tar.find("img").toggleClass("hide");
					} else if($tar.hasClass("hot-item2")){
						$(".hot-item2").removeClass("hiChoose2");
						$tar.addClass("hiChoose2");
					}
				}

				if(evElWrap == ".foods-nav"){
					$('.fn-list').removeClass('fChoose');
					$tar.addClass("fChoose");
				}

				if(evElWrap == '.gifts-nav'){
					$(".gifts-list").removeClass("gChoose");
					$tar.addClass("gChoose");
				}

				if(evElWrap == ".products-nav"){
					$(".products-list").removeClass("pChoose");
					$tar.addClass("pChoose");
					sc["sc"+($tar.attr("data-id")*1+1)].reInit();
				}

			}
			
		});
	};

};

var hg = new ctxAct();
hg.change(".dri-left-point",[".dri-right-content"],"div",[".dr-item-img"],"","",true);

var hng = new ctxAct();
hng.change(".hot-nav",[".hot-item-box"],"div",[".hot-items"],"","",true);

var hng2 = new ctxAct();
hng2.change(".hot-items",[".hic-box"],"div",[".hic-item"],"","",true);

var fg = new ctxAct();
fg.change(".foods-nav",[".foods-content"],"div",[".foods-item"],"","",true);

var gg = new ctxAct();
gg.change(".gifts-nav",[".gifts-content"],"div",[".gifts-item"],"","",true);

var pg = new ctxAct();
pg.change(".products-nav",[".products-content"],"div",[".products-row"],"","",true);

$(".arrow-left").on('click',function(e){
	if($(this).hasClass("arrow1-left")){
		sc.sc2.swipePrev();
	} else if($(this).hasClass("arrow2-left")){
		sc.sc3.swipePrev();
	} else {
		sc.sc4.swipePrev();
	}
});

$(".arrow-right").on('click',function(e){
	if($(this).hasClass("arrow1-right")){
		sc.sc2.swipeNext();
	} else if($(this).hasClass("arrow2-right")){
		sc.sc3.swipeNext();
	} else {
		sc.sc4.swipeNext();
	}
});

});