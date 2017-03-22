//用于绑定元素滚动/滑动事件
define(["iscroll"],function(IScroll){

//处理页面内容滚动
var Scroll = function(selector,options){
	options = options || {};
	this.selector = selector;
	this.usePullDownFresh 	= options.pulldownFresh || false; 	//下拉刷新
	this.downHeight			= options.downHeight	|| 20;		//下(右)拉刷新触发距离
	this.usePullUpFresh 	= options.pullUpFresh 	|| false; 	//上拉刷新
	this.upHeight			= options.upHeight		|| 20;		//上(左)拉刷新触发距离
	this.scrollBar 			= options.scrollBar 	|| false;  	//显示滚动条
	this.fadeScrollBar		= options.fadeBar 		|| false;	//停止动画时是否隐藏滚动条
	this.dragBar			= options.dragBar		|| true;	//是否能拖动滚动条
	this.mouseWheel 		= options.mouseWheel 	|| true;  	//滚轮
	this.scrollX 			= options.scrollX 		|| false;	//横向滚动
	this.scrollY			= options.scrollY		|| true;	//纵向滚动
	this.tap 				= options.tap 			|| false;	//点击
	this.bounceEasing		= options.easing 		|| "quadratic";	//运动时间曲线
	this.bounceTime			= options.timing		|| 600;		//运动时间<ms>
	this.probeType			= options.probeType 	|| 2;		//scroll事件监测层级

	if( this.usePullUpFresh || this.usePullDownFresh ){
		this.probeType = 3;
	}

	this.scroll  = null;

	this.init();
};

Scroll.prototype = {

	init : function(){
		var _self = this;

		this.scroll = new IScroll(this.selector,{
			mouseWheel: this.scrollBar,
    		scrollbars: this.mouseWheel,
    		scrollX : this.scrollX,
    		scrollY : this.scrollY,
    		tap 	: this.tap,
    		fadeScrollBars : this.fadeScrollBar,
    		interactiveScrollbars : this.dragBar,
    		bounceEasing : this.bounceEasing,
    		bounceTime : this.bounceTime,
    		probeType : this.probeType
		});

		setTimeout(function(){
			_self.refresh();
		},300);
	},

	scrollStart : function(callback){
		callback = callback || function(){};
		this.scroll.off('scrollStart',callback);
		this.scroll.on('scrollStart',callback);
	},

	scrolling : function(callback){
		callback = callback || function(){};
		this.scroll.off('scroll',callback);
		this.scroll.on('scroll',callback);
	},

	scrollEnd : function(callback){
		callback = callback || function(){};
		this.scroll.off('scrollEnd',callback);
		this.scroll.on('scrollEnd',callback);
	},

	//下拉刷新
	updatePage : function(direc,callback){
		if(!this.usePullDownFresh)
		return false;

		callback = callback || function(){};

		if(direc == "x")
		this.__updatePageX(callback);
		else
		this.__updatePageY(callback);
	},

	__updatePageY : function(callback){
		var _self = this;

		this.scrolling(function(){
			if( this.y >= _self.downHeight ){
				callback(this);
				_self.refresh();
			}
		});

	},

	__updatePageX : function(callback){
		var _self = this;

		this.scrolling(function(){
			if( this.x >= _self.downHeight ){
				callback(this);
				_self.refresh();
			}
		});
	},

	//上拉加载
	update : function(direc,callback){
		if(!this.usePullUpFresh)
		return false;

		if(direc == "x")
		this.__updateX(callback);
		else
		this.__updateY(callback);
	},

	__updateY : function(callback){
		var _self = this;

		this.scrolling(function(){
			if( this.y <= this.maxScrollY - _self.upHeight ){
				callback(this);
				_self.refresh();
			}
		});
	},

	__updateX : function(callback){
		var _self = this;

		this.scrolling(function(){
			if( this.x <= this.maxScrollX - _self.upHeight ){
				callback(this);
				_self.refresh();
			}
		});
	},

	refresh : function(){
		this.scroll.refresh();
	},

	destory : function(){
		this.scroll.destory();
	}

};

return Scroll;

});