// head
(function(w){
	w.pageInfo = {};

	var useragent = w.navigator.userAgent;

	// 判断是否online版中
	pageInfo.isOnline =  !/(iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|ws\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser)/i.test(useragent);

	// 判断是否在app中
	pageInfo.isInApp = useragent.indexOf('CtripWireless') >= 0 ;
	if(typeof (w.localStorage) != "undefined"){
		pageInfo.isInApp = pageInfo.isInApp || w.localStorage.getItem('isInApp') == '1' || w.localStorage.getItem('ISINAPP') == '1';
	}
	pageInfo.isIE = useragent.indexOf('MSIE') >= 0;

	if(pageInfo.isInApp){
		pageInfo.device = 'app';
	}else if(pageInfo.isOnline){
		pageInfo.device = 'online';

	}else {
		pageInfo.device = 'h5';
	}

	// 修改页面head信息
	if(document.title == ''){
	    document.title = '"星球大战" 夏季特推';
	}
	
})(window);

// online公用头配置
var globalConfig = {
	//bt类型，默认为default,没有一二级频道选中，若需选中一二频道请联系（R&D 基础业务 用户中心-用户组成员）
	BusinessType: 'default',
	//环境选'other'即可
	Environment: 'other',
	// NeedNav:'0',
	Version:''  //3.0对应响应式版本
	
};



