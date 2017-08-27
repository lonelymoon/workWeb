var cnt = document.getElementById("content"),
	choose = document.querySelector(".choose"),
	ev = "ontouchstart" in document ? "touchend" : "click",
	hasMoved = false,
	canclick = true,
	regArr = [];


cnt.addEventListener("touchstart",function(e){
	hasMoved = false;
},false);

cnt.addEventListener("touchmove",function(e){
	hasMoved = true;
},false);

cnt.addEventListener(ev,def,false);

function def(e){
	if(!canclick){
		return;
	}
	
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;

	e.stopPropagation();

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
}

function chooseMode(e){	
	var e = e || window.event,
		tar = e.srcElement ? e.srcElement : e.target;

	e.stopPropagation();

	tar = matchClass(tar,new RegExp("pic-items"));

	var gt = tar.querySelector(".getThis");
	if(!gt.style.display || gt.style.display == "none")
	gt.style.display = "block";
	else
	gt.style.display = "none";
}

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

function matchClass(tar,reg){
	while(tar)
	if(!reg.test(tar.className)){
		tar = tar.parentNode;
	} else {
		return tar;
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
	var html = "";

	$.ajax({
		type:'get',
        url:'http://theloaf.aochey.com/theloafnew/servlet/GetauserServlet',   			
        data:{openid:linkObj.openid},   
        dataType:'json',
        success:function(data){
        	$('.user-head').attr("style","background:url("+data.Headimgurl+") no-repeat center;background-size:cover;");
        	$('.user-name').html(data.Nickname);
        },
        error:function(){   
         	alert("加载出错");
        }   
	});


	$.ajax({  
		type:'get',
        url:'http://theloaf.aochey.com/theloafnew/servlet/GetpictrueServlet',   			
        data:{openid:linkObj.openid,start:0},   
        dataType:'json',
        success:function(data){       
        	var temp = data.jsonArray,
        		rowHtml = "";

        	for(var i = 0,j = Math.ceil(temp.length / 3);i < j;i++){
        		var item = "";
        		rowHtml += '<div class="row">';
				for(var x = i * 3; x < i * 3 + 3;x++){
					if(!temp[x])
					break;

					var center = "pic-center";
					if(x != i * 3 + 1)
					center = "";

					var like = "display",
        				dislike = "";

					if(temp[x].love){
						like = "";
						dislike = "display";
					}

					item += '<div class="pic-items '+center+'" data-id="'+temp[x].Id+'" style="background:url('+temp[x].ImgUrl+') no-repeat center;">'+
						'<div class="icon-box">'+
							'<div class="like" data-id="'+temp[x].Id+'" data-loved="'+temp[x].love+'">'+
								'<div class="likeImage">'+
									'<img src="images/printPage/heart_rs.png" class="'+like+'"/>'+
									'<img src="images/printPage/heart_ws.png" class="'+dislike+'"/>'+
								'</div>'+
								'<div class="likeNum">'+temp[x].PraiseNumber+'</div>'+
							'</div>'+
							'<div class="rank">';
								if(temp[x].monthmonth > -1)
								item += '<span class="rank-icon">'+
									'<img src="images/printPage/crown_m.png" />'+
								'</span>';
								if(temp[x].weekking > -1)
								item += '<span class="rank-icon">'+
									'<img src="images/printPage/crown_w.png" />'+
								'</span>';
					item +='</div>'+
						'</div>'+
						'<div class="getThis">'+
							'<img src="images/printPage/choose.png" />'+
						'</div>'+
					'</div>';
				}
				rowHtml += item;
				rowHtml += '</div>';
        	}
        	var fix = '<div class="fixed"></div>';
        	$('#content').html(rowHtml + fix);
        	pw();
        	$('.user-msg').find("em").html($('.pic-items').length);		
        },
        error:function(){   
         	alert("加载出错");
        }    
	});
}

startLoad();


addToReg(new RegExp(/^like$/),like);
addToReg(new RegExp("pic-items"),turnTo);
