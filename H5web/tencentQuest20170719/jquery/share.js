jQuery(function($){

var signurl = window.location.href;

$.ajax({
    type:'post',
    url:'php/share.php',   			
    data:{signurl:signurl},   
    dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
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
            title: '腾讯营销平台问卷调查',
            link: 'https://web.aochey.com/txyx/index.html',
            imgUrl: 'https://web.aochey.com/txyx/share.png',
            trigger: function (res) {         
            },
            success: function (res) {
               
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });

        wx.onMenuShareAppMessage({
            title: '腾讯营销平台问卷调查', // 分享标题
            desc: '腾讯营销平台问卷调查', // 分享描述
            link: 'https://web.aochey.com/txyx/index.html',
            imgUrl: 'https://web.aochey.com/txyx/share.png',
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
               
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });

    });
    
    wx.error(function(res){
        alert(res);
    });

}

});