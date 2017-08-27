var cnt = document.querySelector(".content"),
	ev = "ontouchstart" in document ? "touchend" : "click",
	evm = "ontouchstart" in document ? "touchmove" : "mousemove",
	evs = "ontouchstart" in document ? "touchstart" : "mousedown",
	eve = "ontouchstart" in document ? "touchend" : "mouseup",
	hasMoved = false,
	hasStart = false,
	canclick = true,
	startPosition = {},
	endPosition = {},
	monthIndex = 0, //存放目前已加载的月份所在数组位置
	totalRowLength = 0, //存放总行数
	nowRowLength = 0, //目前已经加载的行数
	regArr = [];

cnt.addEventListener(evs,function(e){
	var e = e || event,
	    touches = e.touches[0];
	startPosition.x = touches.screenX;
	startPosition.y = touches.screenY;
	hasStart = true;
	hasMoved = false;
},false);

cnt.addEventListener(evm,function(e){
	if(!hasStart)
	return;

	var e = e || event,
		xDiff = e.touches[0].screenX - startPosition.x,
		yDiff = e.touches[0].screenY - startPosition.y,
		total = Math.pow(xDiff,2) + Math.pow(yDiff,2);
	
	hasMoved = true;

	if(total<0.0001){
		hasMoved = false;
	}
},false);

cnt.addEventListener(eve,function(e){
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;
	
		if(!hasMoved){
			while(tar){
				for(var i=0,j=regArr.length;i<j;i++){
					if(!regArr[i][0].test(tar.className))
					continue;
					else{
						regArr[i][1](tar);
						return;
					}
				}

				tar = getParent(tar);
			}
		}
		
},false);


function turnTo(tar){
	var dId = tar.getAttribute("data-id");
		window.location.href = "detail.html?openid="+linkObj["openid"]+"&pid="+tar.getAttribute("data-id");
}

function like(tar){
	var imgs = tar.querySelectorAll("img"),
		dis = new RegExp(/(\\b)*display(\\b)*/);

	canclick = false;

	for(var i=0,j = imgs.length;i<j;i++){
		if(dis.test(imgs[i].className)){
			imgs[i].className = imgs[i].className.replace(dis,"")
		} else{
			imgs[i].className += " display ";
		}
	}

	var likeNum = tar.querySelector(".likeNum").innerHTML;

	if(tar.getAttribute("data-loved") == "true"){
		tar.querySelector(".likeNum").innerHTML = ~~likeNum - 1;
		goAjax(false,tar);
		tar.setAttribute("data-loved",false);
	}else{
		tar.querySelector(".likeNum").innerHTML = ~~likeNum + 1;
		goAjax(true,tar);
		tar.setAttribute("data-loved",true);
	}
}

function getParent(tar){
	return tar.parentNode;
}

function addToReg(exp,fn){
	var temp = [];
		temp.push(exp);
		temp.push(fn);
	regArr.push(temp);
}

function goAjax(beLoved,tar){
	$.ajax({  
		type:'get',
        url:'http://theloaf.aochey.com/theloafnew/servlet/PraisepictrueServlet',   			
        data:{openid:linkObj.openid,imgId:tar.getAttribute("data-id")},   
        dataType:'json',
        success:function(data){       
        	canclick = true;                                          				
        },
        error:function(){   
         	alert("点赞失败");
        }    
	});
}


function startLoad(){
	var html = "",
		unitNums = 3; //每行元素个数

	$.ajax({  
		type:'get',
        url:'http://theloaf.aochey.com/theloafnew/servlet/GetallpictrueServlet',   			
        data:{openid:linkObj.openid,start:0},   
        dataType:'json',
        success:function(data){       
        	var temp = data.jsonArray;

        	for(var i = 0,l = temp.length;i < l;i++){
        		totalRowLength += Math.ceil(temp[i].jsonArray.length / 3);
        	}
        	addNewMonth(temp,monthIndex,unitNums,18,true);
        	$('#wrapper').css("height",$(window).height()+"px");
        	setTimeout(function(){
				var iscroll = new IScroll('#wrapper',{
						mouseWheel: true,
						scrollbars: true,
						fadeScrollbars: true,
					    probeType:3,
					    startY:0
					});
				loaded(iscroll,totalRowLength,nowRowLength,unitNums,temp);
			},500);
        },
        error:function(){   
         	alert("加载出错");
        }    
	});
}

//加载一个新月
function addNewMonth(temp,index,unitNums,maxLength,doLoop){
	if(!temp[index]){
		doLoop = false;
		return;
	}
	

	var items = temp[index].jsonArray,
        yymm = temp[index].yymm.substr(temp[index].yymm.length-2,2);

    yymm = parseInt(yymm);

	var getMonth = createBlock(yymm),
		monthTitle = createMonthTitle(yymm),
		rowList = createRowList(),
		itemsLength = items.length >= maxLength ? maxLength : items.length,
		rowNums = Math.ceil(itemsLength / unitNums);

	$(getMonth).append(monthTitle);

	for(var i = 0;i < rowNums; i++){
		var row = createRow(i);
		for(var x = i * unitNums; x < i * unitNums + unitNums; x++){
			if(!items[x])
			break;
			var item = createItem(items,x,i,unitNums);
			$(row).append(item);
		}
		$(getMonth).append(row);
	}

	$('.content').append(getMonth);

	nowRowLength += rowNums;

	if(itemsLength < maxLength && doLoop){
		monthIndex++;
		addNewMonth(temp,monthIndex,unitNums,maxLength - itemsLength,doLoop);
	}

	pw();
}

