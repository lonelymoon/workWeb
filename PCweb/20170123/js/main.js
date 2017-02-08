var sc1 = new Swiper('.sc-1',{
	speed : 800,
	autoplay : 5000,
	loop : true,
	calculateHeight : true,
	autoplayDisableOnInteraction : false,
	pagination : '.pgh',
	paginationClickable :true
}), sc2 = new Swiper('.sc-2',{
	speed : 800,
	slidesPerView : 4,
	calculateHeight : true
});

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
				if(evElWrap == ".c-view-nav"){
					$('.vChoose').find('img').toggleClass('hide');
					$('.view-list').removeClass('vChoose');
					$tar.addClass('vChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".c-his-nav"){
					$('.hChoose').find('img').toggleClass('hide');
					$('.his-list').removeClass('hChoose');
					$tar.addClass('hChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".c-life-nav"){
					$('.lChoose').find('img').toggleClass('hide');
					$('.life-list').removeClass('lChoose');
					$tar.addClass('lChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".c-border-nav .swiper-wrapper"){
					$('.bChoose').find('img').toggleClass('hide');
					$('.border-list').removeClass('bChoose');
					$tar.addClass('bChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".c-products-nav"){
					$('.pChoose').find('img').toggleClass('hide');
					$('.products-list').removeClass('pChoose');
					$tar.addClass('pChoose');
					$tar.find('img').toggleClass('hide');
				}

			}
			
		});
	};

};

$('.l-arrow').on('click',function(e){
	var idx = sc2.activeIndex,
		to = Math.max(0,idx - 4);
	sc2.swipeTo(to); 
});

$('.r-arrow').on('click',function(e){
	var idx = sc2.activeIndex,
		to = Math.min(10,idx + 4);
	sc2.swipeTo(to); 
});

var vg = new ctxAct();
vg.change('.c-view-nav',['.c-view-content'],'div',['.view-item'],'','',true);
var hg = new ctxAct();
hg.change('.c-his-nav',['.c-his-content'],'div',['.his-item'],'','',true);
var lg = new ctxAct();
lg.change('.c-life-nav',['.c-life-content'],'div',['.life-item'],'','',true);
var bg = new ctxAct();
bg.change('.c-border-nav .swiper-wrapper',['.c-border-content'],'div',['.border-item'],'','',true);
var pg = new ctxAct();
pg.change('.c-products-nav',['.c-products-content'],'div',['.products-column'],'','',true);


});