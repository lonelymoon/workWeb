window.onload=function(){ 
	/*alert("初始化加载"); */
	}; 
 
     var signurl = window.location.href; 	
	 $.ajax({  
       				type:'get',
                    url:'http://theloaf.aochey.com/theloafnew/servlet/ShareServlet',   			
                    data:{signurl:signurl},   
                    dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
                    success:function(data){                     	
                    	/* alert("1" + data.timestamp);  
                    	alert("1" + data.nonceStr);  
                    	alert("1" + data.signature);  */                                             
                         wx.config({
            				debug: false, 
            				appId: 'wx75b12a25811faafb',
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
                     	$('body').append("<div>"+"555" + "</div>").css("color","red");
                      /*   alert("error occured!!!右上角控制"); */
                    }   
                       
            });
            
	 wx.ready(function () {
	        
     	wx.hideMenuItems({
				menuList: [  // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			 		'menuItem:exposeArticle',
					'menuItem:refresh',
					'menuItem:share:qq',
					'menuItem:share:QZone',
					'menuItem:copyUrl',
					'menuItem:openWithSafari'  						 	
					] 
				});
         // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
         wx.onMenuShareTimeline({
             title: '快来参加乐枎照片墙，美食每刻就要拍',
             link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx75b12a25811faafb&redirect_uri=http%3a%2f%2fjava1.weilufei.com%2ftheloafnew%2fservlet%2fLoginServlet&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect',
             imgUrl: 'http://theloaf.aochey.com/theloafnew/upload/share_logo_2.jpg',
             trigger: function (res) {
                  /* alert("分享到朋友圈按钮点击");  */       
             },
             success: function (res) {
            	 //alert("分享到朋友圈成功");
            	 $.ajax({  
            	        type:'get',
            	        url:'http://theloaf.aochey.com/theloafnew/servlet/ShareLogCurrencyServlet',   			
            	        data:{sharetype:encodeURI("分享到朋友圈")},   
            	        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
            	        success:function(data){                     	
            	        	//alert("分享记录记录成功");
            	        					
            	         	},
            	        error:function(){   
            	        	//alert("分享记录记录失败");
            	            }                          
            	      });
             },
             cancel: function (res) {
                 /* alert('已取消');*/
             },
             fail: function (res) {
                /* alert(JSON.stringify(res));*/
             }
         });
         
         wx.onMenuShareAppMessage({
 			title: '快来参加乐枎照片墙，美食每刻就要拍', // 分享标题
 			desc: '我在乐枎墙上传了一张照片，免费赢好礼，你也来上传吧～', // 分享描述
 			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx75b12a25811faafb&redirect_uri=http%3a%2f%2fjava1.weilufei.com%2ftheloafnew%2fservlet%2fLoginServlet&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect', // 分享链接
 			imgUrl: 'http://theloaf.aochey.com/theloafnew/upload/share_logo_2.jpg', // 分享图标
 			type: '', // 分享类型,music、video或link，不填默认为link
 			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
 			success: function () { 
 	           	 //alert("发送给朋友成功");
 	        	 $.ajax({  
 	        	        type:'get',
 	        	        url:'http://theloaf.aochey.com/theloafnew/servlet/ShareLogCurrencyServlet',   			
 	        	        data:{sharetype:encodeURI("发送给朋友")},   
 	        	        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
 	        	        success:function(data){                     	
 	        	        	//alert("分享记录记录成功");
 	        	        					
 	        	         	},
 	        	        error:function(){   
 	        	        	//alert("分享记录记录失败");
 	        	            }                          
 	        	      });
 			},
				 cancel: function () { 
				/* alert("分取消了是干撒友");  */
     		// 用户取消分享后执行的回调函数
				 }
			});
     });


	var _hmt = _hmt || [];
	(function() {
  	var hm = document.createElement("script");
  	hm.src = "//hm.baidu.com/hm.js?9a124c1b3fa9f0e9234d8f58e8563bf6";
  	var s = document.getElementsByTagName("script")[0]; 
  	s.parentNode.insertBefore(hm, s);
	})();
	 