//创建最外层区块
function createBlock(month){
	var div = document.createElement("div");
	div.className = "wall-items";
	div.setAttribute("data-month",month);
	return div;
}

//创建每月标题
function createMonthTitle(yymm){
	var mon = ["January","February","March","April","May","June","July","August","September","October",
		"November","December"];

	var temps = '<div class="wall-title">'+
		'<em class="wall-icon">|</em>'+
		'<span class="month-cn">'+(yymm == 1? 1 : yymm)+'月</span>'+
		'<em class="month-en">'+mon[parseInt(yymm)-1]+'</em>'+
	'</div>';

	return temps;
}

//创建每一行
function createRow(i){
	var firstRow = "";
	if(i===0)
	firstRow = "first-row";

	var div = document.createElement("div");
	div.className = "row "+firstRow;
	return div;
}

//创建行集
function createRowList(){
	var div = document.createElement("div");
	div.className = "wall-pic-lists";
	return div;
}

//创建单个item
function createItem(items,x,i,unitNums){
	var centerItem = "",
		like = "display",
		dislike = "",
		temp = "",
		item = items[x];
	if(x == i * unitNums + 1)
	centerItem = "pic-center";
	
	if(items[x].love){
		like = "";
		dislike = "display";
	}

	temp = '<div class="pic-items '+centerItem+'" data-id="'+item.Id+'" style="background:url(\''+item.ImgUrl+'\') no-repeat center;">'+
				'<div class="icon-box">'+
					'<div class="like" data-id="'+item.Id+'" data-loved="'+item.love+'">'+
						'<div class="likeImage">'+
							'<img src="images/picWall/heart_rs.png" class="'+like+'"/>'+
							'<img src="images/picWall/heart_ws.png" class="'+dislike+'"/>'+
						'</div>'+
						'<div class="likeNum">'+item.PraiseNumber+'</div>'+
					'</div>'+
					'<div class="rank">';
					if(item.monthmonth>-1)
					temp+='<span class="rank-icon">'+
							'<img src="images/picWall/crown_m.png" />'+
						'</span>';
					if(item.weekking>-1)
					temp+='<span class="rank-icon">'+
							'<img src="images/picWall/crown_w.png" />'+
						'</span>';						
					temp+='</div>'+
				'</div>'+
			'</div>';
	
	return temp;
}

//添加多行数据
function addNewRows(num,unitNums,temp){
	if(!temp[monthIndex])
	return;

	var items = temp[monthIndex].jsonArray,
		lastMonthIndex = $('.wall-items').length - 1,
		lastRowNums = $('.wall-items').eq(lastMonthIndex).find('.row').length,
		endLoop = false,
		count = 0,
		flag = true;

	for(var r = lastRowNums;r < lastRowNums + num; r++){
		var newRow = createRow(r);
		for(var i = r * unitNums;i < r * unitNums + unitNums;i++){
			if(!items[i]){
				endLoop = true;
				if(i % 3 == 0)
				flag = false;
				break;
			}
			var newItem = createItem(items,i,r,unitNums);
			count++;
			$(newRow).append(newItem);
		}
		if(!flag)
		break;

		$('.wall-items').eq(lastMonthIndex).append(newRow);
		pw();
		if(endLoop){
			break;
		}
	}

	if(count < num * unitNums){
		//添加新月
		monthIndex++;
		addNewMonth(temp,monthIndex,unitNums,num * unitNums - count,true);
	}
} 

//加载数据
function loadData(unitNums,temp){
	addNewRows(5,unitNums,temp);
}

//下拉刷新
function loaded(iscroll,totalRowLength,nIndex,unitNums,temp){
	var pullUpEl = document.getElementById('pullUp'),
		pullUpOffset = pullUpEl.offsetHeight;

	var _maxScrollY = iscroll.maxScrollY = iscroll.maxScrollY + pullUpOffset;
	var maxNumber = totalRowLength;
	iscroll.on("refresh",function(){
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载完成';
		_maxScrollY = iscroll.maxScrollY + pullUpOffset;
	});

	iscroll.on("scroll",function(){
		if (this.y <= (_maxScrollY - pullUpOffset) && pullUpEl && !pullUpEl.className.match("flip")) {
			pullUpEl.className = "flip";
			pullUpEl.querySelector(".pullUpLabel").innerHTML = "信息收集中...";
		} 
		else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl && pullUpEl.className.match("flip")) 
		{
			pullUpEl.className = "";
			pullUpEl.querySelector(".pullUpLabel").innerHTML = "查看更多";
		}
	});

	iscroll.on("scrollEnd", function() {
	    if (pullUpEl.className.match('flip') && nIndex < maxNumber && this.y) {
	        pullUpEl.className = 'loading';
	        pullUpEl.querySelector('.pullUpLabel').innerHTML = '玩命加载中...';
	        //加载
	        loadData(unitNums,temp);
	        iscroll.refresh();
	    } else if(nIndex >= maxNumber)
	    {
	    	pullUpEl.className = 'over';
	    	_maxScrollY = iscroll.maxScrollY + pullUpOffset;
	        pullUpEl.querySelector('.pullUpLabel').innerHTML = '已加载完毕';
	    }

	    setTimeout(function () { document.getElementById("wrapper").style.left = "0"; }, 50);
	});
}

startLoad();

addToReg(new RegExp(/^like$/),like);
addToReg(new RegExp("pic-items"),turnTo);
