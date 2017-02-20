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
				if(evElWrap == ".exam-title"){
					$('.title-btn').removeClass("bChoose");
					$tar.addClass("bChoose");
				}
			}
			
		});
	};

};

var bg = new ctxAct();
bg.change('.exam-title',['.exam-content'],'div',['.ex-box'],'','',true);

$('.list').on('click',function(e){
	e.preventDefault();
	var m = $(this).attr("href"),
		oTop = $(m).offset().top;

	$('.nav').find('li').removeClass('lChoose');
	$(this).parent('li').addClass('lChoose');
	$.scrollTo(oTop-45,1400);

});

var $effects = $('div[data-effect]'),
	len = $effects.length,
	wHeight = document.documentElement.clientHeight;


$(document).scroll(function(){
	for( var i = 0 ; i < len; i++ ){
		var $ele = $effects.eq(i),
			eTop = $ele[0].getBoundingClientRect().top;

		if(eTop <= wHeight - 20){
			$ele.addClass('ele-active');
		}

	}
});

$('.exam-list').on('click',function(e){
	var $id = $(this).attr('data-id');
	$('.layer').removeClass('hide');
	$('.ex[data-id="'+$id+'"]').addClass('ex-show');
});

$('.close').on('click',function(e){
	$('.layer').addClass('hide');
	$('.ex').removeClass('ex-show');
});

});