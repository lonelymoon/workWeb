jQuery(function($){

//判断IE7
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
{ 
	$('.play-content').eq(0).css({
		'margin-top': '-192px',
		'+margin-top': '-192px'
	});

	$('.view-list').eq(0).css({
		'margin-top': '-219px',
		'+margin-top': '-219px'
	});
} 
else 
{ 
	$('.play-content').eq(0).css({
		'margin-top': '70px',
		'+margin-top': '-192px'
	});

	$('.view-list').eq(0).css({
		'margin-top': '40px',
		'+margin-top': '-259px'
	});
} 
//***

$('.play-content').eq(1).css({
	'margin-top': '18px',
	'+margin-top': '-262px'
});
$('.play-content').eq(2).css({
	'margin-top': '18px',
	'+margin-top': '-262px'
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

			//
			if($id==1 && evElWrap==".play-nav")
			{
				$('.play-content').eq(0).css({
					'margin-top': '70px',
					'+margin-top': '-192px'
				});
			}

			if($id==1 && evElWrap==".view-nav")
			{
				$('.view-list').eq(0).css({
					'margin-top': '40px',
					'+margin-top': '-259px'
				});
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
				if(evElWrap==".play-nav"){
					if($('.choose').attr('data-id')!=$id){
						$('.choose').find('img').toggleClass('hidden');
						$(evElWrap).find(evEl).removeClass('choose');
						$tar.addClass('choose');
						$tar.find('img').toggleClass('hidden');
					}
				}

				if(evElWrap==".view-nav"){
					if($('.choose2').attr('data-id')!=$id){
						$('.choose2').find('img').toggleClass('hidden');
						$(evElWrap).find(evEl).removeClass('choose2');
						$tar.addClass('choose2');
						$tar.find('img').toggleClass('hidden');
					}
				}
			}
			
		});
	};

};

var pg = new ctxAct();

pg.change('.play-nav',['.play-box'],'div',['.play-content'],'','',true);

var vg = new ctxAct();

vg.change('.view-nav',['.view-content'],'div',['.view-list'],'','',true);

});
