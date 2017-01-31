jQuery(function($){
	var $ev = "touchstart" in document? "touchstart" : "click";
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
					if(evElWrap==".nb-product-nav"){
						if($('.choose').attr('data-id')!=$id){
							$('.choose').find('img').toggleClass('hidden');
							$(evElWrap).find(evEl).removeClass('choose');
							$tar.addClass('choose');
							$tar.find('img').toggleClass('hidden');
						}
					}

					if(evElWrap==".nb-food-nav"){
						if($('.fChoose').attr('data-id')!=$id){
							$('.fChoose').find('img').toggleClass('hidden');
							$(evElWrap).find(evEl).removeClass('fChoose');
							$tar.addClass('fChoose');
							$tar.find('img').toggleClass('hidden');
						}
					}
				}
				
			});
		};
	};

$('.nb-food-nav').find('li').on('mouseover',function(e){
	$(this).find('img').toggleClass('hidden');
}).on('mouseout',function(e){
	$(this).find('img').toggleClass('hidden');
});

var ncg = new ctxAct();

ncg.change('.nb-product-nav',['.nb-product-box'],'li',['.nb-product-content'],'','',true);

$(".nb-product-nav").find("li").eq(0).trigger($ev);

var nfcg = new ctxAct();

nfcg.change('.nb-food-nav',['.nb-food-content'],'li',['img'],'','',true);

});