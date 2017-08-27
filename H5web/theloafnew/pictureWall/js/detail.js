var cnt = document.querySelector("#content"),
	ev = "ontouchstart" in document ? "touchend" : "click",
	hasMoved = false,
	canclick = true;

var intro = document.querySelector(".comment-submit"),
	commentBox = document.querySelector(".comment-add"),
	exit = document.querySelector(".exit"),
	comfirm = document.querySelector(".comfirm"),
	comments = document.getElementById("comment-text"),
	share = document.querySelector(".share"),
	layer = document.querySelector(".layer");


cnt.addEventListener("touchstart",function(e){
	hasMoved = false;
},false);

cnt.addEventListener("touchmove",function(e){
	hasMoved = true;
},false);

cnt.addEventListener(ev,function(e){
	if(!canclick)
	return;
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;

		e.stopPropagation();

		tar = matchClass(tar,new RegExp(/^like$/));

		if(!hasMoved){
			//like(tar);
		}
		
},false);

intro.addEventListener(ev,function(e){
	var imgs = intro.querySelectorAll("img"),
		dis = new RegExp(/(\\b)*display(\\b)*/);

	for(var i=0,j=imgs.length;i<j;i++){
		if(dis.test(imgs[i].className)){
			imgs[i].className = imgs[i].className.replace(dis,"")
		} else {
			imgs[i].className += " display ";
		}
	}

	var bt = intro.querySelector('.text-bt');

	if(!bt.getAttribute("style") || bt.getAttribute("style")=="color: rgb(255, 255, 255);")
	intro.querySelector('.text-bt').style.color = "rgba(245,167,14,1)";
	else
	intro.querySelector('.text-bt').style.color = "#ffffff";	
	commentBox.style.display = "block";
},false);

exit.addEventListener(ev,function(e){
	e = e || event;
	e.preventDefault();
	e.stopPropagation();
	commentBox.style.display = "none";
},false);

comfirm.addEventListener(ev,function(e){
	var val = comments.value.replace(/\s/g,"");

	if(!val || val == ""){
		alert("请勿输入空值");
		return;
	}

	commentBox.style.display = "none";
	$.ajax({  
		type:'post',
   		url:'http://theloaf.aochey.com/theloafnew/servlet/AcommentpictrueServlet',   			
    	data:{openid:linkObj.openid,pictrueid:linkObj.pid,commentdescription:encodeURI(val)},   
    	dataType:'json',  
   		success:function(data){       
    	    window.location.href = window.location.href;                    				
    	},
    	error:function(){   
        	alert("评论失败");
    	}
	});
	
},false)


share.addEventListener(ev,function(e){
	layer.style.display = "block";
	document.querySelector("html,body").style.height = "100%";
	document.querySelector("html,body").style.maxheight = "100%";
	document.querySelector("html,body").style.overflow = "hidden";
},false);

layer.addEventListener(ev,function(e){
	layer.style.display = "none";
	document.querySelector("html,body").style.height = "auto";
	document.querySelector("html,body").style.maxheight = "auto";
	document.querySelector("html,body").style.overflow = "auto";
},false);

function matchClass(tar,reg){
	while(tar)
	if(!reg.test(tar.className)){
		tar = tar.parentNode;
	} else {
		return tar;
	}
}

function like(tar){
	var imgs = tar.querySelectorAll("img"),
		dis = new RegExp(/(\\b)*display(\\b)*/);

	canclick = false;

	

	for(var i=0,j = imgs.length;i<j;i++){
		if(dis.test(imgs[i].className)){
			imgs[i].className = imgs[i].className.replace(dis,"")
		} else{
			imgs[i].className += " display ";
		}
	}

	var likeNum = tar.querySelector(".likeNum").innerHTML;

	if(tar.getAttribute("data-loved") == "true"){
		tar.querySelector(".likeNum").innerHTML = Number(likeNum) - 1;
		goAjax(false,tar);
		tar.setAttribute("data-loved",false);
	}else{
		tar.querySelector(".likeNum").innerHTML = Number(likeNum) + 1;
		goAjax(true,tar);
		tar.setAttribute("data-loved",true);
	}
}


function goAjax(beLoved,tar){	
	$.ajax({  
		type:'get',
	    url:'http://theloaf.aochey.com/theloafnew/servlet/PraisepictrueServlet',   			
	    data:{openid:linkObj.openid,imgId:linkObj.pid},   
	    dataType:'json',
	    success:function(data){       
	    	canclick = true;                               				
	    },
	    error:function(){   
	     	alert("error");
	    }     
	});
}

