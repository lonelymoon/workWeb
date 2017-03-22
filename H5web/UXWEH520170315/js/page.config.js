define(function(){

var config = {};

var pageConfig = {
	pagelist : [
		{
			"name" : "工作坊",
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
			"name" : "讲师介绍",
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