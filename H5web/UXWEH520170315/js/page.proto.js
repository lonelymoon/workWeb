define(['jquery','pageScroll','pageHand','pageConfig'],function($,Scroll,myHand,config){

var Page = function(options){
	options = options || {};

	this.menu = options.menu || ".menu";
	this.menuLink = options.menuLink || ".menulink";
	this.back = options.back || ".back";
	this.detailLink = options.detailLink || ".detail-link";
	this.local = window.location.href;
	this.path = this.local.substring(0,this.local.lastIndexOf("/")+1);
	this.pages = config.menuPage;
	this.detailPages = config.detailPage;
	this.ev = "ontouchstart" in document ? "touchend" : "click";
	this.__created = false; //用于在页面完全加载后控制相关的功能创建

	this.init();
};

Page.prototype = {

	init : function(){
		this.eventListen();
	},

	eventListen : function(){
		var _self = this,
			transitionEnd = "transitionEnd" in document ? "transitionEnd" : "webkitTransitionEnd";

		//hands
		var homeHand = new myHand("#homepage");
		
		homeHand.swipeLeft(function(ev){
			var $tar = $(ev.target).parents(".swiper-container");
			if($tar.length!=0){
				return false;
			}
			$('#all-wrapper').removeClass('mode-active');
		});
		homeHand.swipeRight(function(ev){
			var $tar = $(ev.target).parents(".swiper-container");
			if($tar.length!=0){
				return false;
			}
			$('#all-wrapper').addClass('mode-active');
		});

		var menuHand = new myHand("#page-menu");

		menuHand.swipeRight(function(ev){
			var $tar = $(ev.target).parents(".swiper-container");
			if($tar.length!=0){
				return false;
			}
			_self.closePage("menu");
		});

		var detailHand = new myHand("#page-detail");

		detailHand.swipeRight(function(ev){
			var $tar = $(ev.target).parents(".swiper-container");
			if($tar.length!=0){
				return false;
			}
			_self.closePage("detail");
		});
		//hands end

		$(this.menu).on("click",function(e){
			$('#all-wrapper').toggleClass('mode-active');
		});

		$(this.menuLink).on("click",function(e){
			e.preventDefault();
			e.stopPropagation();

			var linkID = $(this).attr('data-link'),
				pagelist = _self.pages.pagelist;

			if(linkID == "center"){
				
			}

			_self.loadProxyPages(linkID,pagelist,"menu");
		});

		$(this.back).on("click",function(e){
			var flag = $(this).attr("data-flag");
			_self.closePage(flag);
		});

		$('#page-box').on(transitionEnd,function(){
			_self.pageSlideEnd("#page-menu");
		});

		$('#page-detail').on(transitionEnd,function(){
			_self.pageSlideEnd("#page-detail");
		});

	},

	detailPageEventListen : function(){
		var _self = this,
			ev = this.ev;

		$(this.detailLink).off(ev).on(ev,function(e){
			e.preventDefault();
			e.stopPropagation();
			var linkID = $(this).attr('data-link'),
				pagelist = _self.detailPages.pagelist;

			_self.loadProxyPages(linkID,pagelist,"detail");
		});
	},

	//前置判断
	loadProxyPages : function(linkID,pagelist,type){
		if(linkID == "homepage"){
			this.resetPage();
			return;
		}

		for( var i = 0, page; page = pagelist[i++]; ){
			var id = page.id;
			if(id == linkID){
				this.loadPages(id,page,type);
			}
		}
	},

	//加载单页
	loadPages : function(id,page,type){
		var cache = page.pageCache,
			_self = this;

		this.__created = false;

		if(cache){
			_self.end(page,cache);
			return;
		}

		$.ajax({
			"type" : "get",
			"url" : this.path + id + ".html",
			"cache" : false,
			"dataType" : "html",
			"success" : function(pageDom){
				var sources = page.sources,
					div = document.createElement('div');

				div.innerHTML = pageDom;

				pageDom = div.querySelector('.page');

				if(sources && sources.length > 0){
					_self.loadSources(page,pageDom,type);
					return;
				}

				_self.end(page,pageDom,type);
			},
			"fail" : function(status){

			}
		});
	},

	//加载单页资源
	loadSources : function(page,pageDom,type){
		var sources = page.sources,
			temp = "",
			_self = this;

		$.get(page.sourceUrl,{userName:'userName01'},function(res){
			for(var i = 0, source; source = sources[i++]; ){
				temp = source.callback.call(_self,res) || "";
				pageDom.querySelector(source.wrapper).innerHTML = temp;
			}

			_self.end(page,pageDom,type);
			
		});
	},

	//加载图片
	lazyloadImages : function(){
		this.lazyloadImage();
	},

	//
	lazyloadImage : function(){
		var imgObj = $('.lazy-img[data-status=unload]').eq(0),
			img = document.createElement('img'),
			_self = this;
			
		if(imgObj.length == 0){
			if(!this.__created) this.createFn();
			return;
		}
		
		var src = imgObj.attr('data-origin');

		img.onload = function(){
			imgObj.attr({
				"data-status" : "loaded",
				"src" : src
			});
			setTimeout(function(){
				_self.lazyloadImage();
			},30);
		};

		imgObj.attr('data-status',"loading");
		img.src = src;
	},

	//重置首页样式
	resetPage : function(){
		$('#all-wrapper').removeClass('mode-active');
	},

	detailPage : function(){
		$('#page-detail').addClass('page-active');
	},

	//关闭详情页面
	closePage : function(flag){
		if(flag == "menu"){
			$('#page-box').removeClass('page-active');
			return;
		}

		$('#page-detail').removeClass('detail-active');
	},

	//transitionEnd
	pageSlideEnd : function(wrapper){
		var status = $(wrapper).attr('data-status');
		if(status == "hide"){
			$(wrapper).attr('data-status',"show");
			this.__triggerWrap = wrapper;
			this.lazyloadImages();
		} else {
			$(wrapper).attr('data-status',"hide");
		}
	},

	end : function(page,pageDom,type){
		if(type == "detail"){
			this.detailPagesEnd(page,pageDom);
			return;
		}

		if( !page.pageCache ){
			page.pageCache = pageDom;
		}

		this.menuPageLoadEnd(page,pageDom);
		this.resetPage();
		this.detailPageEventListen();
		page.callback(pageDom);
	},

	//添加内容到菜单（一级）页面上
	menuPageLoadEnd : function(page,pageDom){
		$('#page-menu').find(".page-wrapper").hide().html(pageDom).show();
		$('#page-menu').find(".page-title").html(page["name"]);
		$('#page-box').addClass('page-active');
	},

	//detail pages
	detailPagesEnd : function(page,pageDom){
		this.detailPageLoadEnd(pageDom);
		page.callback(pageDom);
	},

	//添加内容到详细（二级）页面上
	detailPageLoadEnd : function(pageDom){
		$('#page-detail').find(".page-wrapper").hide().html(pageDom).show();
		$('#page-detail').addClass('detail-active');
	},

	//创建页面滚动
	createScroll : function(){
		//创建iscroll
		var tempScroll = new Scroll(this.__triggerWrap + ' .page-wrapper', {
		    mouseWheel: true,
		    scrollBar: true
		});

	},

	//创建页面功能
	createFn : function(){
		this.createScroll();
		this.__created = true;
	}

};

return Page;

});