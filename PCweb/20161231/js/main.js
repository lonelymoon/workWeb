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

				if(evElWrap == ".row"){
					$('.iChoose2').find('img').toggleClass('hide');
					$('.intro-list-2').removeClass('iChoose2');
					$tar.addClass('iChoose2');
					$tar.find('img').toggleClass('hide');
				}

				if(evElWrap == ".intro-nav"){
					$('.iChoose').find('img').toggleClass('hide');
					$('.intro-list-1').removeClass('iChoose');
					$tar.addClass('iChoose');
					$tar.find('img').toggleClass('hide');

					$('.row').eq($tar.attr('data-id')-1).find('.intro-list-2').eq(0).trigger('click');

				}

			}
			
		});
	};

};

var ig = new ctxAct();

ig.change('.row',['.intro-content-box'],'div',['.intro-item'],'','',true);

var ig2 = new ctxAct();

ig2.change('.intro-nav',['.s-intro-content'],'div',['.row'],'','',true);

});