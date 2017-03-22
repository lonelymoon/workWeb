jQuery(function($){

var scs = {};

function createSwiper(idx){
	if(idx==17){
		return;
	}

	scs["sc_"+idx] = new Swiper(".sc-"+idx,{
		speed : 800,
		loop : true,
		pagination : '.pgn-'+idx,
		paginationClickable :true
	});
}

function createProxySwiper(num){
	var i = 0;
	for( ; i < num; i++ ){
		createSwiper(i+1);
	}
	setTimeout(loop,4000);
}

function loop(){

for( var key in scs ){
	scs[key].reInit();
	scs[key].swipeNext();
}

setTimeout(loop,4000);

};

createProxySwiper(20);

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
				if(evElWrap == ".column-1 .column-nav"){
					$('.cl-1-choose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-1-choose");
					$tar.addClass("cl-1-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".column-2 .column-nav"){
					$('.cl-2-choose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-2-choose");
					$tar.addClass("cl-2-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".column-3 .column-nav"){
					$('.cl-3-choose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-3-choose");
					$tar.addClass("cl-3-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".column-4 .column-nav"){
					$('.cl-4-choose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-4-choose");
					$tar.addClass("cl-4-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".inav-1"){
					$('.in-choose-1').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("in-choose-1");
					$tar.addClass("in-choose-1").find("img").toggleClass("hide");
				}

				if(evElWrap == ".inav-2"){
					$('.in-choose-2').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("in-choose-2");
					$tar.addClass("in-choose-2").find("img").toggleClass("hide");
				}

				if(evElWrap == ".column-5 .column-nav"){
					$('.cl-5-choose').find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-5-choose");
					$tar.addClass("cl-5-choose").find("img").toggleClass("hide");
				}

			}
			
		});
	};

};

var cl_1_g = new ctxAct();
cl_1_g.change('.column-1 .column-nav',['.column-1 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_2_g = new ctxAct();
cl_2_g.change('.column-2 .column-nav',['.column-2 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_3_g = new ctxAct();
cl_3_g.change('.column-3 .column-nav',['.column-3 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_4_g = new ctxAct();
cl_4_g.change('.column-4 .column-nav',['.column-4 .column-wrapper'],'li',['.column-item'],'','',true);
var inner_g = new ctxAct();
inner_g.change('.inav-1',['.iitem-1'],'div',['.column-inner-item'],'','',true);
var inner2_g = new ctxAct();
inner2_g.change('.inav-2',['.iitem-2'],'div',['.column-inner-item'],'','',true);
var cl_5_g = new ctxAct();
cl_5_g.change('.column-5 .column-nav',['.column-5 .column-wrapper'],'li',['.column-item'],'','',true);
});