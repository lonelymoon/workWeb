window.onload=function()
	{ 
	//alert("初始化加载");
	
	}; 
 
var signurl = window.location.href; 	
jQuery(function($){
	//alert("进入控制");
	$.ajax({
        type:'post',
        url:'/uxpa/WeixinShare.action',   			
        data:{signurl:signurl},   
        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
        success:function(data){                     	
        	/*alert("timestamp==" + data.timestamp);  
        	alert("nonceStr==" + data.nonceStr);  
        	alert("signature==" + data.signature); */                                           
        	wx.config({
        		debug: false, 
        		appId: 'wxa3ae062e872b92db',
        		timestamp: data.timestamp,
        		nonceStr: data.nonceStr,
        		signature: data.signature,
        		jsApiList: [
        		            'checkJsApi',
        		            'onMenuShareTimeline',
        		            'onMenuShareAppMessage',
        		            'hideMenuItems'
        		            ]
        			});		
         	},
        error:function(){   
            	  // alert("error occured!!!右上角控制");
            }                          
      });
});
            
wx.ready(function () {
	 //alert("具提控制开始");
	wx.hideMenuItems({
		menuList: [  // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		            'menuItem:exposeArticle',
					'menuItem:refresh',
					'menuItem:share:qq',
					'menuItem:share:QZone',
					'menuItem:copyUrl',
					/*'menuItem:share:appMessage',
					'menuItem:share:timeline',*/
					'menuItem:openWithSafari'  						 	
				  ] 
		});
         // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
       wx.onMenuShareTimeline({
             title: 'UXPA英国游学报名',
             link: 'http://uxpa.aochey.com/UXPAH5/index.html',
             imgUrl: 'http://uxpa.aochey.com/UXPAH5/images/logoshare.png',
             trigger: function (res) {
                  // alert("分享到朋友圈按钮点击");    
            	 
             },
             success: function (res) {
            	// alert("分享到朋友圈成功");
            	/* $.ajax({  
            	        type:'get',
            	        url:'/theloaf/servlet/ShareLogCurrencyServlet',   			
            	        data:{sharetype:encodeURI("分享到朋友圈")},   
            	        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
            	        success:function(data){                     	
            	        	alert("分享记录记录成功");
            	        					
            	         	},
            	        error:function(){   
            	        	alert("分享记录记录失败");
            	            }                          
            	      })*/;
             },
             cancel: function (res) {
                // alert('分享到朋友圈已取消');
             },
             fail: function (res) {
                // alert(JSON.stringify(res));
             }
         });
         
         wx.onMenuShareAppMessage({
 			title: 'UXPA英国游学报名', // 分享标题
 			desc: 'UXPA英国游学报名', // 分享描述
 			link: 'http://uxpa.aochey.com/UXPAH5/index.html', // 分享链接
 			imgUrl: 'http://uxpa.aochey.com/UXPAH5/images/logoshare.png', // 分享图标
 			type: '', // 分享类型,music、video或link，不填默认为link
 			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
 			success: function () { 
           	// alert("发送给朋友成功");
        	/* $.ajax({  
        	        type:'get',
        	        url:'/theloaf/servlet/ShareLogCurrencyServlet',   			
        	        data:{sharetype:encodeURI("发送给朋友")},   
        	        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
        	        success:function(data){                     	
        	        	alert("分享记录记录成功");
        	        					
        	         	},
        	        error:function(){   
        	        	alert("分享记录记录失败");
        	            }                          
        	      });*/
 			},
				 cancel: function () { 
				// alert("分取消了是干撒友");  
     		// 用户取消分享后执行的回调函数
				 }
			});
     });


	/*var _hmt = _hmt || [];
	(function() {
  	var hm = document.createElement("script");
  	hm.src = "//hm.baidu.com/hm.js?9a124c1b3fa9f0e9234d8f58e8563bf6";
  	var s = document.getElementsByTagName("script")[0]; 
  	s.parentNode.insertBefore(hm, s);
	})();*/
	 