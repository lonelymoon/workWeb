jQuery(function($){

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
					if(evElWrap==".nav1" || evElWrap==".nav2" || evElWrap==".nav3"){
						if($(evElWrap+' .nav-selected').attr('data-id')!=$id){
							$(evElWrap).find(evEl).removeClass('nav-selected');
							$tar.addClass('nav-selected');
						}
					}

				}
				
			});
		};
	};

	var ig = new ctxAct();
	ig.change('.nav1',[".item1-content",".item1-content .img-box"],'li',[".foods-text","img"],"","",true);

	var hg = new ctxAct();
	hg.change('.nav2',[".item2-content",".item2-content .img-box"],'li',[".foods-text","img"],"","",true);

	var ng = new ctxAct();
	ng.change('.nav3',[".item3-content",".item3-content .img-box"],'li',[".foods-text","img"],"","",true);

	var lg = new ctxAct();
	lg.change('.swiper-slide',[".islands-content"],'li',[".islands-box"],"","",true);


	$('.nav-item-title').on('click',function(e){

		var flag = $(this).attr('data-mark');

		$('.islands-item-list-box').slideUp(300);

		$(this).next('.islands-item-list-box').slideDown(300,function(){

			goSwiper('.swiper'+flag,'.bar'+flag);

		});

	});

	var len = 0,
		arr = [],
		temp = "",
		timer = null,
		count = 10;

	var ObjEvent = zShan.ObjEvent,
		urlObj = ObjEvent.getUrlObj();

	function addData(len,arr,count){

		for ( var i = 0; i < Math.min(len,count); i++ ) {

			var obj = arr.shift();;

			temp += '<div class="islands-box hide" data-id="'+obj.id+'">'+		
				'<div class="islands-img">'+
					'<img src="images/islandPage/'+obj.url+'" />'+
				'</div>'+
				'<div class="islands-title">'+
					obj.title+
				'</div>'+
				'<div class="islands-text">'+
					obj.text+		
				'</div>'+
			'</div>';

		}

		len = arr.length;

		$('.islands-content').append(temp);
		$('.islands-text').children('span').addClass('hide');
		$("."+urlObj["language"]+"-text").removeClass('hide');

		temp = "";

		if(len === 0){
			clearTimeout(timer);
		} else {
			timer = setTimeout(function(){
				addData(len,arr,count);
			},100);
		}

	}

	len = myJson.length;
	arr = myJson.concat();
	addData(len,arr,count);

	if(urlObj["language"] == "cn")
	goSwiper('.swiper1','.bar1');
	else{
		goSwiper('.swiper4','.bar4');
	}
	

});

function goSwiper(selectors,bar){
	var mySwiper = new Swiper(selectors,{
	   	scrollContainer: true,
	   	mode : "vertical",
	   	mousewheelControl: true,
	   	momentumBounce: true,
		scrollbar:{
		    container: bar
		}
	});
}