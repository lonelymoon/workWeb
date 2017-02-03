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
					if(evElWrap==".food-nav"){
						if($('.choose').attr('data-id')!=$id){
							$(evElWrap).find(evEl).removeClass('choose');
							$tar.addClass('choose');
						}
					}

					if(evElWrap==".shopping-nav"){
						if($('.sChoose').attr('data-id')!=$id){
							$(evElWrap).find(evEl).removeClass('sChoose');
							$tar.addClass('sChoose');
						}
					}

				}
				
			});
		};

	};

	var mg = new ctxAct();
	mg.change('.food-nav',['.food-content'],'li',['.food-content-list'],'','',true);

	var sg = new ctxAct();
	sg.change('.shopping-nav',['.shopping'],'div',['.shopping-content'],'','',true);
	
	$('.food-content-list').on('mouseover','.food-list',function(e){

		$('.food-list').removeClass('marLeft');
		$('.food-layer').css({
			"display" : "block"
		});

		$(this).find('.food-layer').css({
			"display" : "none"
		});

		if(!$(this).hasClass('first-list'))
		$(this).addClass('marLeft');
		
	});

	$('.food-content-list').on('mouseout',function(e){
		$('.food-list').removeClass('marLeft');
		$('.food-layer').css({
			"display" : "block"
		});
	});

	var index = 0;

	$('.slider-box').hide().eq(0).show();

	$('.right-btn').on('click',function(e){
		index = index >= 9? 0 : index + 1;
		$('.slider-box').hide().eq(index).fadeIn(500);
	});

	$('.left-btn').on('click',function(e){
		index = index <= 0? 9 : index - 1;
		$('.slider-box').hide().eq(index).fadeIn(500);
	});

	$('.sp-list').hover(function(){
		$(this).find('.sp-text').show();
	},function(){
		$(this).find('.sp-text').hide();
	});

	$('.et-nav-list').on('click',function(e){
		$('.et-list').removeClass('et-list-choose');
		$('.et-list').eq($(this).attr('data-id') - 1).addClass('et-list-choose');
	});

	$('.more-house').on('click',function(e){
		$('.table-layer').removeClass('hide');
		$('.ti-1').removeClass('hide');
	});

	$('.more-nongjia').on('click',function(e){
		$('.table-layer').removeClass('hide');
		$('.ti-2').removeClass('hide');
	});

	$('.table-layer').on('click',function(e){
		var tar = e.target;
		if(this !== tar){
			return false;
		}

		$('.table-layer').addClass('hide');
		$('.table-img').addClass('hide');
	});

	$('.products-list').hover(function(e){
		$(this).find('.list-1').toggleClass('hide');
		$(this).find('.list-2').toggleClass('hide');
	},function(e){
		$(this).find('.list-1').toggleClass('hide');
		$(this).find('.list-2').toggleClass('hide');
	});

	$('.nj-list').hover(function(){
		$(this).find('.layer-img').hide();
		$(this).find('.nj-text').hide();
	},function(){
		$(this).find('.layer-img').show();
		$(this).find('.nj-text').show();
	});

});