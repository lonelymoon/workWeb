jQuery(function($){

$.ajax({  
	type:'post',
	url:'/GetalecturerAll.action',   			
	data:{strname:"0"},   
	dataType:'json',
	success:function(data)
	{  
		init(data.resultarray);                              				
	}
});

function getType(id){
	var tpVal = "";
	switch(id){
		case 0:
		tpVal = "视觉设计";
		break;
		case 1:
		tpVal = "交互设计";
		break;
		case 2:
		tpVal = "产品设计";
		break;
		case 3:
		tpVal = "用户体验";
		break;
	}
	return tpVal;
}

function init(response){
	var temp = "",
		$w = $('.content-box').width(),
		num = ( $w * 0.88 / 350 ) >> 0; 

	num = num == 4 ? 4 : 3;

	for( var i = 0 ,length = response.length; i < length ;i+=num){
		var row = document.createElement("div");
		row.className = "lec-row";
		for( var j = i; j < num + i ; j++ ){
			var item = response[j];
			if(!item) 
			break;
			
			var tpl = '<div class="lec-item" data-id="'+item.intid+'">'+
					'<div class="lec-type" data-type="'+item.inttype+'">'+getType(item.inttype)+'</div>'+
					'<div class="lec-img-box">'+
						'<div class="lec-img">'+
							'<img src="'+item.strimgurl_origin+'">'+
						'</div>'+
					'</div>'+
					'<div class="lec-name">'+
						item.strname+
					'</div>'+
					'<div class="lec-job">'+
						item.strjob+
					'</div>'+
					'<div class="lec-intro">'+
						item.strmesssage+
					'</div>'+
					'<div class="lec-parts">'+
						item.strcompany+
					'</div>'+
					'<div class="lec-year">'+
						item.intworktime+"年"+
					'</div>'+
					'<div class="lec-btns">'+
						'<div class="lec-btn-item lec-doShow" data-show="'+(!!item.strdistinguish)+'">'+
							'隐藏讲师'+
						'</div>'+
						'<a href="addLecturers.html?edit=true&tid='+item.intid+'">'+
							'<div class="lec-btn-item lec-edit">'+
								'编辑讲师'+
							'</div>'+
						'</a>'+
					'</div>'+
				'</div>';

			row.innerHTML += tpl;
		}
		temp += row.outerHTML;
	}

	$('.content-container').html(temp);

	var scroll = new IScroll('.content-box',{
		mouseWheel : true,
		scrollbars : true,
		tap : true
	});

	setTimeout(function(){
		scroll.refresh();
	},100);

}

});