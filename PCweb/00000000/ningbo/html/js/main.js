jQuery(function($){

var w = $('#nHeader').width();
var flag = 0;
var length = $('.slider-wrapper>div').length;

$('.slider-wrapper').css('width',w*length+"px");
$('.slider-wrapper>div').css('width',w+"px");

$('.food-text').find('p').ellipsis({
	row:5
});
//***
var window_h = $(window).height();
resetH = window_h>= 892? 892 : window_h - 60;

var lay_w = $('.layer-table').width(),
	lay_h = $('.layer-table').height();

var wra_w = $('.wrapper').width(),
	wra_h = $('.wrapper').height();

$('.layer-table').css({
	'width': lay_w*resetH/lay_h+"px",
	'margin-left': -lay_w*resetH/lay_h/2+"px",
	'height': resetH+"px",
	'margin-top': -resetH/2+"px"
});

$('.wrapper').css({
	'width': wra_w*resetH/lay_h+"px",
	'height': wra_h*resetH/lay_h+"px",
	'margin-top': 222*resetH/lay_h+"px"
});

$('.close').css({
	'margin-top': 60*resetH/lay_h+"px"
});

$('.more-view').on('click',function(){
	window.open('http://www.gotoningbo.com/jqjd/nblyjd/');
});

//判断IE7，IE8
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
{ 
	$('.wrapper').css({
		'top': 222*resetH/lay_h+"px"
	});

	$('.close').css({
		'margin-top': 266*resetH/lay_h+"px"
	});
} 
else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") 
{ 

} 
$('.all-view').on('click',function(e){
	e = e || event;
	e.stopPropagation();
	$('.layer').fadeIn(200);
});

$('.close').on('click',function(e){
	$('.layer').fadeOut(200);
});
//***

function slider(){
	flag = (flag<2?flag+1:0);
	$('.slider-wrapper').animate({left:-flag*w+"px"},1000);

	setTimeout(slider,5000);
}

setTimeout(slider,3000);


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
				if(evElWrap==".nav"){
					if($('.choose').attr('data-id')!=$id){
						$('.choose').find('img').toggleClass('hidden');
						$(evElWrap).find(evEl).removeClass('choose');
						$tar.addClass('choose');
						$tar.find('img').toggleClass('hidden');
					}
				}

				if(evElWrap==".vNav"){
					$(evElWrap).find(evEl).removeClass('selected');
					$tar.addClass('selected');
				}

				if(evElWrap==".food-list-bg"){
					if($('.sChoose').attr('data-id')!=$id){
						$('.sChoose').find('img').toggleClass('hidden');
						$(evElWrap).find(evEl).removeClass('sChoose');
						$tar.addClass('sChoose');
						$tar.find('img').toggleClass('hidden');
					}
				}
			}
			
		});
	};

};

var lg = new ctxAct();

lg.change('.nav',['.travel-box'],'li',['.travel-content'],'','',true);

var vg = new ctxAct();

vg.change('.vNav',['.view-box'],'li',['.view-content'],'','',true);

var fg = new ctxAct();

fg.change('.food-list-bg',['.food-box'],'span',['.food-content-box'],'','',true);

});
