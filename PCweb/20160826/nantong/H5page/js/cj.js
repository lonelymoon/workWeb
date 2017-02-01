jQuery(function($){

	var val,
		couldGGK = true,
		date = new Date().getDate();

	if( !localData.get('date') ){
		localData.set('date', date);
	} else if( localData.get('date') != date ){	
		localData.set('date', date);
		localData.set('val',3);	
	}

	if( localData.get('val') && localData.get('val') >=0 ){
		val = localData.get('val');
		if( val <= 0)
		couldGGK = false;
	} else {
		val = 3;
		localData.set('val',val);
	}

	$('.left-num').find('em').html(val);

	$('.bt2').on('click',function(e){
		var e = e || event;
		e.stopPropagation();
		cj();
	});

	//抽奖/显示刮刮卡
	var rand = function(res){

		var maxNum = 100000,
			imgArr = ['.limg1','.limg2','.limg3','.limg4'],
			index;

		var result = Math.random() * maxNum >> 0;

		if( result>95000 ) {
			index = 2;
		} else if ( result>80000 ) {
			index = 1;
		} else if ( result>60000 ) {
			index = 0;
		} else {
			index = 3;
		}
			
		$('.lay-img').addClass('hide');
		$(imgArr[index]).removeClass('hide');

		var nImg = document.createElement('img');
		nImg.src = "images/cjPage/yhq.png";

		if( nImg.complete ){
			setTimeout(function(){
				ggk.init({
					canvas : '#canvas',
					canvasBg : {
						img : nImg,
						color : "#6c5d3f"
					},
					img : imgArr[index],
					radius : 10,
					per : 0.3
				});
			},10);
		} else {
			nImg.onload = function(){
				ggk.init({
					canvas : '#canvas',
					canvasBg : {
						img : nImg,
						color : "#6c5d3f"
					},
					img : imgArr[index],
					radius : 10,
					per : 0.3
				});
			};
		}
			

	};

	var result = null;

	function cj(){
		$.ajax({  
			type:'get',
	        url:'/nantong/GetaprizecountServlet.action',   			
	        data:{openid:'1',pictrueid:19},   
	        dataType:'json',
	        success:function(data){       
	        	result = data;
	        	rand(result);                           				
	        },
	        error:function(){   
	         	alert("获取数据失败，请刷新页面重试");
	         	return;
	        }    
		});
	}

	if( couldGGK )
	cj();
});


//刮刮卡
(function( window , undefined ){

	var ggk = {};

	var _init = function(options){
		var canvas = document.querySelector(options.canvas),
		cxt = canvas.getContext('2d'),
		ele = document.querySelector(options.img);

		if(ele.complete){
			canvas.width = ele.offsetWidth;
			canvas.height = ele.offsetHeight; 
		} else {
			ele.onload = function(){
				canvas.width = ele.offsetWidth;
				canvas.height = ele.offsetHeight; 
			};
		}

		var cWidth = canvas.width,
			cHeight = canvas.height,
			cbg = options.canvasBg;

		canvas.style.display = "block";

		if(cbg.img && cbg.img !== ""){
			cxt.drawImage(cbg.img,0,0,cWidth,cHeight);
		} else {
			var BGcolor = cbg.color || "#cdcdcd";
			cxt.fillStyle = BGcolor;
			cxt.fillRect(0,0,cWidth,cHeight);
		}

		_start(canvas,cxt,options);
	};

	var __checkCanvas = function(canvas,cxt,options){

		var cData = cxt.getImageData(0,0,canvas.width,canvas.height),
			j = 0;

		for( var i = 3; i < cData.data.length; i+=4 ){
			if( cData.data[i] === 0 ) j++;
		}

		if( j >= (cData.data.length * options.per / 4 ) ) {
			cxt.clearRect(0,0,canvas.width,canvas.height);

			//传送获奖数据
			$.ajax({  
				type:'get',
		        url:'/nantong/GetaprizemessageServlet.action',   			
		        data:{openid:80,pictrueid:19},   
		        dataType:'json',
		        success:function(data){       
		        	result = data;
		        	canvas.style.display = "none";

		        	$('.bt').addClass('hide');
		        	//能否继续抽奖
		        	var temp = localData.get('val') - 1;
		        	if( localData.get('val') <= 1 ){
		        		$('.bt1').removeClass('hide');
		        	} else {
		        		$('.bt2').removeClass('hide');
		        	}
		        	localData.set('val',temp);
		        	$('.left-num').find('em').html(temp);
		        },
		        error:function(){   
		         	alert("获取数据失败,请刷新页面重试");
		         	return;
		        }    
			});

		}

	};

	var _start = function(canvas,cxt,options){
		var start = false,
			Cx = canvas.getBoundingClientRect().left,
			Cy = canvas.getBoundingClientRect().top;

		cxt.fillStyle = "#ffffff";
		cxt.globalCompositeOperation = "destination-out";

		var eventDown = function(e){
			var e = e || event;
			e.preventDefault();
			ggk.hasEvent = true;
			start = true;
		};

		var eventMove = function(e){

			var e = e || event;
			e.preventDefault();
			if(!start)
			return;

			if(e.changedTouches){
				e = e.changedTouches[e.changedTouches.length - 1];
			}

			var hasDE = !!(document.documentElement && document.documentElement.scrollLeft);
				scrollX = hasDE ? document.documentElement.scrollLeft : document.body.scrollLeft,
				scrollY = hasDE ? document.documentElement.scrollTop : document.body.scrollTop,
				ex = (e.clientX || e.pageX - scrollX) - Cx,
				ey = (e.clientY || e.pageY - scrollY) - Cy;

			cxt.save();
			cxt.beginPath();
			cxt.arc(ex, ey, options.radius, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
			cxt.restore();
		};

		var eventUp = function(e){
			e.preventDefault();
			if(start){

				start = false;
				__checkCanvas(canvas,cxt,options);
	
			}
		};

		if(!ggk.hasEvent){
			canvas.addEventListener('touchstart',eventDown,false);
			canvas.addEventListener('touchmove',eventMove,false);
			canvas.addEventListener('touchend',eventUp,false);
		}
	};
	
	ggk = {
		init : _init,
		hasEvent : false
	};


	window.ggk = ggk;

})(window);