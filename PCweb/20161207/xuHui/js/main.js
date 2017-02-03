var sc1 = new Swiper('.sc-1',{
	slidesPerView : 3
}), sc2 = new Swiper('.sc-2',{
	slidesPerView : 3
}), sc3 = new Swiper('.sc-3',{
	slidesPerView : 3
}), sc4 = new Swiper('.sc-4',{
	slidesPerView : 3
}), sc5 = new Swiper('.sc-5',{
	slidesPerView : 3
});

setTimeout(function(){
	var mySwiper = new Swiper('.yz-table',{
	    scrollContainer: true,
	    mousewheelControl : true,
	    scrollbar: {
	      container: '.swiper-scrollbar',
	      hide : false
	    }
	});
},100);

jQuery(function($){

	$('.sc-1-prev-btn').on('click',function(e){
		sc1.swipePrev(); 
	});

	$('.sc-3-prev-btn').on('click',function(e){
		sc3.swipePrev(); 
	});

	$('.sc-4-prev-btn').on('click',function(e){
		sc4.swipePrev(); 
	});

	$('.sc-5-prev-btn').on('click',function(e){
		sc5.swipePrev(); 
	});

	$('.sc-1-next-btn').on('click',function(e){
		sc1.swipeNext(); 
	});

	$('.sc-3-next-btn').on('click',function(e){
		sc3.swipeNext(); 
	});

	$('.sc-4-next-btn').on('click',function(e){
		sc4.swipeNext(); 
	});

	$('.sc-5-next-btn').on('click',function(e){
		sc5.swipeNext(); 
	});

	var ctxAct = function(){
		var $ev = "touchstart" in document? "touchstart" : "click";

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
					if(evElWrap==".right-nav"){
						if($('.dChoose').attr('data-id')!=$id){
							$('.dChoose').find('img').toggleClass('hide');
							$(evElWrap).find(evEl).removeClass('dChoose');
							$tar.addClass('dChoose');
							$tar.find('img').toggleClass('hide');
							$('.right-nav').css('top','100px');
							if($id == 3){
								$('.right-nav').css('top','200px');
								setTimeout(function(){
									sc1.reInit();
									sc2.reInit();
									sc3.reInit();
									sc4.reInit();
								},100);
							}

						}
					}

				}
				
			});
		};

	};

	var xg = new ctxAct();
	xg.change('.right-nav',['.left-content'],'div',['.display-content'],'','',true);

});