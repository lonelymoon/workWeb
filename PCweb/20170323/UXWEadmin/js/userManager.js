jQuery(function($){

function createData(){
	var temp = "";

	for( var i = 0; i < 20; i++ ){
		var tpl = '<div class="row">'+
					'<div class="tabel-cell username username-title">这咋说的</div>'+
					'<div class="tabel-cell year year-title">5年</div>'+
					'<div class="tabel-cell job job-title">交互设计</div>'+
					'<div class="tabel-cell company company-title">aochey</div>'+
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