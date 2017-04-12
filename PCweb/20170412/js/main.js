jQuery(function($){

var sw = {};

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
				$(actionElWrap[i]).find(actionEl[i]+'[data-id='+$id+']').fadeIn(300);	
			}
			
			if(replaceBgImg && replaceBgImg!="")
			{
				$(evElWrap).find(evEl).removeAttr('style')
				$(evElWrap).find(evEl+'[data-id='+$id+']').css('background-image','url('+replaceBgImg+')');	
			}


			//extend
			if(extre){
				//user defined
				if(evElWrap == ".pro-nav"){
					$('.pChoose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("pChoose");
					$tar.addClass("pChoose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".view-nav"){
					$('.vChoose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("vChoose");
					$tar.addClass("vChoose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".food-nav"){
					$('.fChoose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("fChoose");
					$tar.addClass("fChoose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".artical-nav"){
					$('.aChoose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("aChoose");
					$tar.addClass("aChoose").find("img").toggleClass("hide");
				}
			}
			
		});
	};

};

var pg = new ctxAct();
pg.change('.pro-nav',['.pro-content'],'div',['.column-item'],'','',true);
var vg = new ctxAct();
vg.change('.view-nav',['.view-content'],'div',['.column-item'],'','',true);
var fg = new ctxAct();
fg.change('.food-nav',['.food-content'],'div',['.column-item'],'','',true);
var ag = new ctxAct();
ag.change('.artical-nav',['.artical-content'],'div',['.column-item'],'','',true);

});