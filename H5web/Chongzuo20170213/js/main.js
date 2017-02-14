jQuery(function($){

var sc1 = new Swiper('.sc-1',{
	speed : 800,
	slidesPerView : 4
}), scs = {};

scs.sc1 = new Swiper('.sc-2',{
	speed : 600
});
scs.sc2 = new Swiper('.sc-3',{
	speed : 600
});
scs.sc3 = new Swiper('.sc-4',{
	speed : 600
});

$('.l-arrow').on('click',function(e){
	var idx = sc1.activeIndex,
		to = Math.max(0,idx - 4);
	sc1.slideTo(to); 
});

$('.r-arrow').on('click',function(e){
	var idx = sc1.activeIndex,
		to = Math.min(10,idx + 4);
	sc1.slideTo(to); 
});

$('.ll-arrow').on('click',function(e){
	var $id = $('.pChoose').attr("data-id");
	scs["sc"+$id].slidePrev();
});

$('.rr-arrow').on('click',function(e){
	var $id = $('.pChoose').attr("data-id");
	scs["sc"+$id].slideNext();
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
				if(evElWrap == ".views-nav-1"){
					$('.vChoose').find('img').toggleClass('hide');
					$('.view-n1-list').removeClass('vChoose');
					$tar.addClass('vChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".views-nav-2"){
					$('.vvChoose').find('img').toggleClass('hide');
					$('.view-n2-list').removeClass('vvChoose');
					$tar.addClass('vvChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".border-nav .swiper-wrapper"){
					$('.bChoose').find('img').toggleClass('hide');
					$('.border-list').removeClass('bChoose');
					$tar.addClass('bChoose');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".products-nav"){
					$('.pChoose').find('img').toggleClass('hide');
					$('.products-list').removeClass('pChoose');
					$tar.addClass('pChoose');
					$tar.find('img').toggleClass('hide');
				}
			}
			
		});
	};

};

var vg = new ctxAct();
vg.change('.views-nav-1',['.views-nav-2'],'div',['.views-n2-item'],'','',true);

var vvg = new ctxAct();
vvg.change('.views-nav-2',['.views-content'],'div',['.views-item'],'','',true);

var bg = new ctxAct();
bg.change('.border-nav .swiper-wrapper',['.border-content'],'div',['.border-item'],'','',true);

var pg = new ctxAct();
pg.change('.products-nav',['.products-content'],'div',['.products-column'],'','',true);


});