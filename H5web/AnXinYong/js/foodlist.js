jQuery(function($){
	//for cross screen
	var navH = $("#fn-nav").outerHeight(),
		headH= $("header").outerHeight(),
		wrH  = $("#wrapper").outerHeight(),
		trueH = $(window).height()-headH-navH;
	$(".wrap").css("height",(trueH>=wrH?wrH:trueH)+"px");
	$(".inner-wr").css("height",(trueH>=wrH?wrH:trueH)+"px");
	//for end

	var $ev = "ontouchstart" in document? "tap" : "click";
	$("#category").on($ev,function(e){
		var $tar   = $("#category"),
			$state = $("#category").find("span").attr("data-state");
			navChange($state,$tar);
	});
	$("#effects").on($ev,function(e){
		var $tar   = $("#effects"),
			$state = $("#effects").find("span").attr("data-state");
			navChange($state,$tar);
	});

	$("#price").on($ev,function(e){
		var $tar   = $("#price"),
			$state = $("#price").find("span").attr("data-state");
			navChange($state,$tar);
	});

	$("#food-classes").on($ev,function(e){
		var e = e || event,
			tar = e.target,
			tag = tar.tagName.toLowerCase();

		if(tag=="li" || $(tar).parent("li"))
		{
			$("#food-classes>li").css('background','#e0e0e0');
			$(tar).css("background","#fff");
			$('.inner-wr').hide();
			$("#inner-wrapper").fadeIn(100);
			getClassData(tar);
		}
	});

	$("#food-ul").on($ev,function(e){
		var e = e || event,
			tar = e.target,
			tag = tar.tagName.toLowerCase();

			e.stopPropagation();

			if(tag=="li")
			{
				$("#food-ul>li").css('color','#333');
				$(tar).css("color","#fc6023");
				//layHide();
			}
	});

	$("#effects-classes").on($ev,function(e){
		var e = e || event,
			tar = e.target,
			tag = tar.tagName.toLowerCase();

		if(tag=="li" || $(tar).parent("li"))
		{
			$("#effects-classes>li").css('background','#e0e0e0');
			$(tar).css("background","#fff");
			$('.inner-wr').hide();
			$("#inner-wrapper-ef").fadeIn(100);
			getClassData(tar);
		}
	});

	$("#effect-ul").on($ev,function(e){
		var e = e || event,
			tar = e.target,
			tag = tar.tagName.toLowerCase();

			e.stopPropagation();
			e.preventDefault();

			if(tag=="li")
			{
				$("#effect-ul>li").css('color','#333');
				$(tar).css("color","#fc6023");
				layHide();
			}
	});

	$(".layer").on("click",function(){
		layHide();
	});

	function layHide(){
		$(".layer").hide();
		$(".fn-classes").hide();
		$(".arrow_down").show();
		$(".arrow_up").hide();
		$(".rank_off").show();
		$(".rank_down").hide();
		$(".rank_up").hide();
	}


	function navChange($state,$tar){
		var $tid = $tar.attr("id"),
			$tarSpan = $tar.find("span");

		switch($tid)
		{
			case "category":
				if($state=="down")
				{
					$("#effects").find(".arrow_up").hide();
					$("#effects").find(".arrow_down").show();
					$tarSpan.attr("data-state","up");
					classShow();
					$("#wrapper").show();
				}
				else
				{
					$tarSpan.attr("data-state","down");
					$("#category").find(".arrow_up").hide();
					$("#category").find(".arrow_down").show();
					$(".fn-classes").fadeOut(100);
					$(".layer").hide();
				}
			break;
			case "effects" :
				if($state=="down")
				{
					$("#category").find(".arrow_up").hide();
					$("#category").find(".arrow_down").show();
					$tarSpan.attr("data-state","up");
					classShow();
					$("#wrapper-ef").show();
				}
				else
				{
					$tarSpan.attr("data-state","down");
					$("#effects").find(".arrow_up").hide();
					$("#effects").find(".arrow_down").show();
					$(".fn-classes").fadeOut(100);
					$(".layer").hide();
				}
			break;
			case "price"   :
				if($state=="off")
				{
					$("#price").find(".rank_off").hide();
					$("#price").find(".rank_down").hide();
					$("#price").find(".rank_up").show();
					$tarSpan.attr("data-state","up");
				}	
				else if($state=="up")
				{
					$("#price").find(".rank_off").hide();
					$("#price").find(".rank_down").show();
					$("#price").find(".rank_up").hide();
					$tarSpan.attr("data-state","down");
				} else {
					$("#price").find(".rank_off").show();
					$("#price").find(".rank_down").hide();
					$("#price").find(".rank_up").hide();
					$tarSpan.attr("data-state","off");
				}
			break;
		}

		function classShow(){
			$tarSpan.find(".arrow_down").hide();
			$tarSpan.find(".arrow_up").show();
			$("#price").find(".rank_off").show();
			$("#price").find(".rank_down").hide();
			$("#price").find(".rank_up").hide();
			$(".layer").fadeIn(50);
			$(".inner-wr").hide();
			$(".wrap").hide();
			$(".fn-classes").fadeIn(100);
		}
	}

	function getClassData(getTar){

	}

	//myScroll_con refresh

	function loaded () {
		var myScroll,myScroll_ef,myScroll_inner,myScroll_inner_ef,myScroll_con;
		myScroll = new IScroll('#wrapper'),
		myScroll_ef = new IScroll('#wrapper-ef'),
		myScroll_inner=new IScroll('#inner-wrapper'),
		myScroll_inner_ef=new IScroll('#inner-wrapper-ef');

		$(".wrap").hide();
		$(".inner-wr").hide();

		//ajax
		var _maxScrollY;

		var html_inner = $(".content_main").html(),//获取已有内容
			init_add_num = 8,						//初始加载条目数
			add_num 	 = 6,						//上拉刷新加载条目数
			html_new	 = "",						//获取新加载的内容
			img_src		 = [],						//存放菜品展示图片链接
			title_src	 = [],						//存放菜品标题
			tag_src		 = [],						//存放菜品的标签，二维数组
			material_src = [],						//存放菜品配料
			money		 = [],						//存放价格
			indexNum	 = 0,						//条目已加载索引
			maxNum		 	;						//最大条目数

		function loadData(idx){
			init_add_num = init_add_num>=maxNum?maxNum:init_add_num;

			indexNum = (idx+ add_num)<=init_add_num?init_add_num:(idx + add_num>=maxNum?maxNum:idx+ add_num);

			//$.post("data.json",{"index":idx,"addNum",add_num},function(data,status){
			//	console.log(data);
			//});
			
			$.get("js/data.json",function(data,status){

				html_new = "";
				img_src = data.img_src;
				title_src=data.titleText;
				tag_src = data.tag;
				material_src=data.mater;
				money = data.money;
				maxNum = data.max;

				for(var i=idx;i<indexNum;i++)
				{
					var temp="";
					//获取tag
					for(var j=0,k=tag_src[i].length;j<k;j++)
					{
						temp += "<span>"+tag_src[i][j]+"</span>";
					}

					html_new += '<div class="msg-box">'+
						'<div class="food-img-box">'+
							'<img src="'+img_src[i]+'" alt="">'+
						'</div>'+
						'<div class="food-msg">'+
							'<div class="above-msg">'+
								'<a href="introduce.html"><h1>'+title_src[i]+'</h1></a>'+
								'<div class="tag">'+temp+
								'</div>'+
								'<div class="food-price">￥ '+money[i]+'</div>'+
							'</div>'+
							'<div class="below-msg">'+material_src[i]+'</div>'+
						'</div>'+
					'</div>';
				}

				html_inner += html_new;

				if(indexNum>idx){
					$(".content_main").html(html_inner);
					if(indexNum==init_add_num)
					setTimeout(loadMsg(),100);
					myScroll_con.refresh();
				}
				
			});
		}

		function loadMsg(){
			var pullUpEl = document.getElementById('pullUp'),
				pullUpOffset = pullUpEl.offsetHeight;

			myScroll_con = new IScroll('#wrap-con',{
				probeType:3,
	    		startY:0
			});

			_maxScrollY = myScroll_con.maxScrollY = myScroll_con.maxScrollY + pullUpOffset;//负值
			myScroll_con.on("scroll",function(){
				if (this.y <= (_maxScrollY - pullUpOffset) && pullUpEl && !pullUpEl.className.match("flip")) {
					pullUpEl.className = "flip";
					pullUpEl.querySelector(".pullUpLabel").innerHTML = "信息预装填...(^o^)／";
				} 
			});

			myScroll_con.on("scrollEnd", function() {
			    if (pullUpEl.className.match('flip') && indexNum != maxNum && this.y) {
			        pullUpEl.className = 'loading';
			        pullUpEl.querySelector('.pullUpLabel').innerHTML = '玩命加载中...＼(^o^)／';
			        loadData(indexNum,1);
			    } else if(indexNum == maxNum)
			    {
			    	pullUpEl.className = 'over';
			        pullUpEl.querySelector('.pullUpLabel').innerHTML = '纳尼，已经结束了(⊙o⊙)';
			    }
			});
		}

		loadData(0,1);
				
	}

	//refresh end

	loaded();
});