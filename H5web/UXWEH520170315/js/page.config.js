define(['jquery'],function($){

var config = {};

var pageConfig = {
	pagelist : [
		{
			"name" : "工作坊",
			"id" : "workshop",
			"pageCache" : "",
			"sourceUrl" : "/weixintest/Getpast.action",
			"sourceData" : function(){
				return {
					userName:'userName01'
				};
			},
			"sources" : [{
				"wrapper":".past-workshop-box",
				"callback" : function(data){
					var results = data.resultArray,
						tempData = results,
						temp="";

					for( var i = 0, ndata; ndata = tempData[i++]; ){
						var templete = '<div class="past-item detail-link" data-id="'+ndata.intid+'" data-type="'+i+'" data-link="detail">'+
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
			"sourceData" : function(){
				return {
					userName:'userName01'
				};
			},
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
			"sourceData" : function(){
				return {
					userName:'userName01'
				};
			},
			"sources" : [],
			"callback" : function(pageDom){

			}
		},
		{
			"name" : "个人中心",
			"id" : "center",
			"pageCache" : "",
			"sourceUrl" : "/weixintest/Gettuserlist.action",
			"sourceData" : function(){
				return {
					userName:'userName01'
				};
			},
			"sources" : [{
				"wrapper" : ".center-msg",
				"callback" : function(data){
					if(data.strflg != "0"){
						window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx03f7bacd9247f9fd&redirect_uri=http%3a%2f%2fuxwetest.uxwe.org/%2fweixintest%2fUserCenterload.action&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
					}
					var userMsg = data.jsonusermessage,
					tpl = '<div class="center-msg-item msg-first-item">'+
								'<div class="user-head">'+
									'<img src="'+userMsg.strimageurl+'">'+
								'</div>'+
								'<div class="user-name">'+userMsg.strnickname+'</div>'+
								'<div class="user-edit">编辑资料</div>'+
							'</div>'+
							'<div class="center-msg-item">'+
								'<div class="center-label">工作领域</div>'+
								'<div class="user-job">'+userMsg.strjob+'</div>'+
							'</div>'+
							'<div class="center-msg-item">'+
								'<div class="center-label">工作年限</div>'+
								'<div class="user-workyear">'+userMsg.intworktime+'年</div>'+
							'</div>';

					return tpl;
				}
			},{
				"wrapper" : ".enroll-wrapper",
				"callback" : function(data){
					var items = data.resultarray,
						temp_1 = '<div class="swiper-slide">',
						temp_2 = '<div class="swiper-slide">',
						temp_3 = '<div class="swiper-slide">';

					for( var i = 0; item = items[i++]; ){
						var passed = item.strissuccess == "0" ? "pass" : item.strissuccess == "1" ? "unpass" : "",
							passTpl = passed ? ( passed == "pass" ? "已审核" : "很抱歉，审核未通过" ) : "审核中",
							started = item.intshowflg == "0" ? "已结束" : item.intshowflg == "1" ? "进行中" : "未开始",
							tpl = '<div class="enroll-item">'+
									'<div class="enroll-item-image">'+
										'<img src="'+item.strimgurl+'">'+
									'</div>'+
									'<div class="enroll-item-msg">'+
										'<div class="enroll-base-msg">'+
											'<div class="enroll-item-enTitle">'+
												item.strengname+
											'</div>'+
											'<div class="enroll-item-cnTitle">'+
												item.stractivename+
											'</div>'+
											'<div class="enroll-item-lecName">'+
												'主讲人：'+item.strteachername+
											'</div>'+
										'</div>'+
										'<div class="enroll-other-msg-box">'+
											'<div class="enroll-item-otherMsg">'+
												'<div class="enroll-item-isFree">免费</div>'+
												'<div class="enroll-item-hasStarted">'+started+'</div>'+
												'<div class="enroll-item-city">'+item.strcityname+'</div>'+
												'<div class="enroll-item-date">'+(item.strStartime.split(" "))[0]+'</div>'+
											'</div>'+
										'</div>'+
										'<div class="enroll-status-box">'+
											'<div class="enroll-hasEnrolled">已报名</div>'+
											'<div class="enroll-hasPassed" data-status="'+passed+'">'+passTpl+'</div>'+
										'</div>'+
									'</div>'+
								'</div>';

						temp_1 += tpl;
						if(passed == "pass"){
							temp_2 += tpl;
						} else {
							temp_3 += tpl;
						}
					}
					temp_1 += "</div>";
					temp_2 += "</div>";
					temp_3 += "</div>";

					return (temp_1+temp_2+temp_3);
				}
			}],
			"callback" : function(pageDom){
				$('.enroll-wrapper').find('.swiper-slide').hide().eq(0).show();
				$('.center-detail-nav').on("tap",'.center-detail-list',function(e){
					var $id = $(this).attr("data-id");
					$('.enroll-wrapper').find('.swiper-slide').hide().eq($id-1).show();
					$('.center-detail-list').removeClass("detail-choose");
					$(this).addClass('detail-choose');
				});
			}
		}

	]
};

var detailConfig = {
	pagelist : [
		{
			"name" : "活动详情",
			"id" : "detail",
			"sourceUrl" : "/weixintest/Getactivityfromid.action",
			"sourceData" : function(){
				return {
					intid:localStorage.aid
				};
			},
			"sources" : [
				{
					"wrapper" : ".detail-header",
					"callback" : function(data){
						var res = data.resultAactivity,
							tpl = '<div class="detail-title">'+
									'<div class="detail-cnTitle">'+res.strname+'</div>'+
									'<div class="detail-enTitle">'+res.strengname+'</div>'+
								'</div>'+
								'<div class="detail-msg">'+
									res.strcourse+
								'</div>';
						return tpl;
					}
				},{
					"wrapper" : ".detail-content",
					"callback" : function(data){
						var res = data.resultAactivity,
							date = (res.strstartime.split(" "))[0],
							tpl = '<div class="user-row">'+
										'<div class="user-name">'+res.strteachername+'</div>'+
										'<div class="user-job">'+res.strteachermesssage+'</div>'+
										'<div class="user-photo">'+
											'<img src="'+res.strteacherimgurl_origin+'">'+
										'</div>'+
									'</div>'+
									'<div class="detail-row">'+
										'<div class="detail-label">时间</div>'+
										'<div class="detail-data detail-time">'+date+'</div>'+
									'</div>'+
									'<div class="detail-row">'+
										'<div class="detail-label">地点</div>'+
										'<div class="detail-data detail-time">'+res.straddress+'</div>'+
									'</div>'+
									'<div class="detail-row">'+
										'<div class="detail-label">课程语言</div>'+
										'<div class="detail-data detail-time">'+res.strlanguage+'</div>'+
									'</div>'+
									'<div class="detail-row">'+
										'<div class="detail-row-title">课程摘要</div>'+
										'<div class="detail-row-content">'+
											res.strcourse+
										'</div>'+
									'</div>'+
									'<div class="detail-row">'+
										'<div class="detail-row-title">背景介绍</div>'+
										'<div class="detail-row-content">'+
											res.strbackground+
										'</div>'+
									'</div>'+
									'<div class="detail-row">'+
										'<div class="detail-row-title">参加者获益</div>'+
										'<div class="detail-row-content">'+
											'-介绍『故事图谱』方法； <br/><br/>'+
											'- 讲解『故事图谱』法在成功品牌产品中的运用； <br/><br/>'+
											'- 详细叙述『起』『承』『转』『合』故事图谱的关键流；<br/><br/>'+
											'- 团队模拟练习；'+
										'</div>'+
									'</div>';

						return tpl;
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