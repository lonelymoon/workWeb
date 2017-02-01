jQuery(function($){

var want = {},	
	usually = {},
	favorite = {};

	want.num = 0;
	want.go = [];
	usually.num = 0;
	usually.go = [];
	favorite.num = 0;
	favorite.go = [];
	want.hasSend = false;
	usually.hasSend = false;
	favorite.hasSend = false;

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
				if(evElWrap==".slider-nav"){
					if($(evElWrap+' .slider-li').attr('data-id')!=$id){
						goSwiper(".swiper-container"+$id,".bar"+$id);
					}
				}

			}
			
		});
	};
};

var vg = new ctxAct();
vg.change(".slider-nav",[".slider-box",".floating"],"li",[".rank-item","div"],"","",true);

goSwiper('.swiper-container1','.bar1');

function goSwiper(selector, bar){
	var mySwiper = new Swiper(selector, {
	    scrollbar: bar,
	    direction: 'vertical',
	    slidesPerView: 'auto',
	    mousewheelControl : true,
	    freeMode: true
	});
}

$('.swiper-container1').on('click','li',function(e){
	changeId(this,want);
});

$('.swiper-container2').on('click','li',function(e){
	changeId(this,usually);
});

$('.swiper-container3').on('click','li',function(e){
	changeId(this,favorite);
});	

$('.wantGo').on('click',function(e){
	if(want.go.length < 0)
	return;

	if(want.hasSend){
		alert("您已经投过票");
		return;
	}
	

	want.hasSend = true;
	goAjax(want.go,"/iitczs/servlet/WantServlet");
});

$('.usuallyGo').on('click',function(e){
	if(usually.go.length < 0)
	return;

	if(usually.hasSend){
		alert("您已经投过票");
		return;
	}
	usually.hasSend = true;
	goAjax(usually.go,"/iitczs/servlet/LoveServlet");
});

$('.favoriteGo').on('click',function(e){
	if(favorite.go.length < 0)
	return;

	if(favorite.hasSend){
		alert("您已经投过票");
		return;
	}

	favorite.hasSend = true;	
	goAjax(favorite.go,"/iitczs/servlet/OftenServlet");
});


function changeId(that,obj){

	var id = $(that).attr('data-id'),
		index = $.inArray(id,obj["go"]);
	if ( index < 0 ) {

		if ( obj["num"]<5 ){
			$(that).find('img').toggleClass('hide');
			obj["go"].push(id);
			obj["num"]++;
		}
	} else {
		$(that).find('img').toggleClass('hide');
		obj["go"].splice(index,1);
		obj["num"]--;
	}
}

function goAjax(data,url){
	var jsImgArr = JSON.stringify(data),
	jImgArr = JSON.parse(jsImgArr);
	$.ajax({
		data :  {islandId:jImgArr},
		url : url,
		type : "get",
		dataType : "json",
		success : function(data){
			alert("投票成功");

		},
		error : function(data){

		}
	});
}


});