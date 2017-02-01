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

	var mySwiper = new Swiper('.swiper-container',{
	   	scrollContainer: true,
	   	mode : "vertical",
	   	mousewheelControl: true,
		scrollbar:{
		    container: '.swiper-scrollbar'
		}
	});

	var mySwiper2 = new Swiper('.swiper-container2',{
	   	scrollContainer: true,
	   	mode : "vertical",
	   	mousewheelControl: true,
		scrollbar:{
		    container: '.swiper-scrollbar'
		}
	});

	var mySwiper3 = new Swiper('.swiper-container3',{
	   	scrollContainer: true,
	   	mode : "vertical",
	   	mousewheelControl: true,
		scrollbar:{
		    container: '.swiper-scrollbar'
		}
	});

	$('.swiper-container').on('click','li',function(e){
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

		goAjax(usually.go,"/iitczs/servlet/OftenServlet");
	});

	$('.favoriteGo').on('click',function(e){
		if(favorite.go.length < 0)
		return;

		if(favorite.hasSend){
			alert("您已经投过票");
			return;
		}

		favorite.hasSend = true;
		
		goAjax(favorite.go,"/iitczs/servlet/LoveServlet");
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

