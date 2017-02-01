setTimeout(function(){
	var swiper = new Swiper('.swiper-container', {
	    speed: 800,
	    loop : true,
	    autoplay: 4000,
	    pagination : '.pagination',
	    paginationClickable :true,
	    autoplayDisableOnInteraction: false
	});

	$('.swiper-slide').css('height',"475px");
	$('.swiper-wrapper').css('height',"475px");
},100);

jQuery(function($){

var i = 0,
	l = $('.slider').length;

$('.slider').hide().eq(i).show();

function slider(){
	i = i >= l - 1? 0 : i + 1;
	$('.slider').fadeOut(500).eq(i).fadeIn(1000);
	setTimeout(slider,5000);
};

setTimeout(slider,5000);

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
				if(evElWrap==".products-nav"){
					if($('.choose').attr('data-id')!=$id){
						$(evElWrap).find(evEl).removeClass('choose');
						$tar.addClass('choose');
					}
				}

			}
			
		});
	};

};

var sg = new ctxAct();

sg.change(".products-nav",[".products"],"div",[".products-list"],"","",true);

});