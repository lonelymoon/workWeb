jQuery(function($){

function createData(){
	var temp = "";

	for( var i = 0; i < 20; i++ ){
		var tpl = '<div class="row">'+
					'<div class="tabel-cell enrollname enrollname-content">sadasd</div>'+
					'<div class="tabel-cell year year-content">8年</div>'+
					'<div class="tabel-cell job job-content">视觉设计</div>'+
					'<div class="tabel-cell reason reason-content">asdsasadsad</div>'+
					'<div class="tabel-cell call call-content">'+
						'<div class="status-item call-status" data-status="done"></div>'+
					'</div>'+
					'<div class="tabel-cell mark mark-content">'+
						'<div class="status-item mark-status" data-status="done"></div>'+
					'</div>'+
				'</div>';

		temp += tpl;
	}

	$('.table-content').html(temp);

	var scroll = new IScroll('.content-box',{
		mouseWheel : true,
		scrollbars : true
	});
}

createData();

});