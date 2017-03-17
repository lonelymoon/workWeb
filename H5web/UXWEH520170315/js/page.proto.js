var Page = function(options){
	options = options || {};

	this.menu = options.menu || ".menu";
	this.menuLink = options.menuLink || ".menulink";
	this.back = options.back || ".back";
	this.detailLink = options.detailLink || ".detail-link";
	this.local = window.location.href;
	this.path = this.local.substring(0,this.local.lastIndexOf("/")+1);
	this.pages = {
		pagelist : [
			{
				"name" : "图片",
				"id" : "images",
				"pageCache" : "",
				"sourceUrl" : "",
				"sources" : [{
					"wrapper":".img-other",
					"callback" : function(data){
						var temp = '<li class="img-item"><img src="images/loading.gif" data-origin="images/1.png" class="lazy-img" data-status="unload" /></li>'+
							'<li class="img-item"><img src="images/loading.gif" data-origin="images/2.jpg" class="lazy-img" data-status="unload" /></li>';
						return temp;
					}
				},{
					"wrapper":".img-text",
					"callback" : function(data){
						var temp = "我来，我到，我GG";
						return temp;
					}
				}],
				"callback" : function(pageDom){
					
				}
			},{
				"name" : "评论",
				"id" : "comments",
				"pageCache" : "",
				"sourceUrl" : "",
				"sources" : [
					{
						"wrapper" : ".comments",
						"callback" : function(data){
							var temp = "<li>1</li><li>2</li><li>3</li><li>4</li>";
							return temp;
						}
					}
				],
				"callback" : function(pageDom){

				}
			}
		]
	};

	this.detailPages = {
		pagelist : [
			{
				"name" : "详情",
				"id" : "detail",
				"sourceUrl" : "",
				"sources" : [
					{
						"wrapper" : ".content",
						"callback" : function(data){
							var temp = "<li>asdasdasd</li>";
							return temp;
						}
					}
				],
				"callback" : function(pageDom){

				}
			}
		]
	};

	this.init();

};

Page.prototype = {

	init : function(){
		this.eventListen();
	},

	eventListen : function(){
		var _self = this,
			transitionEnd = "transitionEnd" in document ? "transitionEnd" : "webkitTransitionEnd";

		$(this.menu).on('click',function(e){
			$('#all-wrapper').toggleClass('mode-active');
		});

		$(this.menuLink).on('click',function(e){
			e.preventDefault();
			e.stopPropagation();

			var linkID = $(this).attr('data-link'),
				pagelist = _self.pages.pagelist;

			if(linkID == "homepage"){
				_self.resetPage();
				return;
			}

			for( var i = 0, page; page = pagelist[i++]; ){
				var id = page.id;
				if(id == linkID){
					_self.loadPages(id,page,"menu");
				}
			}

		});

		$(this.back).on('click',function(e){
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
		var _self = this;

		$(this.detailLink).off('click').on('click',function(e){
			e.preventDefault();
			e.stopPropagation();
			var linkID = $(this).attr('data-link'),
				pagelist = _self.detailPages.pagelist;

			for( var i = 0, page; page = pagelist[i++]; ){
				var id = page.id;
				if(id == linkID){
					_self.loadPages(id,page,"detail");
				}
			}
		});
	},

	//加载单页
	loadPages : function(id,page,type){
		var cache = page.pageCache,
			_self = this;

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

		$.get(page.sourceUrl,{},function(res){
			for(var i = 0, source; source = sources[i++]; ){
				temp = source.callback.call(_self,res);
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

		$('#page-menu').find(".page-wrapper").hide().html(pageDom).show();
		$('#page-box').addClass('page-active');
		this.resetPage();
		this.detailPageEventListen();
		page.callback(pageDom);
	},

	//detail pages
	detailPagesEnd : function(page,pageDom){
		$('#page-detail').find(".page-wrapper").hide().html(pageDom).show();
		$('#page-detail').addClass('detail-active');
		page.callback(pageDom);
	}

};