jQuery(function($){

var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth() + 1,
	day = date.getDate();

$('.header-hello').html(year+"年"+month+"月"+day+"日，欢迎您！管理员");

var singleNum = 15,
	hasFen = false,
	showFlag = "2";

function loadData(idxNum){

	$.ajax({  
		type:'post',
        url:'/getenroll.action',   			
        data:{intstart:idxNum,intnum:singleNum,strshowflg:showFlag},   
        dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
        success:function(res)
    	{              	
    		var totalNum = res.intallnum,
    			data = res.resultarray,
    			len = data.length,
    			temp = "";

    		for(var i = 0; i < len; i++){
    			var ndata = data[i],
    				tpl = '<div class="row" data-id="'+ndata.intid+'">'+
						'<div class="item name name-content">'+ndata.strnickname+'</div>'+
						'<div class="item major major-content">'+ndata.strprofession+'</div>'+
						'<div class="item year year-content">'+ndata.strstartschool+'</div>'+
						'<div class="item msg msg-content">'+ndata.strmessage+'</div>'+
						'<div class="item time time-content">'+ndata.strtime+'</div>'+
						'<div class="item status status-content">'+
							'<div class="check-status" data-status="'+ndata.strauditing+'"></div>'+
						'</div>'+
					'</div>';

				temp += tpl;
    		}

    		$('.swiper-slide').html(temp);
    		mySwiper.reInit();
    		if(!hasFen)
    		fenye(Math.ceil(totalNum / singleNum));
    	},
   		error:function()
    	{   
        	alert("获取活动信息和报名者列表信息失败");
    	}   
       
  	});

}

function fenye(totalNum){
	totalNum = totalNum || 0;
	hasFen = true;
	$(".fenye-box").Page({
	    totalPages: totalNum,//total Pages
	    liNums: 6,//the li numbers(advice use odd)
	    activeClass: 'activP', //active class style
	    firstPage: '首页',//first button name
	    lastPage: '末页',//last button name
	    prv: '<',//prev button name
	    next: '>',//next button name
	    hasFirstPage: false,//whether has first button
	    hasLastPage: false,//whether has last button
	    hasPrv: true,//whether has prev button
	    hasNext: true,//whether has next button
	    callBack : function(page){
	        loadData( (page - 1) * singleNum );
	    }
	});
}

function sendData(flag){
	var $tags = $('.row[data-status="checked"]'),
		len = $tags.length,
		idArr = [];

	if(len == 0){
		return false;
	}

	for( var i = 0; i < len; i++ ){
		var $id = $tags.eq(i).attr("data-id");
		idArr.push($id);
	}

	$.ajax({  
		type:'post',
	    url:'/SendMessage.action',   			
	    data:{id:idArr,strflg:flag},   
	    dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
	    success:function(data){              	
    		alert("设置留言的审核状态成功");                  
    		window.location.reload();                         				
    	},
	    error:function(){   
        	alert("设置留言的审核状态失败");
    	}
  	});
}

var mySwiper = new Swiper('.swiper-container',{
	mode : 'vertical',
	slidesPerView : "auto",
	mousewheelControl : true,
	scrollContainer: true,
	scrollbar: {
	  container: '.swiper-scrollbar',
	  hide : false
	}
});

$('.swiper-slide').on("click",'.row',function(e){
	var $val = $(this).attr("data-status");
	if($val == "checked"){
		$(this).removeAttr("data-status");
	} else {
		$(this).attr("data-status","checked");
	}
});

loadData(0);

$('.unpass').on('click',function(e){
	sendData("1");
});

$('.pass').on('click',function(e){
	sendData("0");
});

$('.allPass').on('click',function(e){
	showFlag = "0";
	hasFen = false;
	loadData(0);
});

$('.allUnPass').on('click',function(e){
	showFlag = "1";
	hasFen = false;
	loadData(0);
});

$('.all').on('click',function(e){
	showFlag = "2";
	hasFen = false;
	loadData(0);
});

});