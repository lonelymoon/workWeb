var sc1 = new Swiper('.sc-1',{
	speed : 800,
	autoplay : 5000,
	loop : true,
	pagination : '.pg1',
	paginationClickable :true
}),sc2 = new Swiper('.sc-2',{
	speed : 800,
	autoplay : 5000,
	loop : true,
	pagination : '.pg2',
	paginationClickable :true
}),sc3 = new Swiper('.sc-3',{
	speed : 800,
	autoplay : 5000,
	loop : true,
	pagination : '.pg3',
	paginationClickable :true
}),sc4 = new Swiper('.sc-4',{
	speed : 500,
	slidesPerView : 4,
	loop : true
}),sch = new Swiper('.sc-h',{
	speed : 800,
	autoplay : 3000,
	loop : true,
	pagination : '.pgh',
	paginationClickable :true
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
				if(evElWrap == ".g-view-nav"){
					$('.vChoose').find('img').toggleClass('hide');
					$(".g-view-list").removeClass("vChoose");
					$tar.addClass("vChoose");
					$tar.find('img').toggleClass('hide');
					var id = $tar.attr("data-id") * 1;
					if(id<4){
						console.log(window["sc"+id]);
						window["sc"+id].reInit();
						window["sc"+id].stopAutoplay();
						window["sc"+id].startAutoplay();
					}	
				}

				if(evElWrap == ".g-products-nav"){
					$('.pChoose').find('img').toggleClass('hide');
					$('.g-products-list').removeClass('pChoose');
					$tar.addClass('pChoose');
					$tar.find('img').toggleClass('hide');
				}

			}
			
		});
	};

};

var vg = new ctxAct();
vg.change('.g-view-nav',['.g-view-content'],'div',['.g-view-item'],'','',true);

var pg = new ctxAct();
pg.change('.g-products-nav',['.g-products-content'],'div',['.g-products-row'],'','',true);

$('.his-left-arrow').on('click',function(e){
	sc4.swipePrev(); 
});

$('.his-right-arrow').on('click',function(e){
	sc4.swipeNext(); 
});

$('.g-products-item').hover(function(e){
	$(this).find('img').toggleClass('hide');
	$(this).find('.p-price-box').show();
},function(e){
	$(this).find('img').toggleClass('hide');
	$(this).find('.p-price-box').hide();
});

function copy(){
	var val = $('.swiper-slide-active').find('.his-price-box').find('span').html();
	if(val){
		$('.swiper-slide-duplicate').find('.his-price-box').html("￥<span>"+val+"</span> 起");
		return;
	}
	setTimeout(copy,1000);
}

setTimeout(copy,1000);

var imgH = $('.sc-h').find('img').eq(0).height();

$('.sc-h').find('.swiper-slide').height(imgH+"px");
$('.sc-h').find('.swiper-wrapper').height(imgH+"px");
});