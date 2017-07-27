/*
** imgWall UI js
*  ver 1.0.0
*  17.04.20
*/

(function(window,document,Math){

var WantImgWall = function(){
	this.beforeIE7 = document.querySelector ? false : true;
	this.init();
};

WantImgWall.prototype = {

	init : function(){
		this.layer = document.getElementById('wantUI-imgWall-box');
		this.ele = document.getElementById('wantUI-imgWall-dialog');
		this.img = document.getElementById('wantUI-imgWall-img');
		this.next = document.getElementById('wantUI-imgWall-next');
		this.prev = document.getElementById('wantUI-imgWall-prev');

		this.__getHeight();
		this.__setMiddle();
	},

	//显示提示框
	showWall : function(){
		if( this.display != "none" )
		return false;

		this.__setInnerStyle(this.layer,{
			display:"block"
		});
		this.display = "block";

		this.__initEvent();
	},

	//隐藏提示框
	hideWall : function(){
		if( this.display == "none" )
		return false;

		this.__setInnerStyle(this.layer,{
			display:"none"
		});
		this.display = "none";

	},

	//设置参数
	setValues : function(options){
		options = options || {};

		this.url = options.url || "";
		this.idx = options.idx || this.idx;
		this.callback = options.callback || function(){};
		//(允许)禁止滑动
		this.scrollable = options.scrollable === false ? false : (options.scrollable || this.scrollable);
	
		//更新dom
		this.__initDom();
	},

	//单独设置参数
	setValue : function(key,val){
		if(!key) return false;
		var tempObj = {};
		tempObj[key] = val;
		this.setValues(tempObj);
	},

	//系统设定点击回调事件
	custom : function(){
		this.hideWall();
	},

	//系统初始化事件
	__initEvent : function(){
		if( this.hasBind )
		return false;

		this.__forbidden();
		this.__bindEvent();

		this.hasBind = true;
	},

	//系统初始化dom
	__initDom : function(){
		var _self = this;
		this.img.onload = function(e){
			_self.__getHeight();
			_self.__setMiddle();
			_self.callback(e);
		};
		this.img.src = this.url;
	},

	//系统设定禁止某些的操作
	__forbidden : function(){
		var _self = this;

		if(this.scrollable)
		return false;

		_self.layer.onmousewheel = function(e){
			e = e || event;
			_self.__preventDefault(e);
			_self.__stopBubble(e);
		};

		_self.layer.ontouchmove = function(e){
			e = e || event;
			_self.__preventDefault(e);
			_self.__stopBubble(e);
		};
	},

	//preventDefault
	__preventDefault : function(e){
		return e.preventDefault ? e.preventDefault() : (e.returnValue = false);
	},

	//stopPropagation
	__stopBubble : function(e){
		return e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
	},

	//绑定点击事件
	__bindEvent : function(){	
		var _self = this,
			url = this.url;

		if(!url || url == ""){
			this.hideWall();
			return false;
		}

		var imgs = document.getElementsByTagName("img"),
			check = function(target,condition,callback){
				callback = callback || function(){};
				for( var i = 0,img; img=imgs[i++]; ){
					var id = img.getAttribute("data-idx"),
						src = img.src;
					if( id && id == condition){
						target.setValues({
							url:src,
							callback : function(e){
								target.showWall();
								callback();
							}
						});
						return false;
					}
				}
			};

		this.layer.onclick = function(e){
			_self.custom();
		};

		this.next.onclick = function(e){
			e = e || event;
			_self.__preventDefault(e);
			_self.__stopBubble(e);
			check(_self,_self.idx * 1 + 1,function(){
				_self.idx++;
			});
		};

		this.prev.onclick = function(e){
			e = e || event;
			_self.__preventDefault(e);
			_self.__stopBubble(e);
			check(_self,_self.idx * 1 - 1,function(){
				_self.idx--;
			});
		};

	},

	//使提示框垂直居中
	__setMiddle : function(){
		var windowHeight = window.innerHeight || document.documentElement.clientHeight,
			dist = windowHeight - this.height;

		this.__setInnerStyle(this.ele, {
			"marginTop": dist / 2 + "px"
		});
	},

	//获取提示框高度
	__getHeight : function(){
		var ele = this.ele,
			layer = this.layer,
			style = layer.currentStyle || window.getComputedStyle(layer,"null"),
			display = style.display;

		this.display = display;

		if(display != "none"){
			this.height = ele.clientHeight;
			return false;
		}

		this.__setInnerStyle(layer,{
			visibility: "hidden",
			display: "block",
			position: "absolute"
		});
		this.height = ele.clientHeight;
		this.__delInnerStyle(layer,["visibility","display","position"]);
	},

	//方法函数，添加内联style
	__setInnerStyle : function(ele,opts){
		if(this.beforeIE7){
			this.__setInnerStyle = function(ele,opts){
				for( var key in opts ){
					ele.style[key] = opts[key];
				}
			}
		} else {
			this.__setInnerStyle = function(ele,opts){
				var temp = "",
					reg = /([A-Z]+)/g;
				for( var key in opts ){
					var kVal = opts[key],
						tpl = "";
					key = key.replace(reg,function(val){
						return "-" + val.toLowerCase();
					});
					tpl = key + ":" + kVal + ";";
					temp += tpl;
				}
				ele.style.cssText = temp;
			};
		}
		this.__setInnerStyle(ele,opts);
	},

	//方法函数, 删除内联style
	__delInnerStyle : function(ele,opts){
		if(this.beforeIE7){
			this.__delInnerStyle = function(ele){
				for( var key, i = 0; key = opts[i++]; ){
					ele.style[key] = "";
				}
			}
		} else {
			this.__delInnerStyle = function(ele){
				ele.style.cssText = "";
			}
		}
		this.__delInnerStyle(ele);
	}

};

if( typeof module != "undefined" && module.exports ){
	module.exports = new WantImgWall();
} else if( typeof define == "function" && define.amd ){
	define(function(){ return new WantImgWall();});
} else {
	window.wantImgWall = new WantImgWall();
}

})(window,document,Math,undefined);