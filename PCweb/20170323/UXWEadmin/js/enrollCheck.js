jQuery(function($){

var sc = new IScroll(".content-box",{
	mouseWheel : true
});

var $aid = Output.getUrlObj()["aid"];

$.ajax({  
	type:'post',
    url:'/getenroll.action',   			
    data:{activeid:$aid},   
    dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
    success:function(data)
	{    
		afterLoad(data);                       				
	},
    error:function()
	{   
    	alert("获取活动信息和报名者列表信息失败");
	}	    
});

function afterLoad(data){
	var temp = "",
		results = data.resultarray;

	for( var i = 0, result; result = results[i++]; ){
		var pass = result.strissuccess == 0 ? "pass" : result.strissuccess == 1 ? "unpass" : "",
			tpl = '<div class="table-row" data-type="'+pass+'" data-oid="'+result.stropenid+'">'+
						'<div class="table-cell table-check">'+
							'<div class="check-box"></div>'+
						'</div>'+
						'<div class="table-cell table-name">'+
							result.strname+
						'</div>'+
						'<div class="table-cell table-workyear">'+
							result.intworktime+
						'</div>'+
						'<div class="table-cell table-job">'+
							result.strjob+
						'</div>'+
						'<div class="table-cell table-reason">'+
							result.strreason+
						'</div>'+
						'<div class="table-cell table-call">'+
							'<div class="call-box"></div>'+
						'</div>'+
						'<div class="clear"></div>'+
					'</div>';

		temp+= tpl;
	}

	$('.content-table-body').html(temp);
	sc.refresh();
}

$('.content-table-body').on('click','.table-row',function(e){

	var status = $(this).attr("data-status");

	if( status != "choose" ){
		$(this).attr("data-status","choose");
	} else {
		$(this).attr("data-status","");
	}

});

var uploading = false;

function update(dataArr,status){

var url = status == "pass" ? "/SendMessage.action" : "/SendMessageSorry.action";

if(uploading){
	return false;
}

uploading = true;

$.ajax({  
	type:'post',
    url:url,   			
    data:{
    	openid:dataArr,
    	first:0,
    	keyword1:0,
    	keyword2:0,
    	keyword3:0,
    	remark:0,
    	activeid:$aid
    },   
    dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
    success:function(data)
	{    
		uploading = false;         	            
		if(data.strflg == 1){
			alert("数据传输失败，请稍候重试");
		} else {
			window.location.reload();
		}                				
	},
    error:function()
	{   
		uploading = false;
    	alert("给指定用户发送模板消息失败");
	}	    
});   


};

//pass
$('.pass-btn').on('click',function(e){

var $checked = $('.table-row[data-status="choose"]'),
	len = $checked.length,
	tempArr = [];

	for( var i = 0; i < len ; i++ ){
		var oid = $checked.eq(i).attr("data-oid");
		tempArr.push(oid);
	}

	update(tempArr,"pass");

});

//unpass
$('.unpass-btn').on('click',function(e){

var $checked = $('.table-row[data-status="choose"]'),
	len = $checked.length,
	tempArr = [];

	for( var i = 0; i < len ; i++ ){
		var oid = $checked.eq(i).attr("data-oid");
		tempArr.push(oid);
	}

	update(tempArr,"unpass");

});

});