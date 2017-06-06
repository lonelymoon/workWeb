(function(window,document,Math,undefined){

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

var css3DM = function(opts){
	opts = opts || {};
	this.height = opts.height || 40; 	//css中每条弹幕的高度，默认40
	this.paddingTop = opts.paddingTop || 10; //第一行距顶部的距离
	this.space = opts.space || 10; //弹幕间的间距

	this.wrapper = document.querySelector('.css3DM-DMBox');
};

css3DM.prototype = {
	init : function(){
		this.DMArray = []; 	//弹幕数组
		this.rowArray = []; 	//行
		this.TplArray = []; //目前已有的弹幕模板

		this.getWrapperSize();
		this.getData();
	},

	//获取容器size
	getWrapperSize : function(){
		var wrapper = this.wrapper;
		this.wrapperWidth = wrapper.clientWidth;
		this.wrapperHeight = wrapper.clientHeight;
		this.countRow();
	},

	//进入全屏
	enterFullScreen : function(){
		this.wrapperWidth = window.screen.width;
		this.wrapperHeight = window.screen.height;
		this.countRow();
	},

	//计算row数
	countRow : function(){
		this.rowNum = ( ( this.wrapperHeight - this.paddingTop ) / (this.height + this.space) ) >> 0;
		this.setRow();
	},

	//设置row
	setRow : function(){
		this.rowArray = [];
		for( var j = 0; j < this.rowNum; j++ ){
			this.rowArray.push({
				rid : j+1,
				using : false
			});
		}
	},

	//获取空闲行
	getRow : function(){
		for( var i = 0 , row; row = this.rowArray[i++]; ){
			if( !row.using ){
				return row;
			}
		}

		return false;
	},

	//获取数据
	getData : function(){
		this.setData();
	},

	//设置数据
	setData : function(){
		for( var i = 0; i < 5; i++ ){
			var obj = {};
			obj.img = "1.jpg";
			obj.text = "我是弹幕";
			this.DMArray.push(obj);
		}

		this.loop();
	},

	//添加数据
	addData : function(obj){
		this.DMArray.push(obj);
	},

	//添加数据(群)
	addDatas : function(arr){
		this.DMArray = this.DMArray.concat(arr);
	},

	//开始显示弹幕
	showDM : function(){
		var DM = this.DMArray.shift();
		if(!DM) 
		return false;
		
		var row,tpl,div;

		row = this.getRow() || { rid : ((1 + Math.random() * this.rowNum) >> 0), using : false, fast: true };
		row.using = true;
		div = document.createElement("div");
		div.className = "css3DM-DMList";
		div.setAttribute("data-type","end");
		div.setAttribute("data-status","stop");
		div.style.top = ( this.height + this.space ) * (row.rid - 1) + this.paddingTop + "px";

		tpl = '<div class="css3DM-DMphoto">'+
				'<img src="'+DM.img+'" />'+
			'</div>'+
			'<div class="css3DM-DMtext">'+DM.text+'</div>';

		div.innerHTML = tpl;
		this.wrapper.appendChild(div);
		this.listens(div,row);
	},

	listens : function(ele,row){
		var _self = this;
		setTimeout(function(){
			_self.listen(ele,row);
		},15);
	},

	//监听动画完结
	listen : function(ele,row){
		if( "transitionEnd" in document ){
			this.listen = function(ele,row){
				var _self = this,
					random = (Math.random() * 4 + 1) >> 0,
					type = row.fast ? "fastStart"+random : "start";
				ele.addEventListener("transitionEnd",function(e){
					_self.end(ele,row);
				},false);
				ele.setAttribute("data-type",type);
				ele.setAttribute("data-status","running");
				var width = ele.querySelector(".css3DM-DMtext").clientWidth + this.height,
					pos,timer;
				timer = setTimeout(function(){
					pos = ele.getBoundingClientRect().left;
					if(_self.wrapperWidth > pos + width){
						row.using = false;
						clearTimeout(timer);
						return false;
					}
					setTimeout(arguments.callee,1000);
				},1500);
			};
		} else {
			this.listen = function(ele,row){
				var _self = this,
					random = (Math.random() * 4 + 1) >> 0,
					type = row.fast ? "fastStart"+random : "start";
				ele.addEventListener("webkitTransitionEnd",function(e){
					_self.end(ele,row);
				},false);
				ele.setAttribute("data-type",type);
				ele.setAttribute("data-status","running");
				var width = ele.querySelector(".css3DM-DMtext").clientWidth + this.height,
					pos,timer;
				timer = setTimeout(function(){
					pos = ele.getBoundingClientRect().left;
					if(_self.wrapperWidth > pos + width){
						row.using = false;
						clearTimeout(timer);
						return false;
					}
					setTimeout(arguments.callee,1000);
				},1500);
			};
		}

		this.listen(ele,row);
	},

	//结束滚动以后
	end : function(ele,row){
		ele.style.display = "none";
		this.wrapper.removeChild(ele);
	},

	loop : function(){
		var _self = this;
		requestAnimationFrame(function(){
			_self.loop();
		});
		this.showDM();
	}

};

window.css3DM = css3DM;

})(window,document,Math);