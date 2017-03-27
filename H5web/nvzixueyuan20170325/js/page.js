define(['jquery','swiper','pageScroll','pageHand'],function($,Swiper,Scroll,myHand){

var Page = function(){
	this.sw = new Swiper('.swiper-container',{
		direction : "vertical",
		speed : 600,
		onlyExternal : true,
		height : window.innerHeight
	});
	this.sc = null; //iscroll 滚动
	this.dataIdx = 0; //数据调用Id
	this.dataNum = 6; //数据调取条数
};

Page.prototype = {

	//判断图片是否加载完毕
	checkReady : function(callback){
		callback = callback || function(){};
		var imgs = document.querySelectorAll('img'),
			len = imgs.length,
			i = 0,count = 0,
			_self = this;

		for( ; i < len; i++ ){
			if(imgs[i].complete){
				count++;
			} else {
				imgs[i].onload = function(){
					count++;
				}
			}
		}

		var timer = setInterval(function(){
			if(count == len){
				clearInterval(timer);
				callback(_self);
			}
		},50);

	},

	//文字动画
	startTextAnimation : function(idx){
		var prevSelector = "ani-step-" + (idx - 1),
			nowSelector = "ani-step-" + idx,
			_self = this;

		idx = idx || 1;

		if(idx > 4){
			this.closeFlowerAnimation();
			this.loadingData(10);
			this.toPage(2);
			this.inPage2();
			$('.animation-text').removeClass(prevSelector);
			return false;
		}

		$('.animation-text').removeClass(prevSelector).addClass(nowSelector);
		setTimeout(function(){
			_self.startTextAnimation(idx+1);
		},2000);
	},

	//翻页
	toPage : function(idx){
		this.sw.slideTo(idx-1);
	},

	//page2
	inPage2 : function(){
		var hand = new myHand(".page2"),
			bannerHeight = $(".page-banner").height(),
			_self = this;

		$('.say-btn').off('click').on("click",function(e){
			_self.toPage(3);
			_self.inPage3();
		});

		hand.swipeTop(function(e){
			$('.page-wrapper').css({
				"-webkit-transform" : "translate3d(0px,-"+bannerHeight + "px,0px)",
				"transform" : "translate3d(0px,-"+bannerHeight + "px,0px)"
			});

			hand.destroy();

			_self.sc = new Scroll('.page-content',{
				mouseWheel : true,
				scrollBar : true,
				pullUpFresh : true
			});

			_self.sc.update('y',function(e){
				_self.loadingData();
			});
		});

	},

	//page3
	inPage3 : function(){

	},

	//alter
	alert : function(title,msg,btn,callback){
		callback = callback || function(){};
		$('.layer-box').removeClass("hide");
		$('.alter-title').html(title);
		$('.alter-msg').html(msg);
		$('.alter-btn').html(btn);
		$('.alter-btn').off("click").on("click",function(e){
			$('.layer-box').addClass("hide");
			callback(e);
		});
	},

	//loading data
	loadingData : function(tempNum){
		var temp = "",
			_self = this,
			num = tempNum || this.dataNum;

		if(this.loading){
			return false;
		}

		this.loading = true;

		$.ajax({
			type : "get",
			url : '/Getmessage.action',
			data : {
				intstart : this.dataIdx,
				intnum : num
			},
			dataType : "json",
			success : function(res){
				var data = res.resultarray,
					len = data.length;
				if(len == 0){
					_self.alert("","已到最后一条数据","我知道了");
					_self.loading = false;
					return false;
				}
				for( var i = 0 ; i < len; i++ ){
					var tempData = data[i],
						year = tempData.strstartschool,
						tpl  = '<div class="msg-item">'+
						'<div class="item-header">'+
							'<div class="item-name">'+tempData.strnickname+'</div>'+
							'<div class="item-major">'+tempData.strprofession+'</div>'+
							'<div class="item-year">'+year.substring(year.length - 2)+'</div>'+
						'</div>'+
						'<div class="item-content">'+tempData.strmessage+
							'<div class="item-date">'+tempData.stryyyymmdd+'</div>'+
						'</div>'+
					'</div>';
					temp += tpl;
				}
				$('.msg-box').append(temp);
				if(!tempNum)
				_self.sc.refresh();

				_self.dataIdx += len;
				_self.loading = false;
			},
			fail : function(status){
				_self.loading = false;
				_self.alert("","数据拉取失败，请重试","我知道了");
			}
		});
	},

	//music
	startMusic : function(){
		$('#bgmIcon').trigger("click");
		wx.config({
		    debug: false,
		    appId: '',
		    timestamp:1,
		    nonceStr: '',
		    signature: '',
		    jsApiList: []
		});

		wx.ready(function(){
			$('#bgmIcon').trigger("click");
		});
	},

	//花瓣动画
	startFlowerAnimation : function(){
		var timerArr = ["ease","linear","ease-in","ease-out"],
			fz = ($('html').css("fontSize").match(/^\d+/,"g"))[0],
			per = window.innerHeight / fz,
			height = (per - 1.6).toFixed(2);

		this.createFlowerAnimation(timerArr,height);
	},

	createFlowerAnimation : function(timerArr,height){
		var len = 100 + (Math.random() * 100) >> 0,
			i = 0,
			temp = "",
			_self = this;

		for( ; i < len; i++ ){
			var duration = 4000 + (Math.random() * 3000) >> 0,
				timer = timerArr[ (Math.random() * 3) >> 0 ],
				foItem = "";

			foItem = '<div class="flower-item" style="'+
						'-webkit-transition-duration:'+duration+'ms;'+
						'transition-duration: '+duration + 'ms;'+
						'-webkit-transition-timing-function:'+timer+';'+
						'transition-timing-function:'+timer+';'+
						'">'+
					'<img src="images/hb_1.png">'+
					'</div>';

			temp += foItem;
		}

		$('.animation-flower').hide().html(temp).show();
		setTimeout(function(){
			_self.addFlowerAnimation(len,height,0);
		},1000);
	},

	addFlowerAnimation : function(len,height,idx){
		var $foItem = $('.flower-item'),
			space = ( Math.random() * 12 ) >> 0,
			tempLen = len - idx > space ? space + idx : len,
			time = (Math.random() * 1500) >> 0,
			_self = this;

		if( idx == len - 1 ){
			return false;
		}

		for( ; idx < tempLen; idx++ ){
			var left = -(Math.random() * 6.25).toFixed(2),
				right = (Math.random() * 1.4).toFixed(2),
				rotateX = (Math.random() * 1800) >> 0,
				rotateY = (Math.random() * 3600) >> 0,
				rotateZ = (Math.random() * 180) >> 0;

			$foItem.eq(idx).css({
				'right' : right + "rem",
				'-webkit-transform': 'translate3d('+left+'rem,'+height+'rem,0rem) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg) rotateZ('+rotateZ+'deg)',
				'transform': 'translate3d('+left+'rem,'+height+'rem,0rem) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg) rotateZ('+rotateZ+'deg)'
			});
		}
		this.flowerTimer = setTimeout(function(){
			_self.addFlowerAnimation(len,height,idx);
		},time);

	},

	closeFlowerAnimation : function(){
		$('.animation-flower').hide();
		clearTimeout(this.flowerTimer);
	}
	//end

};


return Page;

});