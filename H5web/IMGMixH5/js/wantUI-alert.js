/*
** alert UI js
*  ver 1.0.0
*  17.04.17
*/

(function(window,document,Math){

var WantAlert = function(options){
	this.layer = document.getElementById("wantUI-alert-box");
	this.ele = document.getElementById('wantUI-alert-dialog-box');
	this.beforeIE7 = document.querySelector ? false : true;
	this.init();
};

WantAlert.prototype = {

	init : function(){
		this.title = document.getElementById("wantUI-alert-title").innerHTML;
		this.msg = document.getElementById("wantUI-alert-msg").innerHTML;
		this.btn = document.getElementById("wantUI-alert-btn").innerHTML;
		this.callback = function(){};
		this.__getHeight();
		this.__setMiddle();
	},

	//显示提示框
	showAlert : function(){
		if( this.display != "none" )
		return false;

		this.__setInnerStyle(this.layer,{
			display:"block"
		});
		this.display = "block";

		this.__initEvent();
	},

	//隐藏提示框
	hideAlert : function(){
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

		/********提示框标题*********/

		//是否显示标题
		this.showTitle = options.showTitle === false ? 
						false : 
						(options.showTitle || (this.showTitle === false ? false : true) );
						
		this.title = options.title || this.title || "提示信息";

		/********提示框标题*********/

		this.msg = options.msg || this.msg || "您触发了一个提示";

		/********提示框按钮*********/

		this.btn = options.btn || this.btn || "我知道了";
		//按钮点击后的回调函数
		this.callback = options.callback || this.callback || function(){};

		/********系统选项*********/

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
		this.hideAlert();
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
		var title = document.getElementById("wantUI-alert-title"),
			msg = document.getElementById("wantUI-alert-msg"),
			btn = document.getElementById("wantUI-alert-btn");

		if(!this.showTitle){
			this.__setInnerStyle(title,{
				display:"none"
			});
		} else {
			this.__setInnerStyle(title,{
				display:"block"
			});
		}

		title.innerHTML = this.title;
		msg.innerHTML = this.msg;
		btn.innerHTML = this.btn;
	},

	//preventDefault
	__preventDefault : function(e){
		return e.preventDefault ? e.preventDefault() : e.returnValue = false;
	},

	//stopPropagation
	__stopBubble : function(e){
		return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
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

	//绑定点击事件
	__bindEvent : function(){	
		var _self = this,
			bt = document.getElementById("wantUI-alert-btn");

		bt.onclick = function(e){
			_self.custom();
			_self.callback.call(_self,e);
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
					var kVal = opts[key];
					key = key.replace(reg,function(val){
						return "-" + val.toLowerCase();
					});
					var tpl = key + ":" + kVal + ";";
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

if( typeof module != 'undefined' && module.exports ){
	module.exports = new WantAlert();
} else if( typeof define == "function" && define.amd ){
	define(function(){ return new WantAlert();});
} else {
	window.wantAlert = new WantAlert();
}

})(window,document,Math,undefined);