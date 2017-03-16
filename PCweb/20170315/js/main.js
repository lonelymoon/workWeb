jQuery(function($){

var sc1 = new Swiper(".swiper-container",{
	loop : true,
	speed : 600,
	pagination : '.pagination',
	paginationClickable :true
});

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
				if(evElWrap == ".clm-1 .column-sub-nav"){
					$(evElWrap).find(evEl).removeClass("cl-1-choose");
					$tar.addClass("cl-1-choose");
				}

				if(evElWrap == ".clm-2 .column-sub-nav"){
					$(evElWrap).find(evEl).removeClass("cl-2-choose");
					$tar.addClass("cl-2-choose");
				}

				if(evElWrap == ".clm-3 .column-sub-nav"){
					$(evElWrap).find(evEl).removeClass("cl-3-choose");
					$tar.addClass("cl-3-choose");
				}

				if(evElWrap == ".clm-4 .column-nav"){
					$(".cl-4-choose").find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-4-choose");
					$tar.addClass("cl-4-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".cct-1 .column-sub-nav"){
					$(".cl-5-choose").find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-5-choose");
					$tar.addClass("cl-5-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".cct-2 .column-sub-nav"){
					$(".cl-6-choose").find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-6-choose");
					$tar.addClass("cl-6-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".cct-3 .column-sub-nav"){
					$(".cl-7-choose").find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-7-choose");
					$tar.addClass("cl-7-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".cct-4 .column-sub-nav"){
					$(".cl-8-choose").find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-8-choose");
					$tar.addClass("cl-8-choose").find("img").toggleClass("hide");
				}

				if(evElWrap == ".clm-5 .column-nav"){
					$(".cl-9-choose").find("img").toggleClass("hide");
					$(evElWrap).find(evEl).removeClass("cl-9-choose");
					$tar.addClass("cl-9-choose").find("img").toggleClass("hide");
				}

			}
			
		});
	};

};

var cl_1_g = new ctxAct();
cl_1_g.change(".clm-1 .column-sub-nav",['.clm-1 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_2_g = new ctxAct();
cl_2_g.change(".clm-2 .column-sub-nav",['.clm-2 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_3_g = new ctxAct();
cl_3_g.change(".clm-3 .column-sub-nav",['.clm-3 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_4_g = new ctxAct();
cl_4_g.change(".clm-4 .column-nav",['.clm-4'],'div',['.column-content'],'','',true);
var cl_5_g = new ctxAct();
cl_5_g.change(".cct-1 .column-sub-nav",['.cct-1 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_6_g = new ctxAct();
cl_6_g.change(".cct-2 .column-sub-nav",['.cct-2 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_7_g = new ctxAct();
cl_7_g.change(".cct-3 .column-sub-nav",['.cct-3 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_8_g = new ctxAct();
cl_8_g.change(".cct-4 .column-sub-nav",['.cct-4 .column-wrapper'],'li',['.column-item'],'','',true);
var cl_8_g = new ctxAct();
cl_8_g.change(".clm-5 .column-nav",['.clm-5 .column-wrapper'],'div',['.column-item'],'','',true);

var $ev = "ontouchstart" in document? "touchstart" : "click";

function loop(i){
	var id = $('.cl-4-choose').attr("data-id") - 1;
	i = i >= 3 ? 0 : i;
	$('.clm-4 .column-sub-nav').eq(id).find(".column-sub-list").eq(i).trigger($ev);
	sc1.swipeNext();
	setTimeout(function(){  i++; loop(i) },5000);
}

setTimeout(function(){
	loop(0);
},5000);

});