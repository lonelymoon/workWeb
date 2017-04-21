(function(window,undefined){

	var utils = uxwe.addSpace('utils');

	utils.crtElement = function(tagName,options){

		var el = document.createElement(tagName);

		for( var key in options ){
			el.setAttribute(key,options[key]);
		}

		return el;
	};

	utils.insertBefore = function(parent,ele){
		if(!ele || typeof ele != "object"){
			return false;
		}

		var p = this.getElements(parent),
			fChild;

		for( var i = 0, par; par = p[i++]; ){
			fChild = par.childNodes[0];
			fChild ? par.insertBefore(ele,fChild) : par.appendChild(ele);
		}

	};

	utils.css3Transform = function(ele,key,value){
		ele.style.webkitTransform = key+value;
		ele.style.mozTransform = key+value;
		ele.style.oTransform = key+value;
		ele.style.transform = key+value;
	};

	utils.getEles = function(eles){
		if( typeof(eles) == "string" ){
			eles = this.getElements(eles);
		} else if(Object.prototype.toString.call(eles) != "[object NodeList]"){
			eles = [eles].concat();
		}

		return eles;
	};

	utils.hasClass = function(ele,className){
		if(!className || className == ""){
			return false;
		}

		if( typeof(ele) == "string" ){
			ele = this.getElement(ele);
		}

		var eCls = ele.className,
			eClsArr = eCls.split(" ");

		for(var i = 0, clsName; clsName = eClsArr[i++]; ){
			if( clsName == className ){
				return true;
			}
		}

		return false;
	};

	utils.addClass = function(eles,className){
		if(!className || className == ""){
			return false;
		}

		eles = this.getEles(eles);

		for( var i = 0, ele; ele = eles[i++]; ){
			var cls = " " + className,
				eCls = ele.className;

			ele.className = eCls + cls;
		}
	};

	utils.removeClass = function(eles,className){
		if(!className || className == ""){
			return false;
		}

		eles = this.getEles(eles);

		for( var i = 0, ele; ele = eles[i++]; ){
			if(this.hasClass(ele,className)){

				var eCls = " " + ele.className + " ",
					eClsRemoved = eCls.replace(" "+className+" "," "),
					eClsRemoved = eClsRemoved.replace(/(^\s+)|(\s+$)/g,"");

				ele.className = eClsRemoved;

			}
		}
	};

	utils.removeAttr = function(eles,attr){
		eles = this.getEles(eles);
		for( var i = 0, ele; ele = eles[i++]; ){
			ele.removeAttribute(attr);
		}
	};

	utils.getElements = function(selector){
		return selector.tagName? [selector] : document.querySelectorAll(selector);
	};

	utils.getElement = function(selector){
		return this.getElements(selector)[0];
	};

	utils.getTargetNode = function(ele,selector){

		if(ele === document){
			return false;
		}

		//获取目标节点
		if(/^\.+/.test(selector)){
			if(this.hasClass(ele,selector.substring(1))){
				return ele;
			} else {
				return this.getTargetNode(ele.parentNode,selector);
			}
		} else if(/^#+/.test(selector)){
			if(ele.id && ele.id == selector.substring(1)){
				return ele;
			} else {
				return this.getTargetNode(ele.parentNode,selector);
			}
		} else {
			if(ele.tagName.toLowerCase() == selector){
				return ele;
			} else {
				return this.getTargetNode(ele.parentNode,selector);
			}
		}
	};

	utils.getParent = function(ele,selector){
		var parent = ele.parentNode;
		return this.getTargetNode(parent,selector);
	};

	utils.getParents = function(ele,selector){
		var parent = ele.parentNode,
			parents = [];

		while(parent){
			var target = this.getTargetNode(parent,selector);
			if(target){
				parents.push(target);
				parent = target.parentNode;
			} else {
				parent = null;
			}
		}

		return parents;
	};

	utils.find = function(ele,selector){
		return this.children(ele,selector)[0];
	};

	utils.children = function(ele,selector){
		return ele.querySelectorAll(selector);
	};

	utils.getFullUrl = function(){
		return window.location.href;
	};

	utils.getUrl = function(){
		var url = this.getFullUrl();
		return url.substring(0,url.indexOf('?'));
	};

	utils.getUrlDetails = function(){
		var url = this.getFullUrl();
		return url.substring(url.indexOf('?')+1);
	};

	utils.getUrlObjs = (function(){
		var tempObjs = {},
			hasGet = false;

		return function(){
			if(hasGet)
			return tempObjs;

			var reg = /([^&=?]+)=([^&=?]*)/g,
			details = this.getUrlDetails();

			details.replace(reg,function(str,$1,$2){
				var key = decodeURIComponent($1),
					value = decodeURIComponent($2);

				tempObjs[key] = value + "";

				return str;
			});

			hasGet = true;
			return tempObjs;
		}

	})();

	utils.getUrlObj = function(key){
		var objs = this.getUrlObjs();
		return objs[key];
	};

	utils.ajax = function(options){
		var xhr = new XMLHttpRequest(),
			method = options.method || "post",
			url = options.url || "",
			data = options.data || {},
			dataType = options.dataType || "",
			async = options.async === false ? false : true ,
			success = options.success || function(){},
			fail = options.fail || function(){},
			loadStart = options.loadStart || function(){},
			loadEnd = options.loadEnd || function(){},
			uploading = options.uploading || function(){},
			downloading = options.downloading || function(){},
			timeout = options.timeout || 5000,
			formData = new FormData();
			
		xhr.open(method,url,async);
		
		if(async){
			xhr.responseType = dataType;
			xhr.timeout = timeout;
		}	

		xhr.onloadstart = function(e){
			loadStart.call(this,e);
		};

		xhr.onload = function(e){
			if( xhr.status >= 200 && xhr.status < 300 ){
				success.call(this,xhr.response);
			}
		};

		xhr.onloadend = function(e){
			loadEnd.call(this,e);
		};

		xhr.onerror = function(e){
			fail.call(this,xhr.status);
		};

		xhr.ontimeout = function(e){
			fail.call(this,xhr.status);
		};

		xhr.upload.onprogress = function(e){
			uploading.call(this,e);
		};

		xhr.onprogress = function(e){
			downloading.call(this,e);
		};

		for( var key in data ){
			formData.append(key,data[key]);
		}
			
		try{
			xhr.send(formData);
		}catch(e){
			alert("请求功能并未被执行，可能与网络环境有关");
		}

	};

	utils.on = function(selectorP, event, selectorC, callback){
		var _self = this,
			els = this.getElements(selectorP),
			trueTarget,
			hasDepute = true;  //是否存在委托

		if(!callback){
			callback = selectorC;
			hasDepute = false;
		}

		for( var i = 0, el; el = els[i++]; ){
			el.addEventListener(event,function(e){
				trueTarget = this;
				if(hasDepute){
					var tar = e.target || event.target;
					trueTarget = _self.getTargetNode(tar,selectorC);
				}

				if(trueTarget)
				callback.call(trueTarget,e);
			},false);
		}

	};

	utils.off = function(selector,event,fn){
		var _self = this,
			els = this.getElements(selector);

		for( var i = 0, el; el = els[i++]; ){
			el.removeEventListener(event,fn,false);
		}

	};

	utils.getDate = function(date){
		if(date){
			date = date.replace(/-/g,"/");
		} else {
			date = new Date();
		}

		return new Date(Date.parse(date));
	};

	utils.getTime = function(date){
		return this.getDate(date).getTime();
	};

	utils.getYear = function(date){
		return this.getDate(date).getFullYear();
	};

	utils.getMonth = function(date){
		return this.getDate(date).getMonth() + 1;
	};

	utils.getDay = function(date){
		return this.getDate(date).getDate();
	};

	utils.getWeekDay = function(date){
		return this.getDate(date).getDay();
	};

	utils.getWeekDayCn = function(date){
		var weeks = ["日","一","二","三","四","五","六"];
		return weeks[this.getWeekDay()];
	};

	utils.getHours = function(date){
		return this.getDate(date).getHours();
	};

	utils.getMinutes = function(date){
		return this.getDate(date).getMinutes();
	};

	utils.getSeconds = function(date){
		return this.getDate(date).getSeconds();
	};

	utils.getMSeconds = function(date){
		return this.getDate(date).getMilliseconds();
	};

	utils.strDate = function(date){
		var t = this.getDate(date),
			year = this.getYear(t),
			month = this.getMonth(t),
			date = this.getDay(t),
			hour = this.getHours(t),
			min = this.getMinutes(t),
			sec = this.getSeconds(t);

		return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
	};

	utils.getLeftTime = function(date,date2){
		if(!date){
			return false;
		}

		return (this.getTime(date) - this.getTime(date2));
	};

	utils.getLeftSeconds = function(date,date2){
		return (this.getLeftTime(date,date2) / 1000) >> 0;
	};

	utils.getLeftMinutes = function(date,date2){
		return (this.getLeftSeconds(date,date2) / 60) >> 0;
	};

	utils.getLeftHours = function(date,date2){
		return (this.getLeftMinutes(date,date2) / 60) >> 0;
	};

	utils.getLeftDay = function(date,date2){
		return Math.round(this.getLeftHours(date,date2) / 24);
	};

	utils.getLeftDate = function(date,date2){
		if(!date){
			return false;
		}

		var leftTime = this.getLeftTime(date,date2),
			dayCount = (1000 * 60 * 60 * 24),
			hourCount = (60 * 60 * 1000),
			minCount = (60 * 1000),
			secCount = 1000;

		var day = (leftTime / dayCount) >> 0,
			hour = ((leftTime - day * dayCount) / hourCount) >> 0,
			min = ((leftTime - day * dayCount - hourCount * hour) / minCount) >> 0,
			sec = ((leftTime - dayCount * day - hourCount * hour - min * minCount) / secCount ) >> 0;

		return [day,hour,min,sec];

	};

	utils.animate = function(selector,options,timeout,callback){

	};

})(window);