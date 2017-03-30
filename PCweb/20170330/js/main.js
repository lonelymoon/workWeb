jQuery(function($){

var sw = {},
	swIdx = 1;

sw.sc_1 = new Swiper('.sc-1',{
	speed : 600,
	calculateHeight : true,
	slidesPerView : 2
});

sw.sc_2 = new Swiper('.sc-2',{
	speed : 600,
	calculateHeight : true,
	slidesPerView : 2
});

sw.sc_3 = new Swiper('.sc-3',{
	speed : 600,
	calculateHeight : true,
	slidesPerView : 2
});

sw.sc_4 = new Swiper('.sc-4',{
	speed : 600,
	calculateHeight : true,
	slidesPerView : 2
});

sw.sc_5 = new Swiper('.sc-5',{
	speed : 600,
	calculateHeight : true,
	slidesPerView : 2
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
				if(evElWrap == ".column-nav"){
					swIdx = $id;
					$('.pChoose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("pChoose");
					$tar.addClass("pChoose").find("img").toggleClass("hide");
					sw["sc_"+swIdx].reInit();
				}

				if(evElWrap == ".view-nav .view-row"){
					$('.vChoose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("vChoose");
					$tar.addClass("vChoose").find("img").toggleClass("hide");
				}
			}
			
		});
	};

};

var pg = new ctxAct();
pg.change('.column-nav',['.column-content'],'div',['.column-item'],'','',true);
var vg = new ctxAct();
vg.change('.view-nav .view-row',['.view-content'],'div',['.view-item'],'','',true);

$('.column-prev-btn').on('click',function(e){
	sw["sc_"+swIdx].swipePrev();
});

$('.column-next-btn').on('click',function(e){
	sw["sc_"+swIdx].swipeNext();
});

});