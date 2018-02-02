jQuery(function($){

var signurl = window.location.href;

var TITLE = "旅游义诊大会", //微信标题
    DESC = "关爱生命，靓丽出游"  //微信描叙
    IMGURL = "https://web.aochey.com/ctripQuest/share.jpg", //分享图片地址
    LINK = "https://web.aochey.com/ctripQuest/"; //分享来源链接

$.ajax({
    type:'post',
    url:'php/share.php',   			
    data:{signurl:signurl},   
    dataType:'json',
    success:function(data){                 	
        wx.config({
            debug: false, 
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'checkJsApi',  
                'onMenuShareTimeline',  
                'onMenuShareAppMessage',  
                'onMenuShareQQ',  
                'onMenuShareWeibo',  
                'onMenuShareQZone' 
            ]
        });

        goReady();	
    },
    error:function(){   
      // alert("error occured!!!右上角控制");
    }                          
});

function goReady(){

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
            title: TITLE,
            link: LINK,
            imgUrl: IMGURL,
            trigger: function (res) {
            },
            success: function (res) {
                if(!localStorage.hasShared){
                    localStorage.hasShared = true;
                    localStorage.count = 1;
                }
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });

        wx.onMenuShareAppMessage({
            title: TITLE, // 分享标题
            desc: DESC, // 分享描述
            link: LINK, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: IMGURL, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                if(!localStorage.hasShared){
                    localStorage.hasShared = true;
                    localStorage.count = 1;
                }
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });

    });
    
    wx.error(function(res){
        //alert(res);
    });

}

});