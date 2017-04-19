jQuery(function($){
	
	function getUrlKey(){
		var url = window.location.href,
			keyStr = url.substring(url.indexOf('?')+1),
			tempReg = /([^?&=]+)=([^?&=]*)/g,
			tempObj = {};

		keyStr.replace(tempReg,function(str,$1,$2){
			var key = decodeURIComponent($1),
				value = decodeURIComponent($2);

			value = "" + value;
			tempObj[key] = value;

			return str;
		});

		return tempObj;
	}

	var obj = getUrlKey(),
		id = obj["id"],
		url = obj["source"] || "";
		
	$.ajax({
		type:'post',
   		url:"/Enrollbefore.action",   			
    	data: {
    		"intactiveid":id,
    		strreason:"1"
    	},
   		success:function(data){
   			var flag = data.strflg;
   			if(flag == 0){
   				/*$('.success').show();*/
   				$('.enroll').show();
   			} else if( flag == 1){
   				window.location.href = "../login/index.html?source="+url+"&id="+id;
   			} else if( flag == 2 ){
   				window.location.href = "../register/index.html?source="+url+"&id="+id;
   			} else {
   				alert("数据查询出错");
   			}
   			
    	},
    	error:function(){
    		alert("数据库连接失败,请稍候重试");
    	}
	});

	$('.btn-submit').on('click',function(e){
		var val = $('#reason').val();
		sendReason(val);
	});

	$('#skip').on('click',function(e){
		var val = "";
		sendReason(val);
	});

	function sendReason(val){
		$.ajax({
			type:'post',
	   		url:"/Enrollall.action",   			
	    	data: {
	    		intactiveid:id,
	    		strreason:val
	    	},
	   		success:function(data){
	   			$('.status-box').hide();
	   			$('.under-review').show();
	    	},
	    	error:function(){
	    		alert("数据库连接失败,请稍候重试");
	    	}
		});
	}

});