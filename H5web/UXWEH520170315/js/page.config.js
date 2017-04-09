define(function(){

var config = {};

var pageConfig = {
	pagelist : [
		{
			"name" : "工作坊",
			"id" : "workshop",
			"pageCache" : "",
			"sourceUrl" : "/weixintest/Getpast.action",
			"sources" : [{
				"wrapper":".past-workshop-box",
				"callback" : function(data){
					var results = res.resultArray,
						tempData = results,
						temp="";

					for( var i = 0, ndata; ndata = tempData[i++]; ){
						var templete = '<div class="past-item" data-id="'+ndata.intid+'" data-type="'+i+'">'+
									'<div class="past-item-msg">'+
										'<div class="past-item-cnTitle">'+ndata.strname+'</div>'+
										'<div class="past-item-enTitle">'+ndata.strengname+'</div>'+
										'<div class="past-item-lecName">作者 '+ndata.strteachername+'</div>'+
									'</div>'+
									'<div class="past-item-image">'+
										'<img src="images/loading.gif" data-origin="'+ndata.strimgurl+'" data-status="unload" class="lazy-img">'+
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
			"name" : "讲师介绍",
			"id" : "lecturer",
			"pageCache" : "",
			"sourceUrl" : "/weixintest/Getnear5.action",
			"sources" : [
				{
					"wrapper" : ".lecturer-box",
					"callback" : function(data){
						var tempData = data.resultArray,temp="";

						for( var i = 0, ndata; ndata = tempData[i++]; ){
							var templete = '<div class="lec-item" data-id="'+ndata.intid+'" data-type="'+i+'">'+
												'<div class="lec-item-image">'+
													'<img src="images/loading.gif" class="lazy-img" data-status="unload" data-origin="'+ndata.strimgurl+'">'+
												'</div>'+
												'<div class="lec-item-job">'+ndata.strmesssage+'</div>'+
												'<div class="lec-item-lecName">'+ndata.strname+'</div>'+
											'</div>';

							temp += templete;

						}

						return temp;
					}
				}
			],
			"callback" : function(pageDom){

			}
		},
		{
			"name" : "关于我们",
			"id" : "about",
			"pageCache" : "",
			"sourceUrl" : "",
			"sources" : [],
			"callback" : function(pageDom){

			}
		},
		{
			"name" : "个人中心",
			"id" : "center",
			"pageCache" : "",
			"sourceUrl" : "",
			"sources" : [],
			"callback" : function(pageDom){

			}
		}

	]
};

var detailConfig = {
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

config.menuPage = pageConfig;
config.detailPage = detailConfig;

return config;
});