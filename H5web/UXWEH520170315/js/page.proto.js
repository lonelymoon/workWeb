(function(window,document,undefined){
var pageConfig = {
	pagelist : [

		{
			"name" : "UXWE·工作坊",
			"id" : "workshop",
			"pageCache" : "",
			"sourceUrl" : "",
			"sources" : [{
				"wrapper":".past-workshop-box",
				"callback" : function(data){
					var tempData = [{
						"idx" : "1",
						"cnTitle" : "将“用户走查”融入产品迭代",
						"enTitle" : 'Will "user walk through" into theproductIteration',
						"lecName" : "林长青",
						"img" : "images/gzf_1.png"
					},{
						"idx" : "2",
						"cnTitle" : "UX 真能带来本质性创新？UX价值观反思和重构",
						"enTitle" : 'Is it really essential to innovation? UX value reflection and reconstruction',
						"lecName" : "印隽",
						"img" : "images/gzf_2.png"
					},{
						"idx" : "3",
						"cnTitle" : "越来越跨界的界面设计",
						"enTitle" : 'More and more cross-border interface design',
						"lecName" : "应骏赳 JJ Ying",
						"img" : "images/gzf_3.png"
					},{
						"idx" : "4",
						"cnTitle" : "如何将用户洞察转化为UX设计",
						"enTitle" : 'How to turn user insights into UX designs',
						"lecName" : "毛茸",
						"img" : "images/gzf_4.png"
					}],temp="";

					for( var i = 0, ndata; ndata = tempData[i++]; ){
						var templete = '<div class="past-item" data-type="'+ndata["idx"]+'">'+
									'<div class="past-item-msg">'+
										'<div class="past-item-cnTitle">'+ndata.cnTitle+'</div>'+
										'<div class="past-item-enTitle">'+ndata.enTitle+'</div>'+
										'<div class="past-item-lecName">作者 '+ndata.lecName+'</div>'+
									'</div>'+
									'<div class="past-item-image">'+
										'<img src="images/loading.gif" data-origin="'+ndata.img+'" data-status="unload" class="lazy-img">'+
									'</div>'+
								'</div>';

						temp += templete;

					}

					return temp;
				}
			}],
			"callback" : function(pageDom){
				
			}
		},
		{
			"name" : "UXWE·讲师介绍",
			"id" : "lecturer",
			"pageCache" : "",
			"sourceUrl" : "",
			"sources" : [
				{
					"wrapper" : ".lecturer-box",
					"callback" : function(data){
						var tempData = [{
							"idx" : "0",
							"lecJob" : "脉可寻联合创始人",
							"lecName" : "包季真",
							"img" : "images/gyjs_1.png"
						},{
							"idx" : "2",
							"lecJob" : "Top Design创始人兼CEO",
							"lecName" : "陈莹",
							"img" : "images/gyjs_2.png"
						},{
							"idx" : "3",
							"lecJob" : "国家数字媒体创新研究中心研究员",
							"lecName" : "孙博文",
							"img" : "images/gyjs_3.png"
						},{
							"idx" : "4",
							"lecJob" : "产品经理，搜狗壁纸产品负责人",
							"lecName" : "林长青",
							"img" : "images/gyjs_4.png"
						}],temp="";

						for( var i = 0, ndata; ndata = tempData[i++]; ){
							var templete = '<div class="lec-item" data-type="'+ndata.idx+'">'+
												'<div class="lec-item-image">'+
													'<img src="images/loading.gif" class="lazy-img" data-status="unload" data-origin="'+ndata.img+'">'+
												'</div>'+
												'<div class="lec-item-job">'+ndata.lecJob+'</div>'+
												'<div class="lec-item-lecName">'+ndata.lecName+'</div>'+
											'</div>';

							temp += templete;

						}

						return temp;
					}
				}
			],
			"callback" : function(pageDom){

			}
		}

	]
};

var Page = function(options){
	options = options || {};

	this.menu = options.menu || ".menu";
	this.menuLink = options.menuLink || ".menulink";
	this.back = options.back || ".back";
	this.detailLink = options.detailLink || ".detail-link";
	this.local = window.location.href;
	this.path = this.local.substring(0,this.local.lastIndexOf("/")+1);
	this.pages = pageConfig;

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
		var imgObj = $('.lazy-img[data-status="unload"]').eq(0),
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
		$('#page-menu').find(".page-title").html(page["name"]);
		$('#page-box').addClass('page-active');
		this.resetPage();
		this.detailPageEventListen();
		//创建iscroll
		var tempScroll = new IScroll('#page-menu .page-wrapper', {
		    mouseWheel: true,
		    scrollbars: true
		});
		setTimeout(function(){
			tempScroll.refresh()
		},10);
		page.callback(pageDom);
	},

	//detail pages
	detailPagesEnd : function(page,pageDom){
		$('#page-detail').find(".page-wrapper").hide().html(pageDom).show();
		$('#page-detail').addClass('detail-active');
		page.callback(pageDom);
	}

};

window.Page = Page;

})(window,document);