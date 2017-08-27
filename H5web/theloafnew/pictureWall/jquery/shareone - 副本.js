window.onload=function(){ 
	/*alert("初始化加载"); */
	}; 
 
     var signurl = window.location.href; 	
	 $.ajax({  
       				type:'get',
                    url:'http://java1.weilufei.com/theloafnew/servlet/ShareServlet',   			
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
            

	 