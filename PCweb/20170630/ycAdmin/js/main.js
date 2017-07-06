jQuery(function($){

var startIdx = 0,
	countNum = 15,
	hasCreateList = false,
	searchChanged = false,
	scroll = new IScroll('.tableBox',{
		mouseWheel : true
	});

function getData(tel){
	var strflg = 0;
	tel = tel || "";
	if(tel) strflg = 1;

	if(searchChanged) startIdx = 0;

	$.ajax({  
		type:'get',
	    url:'/Getusermessage.action',
	    data:{intstart:startIdx,intcount:countNum,strphone:tel,strflg:strflg},   
	    dataType:'json',
	    success:function(data)
    	{             	
    		var totalNum = data.intcount,
    			pageNum = Math.ceil(totalNum / countNum),
    			array = data.jsonarray;

    		searchChanged = false;
    		createPageList(pageNum);
    		resetHtml(array);
    	}   	    
	});   
}

function createPageList(pageNum){
	if(hasCreateList){
		return false;
	}

	hasCreateList = true;

	$(".pageListBox").Page({
	    totalPages: pageNum,
	    liNums: 5,
	    activeClass: 'activP',
	    callBack : function(page){
	      	startIdx = ( page - 1 ) * countNum;
	      	var tel = $('#search').val();
	      	getData(tel);
	    }
	});
};

$('.search-btn').on('click',function(e){
	var tel = $('#search').val();

	searchChanged = true;
	hasCreateList = false;
	getData(tel);

});

$('.refreshBtn').on('click',function(e){
	window.location.reload();
});

document.onkeyup = function(e){
	e = e || event;
	if(e.keyCode == 13){
		$('.search-btn').trigger('click');
	}
};

function resetHtml(dataArray){
	var temp = "";
	for( var i = 0 , obj; obj = dataArray[i++]; ){
		var tpl = '<div class="row bodyRow">'+
					'<div class="time item">'+obj.strpaperemail+'</div>'+
					'<div class="name item">'+obj.strpapername+'</div>'+
					'<div class="tel item">'+obj.strpaperphone+'</div>'+
					'<div class="time item">'+obj.strpapercreatetime+'</div>'+
					'<div class="clear"></div>'+
				'</div>';
		temp += tpl;
	}

	$('.tableBody').html(temp);
	setTimeout(function(){
		scroll.refresh();
	},100);
};

getData();

});