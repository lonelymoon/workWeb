jQuery(function($){

var sc = new Swiper('.sc-1',{
	speed : 600,
	loop : true,
	autoplay : 4000,
	autoplayDisableOnInteraction : false,
	calculateHeight : true
}), cs = {};

cs.sc1 = new Swiper('.csc-1',{
	speed : 600,
	slidesPerView : 3,
	calculateHeight : true
});
cs.sc2 = new Swiper('.csc-2',{
	speed : 600,
	slidesPerView : 3,
	calculateHeight : true
});
cs.sc3 = new Swiper('.csc-3',{
	speed : 600,
	slidesPerView : 3,
	calculateHeight : true
});
cs.sc4 = new Swiper('.csc-4',{
	speed : 600,
	slidesPerView : 3,
	calculateHeight : true
});

$('.prev-arrow').on('click',function(e){
	sc.swipePrev();
});

$('.next-arrow').on('click',function(e){
	sc.swipeNext();
});


$('.pro-body').on('click','.column-prev-arrow',function(e){
	var $id = $(this).attr("data-idx");
	cs["sc"+$id].reInit();
	cs["sc"+$id].swipePrev();
});

$('.pro-body').on('click','.column-next-arrow',function(e){
	var $id = $(this).attr("data-idx");
	cs["sc"+$id].reInit();
	cs["sc"+$id].swipeNext();
});

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
				$(actionElWrap[i]).find(actionEl[i]+'[data-id='+$id+']').fadeIn(300);	
			}
			
			if(replaceBgImg && replaceBgImg!="")
			{
				$(evElWrap).find(evEl).removeAttr('style')
				$(evElWrap).find(evEl+'[data-id='+$id+']').css('background-image','url('+replaceBgImg+')');	
			}


			//extend
			if(extre){
				//user defined
				if(evElWrap == ".pro-nav"){
					$('.pChoose').find('img').toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("pChoose");
					$tar.addClass("pChoose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".op-nav"){
					$('.opChoose').find('img').toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("opChoose");
					$tar.addClass("opChoose").find("img").toggleClass("hide");
				}

			}
			
		});
	};

};

var pg = new ctxAct();
pg.change('.pro-nav',['.pro-body'],'div',['.column-item'],'','',true);

var opg = new ctxAct();
opg.change('.op-nav',['.op-content'],'div',['.op-item'],'','',true);

});