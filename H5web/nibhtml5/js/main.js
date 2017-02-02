
jQuery(function($){

var $w = $(window).width();

$w = $w>=750?750:$w;

$('header').height(365 * $w / 750 + "px");
$('#travel').height(1686 * $w / 750 + "px");
$('#view-point').height(2346 * $w / 750 + "px");
$('#food').height(1595 * $w / 750 + "px");


$('.nav').css('padding-top',60 * $w / 750 + 'px');

$('.nav').find('img').css({
	'max-width': 138 * $w / 750 + 'px'
});

$('.nav').find('img').eq(0).css('margin-left', 89 * $w / 750 + 'px');
$('.nav').find('img').eq(1).css({
	'margin-left': 78 * $w / 750 + 'px',
	'margin-right': 78 * $w / 750 + 'px'
});


$('#travel-box').css('padding-top',110 * $w / 750 + 'px');
$('#travel-box').find('li').css('width',250 * $w / 750 + 'px');

$('.travel-content').css('padding-top',14 * $w / 750 + 'px');
$('.travel-list').css('margin-left',10 * $w / 750 + 'px');
$('.travel-list').find('img').css('max-width',360 * $w / 750 + 'px');
$('.more').css({
	'top': 110 * $w / 750 + 'px',
	'right': 10 * $w / 750 + 'px'
});

$('.more').find('img').css({
	'max-width': 118 * $w / 750 + 'px'
});

//
$('.slide').hide().eq(0).show();
var $i = 1;

function slide(){
	$('.slider'+$i).fadeOut(800);
	$i = $i>=4? 1 :$i+1;
	$('.slider'+$i).fadeIn(600);

	setTimeout(slide,4000);
}

slide();

//


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
				if(evElWrap==".travel-nav"){
					if($('.choose').attr('data-id')!=$id){
						$(evElWrap).find(evEl).removeClass('choose');
						$tar.addClass('choose');
					}
				}
			}
			
		});
	};
};

var ng = new ctxAct();

ng.change('.travel-nav',['#travel-box'],'li',['.travel-content'],'','',true);

});


