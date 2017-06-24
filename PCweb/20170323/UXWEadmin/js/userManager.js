jQuery(function($){

function createData(){
	$.ajax({
		type : "get",
		data : {},
		dataType : "json",
		url : "/GetAuser.action",
		success : function(data){
			var d = data.resultarray,
				len = d.length,
				temp = "";

			for( var i = 0; i < len; i++ ){
				var user = d[i],
				tpl = '<div class="row" data-id="'+user.intid+'">'+
					'<div class="tabel-cell username username-title">'+user.strname+'</div>'+
					'<div class="tabel-cell year year-title">'+user.intworktime+'年</div>'+
					'<div class="tabel-cell job job-title">'+user.strjob+'</div>'+
					'<div class="tabel-cell company company-title">'+user.strcompany+'</div>'+
				'</div>';

				temp += tpl;
			}

			$('.table-content').html(temp);

			var scroll = new IScroll('.content-box',{
				mouseWheel : true,
				scrollbars : true,
				tap : true
			});

			setTimeout(function(){
				scroll.refresh();
			},100);

		},
		fail : function(status){
			alert("数据调取出错，请刷新页面重试");
		}
	});
}

$('.table-content').on('tap','.row',function(e){
	var $uid = $(this).attr("data-id");
	window.open("http://uxwe.org/UXWE/pages/usercenter/userCenter.html?uid="+$uid+"&type=manager","_blank");
});

createData();

});