function startLoad(){
	var shareimg = "";
	var thtml = "",
		discre = "",
		html = "",
		like = "display",
		dislike = "";

	$.ajax({  
		type:'get',
	    url:'http://theloaf.aochey.com/theloafnew/servlet/GetonepictrueServlet',   			
	    data:{openid:linkObj.openid,imgId:linkObj.pid},   
	    dataType:'json',
	    async : false,
	    success:function(data){    
	    	shareimg = data.ImgUrl;
	    	$('header').attr("style","background: url("+data.ImgUrl+") no-repeat top center;background-size: cover;");                      				
	    	
	    	if(data.monthmonth > -1){
	    		thtml += '<span class="rank-icon"><img src="images/detailPage/crown_m.png" /></span>';
	    	}
	    	if(data.weekking > -1){
	    		thtml += '<span class="rank-icon"><img src="images/detailPage/crown_w.png" /></span>';
	    	}
	    	$('rank').html(thtml);

	    	if(data.love){
	    		like = "";
	    		dislike = "display";
	    	}

	    	var temp = '<div class="like" data-loved="'+data.love+'" data-id="'+data.Id+'">'+
					'<div class="likeImage">'+
						'<img src="images/detailPage/heart_red.png" class="likeImages '+like+'" />'+
						'<img src="images/detailPage/heart_white.png" class="likeImages '+dislike+'" />'+
					'</div>'+
					'已有<em class="likeNum">'+data.PraiseNumber+'</em>人点赞'+
				'</div>'+
				'<div class="comment-show"></div>';

			discre = '<div class="comment-list owner-comment">'+
				'<div class="comment-user-photo">'+
					'<img src="'+data.Headimgurl+'" />'+
				'</div>'+
				'<div class="comment-user-text">'+
					'<div class="user-msg">'+data.Nickname+
					'</div>'+
					'<div class="comment-text">'+data.ImgDescription+
					'</div>'+
				'</div>'+
				'<div class="post-time">'+data.CreateTimeYYYYMMDD.substr(5,11)+
				'</div>'+
			'</div>';

	    	$('#content').html(temp);

		var lk = document.querySelector(".like");		
		lk.addEventListener('touchstart',function(e){
			var e = e || event;
			e.stopPropagation();
			e.preventDefault();
			window.like(lk);
		},false);
	    },
	    error:function(){   
	     	alert("error");
	    }     
	});

	$.ajax({  
		type:'get',
        url:'http://theloaf.aochey.com/theloafnew/servlet/GetacommentServlet',   			
        data:{openid:linkObj.openid,pictrueid:linkObj.pid},   
        dataType:'json',
        success : function(data){
        	var temp = data.jsonArray;
        	html += discre;
        	for(var i = 0,j = temp.length;i < j;i++){
        		html += '<div class="comment-list">'+
				'<div class="comment-user-photo">'+
					'<img src="'+temp[i].Headimgurl+'" />'+
				'</div>'+
				'<div class="comment-user-text">'+
					'<div class="user-msg">'+temp[i].Nickname+
					'</div>'+
					'<div class="comment-text">'+temp[i].CommentDescription+
					'</div>'+
				'</div>'+
				'<div class="post-time">'+temp[i].CreateTimeYYYYMMDD.substr(5,11)+
				'</div>'+
			'</div>';
        	}
        	html += '<div class="last-fixed"></div>';
        	$('.comment-show').html(html);
        },
        error : function(data){
        	alert("error");
        }
	});
	
	 wx.ready(function () {
		 	var src = window.location.href; 			
		 	var code1 = src.indexOf("?openid=");
		 	var code2 = src.indexOf("&pid=");
		 	var openid = src.substr(code1 + 8,28);
		 	var pid = src.substr(code2 + 5);
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
	             title: '快来参加ZE七夕情侣照片墙，恋人的好身材就要秀晒炫~',
	             link: 'http://theloaf.aochey.com/theloafnew/pictureWall/share.html?openid=' + openid + '&pid=' + pid ,
	             imgUrl: shareimg,
	             trigger: function (res) {
	                  /* alert("分享到朋友圈按钮点击");  */       
	             },
	             success: function (res) {
	 	           	 //alert("分享到朋友圈成功");
	 	        	 $.ajax({  
	 	        	        type:'get',
	 	        	        url:'http://theloaf.aochey.com/theloafnew/servlet/ShareLogSpecialServlet',   			
	 	        	        data:{sharetype:encodeURI("分享到朋友圈"),openid:openid,pid:pid},   
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
	 			title: '快来参加ZE七夕情侣照片墙，恋人的好身材就要秀晒炫~', // 分享标题
	 			desc: '快来参加ZE七夕情侣照片墙，恋人的好身材就要秀晒炫~', // 分享描述
	            link: 'http://theloaf.aochey.com/theloafnew/pictureWall/share.html?openid=' + openid + '&pid=' + pid ,
	            imgUrl: shareimg, // 分享图标
	 			type: '', // 分享类型,music、video或link，不填默认为link
	 			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	 			success: function () { 
	 	           	 //alert("发送给朋友成功");
	 	        	 $.ajax({  
	 	        	        type:'get',
	 	        	        url:'http://theloaf.aochey.com/theloafnew/servlet/ShareLogSpecialServlet',   			
	 	        	        data:{sharetype:encodeURI("发送给朋友"),openid:openid,pid:pid},   
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
}

startLoad();