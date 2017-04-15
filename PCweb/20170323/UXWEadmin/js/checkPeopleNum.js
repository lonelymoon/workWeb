jQuery(function($){

var $aid = Output.getUrlObj()["aid"];

function createData(data){
	var temp = "",
		arr = data.resultarray,
		len = arr.length;

	for( var i = 0; i < len; i++ ){
		var done = arr[i].strsign == "0" ? "done" : "no";
			tpl = '<div class="row">'+
					'<div class="tabel-cell enrollname enrollname-content">'+arr[i].strname+'</div>'+
					'<div class="tabel-cell year year-content">'+arr[i].intworktime+'年</div>'+
					'<div class="tabel-cell job job-content">'+arr[i].strjob+'</div>'+
					'<div class="tabel-cell reason reason-content">'+arr[i].strreason+'</div>'+
					'<div class="tabel-cell call call-content">'+
						'<div class="status-item call-status" data-status="done"></div>'+
					'</div>'+
					'<div class="tabel-cell mark mark-content">'+
						'<div class="status-item mark-status" data-status="'+done+'"></div>'+
					'</div>'+
				'</div>';

		temp += tpl;
	}

	$('.table-content').html(temp);

	var scroll = new IScroll('.content-box',{
		mouseWheel : true,
		scrollbars : true
	});

	scroll.refresh();
}

$.ajax({  
	type:'post',
	url:'/Getsignmessage.action',   			
	data:{activeid:$aid},   
	dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
	success:function(data)
	{              	                 
		createData(data);                         				
	},
	error:function()
	{   
		alert("获取活动信息和报名者列表签到信息失败");
	}   
});

});