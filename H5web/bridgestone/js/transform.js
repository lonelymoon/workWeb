var initNum=5;
var iscroll,pullUpEl,pullUpOffset,_maxScrollY;
var idx,maxNumber,src,username,tm,ct,commenNumber,likeNumber,path,dir,trans;
$(document).ready(function(){
	$.get('js/data.json',function(data,status){
		dir = data.EmoDir;
		trans = data.TransText;
		path = data.Path;
		idx = data.Index;
		maxNumber = data.Max;
		src = data.ImgSrc;
		username = data.UserName;
		tm = data.Time;
		ct = data.Content;
		commenNumber = data.ComNum;
		likeNumber = data.LikeNum;
		var $ev = "ontouchstart" in document?"tap":"click";
		$('.create_new_talk').on($ev,function(){
			window.location.href = 'comment';
		});

		$('.refresh').on($ev,function(){
			window.location.href = '../';
		});

		pullUpAction(idx,5,src,username,tm,ct,commenNumber,likeNumber);
	});
});

function pullUpAction(index,maxNum,imgsrc,name,time,content,comNum,likeNum){
	var el,html_add,i,max,temp;
	el = document.getElementById('content');
	html_add = el.innerHTML;
	max=index+initNum>=maxNum?maxNum:index+initNum;
	for (var i = index; i < max; i++) {
		for(var k = 0;k<dir.length;k++)
		{
			for (var m = 0; m < trans[k].length; m++) {
					temp = null;
					temp =new RegExp(trans[k][m]);
				var emo_src = '<img src="'+path+'comment/img/'+dir[k]+'/'+m+'.gif'+'" title="'+trans[k][m]+'"/>';
					content[i] = content[i].replace(/\[|\]/,'');
					content[i] = content[i].replace(temp, emo_src);
			};
		}

		html_add += '<div class="topic" id="t'+i+'3">'
				+'<div class="topic_header">'
					+'<a href="#" class="u_photo"><img src="'+path+imgsrc[i]+'" class="user_photo"></a>'
					+'<div class="user_msg">'
						+'<h2 class="user_name">'+name[i]+'</h1>'
						+'<div class="topic_time">'+time[i]+'</div>'
					+'</div>'
				+'</div>'
				+'<div class="topic_content">'
					+'<p>'+content[i]+'</p>'
				+'</div>'
				+'<div class="topic_footer">'
					+'<span class="topic_comment"><img src="img/comment.png"><span>'+comNum[i]+'</span></span>'
					+'<span class="topic_like"><img src="img/like.png"><span>'+likeNum[i]+'</span></span>'
				+'</div>'
			+'</div>';
		idx++;
	};
	el.innerHTML = html_add;
	if(idx==initNum)
	setTimeout(loaded(), 200);
	iscroll.refresh();
}

function loaded(){
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	iscroll = new IScroll('#wrapper',{
		mouseWheel: true,
		scrollbars: true,
		fadeScrollbars: true,
	    probeType:3,
	    startY:0
	});
	_maxScrollY = iscroll.maxScrollY = iscroll.maxScrollY + pullUpOffset;
	iscroll.on("refresh",function(){
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = '玩命加载中...＼(^o^)／';
		_maxScrollY = iscroll.maxScrollY + pullUpOffset;
	});

	iscroll.on("scroll",function(){
		if (this.y <= (_maxScrollY - pullUpOffset) && pullUpEl && !pullUpEl.className.match("flip")) {
			pullUpEl.className = "flip";
			pullUpEl.querySelector(".pullUpLabel").innerHTML = "信息预装填...(^o^)／";
		} 
		else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl && pullUpEl.className.match("flip")) 
		{
			pullUpEl.className = "";
			pullUpEl.querySelector(".pullUpLabel").innerHTML = "查看更多...";
		}
	});

	iscroll.on("scrollEnd", function() {
	    if (pullUpEl.className.match('flip') && idx != maxNumber && this.y) {
	        pullUpEl.className = 'loading';
	        pullUpEl.querySelector('.pullUpLabel').innerHTML = '玩命加载中...＼(^o^)／';
	        pullUpAction(idx,maxNumber,src,username,tm,ct,commenNumber,likeNumber);
	    } else if(idx == maxNumber)
	    {
	    	pullUpEl.className = 'over';
	        pullUpEl.querySelector('.pullUpLabel').innerHTML = '纳尼，已经结束了(⊙o⊙)';
	    }

	    setTimeout(function () { document.getElementById("wrapper").style.left = "0"; }, 50);
	});
}
var ev = 'ontouchmove' in document?'ontouchmove':'onmousemove';

document.addEventListener(ev, function(e) {
    e.preventDefault();
}, false);