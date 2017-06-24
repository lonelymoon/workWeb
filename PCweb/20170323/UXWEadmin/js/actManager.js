jQuery(function($){

var sc1 = new IScroll('.content-box',{
	mouseWheel : true
});
$.ajax({  
	type:'get',
    url:'/GetActivityAll.action',   			
    data:{strflg:'userName01'},   
    dataType:'json', //很重要!!!.预期服务器返回的数据类型 ,  
    success:function(data)
	{ 
		var posted = data.resultarrayreleased,
			unposted = data.resultarrayrunreleased;

		var temp = "";
	 	
		for( var i = 0, uplen = unposted.length; i < uplen; i++ ){
			var up = unposted[i],
				dateArr = up.strstartime.split(" "),
				date = dateArr[0];
			var tpl = '<div class="actItem-box unPublish" data-id="'+up.intid+'">'+
						'<div class="actItem-img">'+
							'<img src="'+up.strimgurl_origin+'">'+
						'</div>'+
						'<div class="actItem-msg">'+
							'<div class="progress">'+
								'<div class="progress-box">'+
									'<div class="progress-bar"></div>'+
								'</div>'+
								'<div class="progress-msg">'+
									'您的活动已经完成了50%。'+
								'</div>'+
							'</div>'+
							'<div class="actItem-title">'+
								up.strname+
							'</div>'+
							'<div class="actItem-address">'+up.strcity+'</div>'+
							'<div class="actItem-time">活动截止日期：'+date+'</div>'+
							'<div class="actItem-fn-box">'+
								'<div class="actItem-btn edit">继续完善</div>'+
								'<div class="actItem-btn preview">预览</div>'+
							'</div>'+
						'</div>'+
						'<div class="actItem-otherMsg">'+
							'<div class="peopleHasJoined">'+
								'已参与活动人数'+
								'<div class="joinedNum">20人</div>'+
							'</div>'+
							'<div class="peopleHasChecked">'+
								'审核通过人数'+
								'<div class="checkedNum">18人</div>'+
							'</div>'+
							'<div class="actItem-other-fn-box">'+
								'<div class="actItem-other-btn check">审核</div>'+
								'<div class="actItem-other-btn looking">查看活动人员</div>'+
							'</div>'+
						'</div>'+
					'</div>';

			temp += tpl;
		}

		var ntemp = "";

		for( var j = 0, plen = posted.length; j < plen; j++ ){
			var p = posted[j],
				dateArr = p.strstartime.split(" "),
				date = dateArr[0],
				isEnd = new Date().getTime() - new Date(date) > 0 ? "end" : "no";
			var tpl = '<div class="actItem-box publish" data-id="'+p.intid+'" data-isEnd="'+isEnd+'">'+
						'<div class="actItem-img">'+
							'<img src="'+p.strimgurl_origin+'">'+
						'</div>'+
						'<div class="actItem-msg">'+
							'<div class="progress">'+
								'<div class="progress-box">'+
									'<div class="progress-bar"></div>'+
								'</div>'+
								'<div class="progress-msg">'+
									'您的活动已经完成了50%。'+
								'</div>'+
							'</div>'+
							'<div class="actItem-title">'+
								p.strname+
							'</div>'+
							'<div class="actItem-address">'+p.strcity+'</div>'+
							'<div class="actItem-time">活动截止日期：'+date+'</div>'+
							'<div class="actItem-fn-box">'+
								'<div class="actItem-btn edit">继续完善</div>'+
								'<div class="actItem-btn preview">预览</div>'+
							'</div>'+
						'</div>'+
						'<div class="actItem-otherMsg">'+
							'<div class="peopleHasJoined">'+
								'已参与活动人数'+
								'<div class="joinedNum">'+p.intjoinnum+'</div>'+
							'</div>'+
							'<div class="peopleHasChecked">'+
								'审核通过人数'+
								'<div class="checkedNum">'+p.intsusessnum+'</div>'+
							'</div>'+
							'<div class="actItem-other-fn-box">'+
								'<div class="actItem-other-btn check">审核</div>'+
								'<div class="actItem-other-btn looking">查看活动人员</div>'+
							'</div>'+
						'</div>'+
					'</div>';

			ntemp += tpl;
		}

		$('.unpublish-msg').html(temp);
		$('.publish-msg').html(ntemp);
		sc1.refresh();
	},
    error:function()
	{   
    	alert("获取所有活动信息失败");
	}   
       
  	});    	    
});

$('.content-msg').on('click','.check',function(e){
	var $id = $(this).parents(".actItem-box").attr("data-id");
	window.location.href = "enrollCheck.html?aid="+$id;
	
});

$('.content-msg').on('click','.looking',function(e){
	var $id = $(this).parents(".actItem-box").attr("data-id");
	window.location.href = "checkPeopleNum.html?aid="+$id;
});

$('.content-msg').on('click','.preview',function(e){
	var $id = $(this).parents(".actItem-box").attr("data-id");
	window.open("http://uxwe.org/UXWE/pages/details/details.html?uid="+$id+"&type=preview","预览");
});


$('.content-msg').on('click','.edit',function(e){
	var $id = $(this).parents(".actItem-box").attr("data-id");
	localStorage.actId = $id;
	window.location.href = "publishAct-2.html?aid="+$id+"&edit=true";
});