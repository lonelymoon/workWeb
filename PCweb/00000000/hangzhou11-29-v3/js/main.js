;jQuery(function($){
	var max_width = 1920,
		w = $(window).width(),
		h = $(window).height();

	var lfw = $('#left-float').find('img').width(),
		lfh = $('#left-float').find('img').height(),
		rfw = $('#right-float').find('img').width(),
		rfh = $('#right-float').find('img').height();

	$('#left-float').find('img').width(lfw * w / max_width * 0.8);
	$('#left-float').find('img').height(lfh * w / max_width * 0.8);
	$('#right-float').find('img').width(rfw * w / max_width * 0.8);
	$('#right-float').find('img').height(rfh * w / max_width * 0.8);

	$('#right-float').hide();
	$('#left-float').hide();

	$(window).scroll(function(){
		var y = $(window).scrollTop();
		if(y>1360)
		{
			$('#right-float').show();
			$('#left-float').show();
		} else {
			$('#right-float').hide();
			$('#left-float').hide();
		}
	});

	var ctxAct = function(){
		var $ev = "touchstart" in document? "touchstart" : "click";

		this.change = function(evElWrap,actionElWrap,evEl,actionEl,replaceBgImg,address){

			for(var i=0,len=actionElWrap.length;i<len;i++){
				$(actionElWrap[i]).find(actionEl[i]).hide().eq(0).show();
			}
			
			$(evElWrap).find(evEl).removeAttr('style').eq(0).css('background-image','url('+replaceBgImg+')');

			$(evElWrap).on($ev,evEl,function(e){
				e = e || event;
				var $id = $(e.target).attr('data-id');

				if(!$id || $id==""){
					if(address)
					window.open(address);
					return false;
				}

				for(var i=0,len=actionElWrap.length;i<len;i++){
					$(actionElWrap[i]).find(actionEl[i]).hide();
					$(actionElWrap[i]).find(actionEl[i]+'[data-id='+$id+']').fadeIn(200);	
				}
				
				$(evElWrap).find(evEl).removeAttr('style')
				$(evElWrap).find(evEl+'[data-id='+$id+']').css('background-image','url('+replaceBgImg+')');
			});
		};

	};

	var fg = new ctxAct();

	fg.change('.culture-nav',['.content-msg','.left-img-box'],'li',['p','img'],'images/button_pink93.png','http://www.gotohz.com/pwhz_10815/');
	var pg = new ctxAct();
	pg.change('.production-nav',['.tpro-box'],'li',['div.production-list'],'images/button_pink.png');
});